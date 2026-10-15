import React, {useCallback, useEffect, useRef, useState} from "react";

type Point = { x: number; y: number };
type Corner = 'top' | 'bottom';
export type FlipDirection = 'forward' | 'back';

// API tối thiểu của page-flip (thư viện không ship type).
// Toạ độ truyền vào là toạ độ tương đối với block `.stf__block`.
export interface PageFlipApi {
  startUserTouch: (pos: Point) => void;
  userMove: (pos: Point, isTouch: boolean) => void;
  userStop: (pos: Point, isSwipe?: boolean) => void;
  flipNext: (corner?: Corner) => void;
  flipPrev: (corner?: Corner) => void;
  getBoundsRect: () => { left: number; top: number; width: number; height: number; pageWidth: number };
  getOrientation: () => 'portrait' | 'landscape';
  getCurrentPageIndex: () => number;
  getPageCount: () => number;
  getUI: () => { getDistElement: () => HTMLElement };
}

interface FlipInputLayerProps {
  getPageFlip: () => PageFlipApi | undefined;
  // Đổi giá trị mỗi khi sách init lại / lật trang để đo lại vùng mép
  layoutKey: string | number;
  disabled?: boolean;
  // Gọi ngay khi người dùng chạm vào vùng lật (còn trong user gesture, dùng để phát nhạc)
  onInteract?: () => void;
  // Gọi khi chắc chắn sẽ lật theo hướng này (tap, swipe, bàn phím)
  onFlipIntent?: (direction: FlipDirection) => void;
}

interface Zone {
  side: 'left' | 'right';
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Gesture {
  pointerId: number;
  start: Point;
  time: number;
  isTouch: boolean;
  started: boolean;
  side: Zone['side'];
}

const EDGE_RATIO = 0.15;
const MIN_EDGE = 36;
// Giống page-flip: chạm < 250ms là swipe, lâu hơn mới bắt đầu kéo gấp trang
const SWIPE_TIMEOUT = 250;
const SWIPE_DISTANCE = 30;
const TAP_DISTANCE = 10;

/**
 * Lớp nhận input cho react-pageflip (dùng với useMouseEvents={false}).
 * Chỉ vùng mép trái/phải của sách mới kéo/lật được, phần nội dung giữa trang
 * nhận click/kéo bình thường nên không cần stopPropagation trong các component con.
 */
const FlipInputLayer = ({getPageFlip, layoutKey, disabled = false, onInteract, onFlipIntent}: FlipInputLayerProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const gestureRef = useRef<Gesture | null>(null);
  const touchTimerRef = useRef<number | undefined>(undefined);
  const [zones, setZones] = useState<Zone[]>([]);

  const toBlockPos = useCallback((clientX: number, clientY: number): Point | null => {
    const block = getPageFlip()?.getUI().getDistElement();
    if (!block) return null;
    const rect = block.getBoundingClientRect();
    return {x: clientX - rect.left, y: clientY - rect.top};
  }, [getPageFlip]);

  const measure = useCallback(() => {
    const flip = getPageFlip();
    const root = rootRef.current;
    const block = flip?.getUI().getDistElement();
    if (!flip || !root || !block) return;

    const bounds = flip.getBoundsRect();
    const blockRect = block.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    const isPortrait = flip.getOrientation() === 'portrait';

    // Ở portrait, bounds rộng 2 trang nhưng chỉ nửa phải là trang đang hiển thị
    const visibleLeft = blockRect.left - rootRect.left + bounds.left + (isPortrait ? bounds.pageWidth : 0);
    const visibleWidth = isPortrait ? bounds.pageWidth : bounds.width;
    const top = blockRect.top - rootRect.top + bounds.top;
    const edge = Math.max(MIN_EDGE, bounds.pageWidth * EDGE_RATIO);

    const current = flip.getCurrentPageIndex();
    const canBack = current > 0;
    const canForward = current < flip.getPageCount() - 1;

    const next: Zone[] = [];
    if (canBack) next.push({side: 'left', left: visibleLeft, top, width: edge, height: bounds.height});
    if (canForward) next.push({side: 'right', left: visibleLeft + visibleWidth - edge, top, width: edge, height: bounds.height});
    setZones(next);
  }, [getPageFlip]);

  // Đo lại khi sách init/lật trang/resize
  useEffect(() => {
    const frame = requestAnimationFrame(measure);
    const block = getPageFlip()?.getUI().getDistElement();
    const observer = new ResizeObserver(() => requestAnimationFrame(measure));
    if (block) observer.observe(block);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, getPageFlip, layoutKey]);

  // Điều hướng bằng phím mũi tên
  useEffect(() => {
    if (disabled) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable="true"]')) return;
      const flip = getPageFlip();
      if (!flip) return;
      if (e.key === 'ArrowRight') {
        onFlipIntent?.('forward');
        flip.flipNext();
      } else if (e.key === 'ArrowLeft') {
        onFlipIntent?.('back');
        flip.flipPrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [disabled, getPageFlip, onFlipIntent]);

  // Huỷ thao tác dở dang khi bị disable (mở tour/modal)
  useEffect(() => {
    if (!disabled) return;
    window.clearTimeout(touchTimerRef.current);
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (gesture?.started) getPageFlip()?.userStop(gesture.start);
  }, [disabled, getPageFlip]);

  useEffect(() => () => window.clearTimeout(touchTimerRef.current), []);

  const handlePointerDown = (side: Zone['side']) => (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || gestureRef.current) return;
    const flip = getPageFlip();
    const pos = toBlockPos(e.clientX, e.clientY);
    if (!flip || !pos) return;

    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    onInteract?.();

    const isTouch = e.pointerType !== 'mouse';
    const gesture: Gesture = {pointerId: e.pointerId, start: pos, time: Date.now(), isTouch, started: !isTouch, side};
    gestureRef.current = gesture;

    if (!isTouch) {
      flip.startUserTouch(pos);
      return;
    }

    touchTimerRef.current = window.setTimeout(() => {
      if (gestureRef.current === gesture) {
        gesture.started = true;
        flip.startUserTouch(gesture.start);
      }
    }, SWIPE_TIMEOUT);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const flip = getPageFlip();
    const pos = toBlockPos(e.clientX, e.clientY);
    if (!flip || !pos) return;

    const gesture = gestureRef.current;
    if (!gesture) {
      // Rê chuột gần góc trang -> page-flip tự gấp nhẹ góc để gợi ý
      if (!disabled && e.pointerType === 'mouse') flip.userMove(pos, false);
      return;
    }
    if (gesture.pointerId !== e.pointerId || !gesture.started) return;
    flip.userMove(pos, gesture.isTouch);
  };

  const finishGesture = (e: React.PointerEvent<HTMLDivElement>, cancelled: boolean) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== e.pointerId) return;
    window.clearTimeout(touchTimerRef.current);
    gestureRef.current = null;

    const flip = getPageFlip();
    const pos = toBlockPos(e.clientX, e.clientY) ?? gesture.start;
    if (!flip) return;

    if (gesture.started) {
      // Chuột bấm-thả tại chỗ: page-flip tự lật như click
      const isClick = !gesture.isTouch && Math.hypot(pos.x - gesture.start.x, pos.y - gesture.start.y) <= 5;
      if (isClick && !cancelled) onFlipIntent?.(gesture.side === 'left' ? 'back' : 'forward');
      flip.userStop(cancelled ? gesture.start : pos);
      return;
    }
    if (cancelled) return;

    // Chạm nhanh (< SWIPE_TIMEOUT): swipe hoặc tap
    const dx = pos.x - gesture.start.x;
    const dy = pos.y - gesture.start.y;
    const bounds = flip.getBoundsRect();
    const corner: Corner = gesture.start.y < bounds.top + bounds.height / 2 ? 'top' : 'bottom';

    if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dy) < SWIPE_DISTANCE * 2) {
      if (dx > 0) {
        onFlipIntent?.('back');
        flip.flipPrev(corner);
      } else {
        onFlipIntent?.('forward');
        flip.flipNext(corner);
      }
    } else if (Math.hypot(dx, dy) <= TAP_DISTANCE) {
      onFlipIntent?.(gesture.side === 'left' ? 'back' : 'forward');
      flip.startUserTouch(gesture.start);
      flip.userStop(gesture.start);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (gestureRef.current || e.pointerType !== 'mouse') return;
    const flip = getPageFlip();
    if (!flip) return;
    // Đưa "chuột ảo" về giữa sách để page-flip thu góc đang gấp lại
    const bounds = flip.getBoundsRect();
    flip.userMove({x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2}, false);
  };

  return (
    <div ref={rootRef} className="absolute inset-0 pointer-events-none z-1000" aria-hidden>
      {!disabled && zones.map((zone) => (
        <div
          key={zone.side}
          className="absolute pointer-events-auto touch-none select-none cursor-grab active:cursor-grabbing"
          style={{left: zone.left, top: zone.top, width: zone.width, height: zone.height}}
          onPointerDown={handlePointerDown(zone.side)}
          onPointerMove={handlePointerMove}
          onPointerUp={(e) => finishGesture(e, false)}
          onPointerCancel={(e) => finishGesture(e, true)}
          onPointerLeave={handlePointerLeave}
        />
      ))}
    </div>
  );
};

export default FlipInputLayer;
