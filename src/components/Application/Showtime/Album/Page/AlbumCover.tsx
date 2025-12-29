import React from 'react';

interface AlbumCoverProps extends React.HTMLAttributes<HTMLDivElement> {
  side: "left" | "right";
  children: React.ReactNode;
}

const AlbumCover = React.forwardRef<HTMLDivElement, AlbumCoverProps>(
  ({ side, children, className, ...props }, ref) => {
    const isLeft = side === 'left';

    return (
      <div
        ref={ref}
        className={`texture-leather relative overflow-hidden ${
          isLeft ? 'rounded-l-lg' : 'rounded-r-lg'
        } ${className || ''}`}
        data-density="hard"
        {...props}
      >
        {/* Spine Gradient */}
        <div className={`absolute top-0 w-4 h-full z-10 pointer-events-none ${
          isLeft ? 'right-0 bg-gradient-to-l from-white/20 to-transparent' : 'left-0 bg-gradient-to-r from-white/20 to-transparent'
        }`} />
        
        {/* Stitch Line */}
        <div className={`absolute top-0 h-full w-0.5 bg-[#cfb53b]/50 z-10 pointer-events-none ${
          isLeft ? 'left-5' : 'right-5'
        }`} />

        {/* Content Container */}
        <div className={`h-full flex items-center justify-center p-8 ${isLeft ? 'pr-8 pl-10' : 'pl-8 pr-10'}`}>
          <div className="w-full h-full border border-[#cfb53b]/30 p-2 flex items-center justify-center">
            <div className="w-full h-full border-2 gold-border flex flex-col items-center justify-center relative">
              <div className="absolute top-2 left-2 text-[#cfb53b] opacity-80">╔</div>
              <div className="absolute top-2 right-2 text-[#cfb53b] opacity-80">╗</div>
              <div className="absolute bottom-2 left-2 text-[#cfb53b] opacity-80">╚</div>
              <div className="absolute bottom-2 right-2 text-[#cfb53b] opacity-80">╝</div>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

AlbumCover.displayName = 'AlbumCover';
export default AlbumCover;