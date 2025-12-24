import React, {useCallback, useEffect, useRef, useState} from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from "next/image";
import {useIsMobile} from "@/hooks/useIsMobile";
import {Photo, UnwrapPhase} from "@/types";
import {useAlbumTour} from "@/hooks/useAlbumTour";
import PhotoStack from "@/components/Application/Showtime/PhotoStack";
import {createPortal} from "react-dom";
import {AnimatePresence, motion} from "framer-motion";
import {Maximize2, X} from 'lucide-react';
import GlassPlayer from "@/components/Application/Showtime/GlassPlayer";
import Location from "@/components/Application/Showtime/Location";

// --- INTERFACES ---
interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  number?: number;
  children: React.ReactNode;
  header?: string;
}

// --- COMPONENTS ---

// 1. Component Trang Bìa (CoverPage)
// QUAN TRỌNG: Phải nhận ...props và truyền vào div gốc
const CoverPage = React.forwardRef<HTMLDivElement, PageProps>(
  ({children, className, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={`texture-leather relative overflow-hidden rounded-r-lg ${className || ''}`}
        data-density="hard"
        {...props}
      >
        
        {/* 1. Gáy sách bên trái (Gradient mờ) */}
        <div
          className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-white/20 to-transparent z-10 pointer-events-none mix-blend-overlay"></div>
        
        {/* 2. Rãnh gấp (Nơi bìa nối với gáy) */}
        <div
          className="absolute top-0 left-3 w-[2px] h-full bg-black/40 shadow-[1px_0_1px_rgba(255,255,255,0.1)] z-10 pointer-events-none"></div>
        
        {/* Nội dung chính */}
        <div className="h-full flex items-center justify-center p-8 pl-10 border-l border-white/10">
          <div className="w-full h-full border-[1px] border-[#cfb53b]/30 p-2 flex items-center justify-center">
            <div className="w-full h-full border-[2px] gold-border flex flex-col items-center justify-center relative">
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

// 2. Component Trang Nội Dung (Page)
const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({number, children, header, className, ...props}, ref) => {
    
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    
    // useEffect(() => {
    //   const content = contentRef.current;
    //   if (!content) return;
    //   const stopPropagation = (e: Event) => e.stopPropagation();
    //   const events = ['mousemove', 'touchmove', 'pointermove', 'mousedown', 'touchstart', 'pointerdown'];
    //   events.forEach(event => content.addEventListener(event, stopPropagation));
    //   return () => events.forEach(event => content.removeEventListener(event, stopPropagation));
    // }, []);
    
    return (
      <div
        ref={ref}
        className={`relative shadow-xl overflow-hidden ${className || ''}`}
        {...props} // <--- QUAN TRỌNG
      >
        <Image
          src="/images/showtime/page/normal-paper.jpg"
          alt="Background"
          fill
          // ĐÃ KHÔI PHỤC LẠI ĐÚNG FILTER GỐC CỦA BẠN
          className="object-cover object-center -z-1 transform blur-[0px] brightness-100 dark:brightness-95 transition-all duration-300"
          priority
        />
        <div
          className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-stone-900/20 to-transparent pointer-events-none z-20 mix-blend-multiply"></div>
        <div
          className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-stone-900/5 to-transparent pointer-events-none z-20"></div>
        <div className="h-full p-6">
          <div
            className="h-full flex flex-col"
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseMove={(e) => e.stopPropagation()}
          >
            {/* Header - ĐÃ CHỈNH SỬA LẠI MÀU SẮC VÀ ĐƯỜNG KẺ */}
            {header && (
              <div className="flex justify-center mb-4">
                <div className="
                    text-center
                    text-amber-600
                    text-xs font-bold uppercase tracking-widest
                    border-b border-amber-600/30
                    pb-2
                ">
                  {header}
                </div>
              </div>
            )}
            
            {/* Content */}
            <div className="relative flex-1 custom-scrollbar">
              {children}
            </div>
            
            {/* Page number */}
            {number && (
              <div className="text-center text-gray-400 text-xs mt-3">
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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isOpenFullPhotos, setIsOpenFullPhotos] = useState(false);
  const isMobile = useIsMobile();
  const {startTour, closeTour} = useAlbumTour();
  const [mounted, setMounted] = useState(false);
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
    if (phase === UnwrapPhase.REVEALED && bookRef.current) {
      startTour();
    }
  }, [phase]);
  
  // Sử dụng useCallback để tránh re-render không cần thiết
  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);
  
  const onInit = useCallback(() => {
    if (bookRef.current) {
      setTotalPages(bookRef.current.pageFlip().getPageCount());
    }
  }, []);
  
  return (
    <div
      className="relative w-full min-h-screen flex bg-transparent flex-col items-center overflow-hidden justify-center p-4 md:p-8">
      <Image
        src="/images/showtime/vintage-background.jpg"
        alt="Background"
        fill
        // ĐÃ KHÔI PHỤC LẠI ĐÚNG FILTER GỐC CỦA BẠN
        className="object-cover object-center z-0 scale-105 transform blur-[6px] brightness-80 dark:brightness-30 transition-all duration-300"
        priority
      />
      
      {/* Khu vực sách */}
      <div className="relative z-10 mb-8 flex justify-center items-center w-full max-w-4xl h-[600px]">
        {/* @ts-ignore */}
        <HTMLFlipBook
          ref={bookRef}
          width={400}
          height={550}
          size="stretch"
          minWidth={300}
          maxWidth={500}
          minHeight={400}
          maxHeight={600}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={isMobile}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          onInit={onInit}
          style={{margin: '0 auto'}}
        >
          {/* Bìa trước */}
          <CoverPage id="album-digital" key="cover-front">
            <div className="text-center text-white">
              <h2 className="text-5xl font-bold mb-4 drop-shadow-lg gold-foil">
                Cuốn Sách
              </h2>
              <h3 className="text-3xl font-light mb-8 drop-shadow-md">
                Của Tôi
              </h3>
            </div>
          </CoverPage>
          
          {/* Trang 1 */}
          <Page number={1} header="Cảm ơn em" key="page-1">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col items-center overflow-x-hidden justify-center min-h-0">
                <PhotoStack photos={SAMPLE_PHOTOS}/>
                <button
                  onClick={() => setIsOpenFullPhotos(true)}
                  className="flex items-center gap-2 text-xs font-semibold text-amber-600 hover:text-amber-500 transition-colors"
                >
                  See All <Maximize2 className="w-3 h-3"/>
                </button>
              </div>
              <GlassPlayer title="New Song" artist="Dung Pham"/>
              <Location/>
            </div>
          </Page>
          
          {/* Trang 2 */}
          <Page number={2} header="CHAPTER ONE" key="page-2">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Nội Dung Tiếp Theo
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify text-sm mb-4">
                Khi xây dựng ứng dụng dạng này, việc quản lý layout rất quan trọng.
                Mỗi trang là một component riêng biệt nhưng phải tuân thủ kích thước chung của cuốn sách.
              </p>
              <div
                className="w-full h-40 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-lg flex items-center justify-center shadow-inner">
                <span className="text-6xl">🌊</span>
              </div>
            </div>
          </Page>
          
          {/* Trang 3 */}
          <Page number={3} header="THIÊN NHIÊN" key="page-3">
            <div>
              <div
                className="w-full h-40 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-lg mb-4 flex items-center justify-center shadow-inner">
                <span className="text-6xl">🌾</span>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh,
                non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat.
                Integer non tristique quam.
              </p>
            </div>
          </Page>
          
          {/* Trang 4 */}
          <Page number={4} header="BĂNG GIÁ" key="page-4">
            <div>
              <div
                className="w-full h-40 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center shadow-inner">
                <span className="text-6xl">🧊</span>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify text-sm">
                Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus,
                a venenatis tellus tellus id magna. Việc thêm shadow (đổ bóng) giúp tăng tính chân thực
                cho từng trang sách.
              </p>
            </div>
          </Page>
          
          {/* Trang 5 */}
          <Page number={5} header="NGHỆ THUẬT" key="page-5">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Chương 2: Sáng Tạo
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-gray-700 leading-relaxed text-justify">
                  Sự sáng tạo không có giới hạn. Với CSS và React, bạn có thể tạo ra bất cứ thứ gì.
                </p>
                <div
                  className="w-full h-32 bg-gradient-to-br from-purple-300 to-pink-400 rounded-lg flex items-center justify-center shadow-inner">
                  <span className="text-5xl">🎨</span>
                </div>
              </div>
            </div>
          </Page>
          
          {/* Trang 6 */}
          <Page number={6} header="RỪNG RẬM" key="page-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Khám Phá
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify text-sm mb-3">
                Màu xanh của rừng già. Component này hỗ trợ tốt responsive trên mobile nếu cấu hình đúng.
              </p>
              <div
                className="w-full h-40 bg-gradient-to-br from-green-300 to-emerald-500 rounded-lg flex items-center justify-center shadow-inner">
                <span className="text-6xl">🌲</span>
              </div>
            </div>
          </Page>
          
          {/* Bìa sau */}
          <CoverPage key="cover-back">
            <div className="text-center text-white">
              <div className="text-8xl mb-6">🎉</div>
              <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">
                Hết
              </h2>
              <div className="w-32 h-1 bg-white mx-auto mb-8 opacity-70"></div>
              <p className="text-xl italic opacity-90">
                Cảm ơn bạn đã đọc!
              </p>
              <p className="text-sm mt-4 opacity-70">
                © 2025 - PureSound Design
              </p>
            </div>
          </CoverPage>
        </HTMLFlipBook>
      </div>
      
      {/* Modal hiển thị tất cả ảnh */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpenFullPhotos && (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm"
              onClick={() => setIsOpenFullPhotos(false)}
            >
              <motion.div
                initial={{scale: 0.9, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                exit={{scale: 0.9, opacity: 0}}
                className="bg-stone-50 dark:bg-stone-900 p-6 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto no-scrollbar"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100">Memory Lane</h2>
                  <button
                    onClick={() => setIsOpenFullPhotos(false)}
                    className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
                  >
                    <X className="w-6 h-6 text-stone-500"/>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {SAMPLE_PHOTOS.map((photo) => (
                    <div key={photo.id}
                         className="bg-white p-3 shadow-md transform hover:rotate-1 hover:scale-105 transition-transform duration-300">
                      <div className="aspect-square overflow-hidden mb-2 bg-stone-200">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      </div>
                      <p className="text-center font-serif text-sm text-stone-600 italic">{photo.caption}</p>
                      <p className="text-center text-xs text-stone-400 mt-1">{photo.date}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

export default DigitalAlbum;