import React, {useEffect} from 'react';
import {Music} from 'lucide-react';
import SoundCloudIcon from "@/components/Common/SoundCloudIcon";
import GlassPlayer from "@/components/Application/Showtime/Album/Plugin/GlassPlayer";

interface GlassPlayerProps {
  storyMusicUrl?: string;
}

const StoryMusic: React.FC<GlassPlayerProps> = ({
                                                  storyMusicUrl,
                                                }) => {
  const storyMusicRef = React.useRef<HTMLDivElement | null>(null);
  // Chặn event propagation
  useEffect(() => {
    const glassPlayer = storyMusicRef.current;
    if (!glassPlayer) return;
    const stopPropagation = (e: Event) => e.stopPropagation();
    const events = ['mousemove', 'touchmove', 'pointermove', 'mousedown', 'touchstart', 'pointerdown'];
    events.forEach(event => glassPlayer.addEventListener(event, stopPropagation));
    return () => events.forEach(event => glassPlayer.removeEventListener(event, stopPropagation));
  }, []);
  
  return (
    <div ref={storyMusicRef} className="w-full max-w-sm mx-auto">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-2 px-1">
        <span
          className="inline-flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600 border border-orange-200">
           <Music size={14}/> Music
         </span>
        <div className="flex justify-center items-center text-[11px] gap-1 text-stone-400 font-medium opacity-80">
          Powered by <SoundCloudIcon/> SoundCloud
        </div>
      </div>
      
      {/* Main Card Container */}
      <GlassPlayer isThemeMusic={false} musicUrl="https://soundcloud.com/nsontung02/richie-d-icy-x-obito-panorama-pegasus-mix"/>
    </div>
  );
};

export default StoryMusic;