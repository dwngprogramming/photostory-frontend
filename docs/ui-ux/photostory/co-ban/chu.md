# Chữ

## Ba họ font

Nạp qua `next/font/google` trong `src/app/layout.tsx`, gắn vào `@theme` trong `globals.css`.

| Class | Font | Biến | Nạp | Vai |
|---|---|---|---|---|
| `font-serif` | Playfair Display | `--font-playfair` | subset `latin`, độ đậm mặc định | Logo, tên trang, tiêu đề, tên album, chú thích ảnh nghiêng |
| `font-story` | Merriweather | `--font-merriweather` | subset `vietnamese`; 300, 400, 700, 900; thường + nghiêng | Nội dung câu chuyện, lời tựa, lời kết (markdown) |
| `font-sans` | Inter | `--font-inter` | subset `latin` | Mọi thứ còn lại: nút, nhãn, ô nhập, số liệu, mô tả |

Luật:

- **Serif để kể, sans để làm.** Thứ người dùng *đọc như một câu chuyện* dùng serif; thứ người dùng *bấm, nhập, so sánh* dùng sans. Số liệu (ô thống kê) luôn sans.
- Không đặt hai font serif cạnh nhau ở cùng cỡ: Playfair cho tiêu đề, Merriweather cho thân bài.
- Playfair và Inter mới nạp subset `latin`. Tiếng Việt có dấu vẫn hiện nhờ font dự phòng nhưng dấu có thể lệch nét; xem [can-sua.md](../can-sua.md).

## Thang chữ theo vai

### Sân khấu giới thiệu

| Vai | Class | Font |
|---|---|---|
| Tiêu đề hero | `text-4xl md:text-5xl lg:text-6xl font-bold leading-tight` | serif, một cụm chữ nhấn `text-amber-500 italic` |
| Tiêu đề khối (Features, How it works, CTA) | `text-3xl md:text-4xl lg:text-5xl font-bold` (CTA tới `6xl`) | serif |
| Tiêu đề Unwrap | `text-3xl md:text-4xl lg:text-5xl font-bold leading-tight` | serif |
| Đoạn dẫn | `text-lg md:text-xl leading-relaxed` | sans, `stone-600` |
| Tiêu đề card tính năng | `text-xl font-bold` | serif |
| Thân card | `text-base leading-relaxed` | sans, `stone-600` |
| Số bước | `text-5xl font-bold` | serif, `amber-600` |
| Link điều hướng | `text-base font-medium` | sans |

### Khung app

| Vai | Class | Font |
|---|---|---|
| Tên trang | `text-4xl font-bold` | serif, `stone-900` / tối `white` |
| Mô tả dưới tên trang | `text-base` | sans, `stone-500` |
| Tiêu đề hộp thoại | `text-2xl font-bold` | serif |
| Tiêu đề trạng thái rỗng | `text-2xl font-bold` | serif |
| Tên album trên card | `text-lg font-bold line-clamp-1` | serif |
| Số trên ô thống kê | `text-2xl font-bold` | sans |
| Tiêu đề khối nhỏ | `text-base font-semibold` | sans |
| Mục sidebar | `text-sm font-medium` | sans |
| Nhãn, chữ phụ | `text-sm` | sans, `stone-500` |
| Chữ nhỏ (email, nhãn trên ảnh) | `text-xs` | sans |

### Trong album

| Vai | Class | Font |
|---|---|---|
| Tên album trên bìa | `text-5xl font-bold` + `.gold-foil` | serif |
| Tên album trang giới thiệu | `text-4xl font-bold` | serif, `stone-900` |
| Tiêu đề trang (Mục lục, Lời tựa, Lời kết) | `text-2xl font-bold text-center` | serif, `stone-900` |
| Tên câu chuyện | `text-[26px] font-bold leading-snug` | serif |
| Ngày lớn | `text-3xl leading-none` | serif |
| Nhãn đầu trang | `text-xs font-bold uppercase tracking-widest` | sans, `amber-600`, gạch dưới `amber-600/30` |
| Thân câu chuyện | `prose prose-sm leading-loose tracking-wide` | story (Merriweather) |
| Chú thích ảnh polaroid | `text-sm italic` | serif, `stone-600` |
| Lời gửi trên flap ("Dear …,") | `text-2xl italic` | serif, `amber-300` |
| Số trang | `text-xs` | sans, `gray-400` (nên `stone-400`) |
| Chữ phụ trong album (ngày mục lục, thời tiết) | `text-[11px] tracking-wide` hoặc `uppercase tracking-widest` | sans |

### Nghi thức mở quà

| Vai | Class |
|---|---|
| Lời mở đầu dòng 1 | `text-3xl md:text-5xl font-serif font-bold tracking-wide` + gradient chữ đồng |
| Lời mở đầu dòng 2 | `text-2xl md:text-4xl font-normal`, `amber-800/90` / tối `amber-400/90` |
| Tiêu đề màn chuẩn bị | `text-2xl md:text-4xl font-serif font-bold` + gradient chữ đồng |
| Mô tả màn chuẩn bị | `text-sm md:text-base uppercase tracking-widest`, `amber-800/60` / tối `amber-400/60` |

## Cỡ lẻ

Code đang có `text-[11px]`, `text-[13px]`, `text-[26px]`, `text-[10px]`. Luật cho phần mới:

- Khung app và sân khấu giới thiệu: chỉ dùng thang Tailwind (`xs` 12, `sm` 14, `base` 16, `lg` 18, `xl` 20, `2xl` 24…). Không cỡ lẻ.
- Bên trong trang album: cho phép `11px` (chữ phụ in hoa giãn), `13px` (thân flap) và `26px` (tên câu chuyện) vì trang sách có kích thước cố định, cần nhịp chữ riêng. Không thêm cỡ lẻ khác.
- Không dùng chữ dưới 11px cho nội dung có nghĩa (`text-[10px]` trên nhãn "Bài chủ đề" là ngoại lệ đang chờ sửa).

## Định dạng

| Thứ | Tiếng Việt | Tiếng Anh | Ở đâu |
|---|---|---|---|
| Ngày trong mục lục | `dd/MM/yyyy` (15/10/2025) | `MMM d, yyyy` (Oct 15, 2025) | `date-fns` + locale `vi` / `enUS` |
| Ngày ký trên flap | `toLocaleDateString(locale)` | như trái | FrenchFlap |
| Số thống kê | Hiện dùng `toLocaleString('en-US')` cho mọi ngôn ngữ | | Nên theo locale: vi `1.234`, en `1,234` |
| Dung lượng | `{số}GB / {tổng}GB`, số đang dùng đậm | | StatsOverview |
| Mã quà (code) | `font-mono`, in hoa, nối bằng gạch ngang (`FROM-DUNGPHAM-WITH-LOVE`) | | Unwrap |
| PIN | 6 ký tự, ô nhập giãn chữ `tracking-[0.5em]` | | PinInputModal |
