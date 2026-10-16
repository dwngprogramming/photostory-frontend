# Màu sắc

Đếm trong `src/components` (15/10/2026): `stone` 478 lần, `amber` 269, `orange` 100, `yellow` 18; các họ khác dưới 15 lần, chủ yếu ở nhãn địa điểm và thanh thông báo. Bảng màu Photostory vì vậy là **đá ấm + hổ phách**, mọi thứ khác là ngoại lệ có lý do.

## Vai màu

### Trung tính (`stone`)

| Vai | Sáng | Tối | Dùng ở |
|---|---|---|---|
| Nền trang (khung app) | `stone-50` | `stone-950` | `PhotostoryShell`, footer |
| Nền trang (album) | `stone-100` | `stone-950` | `showtime.tsx`, `PreparingAlbum` |
| Bề mặt (card, sidebar, hộp thoại) | `white` | `stone-900` | Card, sidebar, modal |
| Bề mặt chìm (ô nhập, nút phụ, nền icon) | `stone-100` | `stone-800` | Ô tìm kiếm, nút icon đang chọn |
| Viền | `stone-200` | `stone-800` (`stone-700` trong card landing) | Card, sidebar, header |
| Viền nhạt (chia khối trong một bề mặt) | `stone-100` | `stone-800` | Đầu sidebar, chân sidebar |
| Chữ chính | `stone-800` (tiêu đề lớn `stone-900`) | `stone-100` | Tiêu đề, tên |
| Chữ thường | `stone-600` | `stone-300` | Đoạn mô tả, link điều hướng |
| Chữ phụ | `stone-500` | `stone-400` | Mô tả ngắn, nhãn ô số liệu, ngày |
| Chữ mờ, placeholder, icon phụ | `stone-400` | `stone-500` | Placeholder, nút đóng × |

### Màu nhấn (`amber`)

| Vai | Sáng | Tối |
|---|---|---|
| Nền nút chính | `amber-500` → rê `amber-600` → nhấn `amber-700` | giữ nguyên |
| Chữ, icon nhấn | `amber-500` (icon), `amber-600` (chữ) | `amber-400` |
| Nền nhạt (ô icon, mục đang chọn) | `amber-50` hoặc `amber-100` | `amber-900/20` hoặc `amber-900/30` |
| Viền nhấn (nút viền, viền khi rê) | `amber-400` (rê card: `amber-300`) | `amber-700` |
| Vòng focus | `ring-amber-400` (ô nhập: `ring-amber-500`) | giữ nguyên |
| Thanh cuộn | `#F59E0B`, rê `#D97706` | `#B45309`, rãnh `#1C1917` |

### Màu đi kèm (`orange`)

Chỉ dùng ở ba chỗ, không làm màu nhấn riêng:

1. Gradient cùng `amber`: nền hero, nền "How it works", nền CTA (`amber-400 → orange-400 → orange-500`), nút play (`amber-400 → orange-500`).
2. Chip nhỏ trên trang album: `bg-orange-100 text-orange-600 border-orange-200` (chip Music, Location), chip "Miễn phí" ở hero (`bg-orange-50 text-orange-600 border-orange-200`).
3. Trạng thái "đang phát" của máy phát nhạc: viền `orange-400/60`, quầng trong `rgba(251,146,60,0.5)`.

### Màu trạng thái

Hiện có ở `NoticeBar` (`src/components/Common/NoticeBar.tsx`) và toast `sonner` (`richColors`):

| Trạng thái | Nền | Chữ | Viền | Tối |
|---|---|---|---|---|
| `accent` (thông tin) | `blue-50` | `blue-800` | `blue-200` | `blue-950` / `blue-200` / `blue-800` |
| `success` | `green-50` | `green-800` | `green-200` | `green-950` / `green-200` / `green-800` |
| `warning` | `yellow-50` | `yellow-800` | `yellow-200` | `yellow-950` / `yellow-200` / `yellow-800` |
| `danger` | `red-50` | `red-800` | `red-200` | `red-950` / `red-200` / `red-800` |
| `default` | `gray-50` | `gray-800` | `gray-200` | `gray-900` / `gray-200` / `gray-700` |

Luật:

- Trạng thái dùng đúng bảng trên, không mượn `amber` để báo "cần chú ý" (dễ lẫn với màu nhấn). Cần chú ý dùng `yellow`.
- `default` nên đổi `gray` → `stone` cho khớp nền ấm (ghi ở [can-sua.md](../can-sua.md)).
- Nút đăng xuất rê sang `red-500`: chấp nhận vì là thao tác cắt phiên.

### Màu phân loại địa điểm

`GlassLocationBadge` có mười chủ đề, mỗi chủ đề một họ màu và một icon. Đây là **màu phân loại**, không phải màu trạng thái: chỉ nằm trên nhãn địa điểm, không lan ra nút hay nền khối.

| Chủ đề | Họ màu | Icon |
|---|---|---|
| `warm` | `orange` | `Sun` |
| `nature` | `green` | `Trees` |
| `ocean` | `sky` | `Waves` |
| `urban` | `slate` | `Building2` |
| `rural` | `yellow` | `Tractor` |
| `mountain` | `indigo` | `Mountain` |
| `tropical` | `teal` | `Palmtree` |
| `cafe` | `amber` | `Coffee` |
| `restaurant` | `red` | `UtensilsCrossed` |
| `standard` (mặc định) | `rose` | `MapPin` |

Công thức mỗi chủ đề: nền `{màu}-50/80` (rê `-100/90`), viền `{màu}-200/50` (rê `-300/70`), icon `{màu}-600`, chữ `{màu}-800` (`rural`, `cafe` dùng `-900`).

## Gradient

Gradient là một phần của thương hiệu ở sân khấu giới thiệu và album, nhưng chỉ có những công thức sau:

| Tên | Công thức | Dùng ở |
|---|---|---|
| Nền ấm | `bg-linear-to-br from-amber-50 via-orange-50 to-stone-50` / tối `from-stone-900 via-stone-900 to-stone-950` | Hero, Unwrap |
| Nền ấm dọc | `bg-gradient-to-b from-orange-50 via-amber-50 to-white` / tối như trên | How it works |
| Nắng chiều | `bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500` | Khối CTA |
| Chữ đồng | `bg-gradient-to-r from-amber-700 via-amber-900 to-amber-700` + `bg-clip-text` / tối `from-amber-200 via-amber-100 to-amber-200` | Lời mở đầu, màn chuẩn bị |
| Ruy băng | `from-yellow-600 via-amber-500 to-yellow-400` / tối `from-amber-500 via-amber-400 to-amber-200` | Dải ruy băng, vạch tách |
| Thanh dung lượng | `bg-gradient-to-r from-amber-400 to-amber-600` | Ô dung lượng My Albums |
| Ép kim | `linear-gradient(to bottom, #cfb53b, #fceabb 50%, #cfb53b)` | Tên album trên bìa (`.gold-foil`) |

Không dùng gradient cho nền card, nền nút chữ, nền khung app.

## Bóng

Khai báo trong `@theme` (`src/app/globals.css`):

| Token | Giá trị | Dùng khi |
|---|---|---|
| `shadow-soft` | `0 4px 20px rgba(245,158,11,0.08)` | Bóng ấm nhẹ |
| `shadow-soft-lg` | `0 10px 40px rgba(245,158,11,0.1)` | Card rê chuột, nút chính rê |
| `shadow-soft-xl` | `0 20px 60px rgba(245,158,11,0.12)` | Minh hoạ album hero, nút tạo album rê |
| `shadow-dark` | `0 4px 20px rgba(0,0,0,0.5)` | Bản tối của `soft` |
| `shadow-dark-lg` | `0 10px 40px rgba(0,0,0,0.6)` | Bản tối của `soft-lg` |
| `shadow-dark-xl` | `0 20px 60px rgba(0,0,0,0.7)` | Bản tối của `soft-xl`, menu điện thoại |
| `shadow-glow` | `0 0 20px rgba(251,191,36,0.5)` | Ruy băng chế độ tối |

Luật: thứ gì dùng `shadow-soft*` ở sáng thì thêm `dark:shadow-dark*` cùng bậc ở tối. Bóng ấm trên nền tối gần như vô hình.

## Tương phản đã đo

Theo WCAG 2.x, chữ thường cần 4,5:1, chữ lớn (từ 24px, hoặc từ 18,66px đậm) và icon cần 3:1.

| Chữ / icon | Nền | Tỉ lệ | Kết quả |
|---|---|---|---|
| `white` | `amber-500` (nút chính) | 2,15 | **Trượt** cả mức chữ lớn |
| `white` | `amber-600` | 3,19 | Chỉ đạt chữ lớn |
| `white` | `amber-700` | 5,02 | Đạt |
| `stone-950` | `amber-500` | 9,20 | Đạt |
| `amber-500` | `white` (icon, chữ nhấn) | 2,15 | **Trượt** cả mức icon |
| `amber-600` | `white` | 3,19 | Chỉ đạt chữ lớn, icon |
| `amber-600` | `amber-100` (mục sidebar đang chọn) | 2,86 | **Trượt** |
| `amber-700` | `white` | 5,02 | Đạt |
| `amber-400` | `stone-900` / `stone-950` | 10,48 / 11,83 | Đạt |
| `stone-400` | `white` (placeholder, chữ mờ) | 2,52 | Trượt; chấp nhận cho placeholder, không cho chữ có nghĩa |
| `stone-500` | `white` / `stone-50` | 4,80 / 4,59 | Đạt |
| `stone-500` | `stone-900` (chữ mờ ở tối) | 3,65 | **Trượt**; chữ có nghĩa ở tối dùng `stone-400` (6,93), `stone-500` chỉ cho placeholder |
| `stone-600` | `white` | 7,63 | Đạt |
| `orange-600` | `orange-100` (chip) | 3,11 | Trượt chữ 12px |
| `#CFB53B` | `#3E2723` (vàng kim trên da) | 6,80 | Đạt |
| `amber-300` | `stone-600` ("Dear …" trên flap) | 5,29 | Đạt |

Hướng sửa là **đề xuất P1, P2** trong [README.md](../README.md#đề-xuất-đang-mở); danh sách chỗ dính ở [can-sua.md](../can-sua.md).

## Token đề xuất

**Đề xuất P3**, chưa chốt. Khai báo token ngữ nghĩa trong `@theme`, component dùng `bg-surface`, `text-muted`… thay cho `bg-white dark:bg-stone-900`. Đổi tông sau này chỉ sửa một chỗ.

```css
@theme {
  --color-page: var(--color-stone-50);
  --color-surface: var(--color-white);
  --color-sunken: var(--color-stone-100);
  --color-line: var(--color-stone-200);
  --color-line-soft: var(--color-stone-100);
  --color-ink: var(--color-stone-800);
  --color-body: var(--color-stone-600);
  --color-muted: var(--color-stone-500);
  --color-faint: var(--color-stone-400);
  --color-accent: var(--color-amber-500);
  --color-accent-hover: var(--color-amber-600);
  --color-accent-ink: var(--color-amber-700);   /* chữ, link nhấn trên nền sáng (P2) */
  --color-accent-soft: var(--color-amber-50);
  --color-gold: #cfb53b;
  --color-leather: #3e2723;
}

.dark {
  --color-page: var(--color-stone-950);
  --color-surface: var(--color-stone-900);
  --color-sunken: var(--color-stone-800);
  --color-line: var(--color-stone-800);
  --color-line-soft: var(--color-stone-800);
  --color-ink: var(--color-stone-100);
  --color-body: var(--color-stone-300);
  --color-muted: var(--color-stone-400);
  --color-faint: var(--color-stone-500);
  --color-accent-ink: var(--color-amber-400);
  --color-accent-soft: color-mix(in oklab, var(--color-amber-900) 20%, transparent);
}
```

Bên trong trang giấy album **không** dùng token có bản tối (luật 5 ở [nguyen-tac.md](../nguyen-tac.md)); trang giấy viết thẳng `stone-900`, `stone-600`.
