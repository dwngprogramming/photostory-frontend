import React, {useId} from 'react';

// Highlighter-marker swipe: one thick band with rounded ends, slightly uneven
// edges and a light paper-grain texture. Revealed left→right on load.
type Props = { className?: string };

const PATH =
  'M20 10 ' +
  'C 60 5, 105 10, 150 8 ' + // top edge: small dip, then
  'S 235 1, 283 6 ' + // a gentle rise to the right
  'C 300 8, 299 32, 282 33 ' + // rounded right end
  'C 235 32, 195 38, 145 36 ' + // bottom edge: slight sag in the middle
  'S 62 39, 22 39 ' +
  'C 3 39, 2 12, 20 10 Z'; // rounded left end

const BrushStroke = ({className}: Props) => {
  const filterId = `bs-grain-${useId().replace(/:/g, '')}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 42"
      preserveAspectRatio="none"
      className={className}
    >
      <style>{`
        .bs-reveal { animation: bs-reveal .8s cubic-bezier(.65,0,.35,1) .15s both; }
        @keyframes bs-reveal { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
        @media (prefers-reduced-motion: reduce) { .bs-reveal { animation: none; } }
      `}</style>
      <defs>
        <filter id={filterId} x="-5%" y="-20%" width="110%" height="140%">
          {/* Bristle-direction noise: stretched along x so it reads as brush lines */}
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.45" numOctaves="3" seed="3" result="edgeNoise" />
          {/* Shift rows sideways a little so the rounded ends feather along the streaks */}
          <feDisplacementMap in="SourceGraphic" in2="edgeNoise" scale="6" xChannelSelector="R" yChannelSelector="A" result="rough" />
          {/* Streaky fill: alpha varies ~60–100% in long horizontal lines */}
          <feTurbulence type="fractalNoise" baseFrequency="0.08 0.8" numOctaves="2" seed="8" result="grain" />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.1 0 0 0 0.5"
            result="grainMask"
          />
          <feComposite in="rough" in2="grainMask" operator="in" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        <path className="bs-reveal" d={PATH} fill="currentColor" />
      </g>
    </svg>
  );
};

export default BrushStroke;
