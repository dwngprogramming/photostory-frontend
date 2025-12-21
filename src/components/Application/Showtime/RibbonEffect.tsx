import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane } from 'lucide-react';
import { UnwrapPhase } from '@/types';

interface RibbonEffectsProps {
  phase: UnwrapPhase;
}

const RibbonEffects: React.FC<RibbonEffectsProps> = ({ phase }) => {
  // Logic to determine visibility based on phase sequence
  const showRibbon = [
    UnwrapPhase.RIBBON_EXPAND,
    UnwrapPhase.VERTICAL_SPLIT,
    UnwrapPhase.CURTAIN_OPEN
  ].includes(phase);
  
  const showLine = [
    UnwrapPhase.VERTICAL_SPLIT,
    UnwrapPhase.CURTAIN_OPEN
  ].includes(phase);
  
  // We unmount the ribbon/line when curtains open fully so they move WITH the curtains or disappear
  // In this design, let's have them disappear as the curtains pull apart to reveal the inside
  const isOpening = phase === UnwrapPhase.CURTAIN_OPEN;
  
  return (
    <>
      {/* Phase 4: Horizontal Ribbon Expansion (Left to Right) */}
      <AnimatePresence>
        {showRibbon && !isOpening && (
          <div className="absolute top-1/2 left-0 w-full h-12 md:h-16 z-[80] -translate-y-1/2">
            <motion.div
              className="relative h-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{
                duration: 1.75,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400 dark:from-amber-500 dark:via-amber-400 dark:to-amber-200 shadow-xl shadow-amber-900/20 dark:shadow-glow" />
              
              {/* Plane Icon at the Leading Edge (Right) */}
              <div className="absolute -right-6 top-1/2 translate-x-1/2 -translate-y-1/2 z-[90] text-amber-800 dark:text-amber-100 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
                <Plane size={48} className="rotate-45" fill="currentColor" strokeWidth={2} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Phase 5: Vertical Split Line (Top to Bottom) */}
      <AnimatePresence>
        {showLine && !isOpening && (
          // Increased width from w-7/w-10 to w-16/w-24 for a much thicker vertical line
          <div className="absolute left-1/2 top-0 h-full w-12 md:w-16 z-[80] -translate-x-1/2">
            <motion.div
              className="relative w-full h-full"
              initial={{ height: "0%" }}
              animate={{ height: "100%" }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{
                duration: 1.75,
                ease: "easeInOut",
              }}
            >
              {/* Vertical Gradient - Matching horizontal style */}
              <div className="w-full h-full bg-gradient-to-b from-yellow-600 via-amber-500 to-yellow-400 dark:from-amber-500 dark:via-amber-400 dark:to-amber-200 shadow-xl shadow-amber-900/20 dark:shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
              
              {/* Plane Icon at the Leading Edge (Bottom) */}
              {/* Increased size and offset to match thicker ribbon */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 translate-y-1/2 text-amber-800 dark:text-amber-100 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
                <Plane size={48} className="rotate-[135deg]" fill="currentColor" strokeWidth={2} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RibbonEffects;