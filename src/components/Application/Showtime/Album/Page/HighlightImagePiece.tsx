import WashiTape from "@/components/Application/Showtime/Album/Plugin/WashiTape";

const FRAME_STYLES = {
  // Dọc: Cao 100% cha, Rộng tự động, giữ tỉ lệ 3:4, nhưng không được rộng quá cha (max-w-full)
  portrait: "h-full w-auto aspect-[3/4] max-w-full",
  
  // Ngang: Rộng 100% cha, Cao tự động, giữ tỉ lệ 4:3, nhưng không được cao quá cha (max-h-full)
  landscape: "w-full h-auto aspect-[4/3] max-h-full",
  
  // Vuông: Rộng 100% cha, Tỉ lệ 1:1, không cao quá cha
  square: "w-full h-auto aspect-square max-h-full",
};

interface HighlightImagePieceProps {
  imageSrc: string;
  orientation: "portrait" | "landscape" | "square";
}

const HighlightImagePiece = ({imageSrc, orientation}: HighlightImagePieceProps) => {
  // Lấy chuỗi class tương ứng
  const frameClass = FRAME_STYLES[orientation];
  
  return (
    // Container Cha: Padding (p-8/p-12) đóng vai trò là lề giấy
    // flex items-center justify-center: Đảm bảo khung ảnh luôn nằm giữa trang
    <div
      className="w-full h-full p-8 md:p-12 flex flex-col items-center justify-center bg-transparent select-none overflow-hidden">
      
      {/* --- KHUNG ẢNH (FRAME) ---
          Đây là thẻ div chịu trách nhiệm về kích thước (w-full/h-full)
      */}
      <div
        className={`
          relative bg-white p-3 md:p-4 shadow-xl
          rotate-5 transition-all duration-500 ease-out group
          flex flex-col /* Để chứa ảnh và caption */
          ${frameClass} /* <-- Class kích thước động chèn vào đây */
        `}
      >
        
        {/* BĂNG DÍNH 4 GÓC (Vẫn giữ nguyên vị trí absolute) */}
        <WashiTape count={4}/>
        
        {/* --- VÙNG CHỨA ẢNH ---
            flex-1: Ảnh sẽ chiếm toàn bộ không gian còn lại trong khung
            min-h-0: Fix lỗi flexbox bị tràn trên 1 số trình duyệt
        */}
        <div className="relative flex-1 min-h-0 w-full overflow-hidden">
          <img
            src={imageSrc || "/api/placeholder/600/600"}
            alt="Art Photo"
            className="w-full h-full object-cover filter sepia-[0.15] contrast-[1.05] brightness-[0.95] group-hover:sepia-0 group-hover:brightness-100 transition-all duration-500"
          />
          {/* Lớp Noise */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        </div>
      
      </div>
    </div>
  );
}

export default HighlightImagePiece;