import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {useAppDispatch, useAppSelector} from "@/libs/redux/hook";
import {playThemeSong} from "@/libs/redux/features/audioSlice";

interface DigitalAlbumProps {
  album: AlbumResponse;
  phase: UnwrapPhase;
}

const DigitalAlbum = ({album, phase}: DigitalAlbumProps) => {
  // Đổi tên ref cho chuẩn
  const t = useTranslations("App.Showtime.album");
  const albumRef = useRef<any>(null);
  
  const [visualCurrentPage, setVisualCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [xPosition, setXPosition] = useState(-200);
  const [mounted, setMounted] = useState(false);
  
  const isMobile = useIsMobile();
  const {startTour} = useAlbumTour();
  const locale = useLocale();
  const lastChapter = album.tableOfContents[album.tableOfContents.length - 1];
  const lastPageNumber = lastChapter.page;
  const dispatch = useAppDispatch();
  const {isThemeSongPlayed, currentUrl} = useAppSelector(state => state.audio);
  
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
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (phase === UnwrapPhase.REVEALED && albumRef.current) startTour();
  }, [phase]);
  
  const onFlip = useCallback((e: any) => setVisualCurrentPage(e.data), []);
  
  useEffect(() => {
    console.log('Visual Current Page:', visualCurrentPage);
    console.log('Total Pages:', totalPages);
    console.log('Index', totalPages - 1);
  }, [visualCurrentPage, totalPages]);
  
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
    if (isMobile) return {transition: 'transform 1s ease-in-out'};
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
      >
        {/* @ts-ignore */}
        <HTMLFlipBook
          key={isMobile ? 'mobile-view' : 'desktop-view'}
          ref={albumRef}
          width={400} height={550}
          size="stretch" minWidth={300} maxWidth={500} minHeight={400} maxHeight={600}
          drawShadow={true} flippingTime={750}
          usePortrait={isMobile} startZIndex={0} autoSize={true} maxShadowOpacity={0.1}
          showCover={true} mobileScrollSupport={true}
          onFlip={onFlip} onInit={onInit} onChangeState={onChangeState}
          style={{margin: '0 auto'}}
        >
          {/* --- BÌA TRƯỚC --- */}
          <AlbumCover side="left" onClick={() => {
            if (isThemeSongPlayed) return;
            else {
              dispatch(playThemeSong());
            }
          }}>
            <div className="text-center text-white">
              <h2 className="text-5xl font-bold mb-4 drop-shadow-lg gold-foil">{album.title}</h2>
            </div>
          </AlbumCover>
          
          {/* --- TRANG GIỚI THIỆU (CÓ FLAP) --- */}
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
            onCloseCover={handleCloseFromFrontCover}
          >
            <div className="w-full h-full cursor-pointer"/>
          </AlbumPage>
          
          <AlbumPage
            key="introduction-page"
            side="right"
          >
            <div className="relative w-full h-full flex flex-col justify-center items-center space-y-4">
              <p className="text-4xl text-center text-stone-900 font-serif font-bold">{album.title}</p>
              <p className="text-center text-stone-600">{album.description}</p>
              
              <p className="absolute bottom-0 text-stone-600 text-xs text-center">
                {`© ${new Date().getFullYear()} Photostory`}
              </p>
            </div>
          </AlbumPage>
          
          {/* Trang Mục lục */}
          <AlbumPage side="left" key="table-of-contents">
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
          </AlbumPage>
          
          <AlbumPage side="right">
            <div className="w-full h-full cursor-pointer"></div>
          </AlbumPage>
          
          <AlbumPage number={1} side="left">
            <PrefacePiece preface={album.preface || ''}/>
          </AlbumPage>
          
          <AlbumPage number={2} side="right">
            <HighlightImagePiece
              imageSrc="https://picsum.photos/600/600?random=5"
              orientation="square"
            />
          </AlbumPage>
          
          {/* --- TRANG NỘI DUNG CHÍNH --- */}
          {album.stories.map((story, index) => [
              <AlbumPage
                key={index * 2 + 3}
                number={index * 2 + 3} side="left" header={story.title}
                isInteractive={!isModalOpen}
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
          ])}
          
          {/* --- TRANG KẾT (CÓ FLAP) --- */}
          {album.afterword && (
            <AlbumPage number={5} side="left">
              <AfterworkPiece afterword={album.afterword}/>
            </AlbumPage>
          )}
          
          <AlbumPage
            side="right"
            flap={<EndFrenchFlap/>}
            onCloseCover={handleCloseFromBackCover}
          >
            <div className="w-full h-full cursor-pointer"/>
          </AlbumPage>
          
          {/* --- BÌA SAU --- */}
          <AlbumCover side="right"><></>
          </AlbumCover>
        
        </HTMLFlipBook>
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