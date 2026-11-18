import {Heart, MapPin, Music2, Play} from "lucide-react";
import {useTranslations} from "next-intl";
import {useSeasonGallery} from "@/constants/seasonImage";

const AlbumIllustration = () => {
  const t = useTranslations('Landing.albumIllustration');
  const year = new Date().getFullYear();
  
  const getSeason = () => {
    const month = new Date().getMonth();
    if ([9, 10, 11, 0].includes(month)) return {
      key: 'winter',
      label: t('season.winter')
    }
    if ([1, 2, 3].includes(month)) return {
      key: 'spring',
      label: t('season.spring')
    }
    if ([4, 5, 6].includes(month)) return {
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
        className="relative bg-white dark:bg-stone-900 rounded-2xl shadow-soft-xl dark:shadow-dark-xl p-4 md:p-8 border-4 border-stone-100 dark:border-stone-800 min-h-[440px] md:min-h-[480px] transition-colors duration-300 flex flex-col justify-center">
        {/* ^^^ Đã thêm: flex flex-col justify-center */}
        
        {/* Center Spine - (Giữ nguyên, vì absolute không bị ảnh hưởng bởi flex) */}
        <div
          className="absolute w-1 bg-stone-800/10 dark:bg-stone-100/10 h-full top-0 left-1/2 -translate-x-1/2 shadow-inner z-10"/>
        
        {/* Two Pages Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 relative z-0">
          
          {/* LEFT PAGE - Photo Page */}
          <div
            className="flex flex-col gap-2 p-2 md:p-4 bg-orange-200/40 dark:bg-orange-700/20 rounded-lg shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] dark:shadow-none">
            {/* Page Header (tiêu đề trang như album thật) */}
            <div className="flex justify-center">
              <span
                className="text-amber-600 dark:text-amber-500 text-[10px] font-bold uppercase tracking-widest border-b border-amber-600/30 pb-1">
                {getSeason().label}
              </span>
            </div>

            {/* Photo Stack (wireframe của PhotoStack): ảnh trên cùng thẳng, các ảnh dưới nghiêng + lệch lên */}
            <div className="relative w-full h-52 md:h-56 flex items-center justify-center">
              {[3, 2, 1, 0].map((i) => {
                const layer = [
                  {rotate: 0, y: 0, scale: 1},
                  {rotate: 4, y: -8, scale: 0.97},
                  {rotate: -6, y: -16, scale: 0.94},
                  {rotate: 8, y: -24, scale: 0.91},
                ][i];
                const isTop = i === 0;
                return (
                  <div
                    key={i}
                    className={`absolute w-[84%] md:w-[88%] aspect-square bg-white dark:bg-stone-50 p-1.5 pb-5 md:p-2 md:pb-6 border border-stone-100 transition-transform duration-300 ${isTop ? 'shadow-xl hover:scale-[1.03]' : 'shadow-md'}`}
                    style={{
                      zIndex: 4 - i,
                      transform: `translateY(${layer.y}px) rotate(${layer.rotate}deg) scale(${layer.scale})`,
                      filter: isTop ? undefined : `brightness(${1 - i * 0.08}) sepia(0.2)`,
                    }}
                  >
                    <div className="w-full h-full overflow-hidden bg-stone-100">
                      <img
                        src={imageGallery[i]}
                        alt={isTop ? "Memory Photo" : "Memory Photo stack"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isTop && (
                      <div
                        className="absolute bottom-2 md:bottom-2.5 left-1/2 -translate-x-1/2 h-1.5 w-1/2 bg-stone-400/50 rounded-full"/>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Music Player Card (wireframe) */}
            <div
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/60 dark:bg-stone-800/60 border border-amber-200/60 dark:border-stone-700 shadow-sm">
              <div
                className="shrink-0 w-6 h-6 rounded-full bg-amber-400/80 dark:bg-amber-600/80 flex items-center justify-center">
                <Play className="w-3 h-3 text-white fill-white"/>
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="h-1.5 w-3/4 bg-stone-800/30 dark:bg-stone-100/30 rounded-full"/>
                <div className="h-1 w-full bg-stone-800/10 dark:bg-stone-100/10 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-amber-500/70 rounded-full"/>
                </div>
              </div>
              <Music2 className="shrink-0 w-4 h-4 text-amber-500"/>
            </div>

            {/* Location Badge (wireframe) */}
            <div
              className="self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/50 dark:border-rose-900/50">
              <MapPin className="w-3 h-3 shrink-0 text-rose-600 dark:text-rose-400" strokeWidth={2.5}/>
              <div className="h-1.5 w-14 shrink-0 bg-rose-800/30 dark:bg-rose-200/30 rounded-full"/>
            </div>

            {/* Date Caption + Page Number */}
            <div className="mt-auto flex flex-col items-center gap-0.5">
              <p className="text-xs text-stone-600 dark:text-stone-400 italic text-center font-serif">
                {t('caption', {season: getSeason().label, year: year})}
              </p>
              <span className="text-stone-400 text-[10px]">1</span>
            </div>
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