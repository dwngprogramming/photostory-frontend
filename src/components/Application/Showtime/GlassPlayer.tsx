import React, {useState, useMemo, useEffect} from 'react';
import {Play, Pause, Music} from 'lucide-react';
import SoundCloudIcon from "@/components/Common/SoundCloudIcon";

interface GlassPlayerProps {
  title: string;
  artist: string;
  initialProgress?: number;
}

const GlassPlayer: React.FC<GlassPlayerProps> = ({
                                                          title,
                                                          artist,
                                                          initialProgress = 0
                                                        }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(initialProgress);
  const glassPlayerRef = React.useRef<HTMLDivElement | null>(null);
  
  const BAR_COUNT = 32;
  
  const barHeights = useMemo(
    () => Array.from({length: BAR_COUNT}, () => Math.floor(Math.random() * 75) + 25),
    []
  );
  
  useEffect(() => {
    const glassPlayer = glassPlayerRef.current;
    if (!glassPlayer) return;
    const stopPropagation = (e: Event) => e.stopPropagation();
    const events = ['mousemove', 'touchmove', 'pointermove', 'mousedown', 'touchstart', 'pointerdown'];
    events.forEach(event => glassPlayer.addEventListener(event, stopPropagation));
    return () => events.forEach(event => glassPlayer.removeEventListener(event, stopPropagation));
  }, []);
  
  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.25;
        });
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);
  
  const handleSeek = (index: number) => {
    const newProgress = ((index + 1) / BAR_COUNT) * 100;
    setProgress(newProgress);
  };
  
  return (
    <div ref={glassPlayerRef}>
      <div className="flex justify-between items-center mb-2">
         <span
           className="inline-flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600 border border-orange-200">
           <Music size={14}/> Music
         </span>
        <div className="flex justify-center items-center text-[11px] gap-1 text-stone-400 dark:text-stone-500">
          <p>Powered by</p>
          <div className="flex justify-center items-center gap-1"><SoundCloudIcon/> SoundCloud</div>
        </div>
      </div>
      
      <div className="group relative w-full select-none">
        {/* Glass Layer */}
        <div
          className="absolute inset-0 rounded-3xl bg-white/70 backdrop-blur-[22px] backdrop-saturate-150 border border-stone-400/80 transition-all duration-500 group-hover:bg-white/80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/55 via-white/15 to-white/10 opacity-95"/>
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-95"/>
          {/* inner glow */}
          <div
            className="absolute inset-4 rounded-2xl shadow-[inset_0_0_18px_rgba(255,255,255,0.55)] pointer-events-none"/>
          {/* outer halo */}
          <div
            className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-white/25 via-amber-100/60 to-orange-200/35 group-hover:bg-gradient-to-br group-hover:from-white/45 group-hover:via-amber-200/30 group-hover:to-orange-300/25 blur-3xl opacity-80 pointer-events-none"/>
          {/* accent blob */}
          <div
            className="absolute -bottom-12 -right-10 w-28 h-28 bg-orange-400/45 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100"/>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center px-5 gap-5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-200 transition-all duration-300 hover:scale-105 hover:shadow-orange-300 active:scale-95 group/btn"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <div
              className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none"/>
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current drop-shadow-sm"/>
            ) : (
              <Play className="w-4 h-4 fill-current ml-1 drop-shadow-sm -translate-x-[2px]"/>
            )}
          </button>
          
          <div className="flex flex-col justify-center flex-grow min-w-0 gap-1 pt-1.25 pb-1.75">
            <div className="flex items-baseline space-x-2 truncate px-1">
              <span className="font-serif font-bold text-stone-800 text-sm tracking-wide">{title}</span>
              <span className="text-stone-300 text-xs">|</span>
              <span className="font-sans text-stone-500 text-[10px] uppercase tracking-wider font-semibold">
                {artist}
              </span>
            </div>
            
            <div
              className="flex items-end justify-between h-5 w-full gap-[3px] cursor-pointer"
              role="slider"
              aria-valuenow={progress}
              aria-label="Seek track"
            >
              {barHeights.map((height, index) => {
                const progressPercent = ((index + 1) / BAR_COUNT) * 100;
                const isPast = progress >= progressPercent;
                
                return (
                  <div
                    key={index}
                    onClick={e => {
                      e.stopPropagation();
                      handleSeek(index);
                    }}
                    className="group/bar relative flex-1 min-w-[2px] rounded-full transition-all duration-300 ease-out hover:scale-y-110 origin-bottom"
                    style={{height: `${height}%`}}
                  >
                    <div className="absolute inset-0 rounded-full bg-stone-300/40 transition-colors duration-300"/>
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-t from-orange-500 to-amber-400 shadow-[0_2px_8px_rgba(245,158,11,0.3)] transition-opacity duration-200 ${
                        isPast ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassPlayer;