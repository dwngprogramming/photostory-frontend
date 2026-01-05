import {UnwrapPhase} from "@/types";
import {Loader2} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";

const PreparingAlbum = ({phase}: { phase: UnwrapPhase }) => {
  // Chỉ hiển thị khi đang ở phase PREPARING_ALBUM
  if (phase !== UnwrapPhase.PREPARING_ALBUM) return null;
  
  return (
    <AnimatePresence>
      <div className="flex flex-col items-center justify-center w-full h-full bg-stone-100 dark:bg-stone-950 transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} // Fade out & Blur khi sang Silence
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Spinner: Màu Amber-700 (Light) và Amber-400 (Dark) */}
          <div className="relative">
            <div className="absolute inset-0 blur-lg bg-amber-400/30 dark:bg-amber-500/20 rounded-full animate-pulse"></div>
            <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-amber-700 dark:text-amber-400 animate-spin relative z-10" />
          </div>
          
          {/* Text áp dụng style bạn yêu cầu */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-900 to-amber-700 dark:from-amber-200 dark:via-amber-100 dark:to-amber-200 drop-shadow-sm dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-wide leading-tight">
              Chuẩn bị Album
            </h2>
            
            <p className="font-sans text-sm md:text-base text-amber-800/60 dark:text-amber-400/60 tracking-widest uppercase">
              Album đang được chuẩn bị, bạn vui lòng đợi một chút nha ~
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default PreparingAlbum