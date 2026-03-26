"use client";

import React, {useEffect, useRef, useState} from 'react';
import {Book, PackageOpen, Sparkles, X} from 'lucide-react';
import FloatingDecorations from '@/components/Application/AlbumPermission/Guest/UnwrapAlbum/FloatingDecorations';
import ThemeToggle from '@/components/Common/ThemeToggle';
import Link from "next/link";
import {useTranslations} from "next-intl";
import {SharingResponse, UnwrapPhase} from "@/types";
import {motion} from 'framer-motion';
import {useTheme} from "next-themes";
import {useRouter} from "next/navigation";
import Curtains from "@/components/Application/Showtime/Curtains";
import {useGetUnwrapAlbum, useUnwrapAlbumWithPin} from "@/hooks/api/useAlbums";
import {toast} from "sonner";
import PinInputModal from "@/components/Application/AlbumPermission/Guest/UnwrapAlbum/PinInputModal";
import {useQueryClient} from "@tanstack/react-query";
import {useAppDispatch} from "@/libs/redux/hook";
import {setPermissionResource} from "@/libs/redux/features/permissionResourceSlice";

const UnwrapAlbum = () => {
  const [code, setCode] = useState('');
  const [submittedCode, setSubmittedCode] = useState('');
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [phase, setPhase] = useState<UnwrapPhase>(UnwrapPhase.IDLE);
  const tCommon = useTranslations('Common');
  const t = useTranslations('App.Guest.unwrap');
  const {resolvedTheme} = useTheme();
  const navigation = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  
  const {
    data: checkData,
    isLoading: isCheckingCode,
    isError: isCheckError
  } = useGetUnwrapAlbum(submittedCode, {
    enabled: !!submittedCode && phase === UnwrapPhase.LOADING && !isPinModalOpen,
    retry: false
  });
  
  const {
    mutate: verifyPin,
    isPending: isVerifyingPin
  } = useUnwrapAlbumWithPin({
    // Xử lý kết quả ngay tại đây, không cần useEffect
    onSuccess: (data: SharingResponse) => handleSuccess(data)
    // Error handle in axios interceptor
  });
  
  const startTime = useRef<number>(0);
  
  const clearCode = () => {
    setCode('');
  };
  
  const startUnwrap = () => {
    if (!code.trim()) {
      toast.error(t('notEmpty', {code: "Code"}));
      return;
    }
    const cleanCode = code.trim();
    queryClient.removeQueries({queryKey: ['unwrap-album-if-public', cleanCode]});
    
    setSubmittedCode(cleanCode);
    setPhase(UnwrapPhase.LOADING);
    startTime.current = Date.now();
  };
  
  const handlePinSubmit = (pin: string) => {
    startTime.current = Date.now();
    verifyPin({code: submittedCode, pin});
  };
  
  // Kiểm tra code và Album là Public
  useEffect(() => {
    if (phase !== UnwrapPhase.LOADING) return;
    
    if (isCheckingCode) return;
    
    if (!isCheckingCode && checkData) {
      if (checkData.requiredPin) {
        setPhase(UnwrapPhase.IDLE);
        setIsPinModalOpen(true);
      } else {
        handleSuccess(checkData);
      }
    } else if (isCheckError) {
      setPhase(UnwrapPhase.IDLE);
      setSubmittedCode('');
    }
  }, [phase, checkData, isCheckingCode, isCheckError]);
  
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const loadingDataAndAnimation = async (data: SharingResponse) => {
    // Xử lý chung cho cả Code (Public) và PIN (Private)
    const timeElapsed = Date.now() - startTime.current;
    const loadingDelay = Math.max(0, 1000 - timeElapsed);
    
    await delay(loadingDelay);
    
    // After waiting, close pin modal if open
    setIsPinModalOpen(false);
    
    const isPublicValid = !!data?.publicSharingKey;
    const isPrivateValid = !!(data?.resourceId && data?.token);
    
    // Verify data (not Public and not Private => Error)
    if (!isPublicValid && !isPrivateValid) {
      toast.error(t('unexpectedError'));
      setPhase(UnwrapPhase.IDLE);
      setSubmittedCode('');
      return;
    }
    
    // 4. Bắt đầu đóng màn
    setPhase(UnwrapPhase.CURTAIN_CLOSE);
    
    // Animation: Curtain Close (1.1s)
    await delay(1100);
  }
  
  const handleSuccess = async (data: SharingResponse) => {
    if (data) {
      if (data.publicSharingKey) await handlePublicAccess(data);
      else await handlePermissionAccess(data);
    }
  };
  
  const handlePublicAccess = async (data: SharingResponse) => {
    await loadingDataAndAnimation(data);
    const queryParams = new URLSearchParams({key: data.publicSharingKey || ''});
    navigation.push(`/showtime?${queryParams.toString()}`);
  }
  
  const handlePermissionAccess = async (data: SharingResponse) => {
    await loadingDataAndAnimation(data);
    if (data) {
      dispatch(setPermissionResource({
        resourceId: data.resourceId || '',
        type: data.type || null,
        token: data.token || '',
        exp: data.exp || -1
      }))
    }
    navigation.push(`/showtime/${data.resourceId}`);
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') startUnwrap();
  };
  
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
                    min={5}
                    max={20}
                    onChange={(e) => {
                      setCode(e.target.value);
                      if (phase !== UnwrapPhase.LOADING) setPhase(UnwrapPhase.IDLE);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={`${t('enterCode')}`}
                    disabled={phase !== UnwrapPhase.IDLE}
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
                
                <p className="text-sm text-stone-500 dark:text-stone-400 text-center animate-fade-in">
                  {t('example')}: <span
                  className="font-mono bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded">FROM-DUNGPHAM-WITH-LOVE</span>
                  Password (Private Album): <span className="font-mono bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded">123456</span>
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
      
      <PinInputModal
        isOpen={isPinModalOpen}
        isLoading={isVerifyingPin}
        onClose={() => setIsPinModalOpen(false)}
        onSubmit={handlePinSubmit}
      />
      
      {/* Layer 1: Curtains (Handles closing animation over the UI) */}
      <Curtains phase={phase}/>
    </>
  );
};

export default UnwrapAlbum;