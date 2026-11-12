# Thương hiệu

## Tên

- Viết **Photostory** (một từ, chữ P hoa). Không viết "PhotoStory", "Photo Story". Trong câu mô tả có thể gọi sản phẩm là "photo-story" khi nói về thể loại (như `noticeBar.nowDemoOnly.message`), nhưng tên riêng luôn là Photostory.
- Tiêu đề tab: `Tên màn | Photostory` (ví dụ `My Albums | Photostory`, `(Demo) Unwrap Your Photostory | Photostory`). Trang gốc: `Photostory - Preserve Your Memories`.
- Tên miền: `photostory.space` (ghi ở trang flap cuối album).
- Câu ký: "Made by Dung Pham" (flap cuối), "© {năm} Photostory. Tạo ra với ❤️ của Dũng Phạm để lưu giữ kỷ niệm." (bản quyền, có trong `vi.json` / `en.json`).

## Logo

Mark là chữ **P** ghép từ ống kính máy ảnh (photo) và đuôi bong bóng lời thoại (story). Logo ngang = mark + chữ "Photo" (Fraunces SemiBold 600, đứng) màu `amber-500` + chữ "story" (Caveat Bold 700) màu `stone-800` / tối `stone-100`. Chữ trong SVG đã chuyển thành path nên project **không nạp Fraunces**; Fraunces chỉ dùng trong logo.

Nguồn: brand kit `photostory-brand-kit/` (thư mục `resources` cạnh repo), có README hướng dẫn đầy đủ.

### Dùng trong code

Luôn dùng component `Logo` (`src/components/Common/Logo.tsx`), không ghép icon với chữ HTML.

```tsx
import Logo from "@/components/Common/Logo";

<Logo href="/" className="h-8 w-auto"/>          // tự đổi sáng/tối, là link về trang chủ (giữ ngôn ngữ)
<Logo variant="dark" className="h-8 w-auto"/>    // luôn bản cho nền tối
```

| Prop | Giá trị | Ghi chú |
|---|---|---|
| `variant` | `auto` (mặc định), `light`, `dark` | `auto` đổi theo lớp `.dark`; `light` = bản cho nền sáng, `dark` = bản cho nền tối |
| `className` | lớp chiều cao, ví dụ `h-8 w-auto` | Logo tỉ lệ ≈ 3,85 : 1 (32px cao → 123px rộng) |
| `href` | đường dẫn | Có thì logo là `Link` của next-intl; không có thì chỉ là ảnh |
| `wrapperClassName`, `onClick`, `priority` | | `priority` cho logo nằm ở màn đầu (Navbar, Unwrap) |

### Chỗ đặt

| Chỗ đặt | Bản | Cao |
|---|---|---|
| Thanh điều hướng landing, footer (link `/`) | `auto` | 32px (`h-8`) |
| Đầu sidebar (link `/my-albums`) | `auto` | 32px |
| Thanh trên điện thoại (khung app) | `auto` | 24px (`h-6`) |
| Đầu màn Unwrap, có quầng sáng `amber-400/20` mờ 2xl phía sau (link `/`) | `auto` | 40 → 48 → 56px theo `md`, `lg` |
| Showtime, trên trái | `dark` | 32px |
| Flap cuối album, căn giữa | `dark` | 32px |

### Luật

- Cao tối thiểu 24px cho logo ngang, 16px cho mark đứng riêng.
- Chừa khoảng trống quanh logo ít nhất bằng bề rộng nét đứng của chữ P.
- Nền sáng dùng bản sáng, nền tối dùng bản tối. Trên ảnh nhiều chi tiết hoặc nền vàng/cam: dùng mark đơn sắc.
- Không kéo méo, xoay, đổi màu từng phần, thêm bóng đổ hay gradient.
- Không gõ chữ "Photostory" bằng HTML cạnh icon để giả làm logo.

### File

| File | Chỗ |
|---|---|
| `public/brand/photostory-logo-light.svg`, `-dark.svg` | Logo ngang (component `Logo` dùng) |
| `public/brand/photostory-mark.svg` | Mark P màu `amber-500` |
| `public/brand/photostory-mark-mono-dark.svg`, `-mono-light.svg` | Mark đơn sắc (watermark, in, nền ảnh) |
| `src/app/favicon.ico`, `src/app/icon.svg` | Favicon; Next tự gắn thẻ `<link>` |
| `src/app/apple-icon.png` | Icon lưu ra màn hình chính iPhone |
| `src/app/opengraph-image.png` | Ảnh chia sẻ link 1200×630, bản nền tối |

Email, slide, mạng xã hội dùng bản PNG trong brand kit (`logo/`, `mark/`, `social/`).

## Màu thương hiệu

| Vai | Màu | Hex |
|---|---|---|
| Màu nhấn chính, mark P, chữ "Photo" | `amber-500` | `#FE9A00` |
| Chữ "story" của logo | `stone-800` / tối `stone-100` | `#292524` / `#F5F5F4` |
| Nền tối của app icon, ảnh OG | `stone-900` | `#1C1917` |
| Màu nhấn đậm (rê, nhấn) | `amber-600`, `amber-700` | `#E17100`, `#BB4D00` |
| Vàng kim (chỉ trong album) | ngoài palette | `#CFB53B` |
| Da bìa (chỉ trong album) | ngoài palette | `#3E2723` |
| Nền ấm | `stone-50`, `amber-50`, `orange-50` | `#FAFAF9`, `#FFFBEB`, `#FFF7ED` |

Vàng kim và da bìa **chỉ nằm trong cuốn album** (bìa, viền bìa, đường chỉ). Không dùng làm màu nút hay màu chữ ở khung app.

## Hình ảnh

- Ảnh mùa (`public/images/seasons/{spring,summer,winter}`) cho minh hoạ album ở landing.
- Ảnh nền căn phòng (`public/images/showtime/vintage-background.jpg`), da bìa (`album-cover/leather-cover-black.jpg`), giấy (`page/normal-paper.jpg`) cho Showtime.
- Ảnh minh hoạ có thể nhuộm nhẹ (`sepia-[0.15]`, `mix-blend-multiply`) để hợp tông ấm; ảnh người dùng thì để nguyên khi họ rê hoặc mở to.
