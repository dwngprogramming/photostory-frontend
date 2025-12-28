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
        right-0 rounded-s-lg"}
      `}
    >
      <div className={`absolute top-0 bottom-0 right-0 w-4 pointer-events-none z-20
        mix-blend-multiply bg-gradient-to-r from-transparent to-stone-900/20`} />
    </div>
  );
};