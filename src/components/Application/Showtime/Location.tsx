import React, {useEffect} from "react";
import {MapPin} from "lucide-react";
import {GoogleMapsIcon} from "@/components/Common/GoogleMapsIcon";
import {GlassLocationBadge} from "@/components/Application/Showtime/GlassLocationBadge";

const Location = () => {
  const locationRef = React.useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const location = locationRef.current;
    if (!location) return;
    const stopPropagation = (e: Event) => e.stopPropagation();
    const events = ['mousemove', 'touchmove', 'pointermove', 'mousedown', 'touchstart', 'pointerdown'];
    events.forEach(event => location.addEventListener(event, stopPropagation));
    return () => events.forEach(event => location.removeEventListener(event, stopPropagation));
  }, []);
  
  return (
    <div ref={locationRef}>
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
      <div>
        <GlassLocationBadge location="Phước Hải, Bà Rịa - Vũng Tàu" theme="ocean" size="sm"/>
      </div>
    </div>
  );
}

export default Location;