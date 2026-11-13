import Image from "next/image";
import {Link} from "@/libs/i18n/navigation";

// Logo ngang Photostory (mark P + chữ "Photostory"), lấy từ brand kit.
// File gốc: public/brand/photostory-logo-{light,dark}.svg, tỉ lệ ≈ 3.73 : 1.
// Chữ trong SVG đã là path nên không phụ thuộc font. Đừng gõ lại chữ "Photostory" cạnh icon.
//
// Đổi kích thước bằng chiều cao trong className (ví dụ "h-8", "h-10 md:h-12"); tối thiểu 24px.

const LOGO_WIDTH = 488;
const LOGO_HEIGHT = 131;

type LogoProps = {
  /** Lớp cho ảnh logo, chủ yếu để đặt chiều cao. Mặc định "h-8 w-auto". */
  className?: string;
  /**
   * "auto": bản sáng ở chế độ sáng, bản tối ở chế độ tối.
   * "light": luôn bản cho nền sáng (chữ "story" màu đậm).
   * "dark": luôn bản cho nền tối (chữ "story" màu sáng).
   */
  variant?: "auto" | "light" | "dark";
  /** Có href thì logo là link (giữ nguyên ngôn ngữ hiện tại). Không có thì chỉ là ảnh. */
  href?: string;
  /** Lớp cho thẻ bọc ngoài (link hoặc span). */
  wrapperClassName?: string;
  onClick?: () => void;
  priority?: boolean;
};

const Logo = ({
                className = "h-8 w-auto",
                variant = "auto",
                href,
                wrapperClassName = "",
                onClick,
                priority = false,
              }: LogoProps) => {
  const img = (src: string, extra: string) => (
    <Image
      src={src}
      alt="Photostory"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={`${className} ${extra}`}
    />
  );

  const content = (
    <>
      {variant !== "dark" && img("/brand/photostory-logo-light.svg", variant === "auto" ? "dark:hidden" : "")}
      {variant !== "light" && img("/brand/photostory-logo-dark.svg", variant === "auto" ? "hidden dark:block" : "")}
    </>
  );

  const wrapperClass = `inline-flex items-center shrink-0 ${wrapperClassName}`;

  if (href) {
    return (
      <Link href={href} aria-label="Photostory" className={wrapperClass} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return <span className={wrapperClass}>{content}</span>;
};

export default Logo;
