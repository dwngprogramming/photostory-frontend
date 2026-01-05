import React from 'react';
import {Building2, Coffee, MapPin, Mountain, Palmtree, Sun, Tractor, Trees, UtensilsCrossed, Waves} from 'lucide-react';

export type LocationTheme = 'warm' | 'nature' | 'ocean' | 'urban' | 'mountain' | 'tropical' | 'cafe' | 'rural' | 'restaurant' | 'standard';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface GlassLocationBadgeProps {
  location: string;
  theme?: LocationTheme;
  size?: BadgeSize;
}

const themeConfig = {
  warm: {
    icon: Sun,
    iconColor: 'text-orange-600',
    badgeText: 'text-orange-800',
    glassTint: 'bg-orange-50/80',
    hoverTint: 'group-hover:bg-orange-100/90',
    borderColor: 'border-orange-200/50',
    hoverBorder: 'group-hover:border-orange-300/70',
  },
  nature: {
    icon: Trees,
    iconColor: 'text-green-600',
    badgeText: 'text-green-800',
    glassTint: 'bg-green-50/80',
    hoverTint: 'group-hover:bg-green-100/90',
    borderColor: 'border-green-200/50',
    hoverBorder: 'group-hover:border-green-300/70',
  },
  ocean: {
    icon: Waves,
    iconColor: 'text-sky-600',
    badgeText: 'text-sky-800',
    glassTint: 'bg-sky-50/80',
    hoverTint: 'group-hover:bg-sky-100/90',
    borderColor: 'border-sky-200/50',
    hoverBorder: 'group-hover:border-sky- 300/70',
  },
  urban: {
    icon: Building2,
    iconColor: 'text-slate-600',
    badgeText: 'text-slate-800',
    glassTint: 'bg-slate-50/80',
    hoverTint: 'group-hover:bg-slate-100/90',
    borderColor: 'border-slate-200/50',
    hoverBorder: 'group-hover:border-slate-300/70',
  },
  rural: {
    icon: Tractor,
    iconColor: 'text-yellow-600',
    badgeText: 'text-yellow-900',
    glassTint: 'bg-yellow-50/80',
    hoverTint: 'group-hover:bg-yellow-100/90',
    borderColor: 'border-yellow-200/50',
    hoverBorder: 'group-hover:border-yellow-300/70',
  },
  mountain: {
    icon: Mountain,
    iconColor: 'text-indigo-600',
    badgeText: 'text-indigo-800',
    glassTint: 'bg-indigo-50/80',
    hoverTint: 'group-hover:bg-indigo-100/90',
    borderColor: 'border-indigo-200/50',
    hoverBorder: 'group-hover:border-indigo-300/70',
  },
  tropical: {
    icon: Palmtree,
    iconColor: 'text-teal-600',
    badgeText: 'text-teal-800',
    glassTint: 'bg-teal-50/80',
    hoverTint: 'group-hover:bg-teal-100/90',
    borderColor: 'border-teal-200/50',
    hoverBorder: 'group-hover:border-teal-300/70',
  },
  cafe: {
    icon: Coffee,
    iconColor: 'text-amber-600',
    badgeText: 'text-amber-900',
    glassTint: 'bg-amber-50/80',
    hoverTint: 'group-hover:bg-amber-100/90',
    borderColor: 'border-amber-200/50',
    hoverBorder: 'group-hover:border-amber-300/70',
  },
  restaurant: {
    icon: UtensilsCrossed,
    iconColor: 'text-red-600',
    badgeText: 'text-red-800',
    glassTint: 'bg-red-50/80',
    hoverTint: 'group-hover:bg-red-100/90',
    borderColor: 'border-red-200/50',
    hoverBorder: 'group-hover:border-red-300/70',
  },
  standard: {
    icon: MapPin,
    iconColor: 'text-rose-600',
    badgeText: 'text-rose-800',
    glassTint: 'bg-rose-50/80',
    hoverTint: 'group-hover:bg-rose-100/90',
    borderColor: 'border-rose-200/50',
    hoverBorder: 'group-hover:border-rose-300/70',
  },
};

const sizeConfig = {
  xs: {
    padding: 'px-2.5 py-1',
    gap: 'gap-1.5',
    iconSize: 'w-3 h-3',
    textSize: 'text-xs',
    fontSize: 'font-medium',
  },
  sm: {
    padding: 'px-3 py-1.5',
    gap: 'gap-2',
    iconSize: 'w-3.5 h-3.5',
    textSize: 'text-xs',
    fontSize: 'font-semibold',
  },
  md: {
    padding: 'px-4 py-2',
    gap: 'gap-2.5',
    iconSize: 'w-4 h-4',
    textSize: 'text-sm',
    fontSize: 'font-semibold',
  },
  lg: {
    padding: 'px-5 py-2.5',
    gap: 'gap-3',
    iconSize: 'w-5 h-5',
    textSize: 'text-base',
    fontSize: 'font-bold',
  },
};

export const GlassLocationBadge: React.FC<GlassLocationBadgeProps> = ({
                                                                        location,
                                                                        theme: selectedTheme = 'standard',
                                                                        size = 'md'
                                                                      }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  
  const theme = themeConfig[selectedTheme];
  const sizeStyle = sizeConfig[size];
  const IconComponent = theme.icon;
  
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const stopPropagation = (e: Event) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
    };
    
    const events = ['mousedown', 'touchstart', 'pointerdown'];
    
    events.forEach(event => {
      container.addEventListener(event, stopPropagation, { capture: true });
    });
    
    return () => {
      events.forEach(event => {
        container.removeEventListener(event, stopPropagation, { capture: true } as any);
      });
    };
  }, []);
  
  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      style={{
        padding: '4px',
        margin: '-4px',
        zIndex: 9999,
        isolation: 'isolate'
      }}
    >
      <div className="group relative select-none cursor-pointer">
        
        {/* Glassmorphism Container */}
        <div className={`absolute inset-0 rounded-full ${theme.glassTint} ${theme.hoverTint} backdrop-blur-md border ${theme.borderColor} ${theme.hoverBorder} shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden`}>
          {/* Top Shine */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"/>
          
          {/* Bottom Subtle Shadow */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent"/>
        </div>
        
        {/* Content Layout */}
        <div className={`relative z-10 flex items-center ${sizeStyle.padding} ${sizeStyle.gap}`}>
          
          {/* Themed Icon - No Circle Background */}
          <div className={`relative flex-shrink-0 ${theme.iconColor} transition-transform duration-300 group-hover:scale-110`}>
            <IconComponent className={sizeStyle.iconSize} strokeWidth={2.5} />
          </div>
          
          {/* Location Text */}
          <span className={`${sizeStyle.textSize} ${sizeStyle.fontSize} ${theme.badgeText} transition-transform duration-300 group-hover:scale-105`}>
            {location}
          </span>
        </div>
      </div>
    </div>
  );
};