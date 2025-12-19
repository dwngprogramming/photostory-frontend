import {Heart, MapPin, Music} from "lucide-react";
import {useTranslations} from "next-intl";
import {useSeasonGallery} from "@/constants/seasonImage";

const AlbumIllustration = () => {
  const t = useTranslations('Landing.albumIllustration');
  const year = new Date().getFullYear();
  
  const getSeason = () => {
    const month = new Date().getMonth();
    if ([11, 0, 1].includes(month)) return {
      key: 'winter',
      label: t('season.winter')
    }
    if ([2, 3, 4].includes(month)) return {
      key: 'spring',
      label: t('season.spring')
    }
    if ([5, 6, 7].includes(month)) return {
      key: 'summer',
      label: t('season.summer')
    }
    return {
      key: 'autumn',
      label: t('season.autumn')
    }
  }
  
  const imageGallery = useSeasonGallery(getSeason().key, 4);
  
  return (
    <div className="relative w-full max-w-2xl mx-auto animate-float">
      {/* Album Container */}
      <div
        className="relative bg-white dark:bg-stone-900 rounded-2xl shadow-soft-xl dark:shadow-dark-xl p-4 md:p-8 border-4 border-stone-100 dark:border-stone-800 min-h-[400px] md:min-h-[460px] transition-colors duration-300 flex flex-col justify-center">
        {/* ^^^ Đã thêm: flex flex-col justify-center */}
        
        {/* Center Spine - (Giữ nguyên, vì absolute không bị ảnh hưởng bởi flex) */}
        <div
          className="absolute w-1 bg-stone-800/10 dark:bg-stone-100/10 h-full top-0 left-1/2 -translate-x-1/2 shadow-inner z-10"/>
        
        {/* Two Pages Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 relative z-0">
          
          {/* LEFT PAGE - Photo Page */}
          <div
            className="flex flex-col gap-4 p-2 md:p-4 bg-orange-200/40 dark:bg-orange-700/20 rounded-lg shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] dark:shadow-none">
            {/* Main Photo */}
            <div
              className="relative aspect-square bg-gradient-to-br from-amber-100 via-orange-100 to-amber-50 dark:from-amber-900/30 dark:via-orange-900/30 dark:to-amber-950/20 rounded-lg shadow-sm dark:shadow-dark border-4 border-white dark:border-stone-700 rotate-[-1deg] transition-all duration-300 hover:rotate-0 hover:scale-[1.02] group overflow-hidden">
              <img
                src={imageGallery[0]}
                alt="Memory Photo"
                className="w-full h-full object-cover opacity-80 mix-blend-multiply dark:mix-blend-normal dark:opacity-70 hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Music Icon */}
              <div
                className="absolute top-2 right-2 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                <Music className="w-4 h-4 text-amber-500"/>
              </div>
              {/* Location Pin */}
              <div
                className="absolute bottom-2 left-2 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                <MapPin className="w-4 h-4 text-orange-500"/>
              </div>
            </div>
            
            {/* Small Thumbnails */}
            <div className="flex gap-2 mt-2 justify-center">
              <div
                className="w-12 h-12 bg-amber-100/50 dark:bg-amber-900/20 rounded border-2 border-white dark:border-stone-700 shadow-sm rotate-2 overflow-hidden">
                <img src={imageGallery[1]} className="w-full h-full object-cover opacity-70"
                     alt="thumb"/>
              </div>
              <div
                className="w-12 h-12 bg-amber-100/50 dark:bg-amber-900/20 rounded border-2 border-white dark:border-stone-700 shadow-sm -rotate-2 overflow-hidden">
                <img src={imageGallery[2]} className="w-full h-full object-cover opacity-70"
                     alt="thumb"/>
              </div>
              <div
                className="w-12 h-12 bg-amber-100/50 dark:bg-amber-900/20 rounded border-2 border-white dark:border-stone-700 shadow-sm rotate-1 overflow-hidden">
                <img src={imageGallery[3]} className="w-full h-full object-cover opacity-70"
                     alt="thumb"/>
              </div>
            </div>
            
            {/* Date Caption */}
            <p className="text-xs text-stone-600 dark:text-stone-400 italic text-center font-serif mt-auto">
              {t('caption', {season: getSeason().label, year: year})}
            </p>
          </div>
          
          {/* RIGHT PAGE - Diary Page */}
          <div
            className="flex flex-col gap-3 p-2 md:p-4 bg-orange-200/40 dark:bg-orange-700/20 rounded-lg shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] dark:shadow-none">
            {/* Title */}
            <h3
              className="text-stone-800 dark:text-stone-100 font-serif text-lg md:text-xl font-bold mb-2 rotate-[-0.5deg]">
              {t('title', {season: getSeason().label})}
            </h3>
            
            {/* Story Lines */}
            <div className="space-y-4 flex-1">
              <div className="h-2 bg-stone-800/30 dark:bg-stone-100/30 rounded-full w-full rotate-[0.5deg]"/>
              <div className="h-2 bg-stone-800/30 dark:bg-stone-100/30 rounded-full w-11/12 rotate-[-0.3deg]"/>
              <div className="h-2 bg-stone-800/30 dark:bg-stone-100/30 rounded-full w-full rotate-[0.5deg]"/>
              <div className="h-2 bg-stone-800/30 dark:bg-stone-100/30 rounded-full w-10/12 rotate-[-0.3deg]"/>
              <div className="h-2 bg-stone-800/30 dark:bg-stone-100/30 rounded-full w-full rotate-[0.5deg]"/>
              <div className="h-2 bg-stone-800/30 dark:bg-stone-100/30 rounded-full w-9/12 rotate-[-0.3deg]"/>
              <div className="h-2 bg-stone-800/30 dark:bg-stone-100/30 rounded-full w-11/12 rotate-[0.5deg]"/>
              <div className="h-2 bg-stone-800/30 dark:bg-stone-100/30 rounded-full w-8/12 rotate-[-0.3deg]"/>
            </div>
            
            {/* Heart Icon & Signature */}
            <div className="flex justify-between items-end mt-4">
              <div className="h-2 w-24 bg-stone-800/20 dark:bg-stone-100/20 rounded-full rotate-[-2deg] mb-2"/>
              <Heart
                className="w-5 h-5 text-orange-300 dark:text-orange-600 fill-orange-300/30 dark:fill-orange-600/30"/>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default AlbumIllustration;