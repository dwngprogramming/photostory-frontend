import SoundCloudIcon from "@/components/Common/SoundCloudIcon";
import { PhotoResponse } from "@/types";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { Music } from "lucide-react";
import { useRef, useState } from "react";

interface PhotoStackProps {
  photos: PhotoResponse[];
  interactive?: boolean;     // True: Drag được (trong Modal), False: Tĩnh (trên Sách)
  onStackClick?: () => void; // Click khi ở chế độ Tĩnh
  onTopCardClick?: () => void; // Click vào ảnh trên cùng khi ở chế độ Drag,
  onSwipe?: () => void;      // Callback khi ảnh trên cùng bị swipe/drag đi
}

const PhotoStack = ({
                      photos: initialPhotos,
                      interactive = true,
                      onStackClick,
                      onTopCardClick,
                      onSwipe
                    }: PhotoStackProps) => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [exitX, setExitX] = useState<number | null>(null);
  
  // State để chặn drag khi đang bay ảnh
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Ref để phân biệt giữa Drag và Click
  const isDraggingRef = useRef(false);
  
  const moveTopCardToBottom = () => {
    setPhotos((prevPhotos) => {
      const newPhotos = [...prevPhotos];
      const topCard = newPhotos.pop();
      if (topCard) newPhotos.unshift(topCard);
      return newPhotos;
    });
  };
  
  // 1. Khi bắt đầu kéo -> Đánh dấu là đang kéo
  const handleDragStart = () => {
    isDraggingRef.current = true;
  };
  
  // 2. Khi thả tay ra
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (isAnimating) return;
    
    const swipeThreshold = 50;
    const draggedDistance = info.offset.x;
    
    // Nếu kéo đủ xa -> Bay ảnh
    if (Math.abs(draggedDistance) > swipeThreshold) {
      setIsAnimating(true);
      setExitX(draggedDistance > 0 ? 300 : -300);
      setTimeout(() => {
        moveTopCardToBottom();
        
        if (onSwipe) onSwipe();
        
        setExitX(null);
        setIsAnimating(false);
        // Reset cờ drag sau khi animation xong
        isDraggingRef.current = false;
      }, 200);
    } else {
      // Nếu kéo chưa đủ xa (thả tay tại chỗ) -> Reset cờ drag ngay lập tức
      // Dùng setTimeout nhỏ để đảm bảo sự kiện onTap không bị kích hoạt nhầm
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 100);
    }
  };
  
  // 3. Xử lý khi Click vào ảnh trên cùng
  const handleTopCardTap = () => {
    // Nếu đang animate hoặc vừa mới drag xong -> BỎ QUA, KHÔNG CLICK
    if (isAnimating || isDraggingRef.current) return;
    
    // Chỉ chạy khi thực sự là click tĩnh
    if (onTopCardClick) {
      onTopCardClick();
    }
  };
  
  return (
    <div
      className={`relative w-full h-64 flex items-center justify-center ${!interactive ? 'cursor-pointer' : ''}`}
      // Nếu là tĩnh (trên sách), click vào div cha sẽ kích hoạt mở modal
      style={{touchAction: 'none'}}
    >
      <AnimatePresence mode='popLayout'>
        {photos.map((photo, zIndex) => {
          // Chỉ render tối đa 4 ảnh để nhẹ máy
          if (zIndex < photos.length - 4) return null;
          
          const isTop = zIndex === photos.length - 1;
          const baseRotation = zIndex % 2 === 0 ? 2 : -2;
          const rotationOffset = baseRotation * (photos.length - 1 - zIndex);
          
          // Logic: Chỉ drag được khi interactive=true, là ảnh trên cùng và không đang bay
          const canDrag = interactive && isTop && !isAnimating;
          
          return (
            <motion.div
              key={photo.id}
              layout
              className={`absolute bg-white dark:bg-stone-50 p-3 pb-10 shadow-xl origin-bottom border border-stone-100
                  ${canDrag ? 'cursor-grab active:cursor-grabbing' : ''}
                  ${photo.orientation === 'landscape' ? 'w-60 h-44' :
                photo.orientation === 'portrait' ? 'w-44 h-60' : 'w-52 h-52'}
                `}
              style={{zIndex: zIndex, touchAction: 'none'}}
              initial={{scale: 0.9, y: 50, opacity: 1}}
              animate={{
                scale: isTop ? 1 : 0.95 - (photos.length - 1 - zIndex) * 0.03,
                rotate: isTop ? 0 : rotationOffset,
                y: isTop ? 0 : -12 * (photos.length - 1 - zIndex),
                x: isTop && exitX ? exitX : 0,
                opacity: 1,
                filter: isTop ? 'brightness(1)' : `brightness(${1 - (photos.length - 1 - zIndex) * 0.1}) sepia(0.2)`,
                boxShadow: isTop ? "0 20px 30px -10px rgba(0, 0, 0, 0.3)" : "0 5px 15px -5px rgba(0, 0, 0, 0.1)"
              }}
              transition={{
                type: "spring", stiffness: 300, damping: 30, x: {duration: 0.2}
              }}
              
              // --- CẤU HÌNH DRAG & TAP ---
              drag={canDrag ? "x" : false} // Chỉ drag trục ngang
              dragConstraints={{left: 0, right: 0}}
              dragElastic={0.1}
              
              onDragStart={canDrag ? handleDragStart : undefined} // Bắt đầu kéo
              onDragEnd={canDrag ? handleDragEnd : undefined}     // Kết thúc kéo
              onTap={canDrag ? handleTopCardTap : undefined}      // Click (Tap)
              
              whileTap={canDrag ? {cursor: 'grabbing'} : {}}
              onClick={(e) => {
                // Ngăn sự kiện nổi lên HTMLPageFlip
                e.stopPropagation();
                e.preventDefault();
                if (!interactive && onStackClick) onStackClick();
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault(); // Thêm preventDefault để chắc chắn
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="w-full h-full overflow-hidden bg-stone-100 pointer-events-none">
                <img
                  src={photo.mediaUrl}
                  alt={photo.caption}
                  className="w-full h-full object-cover select-none filter hover:brightness-110 transition-all"
                  draggable={false}
                />
              </div>
              
              <div
                className="absolute bottom-3 left-0 right-0 text-center font-serif italic text-stone-600 text-sm pointer-events-none select-none">
                {photo.caption}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default PhotoStack;