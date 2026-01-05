import {Cloud, CloudMoon, CloudRain, Snowflake, Sun} from "lucide-react";
import React from "react";
import ScrollableMarkdown from "@/components/Application/Showtime/Album/Plugin/ScrollableMarkdown";
import {StoryResponse, WeatherType} from "@/types";
import {useTranslations} from "next-intl";

interface StoryPieceProps {
  story: StoryResponse
}

const StoryPiece = ({story}: StoryPieceProps) => {
  const t = useTranslations("App.Showtime.weather");
  
  return (
    <div
      onClick={(e) => {
        // Ngăn sự kiện nổi lên HTMLPageFlip
        e.stopPropagation();
        e.preventDefault();
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
      }}>
      <div className="flex gap-6 mb-6 pb-4 border-b border-stone-400 border-dashed select-text">
        {/* Title Area */}
        <div className="flex-1">
          <h3 className="text-[26px] text-stone-900 font-serif font-bold leading-snug">
            {story.title}
          </h3>
        </div>
        
        {/* Metadata Area - Vertical Stack */}
        <div className="shrink-0 flex flex-col items-end justify-start space-y-1 max-w-[110px]">
          {/* Date block */}
          <div className="text-right">
            <span className="block text-3xl font-serif text-stone-800 leading-none">10</span>
            <span className="block text-[11px] uppercase text-stone-800 tracking-widest">Tháng 12, 2025</span>
          </div>
          
          {/* Weather block */}
          {story.weather && (
            <div className="flex items-center justify-end gap-1 text-stone-600 mt-1">
              <span className="text-xs text-right max-w-[80px] leading-tight">
                {t(story.weather)}
              </span>
              <WeatherIcon weather={story.weather}/>
            </div>
          )}
        </div>
      </div>
      <ScrollableMarkdown content={story.content} height={360}/>
    </div>
  )
}

export default StoryPiece;

const WeatherIcon: React.FC<{ weather: WeatherType }> = ({weather}) => {
  switch (weather.toLowerCase()) {
    case 'sunny':
      return <Sun size={16}/>;
    case 'cloudy':
      return <Cloud size={16}/>;
    case 'rainy':
      return <CloudRain size={16}/>;
    case 'snowy':
      return <Snowflake size={16}/>;
    case 'clear_night':
      return <CloudMoon size={16}/>;
    default:
      return <Sun size={16}/>;
  }
}