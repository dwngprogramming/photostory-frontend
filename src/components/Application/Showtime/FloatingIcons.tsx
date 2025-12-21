import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Music, Heart, Star, Sparkles } from 'lucide-react';
import { UnwrapPhase } from '@/types';

interface FloatingIconsProps {
  phase: UnwrapPhase;
}

const FloatingIcons: React.FC<FloatingIconsProps> = ({ phase }) => {
  const showIcons = [
    UnwrapPhase.ICONS_FLOAT,
    UnwrapPhase.RIBBON_EXPAND,
    UnwrapPhase.VERTICAL_SPLIT,
    UnwrapPhase.CURTAIN_OPEN
  ].includes(phase);
  
  // Configuration for random icon placement and movement
  // Icons float on top of the curtains (wrapping paper) to create a magical effect
  const icons = [
    // Original set
    { Icon: Gift, delay: 0, x: '20%', y: '30%', size: 32 },
    { Icon: Star, delay: 0.2, x: '80%', y: '20%', size: 24 },
    { Icon: Music, delay: 0.4, x: '15%', y: '70%', size: 28 },
    { Icon: Heart, delay: 0.1, x: '75%', y: '65%', size: 30 },
    { Icon: Sparkles, delay: 0.3, x: '50%', y: '40%', size: 40 },
    { Icon: Star, delay: 0.5, x: '30%', y: '80%', size: 20 },
    { Icon: Sparkles, delay: 0.6, x: '90%', y: '45%', size: 24 },
    { Icon: Gift, delay: 0.7, x: '10%', y: '50%', size: 28 },
    
    // Additional set for more density
    { Icon: Heart, delay: 0.8, x: '45%', y: '15%', size: 22 },
    { Icon: Music, delay: 0.2, x: '65%', y: '30%', size: 26 },
    { Icon: Star, delay: 0.9, x: '5%', y: '10%', size: 18 },
    { Icon: Sparkles, delay: 0.4, x: '85%', y: '85%', size: 32 },
    { Icon: Gift, delay: 0.1, x: '35%', y: '60%', size: 30 },
    { Icon: Star, delay: 0.6, x: '55%', y: '90%', size: 24 },
    { Icon: Heart, delay: 0.3, x: '25%', y: '40%', size: 16 },
    { Icon: Music, delay: 0.5, x: '95%', y: '25%', size: 28 },
    { Icon: Sparkles, delay: 0.7, x: '60%', y: '10%', size: 36 },
    { Icon: Gift, delay: 0.2, x: '40%', y: '75%', size: 24 },
    { Icon: Star, delay: 0.8, x: '10%', y: '90%', size: 22 },
    { Icon: Heart, delay: 0.4, x: '70%', y: '50%', size: 28 },
  ];
  
  return (
    <AnimatePresence>
      {showIcons && (
        <motion.div
          className="absolute inset-0 z-[70] pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {icons.map((item, index) => (
            <motion.div
              key={index}
              // Darker icons in light mode (amber-700/20), lighter icons in dark mode (amber-400/30)
              className="absolute text-amber-700/20 dark:text-amber-400/30"
              style={{ left: item.x, top: item.y }}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0.8],
                scale: [0, 1.2, 1],
                y: [0, -20, -40], // Gentle drift upwards
                x: [0, index % 2 === 0 ? 10 : -10, 0] // Gentle horizontal sway
              }}
              transition={{
                duration: 3 + Math.random(), // Randomize duration slightly
                delay: item.delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <item.Icon size={item.size} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingIcons;