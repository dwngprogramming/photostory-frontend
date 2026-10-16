import React from 'react';
import {Music} from 'lucide-react';
import {useTranslations} from "next-intl";
import SoundCloudIcon from "@/components/Common/SoundCloudIcon";
import GlassPlayer from "@/components/Application/Showtime/Album/Plugin/GlassPlayer";

interface StoryMusicProps {
  storyMusicUrl?: string;
}

const StoryMusic: React.FC<StoryMusicProps> = ({storyMusicUrl}) => {
  const t = useTranslations('App.Showtime.player');

  // Câu chuyện không có nhạc thì không hiện khối này
  if (!storyMusicUrl) return null;

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-2 px-1">
        <span
          className="inline-flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
           <Music size={14}/> {t('music')}
         </span>
        <div className="flex justify-center items-center text-[11px] gap-1 text-stone-500 font-medium">
          {t('poweredBy')} <SoundCloudIcon/> SoundCloud
        </div>
      </div>

      <GlassPlayer isThemeMusic={false} musicUrl={storyMusicUrl}/>
    </div>
  );
};

export default StoryMusic;
