import React, {useCallback, useEffect, useRef, useState} from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from "next/image";
import {useIsMobile} from "@/hooks/useIsMobile";
import {UnwrapPhase} from "@/types";
import {useAlbumTour} from "@/hooks/useAlbumTour";

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
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-gradient-to-br from-amber-600 via-orange-500 to-red-600 shadow-xl ${className || ''}`}
        data-density="hard"
        {...props} // <--- QUAN TRỌNG: Để thư viện điều khiển style/position
      >
        <div className="h-full flex items-center justify-center p-8">
          {children}
        </div>
      </div>
    );
  }
);

CoverPage.displayName = 'CoverPage';

// 2. Component Trang Nội Dung (Page)
const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ number, children, header, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-white shadow-xl overflow-hidden ${className || ''}`}
        {...props} // <--- QUAN TRỌNG
      >
        <div className="h-full flex flex-col p-8">
          {/* Header */}
          {header && (
            <div className="text-center text-orange-600 text-xs font-semibold mb-3 uppercase tracking-wider">
              {header}
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 overflow-auto custom-scrollbar">
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
  const isMobile = useIsMobile();
  const {startTour, closeTour} = useAlbumTour();
  
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
    <div className="relative w-full min-h-screen flex bg-transparent flex-col items-center justify-center p-4 md:p-8">
      <Image
        src="/images/showtime/flower-vintage-background.jpg"
        alt="Background"
        fill
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
          style={{ margin: '0 auto' }}
        >
          {/* Bìa trước */}
          <CoverPage id="album-digital" key="cover-front">
            <div className="text-center text-white">
              <div className="text-8xl mb-6">📚</div>
              <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">
                Cuốn Sách
              </h2>
              <h3 className="text-3xl font-light mb-8 drop-shadow-md">
                Của Tôi
              </h3>
              <div className="w-32 h-1 bg-white mx-auto mb-8 opacity-70"></div>
              <p className="text-lg italic opacity-90">
                Click góc hoặc kéo để lật
              </p>
            </div>
          </CoverPage>
          
          {/* Trang 1 */}
          <Page number={1} header="LỜI NÓI ĐẦU" key="page-1">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Chương 1: Khởi Đầu
              </h3>
              <div className="w-full h-40 bg-gradient-to-br from-amber-200 to-orange-300 rounded-lg mb-4 flex items-center justify-center shadow-inner">
                <span className="text-6xl">🌅</span>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify text-sm">
                Chào mừng bạn đến với bản demo hiệu ứng lật trang (Flipbook).
                Kỹ thuật này sử dụng thư viện `react-pageflip` để mô phỏng vật lý của giấy thật.
                Bạn có thể tương tác bằng chuột hoặc chạm cảm ứng.
              </p>
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
              <div className="w-full h-40 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-lg flex items-center justify-center shadow-inner">
                <span className="text-6xl">🌊</span>
              </div>
            </div>
          </Page>
          
          {/* Trang 3 */}
          <Page number={3} header="THIÊN NHIÊN" key="page-3">
            <div>
              <div className="w-full h-40 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-lg mb-4 flex items-center justify-center shadow-inner">
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
              <div className="w-full h-40 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center shadow-inner">
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
                <div className="w-full h-32 bg-gradient-to-br from-purple-300 to-pink-400 rounded-lg flex items-center justify-center shadow-inner">
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
              <div className="w-full h-40 bg-gradient-to-br from-green-300 to-emerald-500 rounded-lg flex items-center justify-center shadow-inner">
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
    </div>
  );
}

export default DigitalAlbum;