import {Cloud, Heart, Loader2, Music, Music2, Pause, Play, Sparkles, Star, Zap} from "lucide-react";
import React, {useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hook";
import {initThemeSong, pauseAudio, playAudio, playStorySong, playThemeSong} from "@/libs/redux/features/audioSlice";

interface GlassPlayerProps {
  musicUrl: string;
  isThemeMusic: boolean;
  size?: 'sm' | 'md';
}

interface SongInfo {
  title: string;
  artist: string;
}

const GlassPlayer = ({musicUrl, isThemeMusic, size = "md"}: GlassPlayerProps) => {
  const dispatch = useAppDispatch();
  const {isPlaying, mode, themeUrl, currentUrl, isLoading} = useAppSelector(state => state.audio);
  const [songInfo, setSongInfo] = useState<SongInfo>({title: 'Unknown Title', artist: 'Unknown Artist'});
  
  useEffect(() => {
    const fetchSongInfo = async () => {
      if (musicUrl) {
        const res = await fetch(`/api/soundcloud?url=${encodeURIComponent(musicUrl)}`);
        const data = await res.json();
        if (data.title) {
          setSongInfo({
            title: data.title,
            artist: data.artist // Dữ liệu này giờ đây được lấy từ cái API xịn kia
          });
        }
      }
    };
    
    fetchSongInfo();
  }, [musicUrl]);
  
  useEffect(() => {
    if (isThemeMusic && musicUrl !== '') {
      dispatch(initThemeSong(musicUrl));
    }
  }, [musicUrl]);
  
  const isThisPlayerActive = useMemo(() => {
    if (isThemeMusic) {
      return mode === 'theme' && currentUrl === themeUrl;
    } else {
      return mode === 'story' && currentUrl === musicUrl;
    }
  }, [isThemeMusic, mode, currentUrl, musicUrl]);
  
  const isBuffering = isThisPlayerActive && isLoading;
  const isRunning = isThisPlayerActive && isPlaying;
  
  const handleToggle = () => {
    if (isThisPlayerActive) {
      // Nếu đang là chính mình -> Toggle Play/Pause
      if (isPlaying) {
        dispatch(pauseAudio());
      } else {
        dispatch(playAudio());
      }
    } else {
      // Nếu đang là bài khác -> Chuyển sang bài này
      if (isThemeMusic) {
        dispatch(playThemeSong());
      } else if (musicUrl) {
        dispatch(playStorySong(musicUrl));
      }
    }
  };
  
  // --- CONFIG ICONS ---
  const floatingIcons = useMemo(() => {
    const iconTypes = [Music, Music2, Heart, Star, Sparkles, Cloud, Zap];
    
    // CẤU HÌNH LƯỚI
    const rows = 4;
    const cols = 6;
    
    const gridSlots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        gridSlots.push({r, c});
      }
    }
    
    for (let i = gridSlots.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gridSlots[i], gridSlots[j]] = [gridSlots[j], gridSlots[i]];
    }
    
    return gridSlots.map((slot, i) => {
      const IconComponent = iconTypes[Math.floor(Math.random() * iconTypes.length)];
      
      const cellWidth = 100 / cols;
      const cellHeight = 100 / rows;
      
      const basePathLeft = slot.c * cellWidth;
      const basePathTop = slot.r * cellHeight;
      
      const randomLeft = basePathLeft + Math.random() * cellWidth - 5;
      const randomTop = basePathTop + Math.random() * cellHeight - 5;
      
      return {
        id: i,
        Component: IconComponent,
        top: `${randomTop}%`,
        left: `${randomLeft}%`,
        size: Math.floor(Math.random() * 10) + 10,
        duration: `${Math.floor(Math.random() * 3) + 4}s`,
        delay: `${Math.random() * 2}s`,
        color: ['text-orange-300', 'text-amber-200', 'text-pink-200', 'text-white/40'][Math.floor(Math.random() * 4)],
        rotation: Math.floor(Math.random() * 360),
        animType: Math.random() > 0.5 ? 'animate-bounce' : 'animate-pulse'
      };
    });
  }, []);
  return (
    <div className={`group relative ${isThemeMusic ? "max-w-[250px]" : "w-full"} select-none ${size === 'md' ? 'h-14' : 'h-10'}`}>
      
      {/* === GLASS LAYER (Đã sửa để Glow bên trong) === */}
      <div
        className={`absolute inset-0 rounded-full ${size === 'md' ? 'bg-white/60' : 'bg-white/70'} backdrop-blur-[20px] backdrop-saturate-150 overflow-hidden z-0 transition-all duration-700 ease-in-out
          ${isRunning
          // KHI PLAY: Dùng 'inset' để tạo sáng bên trong + viền cam
          ? 'border border-orange-400/60 shadow-[inset_0_0_30px_rgba(251,146,60,0.5),inset_0_0_10px_rgba(255,255,255,0.3)]'
          : 'border border-white/50 shadow-lg'
        }`}
      >
        
        {/* Breathing Background (Tăng độ ấm khi play) */}
        <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-1000
             ${isRunning
          // Gradient ấm hơn, sáng hơn khi play
          ? 'from-orange-200/30 via-orange-100/20 to-amber-200/30 opacity-100'
          // Gradient lạnh mặc định
          : 'from-orange-50/50 via-white/20 to-amber-50/50 opacity-50'
        }`}
        />
        
        {/* === FLOATING ICONS === */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingIcons.map((icon) => (
            <div
              key={icon.id}
              className={`absolute opacity-50 ${icon.color} ${icon.animType}`}
              style={{
                top: icon.top,
                left: icon.left,
                animationDuration: icon.duration,
                animationDelay: icon.delay,
                transform: `rotate(${icon.rotation}deg)`,
              }}
            >
              <icon.Component size={icon.size}/>
            </div>
          ))}
        </div>
        
        {/* Inner Highlight (Giữ nguyên để tạo độ khối) */}
        <div
          className="absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.05)] pointer-events-none"/>
      </div>
      
      {/* === CONTENT === */}
      <div className="relative z-10 h-full flex items-center px-2 pr-4 space-x-5">
        
        {/* Play Button */}
        <button
          onClick={handleToggle}
          className={`group/btn relative flex-shrink-0 ${size === 'md' ? 'w-10 h-10' : 'w-7  h-7'} rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-[0_4px_12px_-2px_rgba(249,115,22,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 ml-1`}
        >
          <div className="absolute inset-0 rounded-full border border-white/20"/>
          <div
            className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none"/>
          {isBuffering ? (
            // 1. Trường hợp đang Load: Hiện Spinner xoay
            <Loader2 className={`${size === 'md' ? 'w-5 h-5' : 'w-3 h-3'} animate-spin text-white drop-shadow-sm`} />
          ) : isRunning ? (
            // 2. Trường hợp đang Chạy: Hiện Pause
            <Pause className={`${size === 'md' ? 'w-5 h-5' : 'w-3 h-3'} fill-current drop-shadow-sm`}/>
          ) : (
            // 3. Trường hợp đang Dừng: Hiện Play
            <Play className={`${size === 'md' ? 'w-5 h-5' : 'w-3 h-3'} fill-current ml-0.5 drop-shadow-sm`}/>
          )}
        </button>
        
        {/* Info Area */}
        <div className="flex flex-col justify-center min-w-0 flex-grow space-y-0.5">
          <div className="flex justify-between items-baseline w-full">
               <span
                 className={`block font-serif font-bold text-stone-800 ${size === 'md' ? 'text-lg' : 'text-base'} leading-tight truncate drop-shadow-sm`}>
                {songInfo.title}
              </span>
            
            {/* Music Bar (Trang trí) */}
            {size === 'md' &&
                <div
                    className={`flex gap-0.5 items-end h-3 transition-opacity duration-300 ${isPlaying ? 'opacity-90' : 'opacity-50'}`}>
                    <div className={`w-0.5 rounded-full bg-orange-400/80 transition-all duration-500
                  ${isPlaying ? 'h-3 animate-pulse' : 'h-1'}`}></div>
                    <div className={`w-0.5 rounded-full bg-orange-400/80 transition-all duration-300 delay-75
                  ${isPlaying ? 'h-2 animate-pulse' : 'h-1'}`}></div>
                    <div className={`w-0.5 rounded-full bg-orange-400/80 transition-all duration-700 delay-150
                  ${isPlaying ? 'h-3 animate-pulse' : 'h-1'}`}></div>
                </div>
            }
          </div>
          
          <div className="flex justify-between items-center w-full">
            <span
              className={`block font-sans text-stone-500 ${size === 'md' ? 'text-xs' : 'text-[11px]'} font-bold tracking-wider truncate`}>
                {songInfo.artist}
            </span>
            {size === 'sm' && <span
              className="inline-flex items-center gap-0.5 px-1 rounded-full bg-yellow-200/60 border border-yellow-400/80 ml-4">
              <p className="text-black text-[10px]">Bài chủ đề</p>
            </span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlassPlayer;