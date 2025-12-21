import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UnwrapPhase } from '@/types';

interface IntroTextProps {
  phase: UnwrapPhase;
}

const IntroText: React.FC<IntroTextProps> = ({ phase }) => {
  const showText = phase === UnwrapPhase.INTRO_TEXT;
  
  return (
    <AnimatePresence>
      {showText && (
        <div className="absolute inset-0 flex items-center justify-center z-[100] pointer-events-none p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)"
            }}
            exit={{
              opacity: 0,
              scale: 1.1,
              filter: "blur(10px)",
              transition: { duration: 0.8 }
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/*
              Text Styling:
              Light Mode: Darker gradients (amber-700 to amber-900) for contrast against stone-200
              Dark Mode: Lighter gradients (amber-200 to amber-100) for glow against stone-950
            */}
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-900 to-amber-700 dark:from-amber-200 dark:via-amber-100 dark:to-amber-200 drop-shadow-sm dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-wide leading-tight">
              Here is an album
              <br />
              <span className="text-2xl md:text-4xl font-normal text-amber-800/90 dark:text-amber-400/90 mt-2 block">
                by your love, Dung Pham
              </span>
            </h1>
            
            <motion.div
              className="mt-6 h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-600 dark:via-amber-500 to-transparent mx-auto"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 100, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default IntroText;