import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from "next/image";
import {useIsMobile} from "@/hooks/useIsMobile";
import {AlbumResponse, UnwrapPhase} from "@/types";
import {useAlbumTour} from "@/hooks/useAlbumTour";
import PhotoStack from "@/components/Application/Showtime/Album/Plugin/PhotoStack";
import StoryMusic from "@/components/Application/Showtime/Album/Plugin/StoryMusic";
import Location from "@/components/Application/Showtime/Location";
import AlbumCover from '@/components/Application/Showtime/Album/Page/AlbumCover';
import AlbumPage from '@/components/Application/Showtime/Album/Page/AlbumPage';
import AlbumPhotoModal from '@/components/Application/Showtime/Album/Page/AlbumPhotoModal';
import {EndFrenchFlap, StartFrenchFlap} from '@/components/Application/Showtime/Album/Page/FrenchFlap';
import StoryPiece from "@/components/Application/Showtime/Album/Page/StoryPiece";
import PrefacePiece from "@/components/Application/Showtime/Album/Page/PrefacePiece";
import HighlightImagePiece from "@/components/Application/Showtime/Album/Page/HighlightImagePiece";
import AfterworkPiece from "@/components/Application/Showtime/Album/Page/AfterworkPiece";
import {useLocale, useTranslations} from 'next-intl';
import {format, parseISO} from 'date-fns';
import {vi, enUS} from 'date-fns/locale';
import {useAppDispatch} from "@/libs/redux/hook";
import {autoStartThemeSong} from "@/libs/redux/features/audioSlice";
import FlipInputLayer, {FlipDirection, PageFlipApi} from "@/components/Application/Showtime/Album/Plugin/FlipInputLayer";

interface DigitalAlbumProps {
  album: AlbumResponse;
  phase: UnwrapPhase;
}

const DigitalAlbum = ({album, phase}: DigitalAlbumProps) => {
  const t = useTranslations("App.Showtime.album");
  const albumRef = useRef<{ pageFlip: () => PageFlipApi | undefined } | null>(null);
  
  const [visualCurrentPage, setVisualCurrentPage] = useState(0);
  const [initCount, setInitCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [xPosition, setXPosition] = useState(-200);
  const [mounted, setMounted] = useState(false);
  
  const isMobile = useIsMobile();
  const {startTour, isTourOpen} = useAlbumTour();
  const locale = useLocale();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (phase === UnwrapPhase.REVEALED && albumRef.current) startTour();
  }, [phase]);
  
  const getPageFlip = useCallback(() => albumRef.current?.pageFlip(), []);
  
  // Khi sách đóng (đang ở bìa trước/sau) chỉ còn 1 trang hiển thị -> dịch nửa trang để căn giữa
  const getCoverShift = useCallback((pageIndex: number) => {
    const flip = getPageFlip();
    if (!flip) return 0;
    const half = flip.getBoundsRect().pageWidth / 2;
    if (pageIndex === 0) return -half;
    if (pageIndex >= flip.getPageCount() - 1) return half;
    return 0;
  }, [getPageFlip]);
  
  // Lưu ý: react-pageflip chỉ bind lại handler khi `children` đổi (xem `pages` bên dưới),
  // nên các handler dưới đây phải ổn định và đọc trạng thái trực tiếp từ pageFlip.
  const onFlip = useCallback((e: { data: number }) => setVisualCurrentPage(e.data), []);
  
  const onInit = useCallback(() => {
    setInitCount((count) => count + 1);
    setXPosition(getCoverShift(getPageFlip()?.getCurrentPageIndex() ?? 0));
  }, [getCoverShift, getPageFlip]);
  
  const onChangeState = useCallback((e: { data: string }) => {
    const flip = getPageFlip();
    if (!flip) return;
    const current = flip.getCurrentPageIndex();
    // Mở sách từ bìa -> trả sách về giữa
    if (e.data === 'flipping' && getCoverShift(current) !== 0) setXPosition(0);
    // Lật xong / thả tay -> đồng bộ lại vị trí theo trang thực tế
    if (e.data === 'read') setXPosition(getCoverShift(current));
  }, [getCoverShift, getPageFlip]);
  
  // Lật chắc chắn (tap, swipe, phím) về bìa -> dịch sách ngay cùng lúc với animation đóng bìa
  const onFlipIntent = useCallback((direction: FlipDirection) => {
    const flip = getPageFlip();
    if (!flip) return;
    const current = flip.getCurrentPageIndex();
    const count = flip.getPageCount();
    if (direction === 'back' && current > 0 && current <= 2) setXPosition(getCoverShift(0));
    if (direction === 'forward' && current < count - 1 && current >= count - 3) setXPosition(getCoverShift(count - 1));
  }, [getCoverShift, getPageFlip]);
  
  const onInteract = useCallback(() => {
    if (getPageFlip()?.getCurrentPageIndex() === 0) dispatch(autoStartThemeSong());
  }, [dispatch, getPageFlip]);
  
  // react-pageflip dựng lại toàn bộ DOM sách mỗi khi `children` đổi tham chiếu,
  // nên mảng trang được memo hoá để re-render của DigitalAlbum (modal, vị trí sách...) không đụng tới sách.
  const pages = useMemo(() => {
    const lastPageNumber = album.tableOfContents[album.tableOfContents.length - 1].page;
    const fullTOC = [
      {
        page: 1,
        storyTitle: t('toc.preface'),
        eventDate: '0001-01-01',
      },
      ...album.tableOfContents,
      {
        page: lastPageNumber + 2,
        storyTitle: t('toc.afterword'),
        eventDate: '0001-01-01',
      }
    ];

    return [
      // --- BÌA TRƯỚC ---
      <AlbumCover
        key="front-cover"
        id="album-digital"
        side="left"
        className="cursor-pointer"
        onClick={() => {
          dispatch(autoStartThemeSong());
          getPageFlip()?.flipNext();
        }}
      >
        <div className="text-center text-white">
          <h2 className="text-5xl font-bold mb-4 drop-shadow-lg gold-foil">{album.title}</h2>
        </div>
      </AlbumCover>,

      // --- TRANG GIỚI THIỆU (CÓ FLAP) ---
      <AlbumPage
        key="start-with-flap"
        side="left"
        flap={
          <StartFrenchFlap
            avatarUrl={album.avatarUrl}
            avatarGender={album.avatarGender}
            recipients={album.recipients}
            frenchFlipNote={album.frenchFlipNote}
            frenchFlipPlace={album.frenchFlipPlace}
            savedDate={album.savedDate}
          />
        }
      >
        <div className="w-full h-full cursor-pointer"/>
      </AlbumPage>,

      <AlbumPage key="introduction-page" side="right">
        <div className="relative w-full h-full flex flex-col justify-center items-center space-y-4">
          <p className="text-4xl text-center text-stone-900 font-serif font-bold">{album.title}</p>
          <p className="text-center text-stone-600">{album.description}</p>

          <p className="absolute bottom-0 text-stone-600 text-xs text-center">
            {`© ${new Date().getFullYear()} Photostory`}
          </p>
        </div>
      </AlbumPage>,

      // Trang Mục lục
      <AlbumPage key="table-of-contents" side="left">
        <div>
          <p className="text-2xl text-center text-stone-900 font-serif font-bold mb-6">{t('toc.title')}</p>
          <div className="flex flex-col space-y-6">
            {fullTOC.map((toc) => (
              <div key={toc.page} className="flex items-center">
                {/* Cụm Tiêu đề + Ngày */}
                <div className="flex flex-col shrink-0">
                  <span
                    className="font-serif font-semibold text-stone-900 text-lg leading-tight">{toc.storyTitle}</span>
                  {toc.eventDate !== '0001-01-01' && (
                    <span className="font-sans text-[11px] text-stone-500 mt-1 tracking-wide">
                      {locale === 'vi'
                        ? format(parseISO(toc.eventDate), 'dd/MM/yyyy', {locale: vi}) // VN: 15/10/2025
                        : format(parseISO(toc.eventDate), 'MMM d, yyyy', {locale: enUS}) // EN: Oct 15, 2025
                      }
                    </span>
                  )}
                </div>

                {/* Dấu chấm nối (Leader dots) */}
                <span className="flex-1 mx-3 mb-1.25 border-b-2 border-dotted border-stone-300"></span>

                {/* Số trang */}
                <span className="font-semibold text-md text-stone-900">{toc.page}</span>
              </div>
            ))}
          </div>
        </div>
      </AlbumPage>,

      <AlbumPage key="toc-blank" side="right">
        <div className="w-full h-full cursor-pointer"></div>
      </AlbumPage>,

      <AlbumPage key="preface" number={1} side="left">
        <PrefacePiece preface={album.preface || ''}/>
      </AlbumPage>,

      <AlbumPage key="highlight" number={2} side="right">
        <HighlightImagePiece
          imageSrc="https://picsum.photos/600/600?random=5"
          orientation="square"
        />
      </AlbumPage>,

      // --- TRANG NỘI DUNG CHÍNH ---
      ...album.stories.flatMap((story, index) => [
        <AlbumPage
          key={index * 2 + 3}
          number={index * 2 + 3} side="left" header={story.title}
        >
          <div className="flex flex-col space-y-6">
            <PhotoStack
              photos={story.photos}
              interactive={false}
              onStackClick={() => setIsModalOpen(true)}
            />
            <StoryMusic storyMusicUrl={story.musicUrl}/>
            <Location locations={story.locations}/>
          </div>
        </AlbumPage>,

        <AlbumPage
          key={index * 2 + 4}
          number={index * 2 + 4}
          side="right"
          header={story.title}>
          <StoryPiece story={story}/>
        </AlbumPage>
      ]),

      // --- TRANG KẾT (CÓ FLAP) ---
      ...(album.afterword ? [
        <AlbumPage key="afterword" number={5} side="left">
          <AfterworkPiece afterword={album.afterword}/>
        </AlbumPage>
      ] : []),

      <AlbumPage key="end-with-flap" side="right" flap={<EndFrenchFlap/>}>
        <div className="w-full h-full cursor-pointer"/>
      </AlbumPage>,

      // --- BÌA SAU ---
      <AlbumCover key="back-cover" side="right"><></>
      </AlbumCover>,
    ];
  }, [album, t, locale, dispatch, getPageFlip]);

  const getAlbumStyle = (): React.CSSProperties => {
    if (isMobile) return {
      transition: 'transform 1s ease-in-out',
    };
    
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
        className={`relative z-10 flex justify-center items-center w-full max-w-4xl h-150 ${isModalOpen ? 'pointer-events-none' : ''}`}
        style={getAlbumStyle()}
        onClickCapture={(e) => {
          if (isTourOpen) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
      >
        {/* @ts-ignore */}
        <HTMLFlipBook
          key={isMobile ? 'mobile-view' : 'desktop-view'}
          ref={albumRef}
          width={400} height={550}
          size="stretch" minWidth={300} maxWidth={500} minHeight={400} maxHeight={600}
          drawShadow={true} flippingTime={750}
          usePortrait={isMobile} startZIndex={0} autoSize={true} maxShadowOpacity={0.1}
          showCover={true}
          onFlip={onFlip} onInit={onInit} onChangeState={onChangeState}
          // Input do FlipInputLayer xử lý: chỉ vùng mép trang mới kéo/lật được
          useMouseEvents={false}
          style={{margin: '0 auto'}}
        >
          {pages}
        </HTMLFlipBook>
        
        <FlipInputLayer
          getPageFlip={getPageFlip}
          layoutKey={`${initCount}-${visualCurrentPage}`}
          disabled={isTourOpen || isModalOpen}
          onInteract={onInteract}
          onFlipIntent={onFlipIntent}
        />
      </div>
      
      {/* --- MODAL --- */}
      {
        mounted && (
          <AlbumPhotoModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            photos={album.stories[0].photos}
          />
        )
      }
    </div>
  );
};

export default DigitalAlbum;