import React, { useCallback, useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Photo, PhotoResponse, UnwrapPhase } from "@/types";
import { useAlbumTour } from "@/hooks/useAlbumTour";
import PhotoStack from "@/components/Application/Showtime/Album/Plugin/PhotoStack";
import GlassPlayer from "@/components/Application/Showtime/Album/Plugin/GlassPlayer";
import Location from "@/components/Application/Showtime/Location";
import AlbumCover from '@/components/Application/Showtime/Album/Page/AlbumCover';
import AlbumPage from '@/components/Application/Showtime/Album/Page/AlbumPage';
import AlbumPhotoModal from '@/components/Application/Showtime/Album/Page/AlbumPhotoModal';
import { useTranslations } from 'next-intl';
import { EndFrenchFlap, StartFrenchFlap } from '@/components/Application/Showtime/Album/Page/FrenchFlap';
import { Sun } from 'lucide-react';

interface DigitalAlbumProps {
  phase: UnwrapPhase;
}

const DigitalAlbum = ({ phase }: DigitalAlbumProps) => {
  // Đổi tên ref cho chuẩn
  const albumRef = useRef<any>(null);

  const [visualCurrentPage, setVisualCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [xPosition, setXPosition] = useState(-200);
  const [mounted, setMounted] = useState(false);

  const isMobile = useIsMobile();
  const { startTour } = useAlbumTour();
  const t = useTranslations('Common');

  const SAMPLE_PHOTOS: PhotoResponse[] = [
    { id: '1', mediaUrl: 'https://picsum.photos/400/400?random=1', mediaType: 'photo', caption: 'Coffee mornings', orientation: 'square', displayOrder: 1 },
    { id: '2', mediaUrl: 'https://picsum.photos/400/300?random=2', mediaType: 'photo', caption: 'Mountain hiking', orientation: 'landscape', displayOrder: 2 },
    { id: '3', mediaUrl: 'https://picsum.photos/300/400?random=3', mediaType: 'photo', caption: 'City lights', orientation: 'portrait', displayOrder: 3 },
    { id: '4', mediaUrl: 'https://picsum.photos/400/400?random=4', mediaType: 'photo', caption: 'Street food', orientation: 'square', displayOrder: 4 },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (phase === UnwrapPhase.REVEALED && albumRef.current) startTour();
  }, [phase]);

  const onFlip = useCallback((e: any) => setVisualCurrentPage(e.data), []);

  const onInit = useCallback(() => {
    if (albumRef.current) setTotalPages(albumRef.current.pageFlip().getPageCount());
  }, []);

  const onChangeState = useCallback((e: any) => {
    if (e.data === 'flipping') {
      if (visualCurrentPage === 0) setXPosition(0);
      if (totalPages > 0 && visualCurrentPage >= totalPages - 1) setXPosition(0);
    }
  }, [visualCurrentPage, totalPages]);

  // Handle logic đóng bìa bên trên sau khi lật ra/mở lại bìa bên dưới ở cuối sách
  const handleCloseFromFrontCover = () => {
    setXPosition(-200);
  }

  const handleCloseFromBackCover = () => {
    setXPosition(200);
  }

  const getAlbumStyle = (): React.CSSProperties => {
    if (isMobile) return { transition: 'transform 1s ease-in-out' };
    return {
      transition: 'transform 750ms ease-in-out',
      transform: `translateX(${xPosition}px)`,
    };
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      <Image
        src="/images/showtime/vintage-background.jpg"
        alt="Background"
        fill
        className="object-cover z-0 scale-105 transform blur-[6px] brightness-80 dark:brightness-30"
        priority
      />

      <div
        className={`relative z-10 mb-8 flex justify-center items-center w-full max-w-4xl h-150 ${isModalOpen ? 'pointer-events-none' : ''}`}
        style={getAlbumStyle()}
      >
        {/* @ts-ignore */}
        <HTMLFlipBook
          key={isMobile ? 'mobile-view' : 'desktop-view'}
          ref={albumRef} // Sử dụng ref đã đổi tên
          width={400} height={550}
          size="stretch" minWidth={300} maxWidth={500} minHeight={400} maxHeight={600}
          drawShadow={true} flippingTime={750}
          usePortrait={isMobile} startZIndex={0} autoSize={true} maxShadowOpacity={0.1}
          showCover={true} mobileScrollSupport={true}
          onFlip={onFlip} onInit={onInit} onChangeState={onChangeState}
          style={{ margin: '0 auto' }}
        >
          {/* --- BÌA TRƯỚC --- */}
          <AlbumCover side="left">
            <div className="text-center text-white">
              <h2 className="text-5xl font-bold mb-4 drop-shadow-lg gold-foil">Cuốn Sách</h2>
              <h3 className="text-3xl font-light mb-8 drop-shadow-md">Của Tôi</h3>
            </div>
          </AlbumCover>

          {/* --- TRANG GIỚI THIỆU (CÓ FLAP) --- */}
          <AlbumPage
            key="start-with-flap"
            side="left"
            flap={<StartFrenchFlap />}
            onCloseCover={handleCloseFromFrontCover}
          >
            <div className="w-full h-full cursor-pointer" />
          </AlbumPage>

          <AlbumPage side="right">
            <div className="relative w-full h-full flex flex-col justify-center items-center space-y-4">
              <p className="text-4xl text-center font-serif font-semibold">Người đầu tiên</p>
              <p className="text-center text-stone-600">Dành tặng đến người đầu tiên một món quà nhỏ. Mong bạn sẽ thích ~</p>

              <p className="absolute bottom-0 text-stone-600 text-xs text-center">
                {`© ${new Date().getFullYear()} Photostory`}
              </p>
            </div>
          </AlbumPage>

          {/* Trang Mục lục */}
          <AlbumPage side="left" key="table-of-contents">
            <div>
              <p className="text-2xl text-center font-serif font-bold mb-6">Những câu chuyện kể</p>
              <div className="flex flex-col space-y-6">

                {/* --- ITEM 1: Cảm ơn em --- */}
                <div className="flex items-center">
                  {/* Cụm Tiêu đề + Ngày */}
                  <div className="flex flex-col shrink-0">
                    <span className="font-serif font-semibold text-lg leading-tight">Cảm ơn em</span>
                    <span className="font-sans text-[11px] text-stone-500 mt-1 tracking-wide">14/02/2023</span>
                  </div>

                  {/* Dấu chấm nối (Leader dots) */}
                  <span className="flex-1 mx-3 mb-1.25 border-b-2 border-dotted border-stone-300"></span>

                  {/* Số trang */}
                  <span className="font-semibold text-md">1</span>
                </div>

                {/* --- ITEM 2: Băng giá --- */}
                <div className="flex items-center">
                  <div className="flex flex-col shrink-0">
                    <span className="font-serif font-semibold text-lg leading-tight">Băng giá</span>
                    <span className="font-sans text-[11px] text-stone-500 mt-1 tracking-wide">15/11/2023</span>
                  </div>
                  <span className="flex-1 mx-3 mb-1.25 border-b-2 border-dotted border-stone-300"></span>
                  <span className="font-semibold text-md">3</span>
                </div>

                {/* --- ITEM 3: Nghệ thuật --- */}
                <div className="flex items-center">
                  <div className="flex flex-col shrink-0">
                    <span className="font-serif font-semibold text-lg leading-tight">Nghệ thuật</span>
                    <span className="font-sans text-[11px] text-stone-500 mt-1 tracking-wide">01/01/2024</span>
                  </div>
                  <span className="flex-1 mx-3 mb-1.25 border-b-2 border-dotted border-stone-300"></span>
                  <span className="font-semibold text-md">4</span>
                </div>
              </div>
            </div>
          </AlbumPage>

          <AlbumPage side="right">
            <div className="w-full h-full cursor-pointer"></div>
          </AlbumPage>

          {/* --- TRANG NỘI DUNG CHÍNH --- */}
          <AlbumPage
            number={1} side="left" header="Cảm ơn em"
            isInteractive={!isModalOpen}
          >
            <div className="flex flex-col space-y-6">
              <PhotoStack
                photos={SAMPLE_PHOTOS}
                interactive={false}
                onStackClick={() => setIsModalOpen(true)}
              />
              <GlassPlayer title="New Song" artist="Dung Pham" />
              <Location />
            </div>
          </AlbumPage>

          <AlbumPage number={2} side="right" header="Cảm ơn em">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif font-semibold ml-1">
                  Cảm ơn em
                </h3>
                <div className="flex items-end space-x-4">
                  <div className="flex items-center space-x-1">
                    <Sun size={16} className="text-stone-500" />
                    <p className="text-stone-500 text-[13px]">Nắng đẹp</p>
                  </div>
                  <p className="text-stone-500 text-[13px]">14/12/2025</p>
                </div>
              </div>
            </div>
          </AlbumPage>

          <AlbumPage number={3} side="left" header="BĂNG GIÁ"><div>...</div></AlbumPage>
          <AlbumPage number={4} side="right" header="NGHỆ THUẬT"><div>...</div></AlbumPage>

          {/* --- TRANG KẾT (CÓ FLAP) --- */}
          <AlbumPage side="left"><div className="w-full h-full" /></AlbumPage>
          <AlbumPage
            side="right"
            flap={<EndFrenchFlap />}
            onCloseCover={handleCloseFromBackCover}
          >
            <div className="w-full h-full cursor-pointer" />
          </AlbumPage>

          {/* --- BÌA SAU --- */}
          <AlbumCover side="right"><></></AlbumCover>

        </HTMLFlipBook>
      </div>

      {/* --- MODAL --- */}
      {
        mounted && (
          <AlbumPhotoModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            photos={SAMPLE_PHOTOS}
          />
        )
      }
    </div >
  );
};

export default DigitalAlbum;