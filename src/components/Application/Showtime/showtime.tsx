'use client';

import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {UnwrapPhase} from "@/types";
import {AnimatePresence, motion} from "framer-motion";
import ThemeToggle from "@/components/Common/ThemeToggle";
import DigitalAlbum from "@/components/Application/Showtime/DigitalAlbum";
import Curtains from "@/components/Application/Showtime/Curtains";
import IntroText from "@/components/Application/Showtime/IntroText";
import FloatingIcons from "@/components/Application/Showtime/FloatingIcons";
import RibbonEffects from "@/components/Application/Showtime/RibbonEffect";
import {Book} from "lucide-react";
import {useTranslations} from "next-intl";
import {useGetAlbumById} from "@/hooks/api/useAlbums";
import PreparingAlbum from "@/components/Application/Showtime/PreparingAlbum";

export default function Showtime() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [phase, setPhase] = useState<UnwrapPhase>(UnwrapPhase.PREPARING_ALBUM);
  const t = useTranslations('Common');
  const id = params.id as string;
  const token = searchParams.get('token') as string;
  const startTimeRef = useRef(Date.now());
  const {data: album, isError, isLoading} = useGetAlbumById(id);
  
  // Validate album existence (In PREPARING_ALBUM phase)
  useEffect(() => {
    if (phase !== UnwrapPhase.PREPARING_ALBUM) return;
    
    if (isError || (!id || !token)) {
      router.replace('/unwrap');
      return;
    }
    
    const checkReady = () => {
      const now = Date.now();
      const timeElapsed = now - startTimeRef.current;
      const minTime = 2000; // Tối thiểu 2 giây loading
      
      if (timeElapsed >= minTime && !isLoading && album) {
        setPhase(UnwrapPhase.SILENCE);
      } else {
        if (!isLoading && album) {
          // Data xong nhưng chưa đủ giờ -> Set timeout bù giờ
          setTimeout(() => setPhase(UnwrapPhase.SILENCE), minTime - timeElapsed);
        }
      }
    };
    
    checkReady();
  }, [phase, isLoading, album, isError, id, token, router]);
  
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
      // Phase New -> 3: Intro Text (Display for ~2.5s total to give ample reading time)
      timer = setTimeout(() => {
        setPhase(UnwrapPhase.ICONS_FLOAT);
      }, 2500);
    } else if (phase === UnwrapPhase.ICONS_FLOAT) {
      // Phase 3 -> 4: Icons Float (0.5s duration)
      // Slight delay to let the user settle into the "darkness" before magic starts
      timer = setTimeout(() => {
        setPhase(UnwrapPhase.RIBBON_EXPAND);
      }, 500);
    } else if (phase === UnwrapPhase.RIBBON_EXPAND) {
      // Phase 4 -> 5: Ribbon Expand (1.75s animation duration)
      timer = setTimeout(() => {
        setPhase(UnwrapPhase.VERTICAL_SPLIT);
      }, 1950);
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
      
      {phase !== UnwrapPhase.PREPARING_ALBUM && phase !== UnwrapPhase.SILENCE && (
        <>
          {/* LAYER 1: The Curtains (Starts closed, then opens) */}
          <Curtains phase={phase}/>
          
          {/* LAYER 2: Intro Text (New Phase) */}
          <IntroText phase={phase}/>
          
          {/* LAYER 3: Floating Icons */}
          <FloatingIcons phase={phase}/>
          
          {/* LAYER 4: Ribbon & Split Line */}
          <RibbonEffects phase={phase}/>
          
          {/* Theme Toggle - Only visible after reveal */}
          <AnimatePresence>
            {showToggleAndLogo && (
              <>
                <motion.div
                  className="absolute top-6 right-6 z-100"
                  initial={{opacity: 0, scale: 0.8}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.8}}
                  transition={{duration: 0.5, delay: 1}}
                >
                  <ThemeToggle/>
                </motion.div>
                
                <motion.div
                  className="absolute top-6 left-6 z-100"
                  initial={{opacity: 0, scale: 0.8}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.8}}
                  transition={{duration: 0.5, delay: 1}}
                >
                  <div className="flex items-center gap-2">
                    <Book className="w-8 h-8 text-amber-500"/>
                    <span className="text-xl font-bold text-white dark:text-stone-200 font-serif">Photostory</span>
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-100"
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