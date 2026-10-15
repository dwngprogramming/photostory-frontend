# Thương hiệu

## Tên

- Viết **Photostory** (một từ, chữ P hoa). Không viết "PhotoStory", "Photo Story". Trong câu mô tả có thể gọi sản phẩm là "photo-story" khi nói về thể loại (như `noticeBar.nowDemoOnly.message`), nhưng tên riêng luôn là Photostory.
- Tiêu đề tab: `Tên màn | Photostory` (ví dụ `My Albums | Photostory`, `(Demo) Unwrap Your Photostory | Photostory`). Trang gốc: `Photostory - Preserve Your Memories`.
- Tên miền: `photostory.space` (ghi ở trang flap cuối album).
- Câu ký: "Made by Dung Pham" (flap cuối), "© {năm} Photostory. Tạo ra với ❤️ của Dũng Phạm để lưu giữ kỷ niệm." (bản quyền, có trong `vi.json` / `en.json`).

## Biểu tượng

Hiện dùng icon `Book` của `lucide-react`, tô `text-amber-500`, đặt trước chữ Photostory.

```tsx
<div className="flex items-center gap-2">
  <Book className="w-8 h-8 text-amber-500"/>
  <span className="text-xl font-bold font-serif text-stone-800 dark:text-stone-100">Photostory</span>
</div>
```

| Chỗ đặt | Icon | Chữ | Màu chữ |
|---|---|---|---|
| Thanh điều hướng landing, footer, sidebar | 32px (`w-8 h-8`) | `text-xl` 700 serif | `stone-800` / tối `stone-100` |
| Thanh trên điện thoại (khung app) | Không icon | `text-lg` 700 serif | `stone-800` / `stone-100` |
| Đầu màn Unwrap | 40 → 48 → 56px theo `md`, `lg` | `text-2xl → 3xl → 4xl` | `stone-800` / `stone-100`, có quầng sáng `amber-400/20` mờ 2xl phía sau |
| Showtime (trên nền ảnh tối) | 32px | `text-xl` 700 serif | `white` / tối `stone-200` |
| Flap cuối album | 32px trong vòng tròn `stone-800/50` viền `stone-500` | `text-xl` 700 serif, `tracking-wide` | `white` |

Luật:

- Icon và chữ luôn đi cùng nhau, khoảng cách `gap-2` (8px). Chỉ thanh trên điện thoại được bỏ icon vì chật.
- Icon luôn màu `amber-500`, kể cả chế độ tối và trên nền ảnh.
- Chữ luôn Playfair Display đậm 700.

**Đề xuất P4:** `Book` là icon thư viện, nhiều sản phẩm khác cũng dùng. Nên vẽ biểu tượng riêng (gợi ý: cuốn sách mở có góc ảnh polaroid, hoặc hộp quà có gáy sách), xuất SVG một màu dùng `currentColor`, giữ cỡ và vị trí như bảng trên. `favicon.ico` hiện là mặc định của Next, thay cùng đợt.

## Màu thương hiệu

| Vai | Màu | Hex |
|---|---|---|
| Màu nhấn chính | `amber-500` | `#F59E0B` |
| Màu nhấn đậm (rê, nhấn) | `amber-600`, `amber-700` | `#D97706`, `#B45309` |
| Vàng kim (chỉ trong album) | ngoài palette | `#CFB53B` |
| Da bìa (chỉ trong album) | ngoài palette | `#3E2723` |
| Nền ấm | `stone-50`, `amber-50`, `orange-50` | `#FAFAF9`, `#FFFBEB`, `#FFF7ED` |

Vàng kim và da bìa **chỉ nằm trong cuốn album** (bìa, viền bìa, đường chỉ). Không dùng làm màu nút hay màu chữ ở khung app.

## Hình ảnh

- Ảnh mùa (`public/images/seasons/{spring,summer,winter}`) cho minh hoạ album ở landing.
- Ảnh nền căn phòng (`public/images/showtime/vintage-background.jpg`), da bìa (`album-cover/leather-cover-black.jpg`), giấy (`page/normal-paper.jpg`) cho Showtime.
- Ảnh minh hoạ có thể nhuộm nhẹ (`sepia-[0.15]`, `mix-blend-multiply`) để hợp tông ấm; ảnh người dùng thì để nguyên khi họ rê hoặc mở to.
