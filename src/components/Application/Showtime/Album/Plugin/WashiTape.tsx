import React, { useMemo } from 'react';

interface WashiTapeProps {
  className?: string;
  style?: React.CSSProperties;
  count?: 1 | 4;
}

// Component con hiển thị một miếng băng dính
const TapeItem: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
                                                                                   className = '',
                                                                                   style,
                                                                                 }) => (
  <div
    style={style}
    className={`
      absolute z-5 pointer-events-none
      w-16 h-6 md:w-24 md:h-8
      bg-amber-300/80 dark:bg-amber-800/80
      mix-blend-multiply
      opacity-[0.95]
      [mask-image:linear-gradient(90deg,transparent_0%,black_5%,black_95%,transparent_100%)]
      rounded-[1px]
      border-t-[0.5px] border-b-[0.5px] border-white/20
      shadow-[0_0.5px_1px_rgba(0,0,0,0.2)]
      ${className}
    `}
  >
    <div
      className="absolute inset-0 opacity-50 mix-blend-overlay"
      style={{
        // Dùng ảnh noise có độ tương phản cao hơn để tạo độ nhám
        backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
        backgroundSize: '80px',
        filter: 'contrast(170%) brightness(90%)' // Tăng độ thô ráp
      }}
    />
  </div>
);

// Helper: Tạo góc nghiêng chéo (khoảng 45 độ)
const getSlantedAngle = (baseAngle: number) => {
  const randomOffset = Math.random() * 30 - 15; // Dao động +/- 4 độ
  return `rotate(${baseAngle + randomOffset}deg)`;
};

const WashiTape: React.FC<WashiTapeProps> = ({
                                               className = '',
                                               style,
                                               count = 1
                                             }) => {
  
  const rotations = useMemo(() => ({
    center: getSlantedAngle(0),   // Giữa: Gần như nằm ngang
    tl: getSlantedAngle(-45),     // Top-Left: Nghiêng \
    tr: getSlantedAngle(45),      // Top-Right: Nghiêng /
    bl: getSlantedAngle(45),      // Bottom-Left: Nghiêng /
    br: getSlantedAngle(-45),     // Bottom-Right: Nghiêng \
  }), []);
  
  // TRƯỜNG HỢP 1: 1 Tape ở chính giữa
  if (count === 1) {
    return (
      <TapeItem
        style={{ transform: rotations.center, ...style }}
        className={`top-0 left-1/2 -translate-x-1/2 -mt-3 ${className}`}
      />
    );
  }
  
  // TRƯỜNG HỢP 2: 4 Tape chéo ở 4 góc
  if (count === 4) {
    // Class chung để định vị vào góc
    const cornerBaseClass = "translate-x-[-30%] translate-y-[-50%]";
    return (
      <>
        <TapeItem
          style={{ transform: rotations.tl }}
          className={`top-2 left-0 ${cornerBaseClass} ${className}`}
        />
        <TapeItem
          style={{ transform: rotations.tr }}
          className={`top-2 -right-1   translate-x-[30%] translate-y-[-50%] ${className}`}
        />
        <TapeItem
          style={{ transform: rotations.bl }}
          className={`bottom-3 -left-1 translate-x-[-30%] translate-y-[50%] ${className}`}
        />
        <TapeItem
          style={{ transform: rotations.br }}
          className={`bottom-2 -right-2 translate-x-[30%] translate-y-[50%] ${className}`}
        />
      </>
    );
  }
  
  return null;
};

export default WashiTape;