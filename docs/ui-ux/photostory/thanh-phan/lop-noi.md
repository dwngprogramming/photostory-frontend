# Lớp nổi

## Hộp thoại

Mọi hộp thoại bọc trong `ModalWrapper` (`src/components/Common/ModalWrapper.tsx`). Vỏ lo: portal vào `body`, lớp phủ, khoá focus trong hộp, Esc để đóng, trả focus về chỗ cũ khi đóng. Nội dung tự lo giao diện và hiệu ứng vào/ra.

| Tham số | Mặc định | Khi nào đổi |
|---|---|---|
| `closeOnBackdrop` | `true` | Tắt khi hộp đòi người dùng làm xong mới đóng (PIN, xác nhận, form có dữ liệu) |
| `overlayClassName` | `bg-black/40 backdrop-blur-sm` | Hộp ảnh toàn màn dùng `bg-stone-900/80 backdrop-blur-sm` |
| `ariaLabel` | `"Dialog"` | **Luôn** truyền tên thật của hộp |

### Hộp thoại thông báo / nhập ngắn

Mẫu: `DemoNotifyModal`, `PinInputModal`.

```
┌────────────────────────────────┐
│                             ×  │  ← nút đóng tròn, góc trên phải
│            ( icon )            │  ← ô tròn 48px amber-100, icon 24px amber-600
│        Tiêu đề hộp thoại       │  ← serif 2xl bold, căn giữa
│   Mô tả ngắn một hai câu.      │  ← text-sm stone-500, căn giữa
│                                │
│  [ ô nhập 48px            ]    │
│  [ Nút chính 48px  →      ]    │
│  [ Để sau (nút chữ)       ]    │
└────────────────────────────────┘
```

| Phần | Giá trị |
|---|---|
| Rộng | `w-full max-w-md` (448px) |
| Nền, viền | `white` / tối `stone-900`, viền `stone-200` / tối `stone-800` |
| Bo, bóng | `rounded-2xl shadow-2xl` |
| Đầu | `p-6 pb-0 text-center` |
| Thân | `p-6`, các phần cách `gap-3` / `space-y-4` |
| Nút | Xếp dọc, rộng hết, nút chính trên, nút phụ dưới |
| Vào/ra | Spring 0.5s: `opacity 0→1`, `scale 0.95→1`, `y 20→0` |

### Hộp ảnh toàn màn

Mẫu: `AlbumPhotoModal`. Không có khung hộp; nội dung đứng thẳng trên lớp phủ tối.

- Nút đóng cố định góc trên phải màn, tròn, `bg-stone-800/50`.
- Chế độ **chồng**: chồng polaroid phóng 120% (từ `md` 130%), dòng hướng dẫn serif nghiêng `white/80` phía trên, bộ đếm `n / tổng` `text-sm stone-300` phía dưới.
- Chế độ **lưới**: khối `stone-100` / tối `stone-800`, `rounded-lg shadow-2xl max-w-4xl max-h-[90vh]`, cuộn bên trong, đầu dính (nút quay lại + tiêu đề serif 2xl + ngày), lưới 1 → `sm` 2 → `md` 3 cột polaroid có băng dính.

## Menu thả

Mẫu: `LanguageToggle`.

| Phần | Giá trị |
|---|---|
| Vị trí | `absolute right-0 mt-2`, gốc phóng `origin-top-right` |
| Rộng | `w-40` (160px) |
| Khung | `rounded-xl bg-white` / tối `stone-800`, `shadow-lg`, viền bằng `ring-1 ring-stone-200` / tối `ring-stone-700` |
| Mục | `px-4 py-2 text-sm`, `gap-3` giữa icon và chữ; rê `bg-stone-100` / tối `stone-700` |
| Mục đang chọn | `bg-amber-50 text-amber-600 font-medium` / tối `bg-amber-900/20 text-amber-500` |
| Đóng | Bấm ra ngoài; chọn xong tự đóng |
| Vào/ra | 150ms ease-out, `y -6→0`, `scale 0.97→1` |

Menu cần thêm: Esc để đóng, phím mũi tên đi giữa các mục, `role="menu"` (chưa có).

## Toast

Dùng `sonner` (`src/components/Common/AppToaster.tsx`), một chỗ duy nhất ở `layout.tsx`.

| Tham số | Giá trị |
|---|---|
| Vị trí | Giữa trên (`top-center`) |
| Màu | `richColors` (màu trạng thái của sonner) |
| Thời gian | 5 giây |
| Nút đóng | Có |
| Chữ | 14px, đệm `12px 20px` |
| Chế độ | Theo `next-themes` |

Luật:

- Chỉ gọi `toast` từ `sonner`. Không import `react-hot-toast` (My Albums đang import nhầm, toast không hiện).
- Toast cho kết quả của thao tác (đã lưu, mã sai, lỗi mạng). Không dùng toast để giải thích tính năng.
- Lỗi kiểm dữ liệu của một ô nhập đặt dưới ô đó, không dùng toast (Unwrap đang dùng toast cho lỗi độ dài mã; chấp nhận vì màn chỉ có một ô).

## Thanh thông báo

`NoticeBar` (`src/components/Common/NoticeBar.tsx`), cấu hình ở `src/constants/noticeBarConfig.ts`.

- Dải ngang hết bề rộng, đặt trên cùng trang, `px-4 py-2 text-sm`, viền dưới, chữ căn giữa.
- Năm tông: `accent`, `success`, `warning`, `danger`, `default` (bảng màu ở [mau-sac.md](../co-ban/mau-sac.md#màu-trạng-thái)).
- Link trong thanh: gạch chân, `font-medium`.
- Đóng được nếu `closable`; thu lại trong 300ms. Đã đóng chỉ nhớ trong phiên (chưa lưu lại khi tải lại trang).
- Bật theo trang qua `enabled: { landing, application }`.

## Tour hướng dẫn

`driver.js`, các bước ở `src/libs/driverjs/tourConfigs.ts`, tự chạy khi Showtime xong pha `REVEALED`.

- Gắn vào phần tử bằng `id`: `#theme-music-player`, `#theme-toggle`, `#album-digital`. Đổi `id` thì sửa cả tour.
- Trong lúc tour chạy, sách không nhận bấm (`onClickCapture` chặn) và lớp lật trang tắt.
- Popover đang dùng giao diện mặc định của `driver.js` (`driver.js/dist/driver.css`). Nên tô lại theo bảng màu: nền `white` / tối `stone-900`, tiêu đề serif, nút "Tiếp" là nút chính nhỏ.
- Chữ các bước đang viết cứng tiếng Việt; cần chuyển sang `next-intl`.
