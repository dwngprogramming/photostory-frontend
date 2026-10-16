# Điều khiển dùng chung

Hai điều khiển xuất hiện ở cả ba sân khấu.

## Công tắc sáng/tối

`ThemeToggle` (`src/components/Common/ThemeToggle.tsx`), dùng `next-themes` (`attribute="class"`, mặc định `system`).

| Phần | Giá trị |
|---|---|
| Kích thước | Đo theo `em` với `text-base`: rộng 56px, cao 32px; đổi cỡ bằng cách đổi `font-size` qua `className` |
| Rãnh | `rounded-full bg-stone-300` / tối `stone-700`, `shadow-inner`, đệm 4px |
| Icon nền | Mặt trời trái, mặt trăng phải, 16px, `stone-500/70` / tối `stone-400/70` |
| Núm | Tròn 24px; sáng: nền `white` + mặt trời `amber-500`; tối: nền `stone-800` + mặt trăng `amber-300`, trượt 24px sang phải |
| Chuyển | 300ms; icon trong núm xoay 90° và thu 50% khi đổi |
| Vai trò | `role="switch"`, `aria-checked` theo chế độ tối |
| Focus | `focus:ring-2 focus:ring-amber-400` |
| Trước khi gắn | Hiện khung trống đúng kích thước để không nhảy bố cục |

Vị trí:

- Landing: thanh điều hướng, cạnh nút chọn ngôn ngữ.
- Khung app: chân sidebar, dòng "Appearance" (cần dịch).
- Unwrap: góc trên phải cố định (`top-6 right-6`).
- Showtime: góc trên phải (`top-4 right-6`), chỉ hiện từ pha mở màn che.

Công tắc chỉ đổi qua lại sáng ↔ tối; chế độ "theo hệ thống" chỉ là mặc định lúc đầu. Nếu thêm lựa chọn "Hệ thống" thì đặt trong trang Cài đặt, không thêm vào công tắc.

## Chọn ngôn ngữ

`LanguageToggle` (`src/components/Common/LanguageToggle.tsx`).

| Phần | Giá trị |
|---|---|
| Nút | Cao 40px, `px-3 rounded-lg bg-stone-200` / tối `stone-700`, rê một bậc đậm hơn; cờ + mã viết tắt `text-sm font-bold` (`VI`, `EN`) |
| Menu | Mẫu menu thả ([lop-noi.md](lop-noi.md#menu-thả)): cờ + tên đầy đủ ("Tiếng Việt", "English") |
| Đổi | Thay đoạn đầu đường dẫn (`/vi/...` ↔ `/en/...`), giữ query; nút khoá + mờ 50% trong lúc chuyển |
| Focus | `focus:ring-2 focus:ring-amber-400` |

Cờ dùng emoji với chuỗi font emoji dự phòng (Windows không vẽ cờ emoji, sẽ hiện hai chữ cái); mã viết tắt bên cạnh đảm bảo vẫn đọc được.

Vị trí: landing (thanh điều hướng), Unwrap (góc trên phải). Khung app và Showtime chưa có; khi thêm vào khung app thì đặt ở chân sidebar cạnh công tắc sáng/tối.
