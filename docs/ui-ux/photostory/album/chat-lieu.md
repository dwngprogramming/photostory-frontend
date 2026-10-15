# Chất liệu trong album

Cuốn album trên Showtime được dựng như đồ vật thật. Mỗi chất liệu có một công thức cố định; thêm trang mới thì ghép từ các chất liệu này, không chế thêm.

## Nền căn phòng

- Ảnh `public/images/showtime/vintage-background.jpg`, phủ kín (`object-cover`), phóng 105% để mép mờ không lộ.
- Làm mờ 6px (`blur-[6px]`); độ sáng 80% ở chế độ sáng, 30% ở chế độ tối.
- Nền trang dưới ảnh: `stone-100` / tối `stone-950`.

Chế độ tối chỉ làm tối căn phòng; cuốn sách giữ nguyên.

## Bìa da

Lớp `.texture-leather` trong `globals.css`, dùng cho `AlbumCover` (bìa trước, bìa sau; `data-density="hard"` để lật cứng).

| Lớp | Công thức |
|---|---|
| Da | `url('/images/showtime/album-cover/leather-cover-black.jpg')`, `cover`, hoà trộn `multiply` |
| Bóng gáy | `linear-gradient(to right, rgba(0,0,0,.6), rgba(255,255,255,.1) 20%, rgba(0,0,0,.4))` |
| Ánh gáy | Dải 16px sát gáy, gradient `white/20 → trong suốt` |
| Đường chỉ | Vạch dọc 2px `#cfb53b` 50%, cách mép ngoài 20px |
| Khung | Viền ngoài 1px `#cfb53b` 30%, cách 8px, viền trong `.gold-border` (2px `#cfb53b` + quầng vàng trong và ngoài 5px) |
| Góc | Ký tự `╔ ╗ ╚ ╝` màu `#cfb53b` 80%, cách góc 8px |
| Bo | Chỉ bo phía ngoài: bìa trái `rounded-l-lg`, bìa phải `rounded-r-lg` |

Còn một lớp `.album-skin` (da nâu `#3e2723` + chấm sáng giả vân da) khai báo sẵn trong `globals.css` nhưng chưa dùng; giữ làm phương án bìa nâu.

## Chữ ép kim

Lớp `.gold-foil`: chữ tô gradient dọc `#cfb53b → #fceabb → #cfb53b`, cắt theo chữ, bóng chữ 1px đen 50% cho cảm giác ép lún. Font Playfair Display.

Chỉ dùng cho **tên album trên bìa** (`text-5xl font-bold`). Không dùng ép kim cho chữ khác.

## Giấy

| Loại trang | Nền |
|---|---|
| Trang thường | Ảnh `public/images/showtime/page/normal-paper.jpg`, phủ kín |
| Trang có flap | Trắng trơn (flap đè lên) |

Mọi trang có:

- Bóng gáy: dải 32px sát gáy, gradient `stone-900/20 → trong suốt`, hoà trộn `multiply`.
- Bóng nổi `shadow-xl`.
- Bo rất nhỏ phía ngoài (`rounded-l-sm` / `rounded-r-sm`).
- Đệm trong 32px (`p-8`).

Chữ trên giấy **luôn** màu tối cố định: tiêu đề `stone-900`, chữ thường `stone-600`, thân câu chuyện `slate-700` (nên đổi `stone-700`), không có biến thể `dark:`.

## Flap (nắp gập)

Nắp gập kiểu sách bìa mềm Pháp, đè lên trang đầu (`StartFrenchFlap`) và trang cuối (`EndFrenchFlap`).

| Phần | Giá trị |
|---|---|
| Rộng | 180px (`w-45`), cao hết trang |
| Nền | `stone-600`, bóng `shadow-xl shadow-black/70` |
| Nếp gấp | Dải 16px sát mép gập, gradient `stone-900/20`, `multiply` |
| Bo | Bo phía mở (`rounded-e-lg` / `rounded-s-lg`) |
| Đệm | `px-4 py-8`, nội dung chia trên/dưới |
| Chữ | Lời chào `text-2xl font-serif italic amber-300` ("Dear …,"); thân `text-[13px] stone-300`; chân nghiêng `text-[13px] italic stone-300` (nơi, ngày ký) |

Flap cuối: logo Photostory trong vòng tròn, tiêu đề nhỏ in hoa `amber-300` có gạch hai bên (`amber-500/50`), đoạn giới thiệu căn phải, chân có tên miền và "Made by" `text-[12px] stone-400` ngăn bằng viền `stone-500/30`.

## Polaroid

Khung ảnh in lấy liền, dùng ở chồng ảnh và lưới ảnh.

| Phần | Giá trị |
|---|---|
| Khung | Nền `white` (tối vẫn `stone-50`), viền 1px `stone-100` |
| Lề | 12px ba phía, 40px phía dưới (`p-3 pb-10`) |
| Ảnh | `object-cover`, nền `stone-100` khi chưa tải |
| Chú thích | Trong lề dưới, `font-serif italic text-sm stone-600`, căn giữa |
| Cỡ theo hướng ảnh | Ngang 240×176 (`w-60 h-44`), dọc 176×240 (`w-44 h-60`), vuông 208×208 (`w-52 h-52`) |
| Bóng | Tấm trên cùng `0 20px 30px -10px rgba(0,0,0,.3)`, tấm dưới `0 5px 15px -5px rgba(0,0,0,.1)` |

Polaroid trong lưới ảnh dùng ảnh vuông, `p-3 shadow-md`, có một miếng băng dính ở mép trên.

## Ảnh nổi bật

`HighlightImagePiece`: một ảnh lớn chiếm cả trang.

- Khung trắng, lề 12px (từ `md` 16px), `shadow-xl`, xoay 5°.
- Bốn miếng băng dính ở bốn góc.
- Ảnh nhuộm nhẹ: `sepia 15%`, `contrast 105%`, `brightness 95%`; rê thì về ảnh gốc trong 500ms.
- Lớp nhiễu hạt 6% (`mix-blend-overlay`) cho cảm giác ảnh in.
- Ba khung theo hướng ảnh: dọc 3:4, ngang 4:3, vuông 1:1, luôn nằm giữa trang và không tràn.

## Băng dính washi

`WashiTape`: một miếng ở mép trên (`count={1}`) hoặc bốn miếng chéo ở bốn góc (`count={4}`).

| Phần | Giá trị |
|---|---|
| Cỡ | 64×24px, từ `md` 96×32px |
| Màu | `amber-300/80` / tối `amber-800/80`, hoà trộn `multiply` |
| Mép | Hai đầu mờ dần (`mask-image` 5% mỗi đầu), viền trên/dưới 0,5px `white/20` |
| Vân | Lớp nhiễu hạt, `contrast 170%`, `brightness 90%`, `overlay` 50% |
| Góc | Giữa: 0° ±15°; góc: ±45° ±15°, ngẫu nhiên mỗi lần dựng |

Ảnh nhiễu hạt đang lấy từ `grainy-gradients.vercel.app`; nên tải về `public/` để không phụ thuộc bên ngoài.

## Đồ trang trí sân khấu giới thiệu

Không thuộc cuốn album nhưng cùng họ chất liệu:

- **Polaroid bay** (Unwrap): khung `white/50` / tối `stone-800/40`, `rounded-sm shadow-xl`, viền `stone-200/40`, kính mờ nhẹ, ảnh giả `stone-200/50` chiếm 3/4 trên; xoay −12° tới 15°; trôi `animate-float` lệch nhịp. Ẩn bớt trên màn hẹp.
- **Khối mờ** (Unwrap): hình tròn 256–500px, `amber-200/30`, `orange-200/25`… / tối `amber-900/20`, mờ `blur-3xl`, trôi lệch nhịp 1s.
- **Minh hoạ album** (hero): sách mở hai trang trên khung trắng viền 4px `stone-100`, `shadow-soft-xl`, trang trái ảnh mùa xoay −1° có nút nhạc và địa điểm, trang phải dòng chữ giả là các vạch `stone-800/30` xoay ±0,5°.
