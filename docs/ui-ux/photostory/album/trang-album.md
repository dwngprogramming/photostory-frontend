# Trang album

## Cuốn sách

`DigitalAlbum` dùng `react-pageflip`.

| Thông số | Giá trị |
|---|---|
| Cỡ gốc một trang | 400×550px, co giãn (`size="stretch"`) trong khoảng rộng 300–500, cao 400–600 |
| Khung chứa | `max-w-4xl`, cao 600px (`h-150`), căn giữa màn |
| Lật | 750ms, có bóng (`drawShadow`, đậm tối đa 10%) |
| Bìa | `showCover`: bìa trước, bìa sau đứng một mình |
| Điện thoại | Một trang (`usePortrait`) |
| Máy tính | Hai trang; khi đang ở bìa, sách dịch nửa trang để bìa nằm giữa, dịch về giữa khi mở (750ms ease-in-out) |
| Thao tác lật | Chỉ vùng mép trang: 15% bề rộng trang, tối thiểu 36px (`FlipInputLayer`). Chạm nhanh dưới 250ms là vuốt, giữ lâu hơn là kéo gấp góc. Phím ← → lật trang |
| Giữa trang | Nhận bấm, kéo bình thường (chồng ảnh, máy phát, cuộn chữ) |

Phát nhạc chủ đề lần đầu khi người đọc chạm vào bìa (cần thao tác người dùng để trình duyệt cho phát tiếng).

## Thứ tự trang

| # | Trang | Mặt | Nội dung |
|---|---|---|---|
| — | Bìa trước | phải (đứng một mình) | Tên album ép kim; bấm để mở |
| — | Trang chào | trái | Flap đầu: avatar, "Dear {người nhận},", lời nhắn, nơi và ngày ký |
| — | Trang giới thiệu | phải | Tên album serif 4xl, mô tả, `© {năm} Photostory` ở chân |
| — | Mục lục | trái | "Những câu chuyện kể": tên chuyện + ngày, dấu chấm dẫn, số trang |
| — | Trang trắng | phải | |
| 1 | Lời tựa | trái | "Đôi lời xin chào ~" + khung chữ cuộn cao 440px |
| 2 | Ảnh nổi bật | phải | Một ảnh lớn có băng dính |
| 3, 5, … | Câu chuyện — trang ảnh | trái | Nhãn đầu trang, chồng ảnh, máy phát nhạc, địa điểm |
| 4, 6, … | Câu chuyện — trang chữ | phải | Nhãn đầu trang, tên chuyện + ngày + thời tiết, khung chữ cuộn cao 360px |
| — | Lời kết (nếu có) | trái | "Sau cùng thì..." + markdown |
| — | Trang cuối | phải | Flap cuối: về Photostory |
| — | Bìa sau | trái (đứng một mình) | Trống |

Mỗi câu chuyện chiếm đúng **một cặp trang** (ảnh bên trái, chữ bên phải). Câu chuyện dài thì cuộn trong khung chữ, không tràn sang trang mới.

## Khung một trang

`AlbumPage`:

```
┌──────────────────────────┐
│   TÊN CÂU CHUYỆN         │  ← nhãn đầu trang: xs bold uppercase tracking-widest
│   ───────────            │    amber-600, gạch dưới amber-600/30
│                          │
│   [nội dung]             │  ← flex-1
│                          │
│           3              │  ← số trang: xs, giữa, gray-400
└──────────────────────────┘
```

- Nhãn đầu trang chỉ có ở trang câu chuyện (cả hai mặt cùng tên chuyện).
- Số trang chỉ có từ lời tựa trở đi.

## Mục lục

- Tiêu đề `text-2xl font-serif font-bold text-center`, cách dưới 24px.
- Mỗi dòng: tên chuyện `font-serif font-semibold text-lg stone-900`, ngày dưới tên `text-[11px] stone-500 tracking-wide`; dấu chấm dẫn là viền dưới 2px chấm `stone-300` co giãn; số trang `font-semibold stone-900`.
- Các dòng cách nhau 24px.
- Lời tựa và lời kết không có ngày.

## Trang chữ của câu chuyện

```
┌──────────────────────────────────┐
│ Tên câu chuyện           10      │  ← serif 26px bold │ serif 3xl
│ có thể hai dòng     THÁNG 12, 2025│                    │ 11px uppercase
│                      Nắng đẹp ☀  │                    │ xs stone-600 + icon 16px
│ - - - - - - - - - - - - - - - -  │  ← viền dưới nét đứt stone-400
│                                  │
│ Thân câu chuyện (Merriweather,   │
│ prose-sm, leading-loose)…        │
│              [Cuộn xuống ▾]      │
└──────────────────────────────────┘
```

Cột ngày và thời tiết rộng tối đa 110px, căn phải. Ngày và tháng đang viết cứng ("10", "Tháng 12, 2025"); phải lấy từ `eventDate` của câu chuyện và định dạng theo ngôn ngữ.

## Trang ảnh của câu chuyện

Ba khối xếp dọc cách 24px:

1. Chồng ảnh (cao 256px) — bấm mở hộp ảnh toàn màn.
2. Khối nhạc: chip "Music" + "Powered by SoundCloud", máy phát kính cỡ `md`.
3. Khối địa điểm: chip "Location" + "Using Google Maps", các nhãn địa điểm cỡ `sm`.

Câu chuyện không có nhạc hoặc không có địa điểm thì bỏ hẳn khối đó, không để khối rỗng.

## Khung chữ cuộn

`ScrollableMarkdown`: markdown (GFM, xuống dòng giữ nguyên) trong khung cao cố định.

| Phần | Giá trị |
|---|---|
| Chữ | `prose prose-sm font-story leading-loose tracking-wide`, căn trái |
| Cuộn | Ẩn thanh cuộn (`no-scrollbar`) |
| Khi tràn | Thêm đệm dưới 48px; nút tròn nhỏ ở giữa đáy: chưa tới đáy là "Cuộn xuống ▾" nền `stone-800/80`, tới đáy là "Về đầu ⤒" nền `amber-500` |
| Cao | Lời tựa 440px, câu chuyện 360px |

Lớp mờ dần ở đáy khi chưa cuộn hết đã có khung nhưng chưa có màu; nên thêm gradient từ trong suốt sang màu giấy.
