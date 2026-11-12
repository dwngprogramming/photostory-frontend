import React, {useLayoutEffect, useRef, useState} from "react";
import {MapPin} from "lucide-react";
import {useTranslations} from "next-intl";
import {GoogleMapsIcon} from "@/components/Common/GoogleMapsIcon";
import {GlassLocationBadge} from "@/components/Application/Showtime/Album/Plugin/GlassLocationBadge";
import {LocationResponse} from "@/types";

interface LocationProps {
  locations: LocationResponse[];
}

const MAX_ROWS = 2;

const chipClass = "relative z-[9999] inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold "
  + "bg-orange-100/80 text-orange-700 border border-orange-200 backdrop-blur-md shadow-sm "
  + "hover:bg-orange-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400";

// Hiện tối đa MAX_ROWS dòng tag; phần còn lại gộp vào chip "+N"
const Location = ({locations}: LocationProps) => {
  const t = useTranslations('App.Showtime.locations');
  const listRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(locations.length);
  const [expanded, setExpanded] = useState(false);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      const next = el.clientWidth;
      setWidth((prev) => {
        if (prev === next) return prev;
        // Đổi bề rộng thì thu gọn và đo lại từ đầu
        setVisibleCount(locations.length);
        setExpanded(false);
        return next;
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [locations.length]);

  useLayoutEffect(() => {
    setVisibleCount(locations.length);
    setExpanded(false);
  }, [locations]);

  // Đo sau mỗi lần render: còn tràn quá MAX_ROWS dòng thì bớt một tag rồi đo lại
  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el || expanded || visibleCount === 0) return;
    // Lấy tâm dọc để chip "+N" (cao khác tag) vẫn tính cùng dòng
    const rows = new Set(Array.from(el.children).map((child) => {
      const item = child as HTMLElement;
      return Math.round(item.offsetTop + item.offsetHeight / 2);
    }));
    if (rows.size > MAX_ROWS) setVisibleCount(visibleCount - 1);
  }, [visibleCount, expanded, width, locations]);

  const hiddenCount = locations.length - visibleCount;
  const shown = expanded ? locations : locations.slice(0, visibleCount);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
         <span
           className="inline-flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600 border border-orange-200">
           <MapPin size={14}/> Location
         </span>
        <div className="flex justify-center items-center text-[11px] gap-1 text-stone-400 dark:text-stone-500">
          <p>Using</p>
          <div className="flex justify-center items-center gap-1"><GoogleMapsIcon/> Google Maps</div>
        </div>
      </div>
      <div ref={listRef} className="flex flex-wrap items-center gap-2">
        {shown.map((loc, index) => (
          <GlassLocationBadge
            key={index}
            location={loc.name}
            theme={loc.locationTheme}
            size="sm"
          />
        ))}
        {!expanded && hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-label={t('more', {count: hiddenCount})}
            className={chipClass}
          >
            +{hiddenCount}
          </button>
        )}
        {expanded && hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className={chipClass}
          >
            {t('less')}
          </button>
        )}
      </div>
    </div>
  );
}

export default Location;
