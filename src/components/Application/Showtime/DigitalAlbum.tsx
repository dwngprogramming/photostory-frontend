import React, {useCallback, useEffect, useRef, useState} from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from "next/image";
import {useIsMobile} from "@/hooks/useIsMobile";
import {Photo, UnwrapPhase} from "@/types";
import {useAlbumTour} from "@/hooks/useAlbumTour";
import PhotoStack from "@/components/Application/Showtime/PhotoStack";
import {createPortal} from "react-dom";
import {AnimatePresence, motion} from "framer-motion";
import {ArrowLeft, X} from 'lucide-react';
import GlassPlayer from "@/components/Application/Showtime/GlassPlayer";
import Location from "@/components/Application/Showtime/Location";

// --- Page Interface ---
interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  number?: number;
  side: "left" | "right";
  children: React.ReactNode;
  header?: string;
  isModalOpen?: boolean;
}

const CoverPage = React.forwardRef<HTMLDivElement, PageProps>(
  ({ side, children, className, ...props }, ref) => {
    const isLeft = side === 'left';
    
    return (
      <div
        ref={ref}
        // Logic: Nếu là trang trái thì bo góc trái, trang phải bo góc phải
        className={`texture-leather relative overflow-hidden ${
          isLeft ? 'rounded-l-lg border-r border-white/10' : 'rounded-r-lg border-l border-white/10'
        } ${className || ''}`}
        data-density="hard"
        {...props}
      >
        {/* --- Hiệu ứng bóng gáy sách (Spine Gradient) --- */}
        {/* Nếu là trang trái: Bóng nằm bên phải. Trang phải: Bóng nằm bên trái */}
        <div
          className={`absolute top-0 w-4 h-full z-10 pointer-events-none mix-blend-overlay ${
            isLeft
              ? 'right-0 bg-gradient-to-l from-white/20 to-transparent'
              : 'left-0 bg-gradient-to-r from-white/20 to-transparent'
          }`}
        ></div>
        
        {/* --- Đường chỉ may giả lập (Stitch Line) --- */}
        <div
          className={`absolute top-0 h-full w-[2px] bg-black/40 z-10 pointer-events-none ${
            isLeft ? 'left-3' : 'right-3'
          }`}
        ></div>
        
        {/* --- Nội dung chính --- */}
        {/* Padding thay đổi để nội dung không bị đè bởi gáy sách */}
        <div className={`h-full flex items-center justify-center p-8 ${isLeft ? 'pr-10 pl-8' : 'pl-10 pr-8'}`}>
          <div className="w-full h-full border-[1px] border-[#cfb53b]/30 p-2 flex items-center justify-center">
            <div className="w-full h-full border-[2px] gold-border flex flex-col items-center justify-center relative">
              {/* Các góc trang trí giữ nguyên vì nó đối xứng */}
              <div className="absolute top-2 left-2 text-[#cfb53b] opacity-80">╔</div>
              <div className="absolute top-2 right-2 text-[#cfb53b] opacity-80">╗</div>
              <div className="absolute bottom-2 left-2 text-[#cfb53b] opacity-80">╚</div>
              <div className="absolute bottom-2 right-2 text-[#cfb53b] opacity-80">╝</div>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
CoverPage.displayName = 'CoverPage';

const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ number, side, children, header, isModalOpen, className, ...props }, ref) => {
    const isLeft = side === 'left';
    
    return (
      <div
        ref={ref}
        // Logic: Bo góc nhẹ cho trang giấy thường (nếu muốn) hoặc chỉ cần shadow
        className={`relative shadow-xl overflow-hidden bg-white ${className || ''} ${
          isModalOpen ? 'pointer-events-none' : ''
        } ${isLeft ? 'rounded-l-sm' : 'rounded-r-sm'}`}
        data-density="soft"
        {...props}
      >
        <Image
          src="/images/showtime/page/normal-paper.jpg"
          alt="Background"
          fill
          className="object-cover object-center -z-1 transform blur-[0px] brightness-100 dark:brightness-95 transition-all duration-300"
          priority
        />
        
        {/* --- Bóng đổ gáy sách (Spine Shadow) cho trang giấy --- */}
        <div
          className={`absolute top-0 bottom-0 w-8 pointer-events-none z-20 mix-blend-multiply ${
            isLeft
              ? 'right-0 bg-gradient-to-l from-stone-900/20 to-transparent' // Trang trái: Bóng bên phải
              : 'left-0 bg-gradient-to-r from-stone-900/20 to-transparent' // Trang phải: Bóng bên trái
          }`}
        ></div>
        
        {/* --- Viền mỏng cạnh ngoài (đối diện gáy sách) để tạo độ nổi --- */}
        <div
          className={`absolute top-0 bottom-0 w-1 pointer-events-none z-20 ${
            isLeft
              ? 'left-0 bg-gradient-to-r from-stone-900/5 to-transparent'
              : 'right-0 bg-gradient-to-l from-stone-900/5 to-transparent'
          }`}
        ></div>
        
        <div className="h-full p-6">
          <div className="h-full flex flex-col">
            {header && (
              <div className="flex justify-center mb-4">
                <div className="text-center text-amber-600 text-xs font-bold uppercase tracking-widest border-b border-amber-600/30 pb-2">
                  {header}
                </div>
              </div>
            )}
            <div className="relative flex-1 custom-scrollbar">{children}</div>
            
            {/* Số trang thường nằm ở góc ngoài xa gáy sách */}
            {number && (
              <div className={`text-gray-400 text-xs mt-3 flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                {number}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
Page.displayName = 'Page';


interface DigitalAlbumProps {
  phase: UnwrapPhase;
}

// --- MAIN COMPONENT ---
const DigitalAlbum = ({phase}: DigitalAlbumProps) => {
  const bookRef = useRef<any>(null);
  const [visualCurrentPage, setVisualCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');
  const [currentIndex, setCurrentIndex] = useState(1);
  
  const isMobile = useIsMobile();
  const {startTour} = useAlbumTour();
  const [mounted, setMounted] = useState(false);
  const [xPosition, setXPosition] = useState(-200);
  const SAMPLE_PHOTOS: Photo[] = [
    {
      id: '1',
      url: 'https://picsum.photos/400/400?random=1',
      caption: 'Coffee mornings',
      date: 'Oct 24, 2023',
      orientation: 'square'
    },
    {
      id: '2',
      url: 'https://picsum.photos/400/300?random=2',
      caption: 'Mountain hiking',
      date: 'Oct 25, 2023',
      orientation: 'landscape'
    },
    {
      id: '3',
      url: 'https://picsum.photos/300/400?random=3',
      caption: 'City lights',
      date: 'Oct 26, 2023',
      orientation: 'portrait'
    },
    {
      id: '4',
      url: 'https://picsum.photos/400/400?random=4',
      caption: 'Street food',
      date: 'Oct 27, 2023',
      orientation: 'square'
    },
  ];
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (phase === UnwrapPhase.REVEALED && bookRef.current) startTour();
  }, [phase]);
  
  const onFlip = useCallback((e: any) => {
    setVisualCurrentPage(e.data);
  }, []);
  
  const onInit = useCallback(() => {
    if (bookRef.current) setTotalPages(bookRef.current.pageFlip().getPageCount());
  }, []);
  
  // Handle logic mở bìa bên trên từ đầu/đóng bìa bên dưới ở cuối sách bằng react-pageflip events
  const onChangeState = useCallback((e: any) => {
    // Nếu đang ở Bìa (0) mà bắt đầu lật -> Chắc chắn là Mở sách -> Ra giữa ngay
    if (e.data === 'flipping' && visualCurrentPage === 0) {
      setXPosition(0);
    }
    
    // Nếu đang ở trang cuối cùng mà lật -> Chắc chắn là đóng bìa sau -> Ra giữa ngay
    if (e.data === 'flipping' && totalPages > 0 && visualCurrentPage >= totalPages - 1) {
      setXPosition(0);
    }
  }, [visualCurrentPage, totalPages]);
  
  // Handle logic đóng bìa bên trên sau khi lật ra/mở lại bìa bên dưới ở cuối sách
  const handleCloseFromFrontCover = () => {
    setXPosition(-200);
  }
  
  const handleCloseFromBackCover = () => {
    setXPosition(200);
  }
  
  const openModal = () => {
    setViewMode('stack');
    setIsModalOpen(true);
  };
  
  const handleSwipe = () => {
    setCurrentIndex((prev) => {
      let nextIndex = prev + 1;
      if (nextIndex > SAMPLE_PHOTOS.length) nextIndex = 1;
      return nextIndex;
    });
  }
  
  const translateBookAnimation = (translatePx: number): React.CSSProperties => {
    // Mobile: Không trượt, giữ nguyên mặc định
    if (isMobile) return {transition: 'transform 1s ease-in-out'};
    
    // Thời gian trượt khớp hoàn toàn với thời gian lật trang (1000ms)
    // Dùng 'ease-in-out' để vận tốc lúc đầu và lúc cuối êm ái
    const baseStyle: React.CSSProperties = {
      transition: 'transform 750ms ease-in-out',
    };
    
    return {
      ...baseStyle,
      transform: `translateX(${translatePx}px)`,
    };
  };
  
  return (
    <div
      className="relative w-full min-h-screen flex bg-transparent flex-col items-center overflow-hidden justify-center p-4 md:p-8">
      <Image src="/images/showtime/vintage-background.jpg" alt="Background" fill
             className="object-cover object-center z-0 scale-105 transform blur-[6px] brightness-80 dark:brightness-30 transition-all duration-300"
             priority/>
      
      <div
        className={`relative z-10 mb-8 flex justify-center items-center w-full max-w-4xl h-[600px] ${isModalOpen ? 'pointer-events-none' : ''}`}
        style={translateBookAnimation(xPosition)}
      >
        {/* @ts-ignore */}
        <HTMLFlipBook
          key={isMobile ? 'mobile-view' : 'desktop-view'}
          ref={bookRef}
          width={400}
          height={550}
          size="stretch"
          minWidth={300}
          maxWidth={500}
          minHeight={400}
          maxHeight={600}
          drawShadow={true}
          flippingTime={750}
          usePortrait={isMobile}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.1}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          onInit={onInit}
          onChangeState={onChangeState}
          style={{margin: '0 auto'}}
        >
          <CoverPage id="album-digital" key="cover-front" side="left">
            <div className="text-center text-white">
              <h2 className="text-5xl font-bold mb-4 drop-shadow-lg gold-foil">Cuốn Sách</h2>
              <h3 className="text-3xl font-light mb-8 drop-shadow-md">Của Tôi</h3>
            </div>
          </CoverPage>
          
          {/* Introduction Pages */}
          <Page key="french-flap-left" side="left">
            <div
              className="w-full h-full cursor-pointer"
              onClick={handleCloseFromFrontCover}
            />
          </Page>
          
          <Page key="title-page" side="right">
            <div
              className="w-full h-full cursor-pointer"
            />
          </Page>
          
          <Page number={2} side="left" header="Cảm ơn em" key="page-2" isModalOpen={isModalOpen}>
            <div className="flex flex-col space-y-6">
              <PhotoStack
                photos={SAMPLE_PHOTOS}
                interactive={false}
                onStackClick={openModal}
              />
              <GlassPlayer title="New Song" artist="Dung Pham"/>
              <Location/>
            </div>
          </Page>
          
          <Page number={3} side="right" header="THIÊN NHIÊN" key="page-3">
            <div>...</div>
          </Page>
          <Page number={4} side="left" header="BĂNG GIÁ" key="page-4">
            <div>...</div>
          </Page>
          <Page number={5} side="right" header="NGHỆ THUẬT" key="page-5">
            <div>...</div>
          </Page>
          
          <Page key="blank-page" side="left">
            <div
              className="w-full h-full cursor-pointer"
            />
          </Page>
          
          <Page key="french-flap-right" side="right">
            <div
              className="w-full h-full cursor-pointer"
              onClick={handleCloseFromBackCover}
            />
          </Page>
          
          <CoverPage key="cover-back" side="right">
            <></>
          </CoverPage>
        </HTMLFlipBook>
      </div>
      
      {/* --- MODAL --- */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm"
            >
              <div className="w-full h-full flex items-center justify-center pointer-events-none">
                {/* Nút Close: Đây là cách DUY NHẤT để đóng modal */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/50 hover:bg-stone-700 text-white transition-colors pointer-events-auto z-[120]"
                >
                  <X className="w-6 h-6"/>
                </button>
                
                <div className="pointer-events-auto w-full flex justify-center" onClick={(e) => e.stopPropagation()}>
                  <AnimatePresence mode="wait">
                    {viewMode === 'stack' ? (
                      <motion.div
                        key="stack-mode"
                        initial={{scale: 0.8, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 1.2, opacity: 0}}
                        className="flex flex-col items-center justify-center"
                      >
                        <div className="mb-16 text-white/80 text-center font-serif italic text-lg">
                          Kéo sang trái/phải để xem ảnh. Nhấn vào ảnh trên cùng để hiển thị toàn bộ ảnh.
                        </div>
                        <div className="transform scale-120 md:scale-130">
                          <PhotoStack
                            photos={SAMPLE_PHOTOS}
                            interactive={true}
                            onTopCardClick={() => setViewMode('grid')}
                            onSwipe={handleSwipe}
                          />
                        </div>
                        <div className="mt-8 text-stone-300 text-sm">
                          {currentIndex} / {SAMPLE_PHOTOS.length}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="grid-mode"
                        initial={{scale: 0.95, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0.95, opacity: 0}}
                        className="bg-stone-50 dark:bg-stone-900 p-6 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto no-scrollbar relative"
                      >
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-2">
                            <button onClick={() => setViewMode('stack')}
                                    className="p-1 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors">
                              <ArrowLeft className="w-5 h-5 text-stone-600 dark:text-stone-300"/>
                            </button>
                            <h2 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100">Kỷ
                              Niệm</h2>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          {SAMPLE_PHOTOS.map((photo) => (
                            <div key={photo.id}
                                 className="bg-white p-3 shadow-md transform hover:rotate-1 hover:scale-105 transition-transform duration-300">
                              <div className="aspect-square overflow-hidden mb-2 bg-stone-200">
                                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover"
                                     draggable={false}/>
                              </div>
                              <p className="text-center font-serif text-sm text-stone-600 italic">{photo.caption}</p>
                              <p className="text-center text-xs text-stone-400 mt-1">{photo.date}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

export default DigitalAlbum;