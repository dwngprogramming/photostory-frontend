import PhotoStack from "@/components/Application/Showtime/Album/Plugin/PhotoStack";
import { PhotoResponse } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, X } from 'lucide-react';
import React, { useState } from 'react';
import { createPortal } from "react-dom";

interface AlbumPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoResponse[];
}

const AlbumPhotoModal = ({ isOpen, onClose, photos }: AlbumPhotoModalProps) => {
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');
  const [currentIndex, setCurrentIndex] = useState(1);

  // Reset view mode khi mở lại modal
  React.useEffect(() => {
    if (isOpen) setViewMode('stack');
  }, [isOpen]);

  const handleSwipe = () => {
    setCurrentIndex((prev) => (prev + 1 > photos.length ? 1 : prev + 1));
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm"
        >
          <div className="w-full h-full flex items-center justify-center pointer-events-none relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/50 hover:bg-stone-700 text-white transition-colors pointer-events-auto z-[120]"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="pointer-events-auto w-full flex justify-center" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                {viewMode === 'stack' ? (
                  <StackView 
                     photos={photos} 
                     currentIndex={currentIndex} 
                     onSwipe={handleSwipe} 
                     onToGrid={() => setViewMode('grid')} 
                  />
                ) : (
                  <GridView 
                    photos={photos} 
                    onBack={() => setViewMode('stack')} 
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// Sub-components nội bộ để file gọn hơn
const StackView = ({ photos, currentIndex, onSwipe, onToGrid }: any) => (
  <motion.div
    key="stack-mode"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 1.2, opacity: 0 }}
    className="flex flex-col items-center justify-center"
  >
    <div className="mb-16 text-white/80 text-center font-serif italic text-lg">
       Kéo sang trái/phải để xem ảnh. Nhấn vào ảnh trên cùng để hiển thị toàn bộ ảnh.
    </div>
    <div className="transform scale-120 md:scale-130">
      <PhotoStack
        photos={photos}
        interactive={true}
        onTopCardClick={onToGrid}
        onSwipe={onSwipe}
      />
    </div>
    <div className="mt-8 text-stone-300 text-sm">{currentIndex} / {photos.length}</div>
  </motion.div>
);

const GridView = ({ photos, onBack }: any) => (
  <motion.div
    key="grid-mode"
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    className="bg-stone-50 dark:bg-stone-900 p-6 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto no-scrollbar relative"
  >
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors">
          <ArrowLeft className="w-5 h-5 text-stone-600 dark:text-stone-300" />
        </button>
        <h2 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100">Kỷ Niệm</h2>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {photos.map((photo: any) => (
        <div key={photo.id} className="bg-white p-3 shadow-md transform hover:rotate-1 hover:scale-105 transition-transform duration-300">
           <div className="aspect-square overflow-hidden mb-2 bg-stone-200">
             <img src={photo.mediaUrl} alt={photo.caption} className="w-full h-full object-cover" draggable={false} />
           </div>
           <p className="text-center font-serif text-sm text-stone-600 italic">{photo.caption}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

export default AlbumPhotoModal;