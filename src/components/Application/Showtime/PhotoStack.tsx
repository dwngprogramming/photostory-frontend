import {Photo} from "@/types";
import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, PanInfo} from "framer-motion";
import {motion} from "framer-motion";

interface PhotoStackProps {
  photos: Photo[];
}

const PhotoStack = ({photos: initialPhotos}: PhotoStackProps) => {
  const [photos, setPhotos] = useState(initialPhotos);
  const photoStackRef = useRef<HTMLDivElement | null>(null);
  const [exitX, setExitX] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const moveTopCardToBottom = () => {
    setPhotos((prevPhotos) => {
      const newPhotos = [...prevPhotos];
      const topCard = newPhotos.pop();
      if (topCard) newPhotos.unshift(topCard);
      return newPhotos;
    });
  };
  
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (isAnimating) return;
    const swipeThreshold = 50;
    const draggedDistance = info.offset.x;
    if (Math.abs(draggedDistance) > swipeThreshold) {
      setIsAnimating(true);
      setExitX(draggedDistance > 0 ? 300 : -300);
      setTimeout(() => {
        moveTopCardToBottom();
        setExitX(null);
        setIsAnimating(false);
      }, 200);
    }
  };
  
  // useEffect(() => {
  //   const photoStack = photoStackRef.current;
  //   if (!photoStack) return;
  //   const stopPropagation = (e: Event) => e.stopPropagation();
  //   const events = ['mousemove', 'touchmove', 'pointermove'];
  //   events.forEach(event => photoStack.addEventListener(event, stopPropagation));
  //   return () => events.forEach(event => photoStack.removeEventListener(event, stopPropagation));
  // }, []);
  
  return (
    <div
      ref={photoStackRef}
      className="w-full h-64 flex items-center justify-center"
      // Chặn sự kiện bắt đầu (Ngăn lật khi bắt đầu Drag)
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      
      // Chặn sự kiện Click (Ngăn lật khi Click nhanh vào ảnh)
      onClick={(e) => e.stopPropagation()}
      
      // Chặn thêm các sự kiện kết thúc cho chắc chắn
      onMouseUp={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      style={{touchAction: 'none'}}
    >
      <AnimatePresence mode='popLayout'>
        {photos.map((photo, zIndex) => {
          if (zIndex < photos.length - 4) return null;
          
          const isTop = zIndex === photos.length - 1;
          const baseRotation = zIndex % 2 === 0 ? 2 : -2;
          const rotationOffset = baseRotation * (photos.length - 1 - zIndex);
          
          return (
            <motion.div
              key={photo.id}
              layout
              className={`absolute bg-white dark:bg-stone-50 p-3 pb-10 shadow-xl origin-bottom border border-stone-100
                  ${isTop ? 'cursor-grab active:cursor-grabbing' : ''}
                  ${photo.orientation === 'landscape' ? 'w-60 h-44' :
                photo.orientation === 'portrait' ? 'w-44 h-60' : 'w-52 h-52'}
                `}
              style={{ zIndex: zIndex, touchAction: 'none' }}
              initial={{scale: 0.9, y: 50, opacity: 1}}
              animate={{
                scale: isTop ? 1 : 0.95 - (photos.length - 1 - zIndex) * 0.03,
                rotate: isTop ? 0 : rotationOffset,
                y: isTop ? 0 : -12 * (photos.length - 1 - zIndex),
                x: isTop && exitX ? exitX : 0,
                opacity: 1,
                filter: isTop ? 'brightness(1)' : `brightness(${1 - (photos.length - 1 - zIndex) * 0.1}) sepia(0.2)`, // Thêm sepia nhẹ cho các thẻ phía sau
                boxShadow: isTop ? "0 20px 30px -10px rgba(0, 0, 0, 0.3)" : "0 5px 15px -5px rgba(0, 0, 0, 0.1)"
              }}
              transition={{
                type: "spring", stiffness: 300, damping: 30, x: {duration: 0.2}
              }}
              drag={isTop && !isAnimating ? "x" : false}
              dragConstraints={{left: 0, right: 0}}
              dragElastic={0.1}
              onDragEnd={isTop ? handleDragEnd : undefined}
              whileTap={isTop ? {cursor: 'grabbing'} : {}}
            >
              <div className="w-full h-full overflow-hidden bg-stone-100 pointer-events-none">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover select-none filter hover:brightness-110 transition-all" // Tăng độ sáng nhẹ
                  draggable={false}
                />
              </div>
              
              {/* Caption chỉnh lại font serif, màu đậm hơn chút */}
              <div className="absolute bottom-3 left-0 right-0 text-center font-serif italic text-stone-600 text-sm pointer-events-none select-none">
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