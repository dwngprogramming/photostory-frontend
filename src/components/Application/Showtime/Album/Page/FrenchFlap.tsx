import {Book, Globe, Heart} from "lucide-react";

export const StartFrenchFlap = () => {
  return (
    <div
      className={`
        absolute top-0 bottom-0 w-45 bg-stone-600
        shadow-xl shadow-black/70
        left-0 rounded-e-lg"}
      `}
    >
      <div className={`absolute top-0 bottom-0 left-0 w-4 pointer-events-none z-20 mix-blend-multiply
        bg-gradient-to-r from-stone-900/20 to-transparent`} />

      <div className="px-4 py-8 h-full flex flex-col justify-between">
        <div>
          <img
            alt="Avatar"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvZRzCOTmTpG-0zKoHeoNr8J-LeI_ihfZO3Q&s"
            width={100}
            height={100}
            className="rounded-full mx-auto"
          />
          <p className="text-2xl font-serif italic my-6 text-amber-300">Dear Minso,</p>
          <p className="text-[13px] text-stone-300">Cuốn album này là món quà từ Dũng Phạm gửi tới Minso. Chúc em luôn cảm thấy hạnh phúc!</p>
        </div>

        <p className="text-[13px] text-stone-300 italic">Biên Hòa, 26/12/2025.</p>
      </div>
    </div>
  );
};

export const EndFrenchFlap = () => {
  return (
    <div
      className={`
        absolute top-0 bottom-0 w-45 bg-stone-600
        shadow-xl shadow-black/70
        right-0 rounded-s-lg
      `}
    >
      {/* Hiệu ứng bóng đổ ở nếp gấp bên phải */}
      <div className={`absolute top-0 bottom-0 right-0 w-4 pointer-events-none z-20
        mix-blend-multiply bg-gradient-to-r from-transparent to-stone-900/20`} />
      
      <div className="px-4 py-8 h-full flex flex-col justify-between">
        {/* Phần trên: Logo & Giới thiệu */}
        <div>
          {/* Logo Brand */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="p-3 bg-stone-800/50 rounded-full border border-stone-500 shadow-inner">
              <Book className="w-8 h-8 text-amber-500" />
            </div>
            <span className="text-xl font-bold text-white font-serif tracking-wide">
              Photostory
            </span>
          </div>
          
          {/* Heading nhỏ */}
          <div className="flex items-center gap-2 mb-6 opacity-80">
            <span className="h-[1px] w-4 bg-amber-500/50"></span>
            <p className="text-xs font-bold text-amber-300 uppercase tracking-widest">
              Về chúng tôi
            </p>
            <span className="h-[1px] flex-1 bg-amber-500/50"></span>
          </div>
          
          {/* Nội dung giới thiệu */}
          <p className="text-[13px] text-stone-300 text-end leading-relaxed">
            Tại Photostory, chúng tôi tin rằng mỗi bức ảnh đều kể một câu chuyện độc đáo. Cảm ơn bạn đã để chúng tôi giúp bạn lưu giữ những khoảnh khắc quý giá.
          </p>
        </div>
        
        {/* Phần dưới: Footer / Thông tin liên hệ */}
        <div className="flex flex-col gap-2 pt-6 border-t border-stone-500/30">
          <div className="flex items-center gap-2 text-stone-400 text-[12px]">
            <Globe className="w-3.5 h-3.5" />
            <span>photostory.space</span>
          </div>
          <div className="flex items-center gap-2 text-stone-400 text-[12px]">
            <Heart className="w-3.5 h-3.5 text-red-400/80" />
            <span>Made by Dung Pham</span>
          </div>
        </div>
      </div>
    </div>
  );
};