"use client"

import React, {useEffect, useRef, useState, useTransition} from "react";
import {useRouter} from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";

const LANGUAGES = [
  {locale: "vi", label: "Tiếng Việt", short: "VI", flag: "🇻🇳"},
  {locale: "en", label: "English", short: "EN", flag: "🇺🇸"},
];

const LanguageToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [currentLocale, setCurrentLocale] = useState("vi");

  useEffect(() => {
    // Determine locale directly from window location due to root provider setup
    const path = window.location.pathname;
    const localeFromPath = path.split('/')[1];
    if (LANGUAGES.some(l => l.locale === localeFromPath)) {
      setCurrentLocale(localeFromPath);
    }
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectLocale = (nextLocale: string) => {
    if (nextLocale === currentLocale) {
      setIsOpen(false);
      return;
    }
    setIsOpen(false);
    
    // Optimistic update
    setCurrentLocale(nextLocale);
    
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    const segments = currentPath.split('/');
    
    if (LANGUAGES.some(l => l.locale === segments[1])) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }
    
    const newPath = segments.join('/') + currentSearch;
    
    startTransition(() => {
      router.push(newPath);
      router.refresh();
    });
  };

  const current = LANGUAGES.find((l) => l.locale === currentLocale) ?? LANGUAGES[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`h-10 px-3 cursor-pointer rounded-lg bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-600 transition-all duration-200 flex items-center justify-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-expanded={isOpen}
      >
        <span className="text-base leading-none" style={{ fontFamily: '"Twemoji Mozilla", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", sans-serif' }}>{current.flag}</span>
        <span className="text-sm font-bold">{current.short}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0, y: -6, scale: 0.97}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: -6, scale: 0.97}}
            transition={{duration: 0.15, ease: "easeOut"}}
            className="absolute right-0 mt-2 w-40 rounded-xl bg-white dark:bg-stone-800 shadow-lg ring-1 ring-stone-200 dark:ring-stone-700 overflow-hidden z-50 origin-top-right"
          >
            <div className="py-1">
              {LANGUAGES.map((lang) => {
                const isActive = lang.locale === currentLocale;
                return (
                  <button
                    key={lang.locale}
                    onClick={() => selectLocale(lang.locale)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-150 ${
                      isActive
                        ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 font-medium"
                        : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700"
                    }`}
                  >
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageToggle;
