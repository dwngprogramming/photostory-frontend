"use client";

import React, {useEffect, useState} from 'react';
import {AlertCircle, Book, CheckCircle, PackageOpen, Sparkles, X} from 'lucide-react';
import FloatingDecorations from '@/components/Application/Guest/UnwrapAlbum/FloatingDecorations';
import ThemeToggle from '@/components/Common/ThemeToggle';
import Link from "next/link";
import {useTranslations} from "next-intl";
import {UnwrapPhase} from "@/types";
import {motion} from 'framer-motion';
import {useTheme} from "next-themes";
import {useRouter} from "next/navigation";
import Curtains from "@/components/Application/Showtime/Curtains";
import {useGetShowtimeData} from "@/hooks/api/useAlbums";

const UnwrapAlbum = () => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [phase, setPhase] = useState<UnwrapPhase>(UnwrapPhase.IDLE);
  const tCommon = useTranslations('Common');
  const t = useTranslations('App.Guest.unwrap');
  const {resolvedTheme} = useTheme();
  const navigation = useRouter();
  const {data: showtime, isLoading} = useGetShowtimeData(code);
  
  const clearCode = () => {
    setCode('');
  };
  
  const startUnwrap = () => {
    if (phase === UnwrapPhase.IDLE && status !== 'loading') {
      setPhase(UnwrapPhase.LOADING); // Chỉ cần set phase, phần còn lại để useEffect lo
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') startUnwrap();
  };
  
  // useEffect xử lý logic chính (Chia làm 2 luồng rõ ràng)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // --- CASE A: Đang Loading (Check Code) ---
    if (phase === UnwrapPhase.LOADING) {
      timer = setTimeout(() => {
        // Logic check code nằm ở đây
        if (code.trim().toUpperCase() === 'FROM-DUNGPHAM-WITH-LOVE') {
          // Code đúng -> Chuyển sang đóng màn
          setPhase(UnwrapPhase.CURTAIN_CLOSE);
        } else {
          // Code sai -> Báo lỗi & Reset
          setStatus('error');
          setMessage("Invalid code. Please try again.");
          setPhase(UnwrapPhase.IDLE);
        }
      }, 1500);
    }
    
    // --- CASE B: Đang Đóng màn (Redirect) ---
    else if (phase === UnwrapPhase.CURTAIN_CLOSE) {
      timer = setTimeout(() => {
        // Animation xong -> Chuyển trang
        const response = { albumId: "mock-album-id-123", tokenView: "123456" };
        const queryParams = new URLSearchParams();
        queryParams.set('token', response.tokenView);
        
        navigation.push(`/showtime/${response.albumId}?${queryParams}`);
      }, 1100);
    }
    
    // Cleanup chung cho cả 2 trường hợp
    return () => clearTimeout(timer);
    
  }, [phase, code, navigation]);
  
  return (
    <>
      <motion.div
        className="absolute inset-0 z-0"
        animate={phase === UnwrapPhase.CURTAIN_CLOSE ? {
          filter: resolvedTheme === 'dark' ? "brightness(0.4) blur(6px)" : "brightness(0.9) blur(4px)",
          scale: 0.98
        } : {
          filter: "brightness(1) blur(0px)",
          scale: 1
        }}
        transition={{duration: 1, ease: "easeInOut"}}
      >
        <div
          className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 transition-colors duration-500">
          
          {/* DECORATIVE BACKGROUND LAYER */}
          <FloatingDecorations/>
          
          <div className="fixed top-6 right-6 z-50">
            <ThemeToggle/>
          </div>
          
          {/* Main Content */}
          <div
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12 md:px-12 lg:px-20">
            <div className="w-full max-w-2xl space-y-8 animate-fade-in-up">
              
              {/* Header Section */}
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="relative group cursor-default">
                    <div
                      className="absolute inset-0 bg-amber-400/20 dark:bg-amber-600/20 blur-2xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-700"></div>
                    <Link href="/public" className="flex items-center gap-2">
                      <Book className="w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 text-amber-500"/>
                      <span
                        className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif text-stone-800 dark:text-stone-100">
                      Photostory
                    </span>
                    </Link>
                  </div>
                </div>
                
                <h1
                  className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-stone-800 dark:text-stone-100 text-center mb-4 leading-tight">
                  {t('title')}
                </h1>
                
                <p
                  className="font-sans text-md md:text-lg text-stone-600 dark:text-stone-300 text-center max-w-xl mx-auto mb-8 leading-relaxed">
                  {t('description')}
                </p>
              </div>
              
              {/* Input Section */}
              <div className="w-full max-w-lg mx-auto space-y-6">
                
                <div className="relative group">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      if (status !== 'loading') setStatus('idle');
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={`${t('enterCode')}`}
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full h-12 md:h-14 px-6 md:px-8 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-2 border-stone-200 dark:border-stone-700 rounded-2xl font-sans text-md md:text-lg text-stone-800 dark:text-stone-100 text-center placeholder:text-stone-400 dark:placeholder:text-stone-500 placeholder:uppercase placeholder:tracking-wide focus:outline-none focus:border-amber-400 dark:focus:border-amber-600 focus:ring-4 focus:ring-amber-100/50 dark:focus:ring-amber-900/30 shadow-lg dark:shadow-dark disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 ease-out"
                  />
                  
                  {code && phase === UnwrapPhase.IDLE && (
                    <button
                      onClick={clearCode}
                      className="absolute opacity-80 right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all flex items-center justify-center"
                    >
                      <X className="w-4 h-4"/>
                    </button>
                  )}
                </div>
                
                {/* Status Messages */}
                {status === 'success' && (
                  <div
                    className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 flex items-center gap-3 text-green-700 dark:text-green-300 animate-fade-in-up">
                    <CheckCircle className="w-5 h-5 flex-shrink-0"/>
                    <p className="text-sm md:text-base font-medium">{message}</p>
                  </div>
                )}
                
                {status === 'error' && (
                  <div
                    className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 flex items-center gap-3 text-red-700 dark:text-red-300 animate-shake">
                    <AlertCircle className="w-5 h-5 flex-shrink-0"/>
                    <p className="text-sm md:text-base font-medium">{message}</p>
                  </div>
                )}
                
                <p className="text-sm text-stone-500 dark:text-stone-400 text-center animate-fade-in">
                  {t('example')}: <span
                  className="font-mono bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded">FROM-DUNGPHAM-WITH-LOVE</span>
                </p>
                
                <button
                  onClick={startUnwrap}
                  disabled={phase !== UnwrapPhase.IDLE}
                  className="w-full h-12 md:h-14 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-sans font-semibold text-lg md:text-xl rounded-2xl shadow-lg hover:shadow-soft-lg dark:hover:shadow-dark-lg transition-all duration-200 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {
                    phase === UnwrapPhase.LOADING ?
                      (<>
                        <div
                          className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {t('unwrapping')}
                      </>) : (
                        phase === UnwrapPhase.CURTAIN_CLOSE ? (<>
                          <PackageOpen className="w-5 h-5"/>
                          {t('albumReady')}
                        </>) : (<>
                            <Sparkles className="w-5 h-5"/>
                            {t('submit')}
                          </>
                        )
                      )
                  }
                </button>
                
                <p className="text-center text-sm md:text-base text-stone-600 dark:text-stone-300">
                  {t('createNew')}
                  <Link href="#"
                        className="ml-1 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium underline underline-offset-4 transition-colors">
                    {t('signup')}
                  </Link>
                </p>
              
              </div>
              
              {/* Info Section */}
              <div className="w-full max-w-2xl mt-4 md:mt-6">
                <div
                  className="flex items-center justify-center gap-2 mt-6 text-center text-stone-500 dark:text-stone-400 text-sm opacity-80 hover:opacity-100 transition-opacity">
                  {tCommon('copyright', {year: new Date().getFullYear()})}
                </div>
              
              </div>
            
            </div>
          </div>
        
        </div>
      </motion.div>
      
      {/* Layer 1: Curtains (Handles closing animation over the UI) */}
      <Curtains phase={phase}/>
    </>
  );
};

export default UnwrapAlbum;