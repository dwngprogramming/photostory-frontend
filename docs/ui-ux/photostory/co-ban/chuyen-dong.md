# Chuyển động

Hai công cụ: lớp `transition-*` của Tailwind cho đổi màu, bóng, dịch nhỏ; `framer-motion` cho vào/ra, kéo thả, chuỗi nhiều pha. Không thêm thư viện thứ ba.

## Thời lượng

| Thời lượng | Dùng cho |
|---|---|
| 150ms | Menu thả mở/đóng, đổi nền mục trong menu |
| 200ms | Đổi màu link, nút; rê nút; ảnh polaroid bay đi khi vuốt |
| 300ms | Thanh điều hướng đổi nền khi cuộn, sidebar trượt, card nhấc lên, công tắc sáng/tối, thanh thông báo thu lại, đổi màu cả trang theo chế độ |
| 500ms | Card tính năng nhấc, nền trang Showtime đổi chế độ, nhãn địa điểm đổi màu, icon bay hiện ra |
| 700ms | Hiện dần khi cuộn tới (`useScrollAnimation`), ảnh bìa album phóng khi rê |
| 750ms | Lật một trang sách (`flippingTime`), sách dịch về giữa khi mở bìa |
| 1000ms | Màn che đóng/mở, thanh dung lượng chạy tới giá trị |

Thời lượng của nghi thức mở quà xem [nghi-thuc-mo-qua.md](../album/nghi-thuc-mo-qua.md).

## Đường cong

| Đường cong | Dùng cho |
|---|---|
| `ease-out` | Thứ đi vào: hiện dần khi cuộn, menu thả, lời mở đầu |
| `ease-in-out` | Thứ di chuyển từ chỗ này sang chỗ khác: màn che, ruy băng, sách dịch, sidebar |
| `spring` (`duration: 0.5`) | Hộp thoại xuất hiện |
| `spring` (`stiffness: 300, damping: 30`) | Polaroid trong chồng ảnh xếp lại |

## Mẫu vào/ra

| Thành phần | Vào | Ra |
|---|---|---|
| Hộp thoại | `opacity 0→1`, `scale 0.95→1`, `y 20→0`, spring 0.5s | ngược lại |
| Lớp phủ hộp thoại | `opacity 0→1` | `opacity 1→0` |
| Menu thả (chọn ngôn ngữ) | `opacity 0→1`, `y -6→0`, `scale 0.97→1`, 150ms ease-out, gốc phóng ở góc trên phải | ngược lại |
| Hiện dần khi cuộn | `opacity 0→1`, `translate-y-10→0`, 700ms ease-out; card trong lưới trễ dần theo `delay` | Không ra (`triggerOnce`) |
| Khối CTA | `opacity 0→1`, `scale 0.95→1`, 700ms | Không ra |
| Thanh thông báo bị đóng | `max-h-20→0`, `opacity 1→0`, 300ms, rồi gỡ khỏi DOM | |
| Hộp ảnh: chế độ chồng ↔ lưới | Chồng: `scale 0.8→1`; lưới: `scale 0.95→1` | Chồng: `scale 1→1.2`; lưới: `scale 1→0.95` (`AnimatePresence mode="wait"`) |
| Đồ trang trí trên Showtime (logo, công tắc, máy phát) | `opacity 0→1`, `scale 0.8→1`, 0.5s, trễ 1s | ngược lại |

## Hiệu ứng rê và nhấn

| Sân khấu | Rê | Nhấn |
|---|---|---|
| Giới thiệu | Nút chính `hover:scale-105` + bóng ấm; card `hover:-translate-y-2` + viền `amber-300` + `shadow-soft-lg` | Nút lớn Unwrap `active:scale-[0.98]` |
| Khung app | Chỉ đổi màu nền/chữ; card album `hover:-translate-y-1` + `shadow-soft-lg`, ảnh bìa phóng 105% trong 700ms | Đổi màu nền (`active:bg-amber-700`) |
| Album | Ảnh nổi bật bớt nhuộm sepia; nhãn địa điểm phóng icon 110%, chữ 105% | Kéo mép trang để gấp giấy |

Luật: khung app **không** phóng to nút khi rê (đã có ngoại lệ `hover:-translate-y-0.5` ở nút "Create Album", nên bỏ, xem [can-sua.md](../can-sua.md)).

## Chuyển động lặp

| Hiệu ứng | Định nghĩa | Dùng ở |
|---|---|---|
| `animate-float` | `translateY 0 → -20px → 0`, 6s, ease-in-out, lặp vô hạn | Khối mờ và polaroid ở Unwrap, minh hoạ album hero |
| Icon bay | `opacity [0,1,0.8]`, `scale [0,1.2,1]`, `y [0,-20,-40]`, lắc ngang ±10px, 3–4s, lặp đảo chiều | FloatingIcons trong nghi thức |
| Icon trong máy phát | `animate-bounce` hoặc `animate-pulse` ngẫu nhiên, 4–6s | GlassPlayer |
| Vạch nhạc | 3 vạch `animate-pulse` khi đang phát | GlassPlayer cỡ `md` |

Chuyển động lặp chỉ có ở sân khấu giới thiệu và album, không ở khung app. Mỗi màn tối đa một nhóm chuyển động lặp lớn (khối nền trôi *hoặc* icon bay, không cả hai cùng lúc).

## Giảm chuyển động

Hiện chưa xét `prefers-reduced-motion`. Luật khi bổ sung (đề xuất P6):

- Tắt: `animate-float`, icon bay, icon trong máy phát, phóng to khi rê, nhấc card.
- Giữ: đổi màu, mờ dần vào/ra (rút còn 150ms), lật trang (thao tác chính của sản phẩm).
- Nghi thức mở quà rút còn: màn chuẩn bị → màn che mở (1s) → sách. Bỏ lời mở đầu chạy chữ thì vẫn hiện lời mở đầu tĩnh 2 giây.
