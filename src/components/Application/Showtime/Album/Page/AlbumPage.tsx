import React from 'react';
import Image from "next/image";

interface AlbumPageProps extends React.HTMLAttributes<HTMLDivElement> {
  side: "left" | "right";
  children: React.ReactNode;
  header?: string;
  number?: number | string;
  isInteractive?: boolean;
  flap?: React.ReactNode; // Prop dành cho FrenchFlap
  onCloseCover?: () => void;
}

const AlbumPage = React.forwardRef<HTMLDivElement, AlbumPageProps>(
  ({ side, children, header, number, isInteractive = true, flap, onCloseCover, className, ...props }, ref) => {
    const isLeft = side === 'left';

    return (
      <div
        ref={ref}
        className={`relative shadow-xl overflow-visible bg-white ${className || ''} ${!isInteractive ? 'pointer-events-none' : ''
          } ${isLeft ? 'rounded-l-sm' : 'rounded-r-sm'}`}
        data-density="soft"
        onClick={onCloseCover}
        {...props}
      >
        {/* Background */}
        {flap ?
          <div className="w-full h-full bg-white"/> :
          <Image
            src="/images/showtime/page/normal-paper.jpg"
            alt="Paper Texture"
            fill
            className="object-cover -z-1"
          />
        }

        {/* French Flap / Decor layer */}
        {flap && <div className="absolute inset-0 z-10 pointer-events-auto">{flap}</div>}

        {/* Shadows & Gradients */}
        <div className={`absolute top-0 bottom-0 w-8 pointer-events-none z-20 mix-blend-multiply ${isLeft ? 'right-0 bg-gradient-to-l from-stone-900/20 to-transparent' : 'left-0 bg-gradient-to-r from-stone-900/20 to-transparent'
          }`} />

        {/* Main Content */}
        <div className="h-full p-6 relative z-30 flex flex-col">
          {header && (
            <div className="flex justify-center mb-4">
              <div className="text-center text-amber-600 text-xs font-bold uppercase tracking-widest border-b border-amber-600/30 pb-2">
                {header}
              </div>
            </div>
          )}

          <div className="relative flex-1 custom-scrollbar">
            {children}
          </div>

          {number && (
            <div className={`text-gray-400 text-xs mt-3 flex justify-center`}>
              {number}
            </div>
          )}
        </div>
      </div>
    );
  }
);

AlbumPage.displayName = 'AlbumPage';
export default AlbumPage;