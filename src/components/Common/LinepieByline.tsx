import {useTranslations} from "next-intl";

// Dòng "Một sản phẩm của [mark] Linepie" (en: "by [mark] Linepie"), giống footer email Photostory.
// Không dùng "Powered by": cụm đó dành cho dịch vụ bên thứ ba (xem StoryMusic, SoundCloud).

export const LINEPIE_URL = "https://linepie.com";

/** Mark Linepie, cùng path với Linepie/PWM/web/public/brand/linepie-mark.svg; tô bằng currentColor để theo nền sáng/tối. */
const LinepieMark = ({className = "size-3.5"}: { className?: string }) => (
  <svg viewBox="3 3 18 18" fill="currentColor" aria-hidden className={className}>
    <g transform="rotate(-45 12 12)">
      <path d="M4.063 11A8 8 0 0 1 19.937 11z"/>
      <path d="M4.063 13h15.874a8 8 0 0 1-.743 2.5H4.806a8 8 0 0 1-.743-2.5z"/>
      <path d="M6.191 17.5h11.618a8 8 0 0 1-11.618 0z"/>
    </g>
  </svg>
);

/** Lớp chữ của câu dẫn đặt qua className (màu, cỡ chữ); tên Linepie luôn mang màu Linepie. */
const LinepieByline = ({className = "text-sm text-stone-500 dark:text-stone-400"}: { className?: string }) => {
  const t = useTranslations('Common');
  return (
    <p className={className}>
      {t('byline')}{" "}
      <a
        href={LINEPIE_URL}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-1 align-[-2px] font-semibold text-[#1b6a85] hover:underline underline-offset-4 dark:text-cyan-400"
      >
        <LinepieMark/>
        Linepie
      </a>
    </p>
  );
};

export default LinepieByline;
