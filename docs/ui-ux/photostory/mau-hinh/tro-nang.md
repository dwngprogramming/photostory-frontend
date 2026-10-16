# Trợ năng

Photostory nhiều hiệu ứng, nên phần này là điều kiện để hiệu ứng được giữ lại.

## Tương phản

Bảng đo ở [mau-sac.md](../co-ban/mau-sac.md#tương-phản-đã-đo). Mức tối thiểu:

- Chữ có nghĩa: 4,5:1 (chữ lớn từ 24px hoặc từ 18,66px đậm: 3:1).
- Icon mang nghĩa, viền ô nhập: 3:1.
- Placeholder, chữ trang trí, icon bay: không bắt buộc.
- Chữ trên ảnh: luôn có lớp đệm (nền `black/40` mờ, hoặc kính trắng) phía sau.

## Focus

- Ô nhập: vòng `ring-2` màu `amber-500` (Unwrap: viền `amber-400` + vòng 4px `amber-100/50`).
- Nút, công tắc, menu: `focus:ring-2 focus:ring-amber-400 focus:outline-none`. Dùng `focus-visible:` thay `focus:` cho phần mới để vòng chỉ hiện khi đi bằng phím.
- Nút trên nền ảnh tối: vòng `ring-white/80`.
- Không tắt `outline` mà không có vòng thay thế (nhiều nút icon, mục sidebar, card album đang thiếu).

## Bàn phím

| Chỗ | Phím |
|---|---|
| Hộp thoại | Tab đi vòng trong hộp; Esc đóng; mở thì focus phần tử đầu tiên; đóng thì trả focus |
| Ô nhập mã | Enter để gửi |
| Sách | ← → lật trang |
| Menu thả | Cần thêm: Esc đóng, ↑ ↓ đi giữa mục |
| Card album | Cần thêm: card là `button` hoặc `a` để Tab tới được, Enter để mở |
| Chồng ảnh trong hộp | Cần thêm: ← → thay cho vuốt |

## Nhãn cho trình đọc màn hình

- Nút chỉ có icon: luôn có `aria-label` đi qua i18n ("Mở menu", "Đóng", "Lọc", "Sắp xếp", "Xem dạng lưới").
- Hộp thoại: `ariaLabel` là tên hộp, không để mặc định `"Dialog"`.
- Đồ trang trí (khối mờ, polaroid bay, icon bay, băng dính, ruy băng): `aria-hidden`.
- Ảnh người dùng: `alt` là chú thích ảnh; không có chú thích thì `alt=""` thay vì tên tệp.
- Lớp lật trang có `aria-hidden`; vì vậy sách phải đi được bằng phím (đã có ← →).

## Giảm chuyển động

**Đề xuất P6.** Khi `prefers-reduced-motion: reduce`:

- Tailwind: thêm `motion-safe:` trước lớp chuyển động lặp và lớp phóng/nhấc (`motion-safe:animate-float`, `motion-safe:hover:scale-105`).
- framer-motion: dùng `useReducedMotion()`; khi bật thì vào/ra chỉ mờ dần 150ms.
- Nghi thức mở quà rút gọn như [chuyen-dong.md](../co-ban/chuyen-dong.md#giảm-chuyển-động).
- Lật trang giữ nguyên.

## Âm thanh

- Không tự phát tiếng khi chưa có thao tác người dùng; nhạc chủ đề phát khi chạm bìa hoặc mép trang đầu.
- Luôn có nút dừng nhìn thấy được khi đang phát (máy phát chủ đề ở đầu màn).
- Chưa có chỉnh âm lượng; nếu thêm, đặt trong máy phát chủ đề.
