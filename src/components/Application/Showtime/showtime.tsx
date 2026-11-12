'use client';

import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {AlbumResponse, UnwrapPhase} from "@/types";
import {AnimatePresence, motion} from "framer-motion";
import ThemeToggle from "@/components/Common/ThemeToggle";
import DigitalAlbum from "@/components/Application/Showtime/DigitalAlbum";
import Curtains from "@/components/Application/Showtime/Curtains";
import IntroText from "@/components/Application/Showtime/IntroText";
import FloatingIcons from "@/components/Application/Showtime/FloatingIcons";
import RibbonEffects from "@/components/Application/Showtime/RibbonEffect";
import {X} from "lucide-react";
import Logo from "@/components/Common/Logo";
import {useTranslations} from "next-intl";
import {useGetPermissionAlbum, useGetPublicAlbum} from "@/hooks/api/useAlbums";
import PreparingAlbum from "@/components/Application/Showtime/PreparingAlbum";
import GlassPlayer from "@/components/Application/Showtime/Album/Plugin/GlassPlayer";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hook";
import {resetAudio} from "@/libs/redux/features/audioSlice";
import {toast} from "sonner";

interface ShowtimeProps {
  // Xem thử: dùng album có sẵn, bỏ qua kiểm tra mã/phiên; onExitPreview hiện nút thoát
  previewAlbum?: AlbumResponse;
  onExitPreview?: () => void;
}

export default function Showtime({previewAlbum, onExitPreview}: ShowtimeProps = {}) {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [phase, setPhase] = useState<UnwrapPhase>(UnwrapPhase.PREPARING_ALBUM);
  const t = useTranslations('Common');
  const id = params.id as string;
  const key = searchParams.get("key")?.toString();
  const {token} = useAppSelector(state => state.permissionResource);
  const dispatch = useAppDispatch();
  const startTimeRef = useRef(Date.now());
  
  // Rời khỏi album thì dừng nhạc (player nằm ở layout gốc nên không tự tắt theo trang)
  useEffect(() => () => {
    dispatch(resetAudio());
  }, [dispatch]);
  
  const {data: publicAlbum, isError: isPublicError, isLoading: isPublicLoading} = useGetPublicAlbum(key);
  const {data: permissionAlbum, isError: isPermissionError, isLoading: isPermissionLoading} = useGetPermissionAlbum(id);
  
  const isLoading = isPublicLoading || isPermissionLoading;
  const isError = isPublicError || isPermissionError;
  const album = previewAlbum ?? publicAlbum ?? permissionAlbum ?? null;
  
  const isValidPublic = !!(key && publicAlbum);
  const isValidPrivate = !!(id && token && permissionAlbum);
  
  useEffect(() => {
    if (previewAlbum) return;
    if (!isLoading && !isError && !isValidPublic && !isValidPrivate) {
      if (!key && !(id && token)) {
        toast.error(t('cannotAccess'));
      }
      router.replace('/demo/unwrap');
    }
  }, [previewAlbum, isLoading, isError, isValidPublic, isValidPrivate, router]);
  
  // Validate album existence (In PREPARING_ALBUM phase)
  useEffect(() => {
    if (phase !== UnwrapPhase.PREPARING_ALBUM) return;
    
    if (isError) {
      router.replace('/demo/unwrap');
      return;
    }

    if (isLoading || !album) return;
    
    const now = Date.now();
    const timeElapsed = now - startTimeRef.current;
    const minTime = 2000;
    const remainingDelay = Math.max(0, minTime - timeElapsed);
    
    const timer = setTimeout(() => {
      // Re-check phase để đảm bảo không nhảy phase sai nếu user đã điều hướng đi chỗ khác
      setPhase(UnwrapPhase.SILENCE);
    }, remainingDelay);
    
    return () => clearTimeout(timer);
  }, [phase, isLoading, album, isError, router]);
  
  // SILENCE -> INTRO
  useEffect(() => {
    if (phase === UnwrapPhase.SILENCE) {
      const timer = setTimeout(() => {
        setPhase(UnwrapPhase.INTRO_TEXT);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase]);
  
  useEffect(() => {
    if (phase === UnwrapPhase.PREPARING_ALBUM || phase === UnwrapPhase.SILENCE) return;
    
    let timer: ReturnType<typeof setTimeout>;
    
    if (phase === UnwrapPhase.INTRO_TEXT) {
      // Phase New -> 3: Intro Text (Display for ~3.5s total to give ample reading time)
      timer = setTimeout(() => {
        setPhase(UnwrapPhase.ICONS_FLOAT);
      }, 3500);
    } else if (phase === UnwrapPhase.ICONS_FLOAT) {
      // Phase 3 -> 4: Icons Float (0.5s duration)
      // Slight delay to let the user settle into the "darkness" before magic starts
      timer = setTimeout(() => {
        setPhase(UnwrapPhase.RIBBON_EXPAND);
      }, 500);
    } else if (phase === UnwrapPhase.RIBBON_EXPAND) {
      // Phase 4 -> 5: Ribbon Expand (2s animation duration)
      timer = setTimeout(() => {
        setPhase(UnwrapPhase.VERTICAL_SPLIT);
      }, 2000);
    } else if (phase === UnwrapPhase.VERTICAL_SPLIT) {
      // Phase 5 -> 6: Vertical Line (1.75s animation duration)
      // Pause for effect (2600ms)
      timer = setTimeout(() => {
        setPhase(UnwrapPhase.CURTAIN_OPEN);
      }, 2600);
    } else if (phase === UnwrapPhase.CURTAIN_OPEN) {
      // Phase 6 -> 7: Reveal (1s duration)
      timer = setTimeout(() => {
        setPhase(UnwrapPhase.REVEALED);
      }, 1000);
    }
    
    return () => clearTimeout(timer);
  }, [phase]);
  
  // Only show the theme toggle when the reveal is happening or finished
  const showToggleAndLogo = phase === UnwrapPhase.CURTAIN_OPEN || phase === UnwrapPhase.REVEALED;
  
  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-stone-100 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 transition-colors duration-500">
      {previewAlbum && onExitPreview && <PreviewBadge onExit={onExitPreview}/>}
      {/* --- LAYER: Màn hình kiểm tra --- */}
      {phase === UnwrapPhase.PREPARING_ALBUM && (
        <PreparingAlbum phase={phase}/>
      )}
      
      {/* LAYER 0: The Scene (Revealed at end) */}
      {album && phase !== UnwrapPhase.PREPARING_ALBUM && phase !== UnwrapPhase.SILENCE &&
          <DigitalAlbum
              album={album}
              phase={phase}
          />
      }
      
      {album && phase !== UnwrapPhase.PREPARING_ALBUM && phase !== UnwrapPhase.SILENCE && (
        <>
          {/* LAYER 1: The Curtains (Starts closed, then opens) */}
          <Curtains phase={phase}/>
          
          {/* LAYER 2: Intro Text (New Phase) */}
          <IntroText
            phase={phase}
            owner={album.ownerName}
            relationship={t('relationship.lover')}
            customRelationship={album.customRelationship}
            customRelationshipLocale={album.customRelationshipLocale}
          />
          
          {/* LAYER 3: Floating Icons */}
          <FloatingIcons phase={phase}/>
          
          {/* LAYER 4: Ribbon & Split Line */}
          <RibbonEffects phase={phase}/>
          
          {/* Theme Toggle - Only visible after reveal */}
          <AnimatePresence>
            {showToggleAndLogo && (
              <>
                <motion.div
                  id="theme-toggle"
                  className="absolute top-4 right-6 z-100"
                  initial={{opacity: 0, scale: 0.8}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.8}}
                  transition={{duration: 0.5, delay: 1}}
                >
                  <ThemeToggle/>
                </motion.div>
                
                <motion.div
                  id="theme-music-player"
                  className="absolute top-16 md:top-3 left-1/2 -translate-x-1/2 z-[100]"
                  initial={{opacity: 0, scale: 0.8}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.8}}
                  transition={{duration: 0.5, delay: 1}}
                >
                  <GlassPlayer
                    size="sm"
                    isThemeMusic
                    musicUrl="https://soundcloud.com/mikeysahara/ng-i-u-ti-n-juky-san-ft-b-i-tr"
                  />
                </motion.div>
                
                <motion.div
                  className="absolute top-4 left-6 z-100"
                  initial={{opacity: 0, scale: 0.8}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.8}}
                  transition={{duration: 0.5, delay: 1}}
                >
                  <Logo variant="dark" className="h-8 w-auto"/>
                </motion.div>
                
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-100"
                  initial={{opacity: 0, scale: 0.8}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.8}}
                  transition={{duration: 0.5, delay: 1}}
                >
                  <p className="text-stone-300 dark:text-stone-400 text-sm">
                    {t('copyright', {year: new Date().getFullYear()})}
                  </p>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

const PreviewBadge = ({onExit}: { onExit: () => void }) => {
  const t = useTranslations('App.Showtime.preview');
  return (
    <div className="absolute bottom-4 left-4 md:left-6 z-[110] flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md text-stone-100 text-sm shadow-lg">
      <span>{t('badge')}</span>
      <button
        type="button"
        onClick={onExit}
        className="flex items-center gap-1 h-8 px-3 rounded-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        <X className="w-4 h-4"/>
        {t('exit')}
      </button>
    </div>
  );
};
