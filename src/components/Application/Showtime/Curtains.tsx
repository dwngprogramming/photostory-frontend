import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UnwrapPhase } from '@/types';

interface CurtainsProps {
  phase: UnwrapPhase;
}

const Curtains: React.FC<CurtainsProps> = ({ phase }) => {
  const isClosing = phase === UnwrapPhase.CURTAIN_CLOSE;
  
  // In ShowPage, we start at INTRO_TEXT, so curtains must be fully closed immediately.
  const isFullyClosed = [
    UnwrapPhase.INTRO_TEXT,
    UnwrapPhase.ICONS_FLOAT,
    UnwrapPhase.RIBBON_EXPAND,
    UnwrapPhase.VERTICAL_SPLIT
  ].includes(phase);
  
  const isOpening = phase === UnwrapPhase.CURTAIN_OPEN;
  const isRevealed = phase === UnwrapPhase.REVEALED;
  
  // Don't render anything if revealed fully (clean up DOM)
  if (isRevealed) return null;
  
  return (
    <>
      {/*
        PHASE 2: Top and Bottom Curtains Closing (Used in UnwrapPage)
        Updated to support light/dark mode:
        - Light: bg-stone-200, subtle borders/shadows
        - Dark: bg-stone-950, glowing borders/deep shadows
      */}
      <AnimatePresence>
        {isClosing && (
          <>
            {/* Top Curtain */}
            <motion.div
              className="fixed top-0 left-0 w-full h-[50vh] bg-stone-200 dark:bg-stone-950 z-[60] border-b-2 border-amber-600/20 dark:border-amber-500/30 shadow-2xl shadow-stone-400/30 dark:shadow-black/50"
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            {/* Bottom Curtain */}
            <motion.div
              className="fixed bottom-0 left-0 w-full h-[50vh] bg-stone-200 dark:bg-stone-950 z-[60] border-t-2 border-amber-600/20 dark:border-amber-500/30 shadow-2xl shadow-stone-400/30 dark:shadow-black/50"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </>
        )}
      </AnimatePresence>
      
      {/*
        PHASE 3-6: Left and Right Panels (Used in ShowPage)
        These start fully closed to match the end state of UnwrapPage.
      */}
      {(isFullyClosed || isOpening) && (
        <>
          {/* Left Panel */}
          <motion.div
            className="fixed top-0 left-0 w-1/2 h-full bg-stone-200 dark:bg-stone-950 z-[60]"
            initial={{ x: "0%" }}
            animate={isOpening ? { x: "-100%" } : { x: "0%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          {/* Right Panel */}
          <motion.div
            className="fixed top-0 right-0 w-1/2 h-full bg-stone-200 dark:bg-stone-950 z-[60]"
            initial={{ x: "0%" }}
            animate={isOpening ? { x: "100%" } : { x: "0%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </>
      )}
    </>
  );
};

export default Curtains;