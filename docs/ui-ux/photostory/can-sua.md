# Chỗ code cần sửa

Rà ngày 15/10/2026 trên nhánh `feature/flip-edge-input`. Đường dẫn tính từ `src/components/` trừ khi ghi khác.

Mức: **Cao** là lỗi người dùng thấy ngay hoặc chạy sai; **Vừa** là lệch luật, khó đọc; **Thấp** là dọn cho nhất quán.

## Lỗi chạy sai

| Mức | Chỗ | Vấn đề | Sửa |
|---|---|---|---|
| Cao | `Application/User/MyAlbums/my-albums.tsx:4` | Import `toast` từ `react-hot-toast`, nhưng app chỉ gắn `<Toaster>` của `sonner` → toast không hiện | Import từ `sonner`; gỡ `react-hot-toast` khỏi `package.json` nếu không còn ai dùng |
| Cao | `Sidebar.tsx`, `my-albums.tsx`, `Navbar.tsx` | Dùng `animate-in fade-in`, `slide-in-from-right` nhưng chưa cài `tw-animate-css` → không có hiệu ứng | Cài `tw-animate-css` và `@import` trong `globals.css`, hoặc đổi sang framer-motion |
| Cao | `AlbumPermission/Guest/UnwrapAlbum/demo-unwrap-album.tsx`, `unwrap-album.tsx` | Dùng `animate-fade-in-up`, `animate-fade-in` chưa khai báo | Khai báo trong `@theme` cạnh `--animate-float`, hoặc bỏ |
| Vừa | `Application/Showtime/Album/Page/AlbumPage.tsx` | Lớp `custom-scrollbar` chưa khai báo | Bỏ (khung chữ đã tự ẩn thanh cuộn) |
| Vừa | `Application/Showtime/Album/Plugin/GlassLocationBadge.tsx` | `group-hover:border-sky- 300/70` có dấu cách → viền rê của chủ đề `ocean` không chạy | Sửa thành `group-hover:border-sky-300/70` |
| Vừa | `Application/Showtime/Album/Page/FrenchFlap.tsx:28` | Chuỗi class có `"}` thừa (`rounded-e-lg"}`) | Xoá `"}` |
| Vừa | `Application/Showtime/Album/Page/StoryPiece.tsx` | Ngày "10", "Tháng 12, 2025" viết cứng | Lấy từ `eventDate`, định dạng theo ngôn ngữ |
| Vừa | `Application/Showtime/Album/Plugin/StoryMusic.tsx` | Bỏ qua `storyMusicUrl`, luôn phát một link cố định | Truyền `storyMusicUrl` vào `GlassPlayer` |
| Vừa | `Application/Showtime/DigitalAlbum.tsx` | Hộp ảnh luôn mở ảnh của câu chuyện đầu (`album.stories[0]`); ảnh nổi bật dùng `picsum.photos` | Mở ảnh của câu chuyện được bấm; lấy ảnh nổi bật từ dữ liệu album |
| Vừa | `Application/Showtime/Album/Page/AlbumPhotoModal.tsx` | Tiêu đề "Kỷ Niệm", ngày "14/12/2025" viết cứng | Lấy tên, ngày câu chuyện |
| Vừa | `Application/Showtime/Album/Page/FrenchFlap.tsx` | `Intl.ListFormat('vi', …)` cố định tiếng Việt; "Dear" cố định tiếng Anh | Theo `locale`; đưa lời chào vào i18n |

## Màu và tương phản

| Mức | Chỗ | Vấn đề | Sửa |
|---|---|---|---|
| Cao | Mọi nút `bg-amber-500 text-white` | 2,15:1 | Đề xuất P1 |
| Vừa | Chữ, link `text-amber-500` / `text-amber-600` trên nền sáng (hero, card album rê, sidebar, nút chữ nhấn, nút viền) | 2,15 / 3,19:1 | Đề xuất P2: `amber-700` |
| Vừa | `Application/User/Layout/Sidebar.tsx` mục đang chọn | `amber-600` trên `amber-100` 2,86:1 | `text-amber-700` |
| Thấp | `Application/Showtime/Location.tsx` dòng "Using Google Maps" | Có biến thể `dark:text-stone-500` dù nằm trên trang giấy luôn sáng (luật 5) | Bỏ `dark:`; trang giấy không có bản tối |
| Thấp | `Common/NoticeBar.tsx` tông `default` dùng `gray` | Lệch nền ấm | `stone` |
| Thấp | `Album/Page/AlbumPage.tsx` số trang `text-gray-400`; `ScrollableMarkdown.tsx`, `AfterworkPiece.tsx` `text-slate-700` | Lệch họ trung tính | `stone-400`, `stone-700` |
| Thấp | `Common/SoundCloudIcon.tsx` `fill="#000000"` | Không đổi theo chế độ | `fill="currentColor"` |
| Thấp | Toàn bộ | 478 class `stone-*`, 269 `amber-*` viết thẳng | Đề xuất P3: token ngữ nghĩa |

## Chữ

| Mức | Chỗ | Vấn đề | Sửa |
|---|---|---|---|
| Vừa | `src/app/layout.tsx` | Inter và Playfair chỉ nạp subset `latin` → chữ Việt có dấu dùng font dự phòng | Thêm `'vietnamese'` vào `subsets` của cả hai |
| Thấp | `Album/Plugin/GlassPlayer.tsx` nhãn "Bài chủ đề" | Chữ 10px, màu `text-black` | `text-[11px]`, `stone-800` |
| Thấp | `Application/User/MyAlbums/StatsOverview.tsx` | Số định dạng `en-US` cho mọi ngôn ngữ | Theo `locale` |
| Thấp | `src/app/globals.css` `.gold-foil` | Viết cứng `font-family: 'Playfair Display'` (tên font của Google, không phải biến của `next/font`) | Dùng `var(--font-playfair)` |

## Song ngữ

Chữ đang viết cứng, cần đưa vào `vi.json` / `en.json`:

| Chỗ | Chữ |
|---|---|
| `Application/User/MyAlbums/my-albums.tsx` | "+ Create Album", "Search albums...", "Album saved successfully!", "Opened …" |
| `Application/User/MyAlbums/AlbumComponents.tsx` | "Open Album", "photos", giá trị `private` / `public` |
| `Application/User/Layout/Sidebar.tsx` | "Appearance" |
| `Application/Showtime/Location.tsx` | "Location", "Using", "Google Maps" |
| `Application/Showtime/Album/Plugin/StoryMusic.tsx` | "Music", "Powered by" |
| `Application/Showtime/Album/Plugin/GlassPlayer.tsx` | "Unknown Title", "Unknown Artist", "Bài chủ đề" |
| `Application/Showtime/Album/Plugin/ScrollableMarkdown.tsx` | "Cuộn xuống", "Về đầu" |
| `Application/Showtime/Album/Page/PrefacePiece.tsx`, `AfterworkPiece.tsx` | "Đôi lời xin chào ~", "Sau cùng thì..." (đã có khoá `App.Showtime.album.toc.*`, dùng lại) |
| `Application/Showtime/Album/Page/FrenchFlap.tsx` | "Dear", "Về chúng tôi", đoạn giới thiệu |
| `Application/Showtime/Album/Page/AlbumPhotoModal.tsx` | Dòng hướng dẫn vuốt, "Kỷ Niệm" |
| `src/libs/driverjs/tourConfigs.ts` | Toàn bộ các bước tour |
| `Common/ModalWrapper.tsx` (người gọi) | `ariaLabel` "Demo Notice", "PIN Input", "Album Photos" |
| `Common/ThemeToggle.tsx` | `aria-label="Toggle theme"` |

## Kích thước, lớp chồng

| Mức | Chỗ | Vấn đề | Sửa |
|---|---|---|---|
| Thấp | `Album/Plugin/GlassLocationBadge.tsx` | `zIndex: 9999` nội tuyến | Bỏ; lớp chồng theo bảng ở [kich-thuoc.md](co-ban/kich-thuoc.md#lớp-chồng-z-index) |
| Thấp | Nút cùng chiều cao mà bo khác nhau (`rounded-lg` / `rounded-xl`) | Lệch | Đề xuất P5 |
| Thấp | `Application/User/MyAlbums/my-albums.tsx` nút "Create Album" | `hover:-translate-y-0.5` ở khung app | Bỏ nhấc, giữ đổi bóng |
| Thấp | `Application/User/MyAlbums/my-albums.tsx` ô tìm kiếm | SVG kính lúp vẽ tay | `Search` của Lucide |

## Trợ năng

| Mức | Chỗ | Vấn đề | Sửa |
|---|---|---|---|
| Vừa | Toàn bộ | Chưa xét `prefers-reduced-motion` | Đề xuất P6 |
| Vừa | `Sidebar.tsx` nút ×, `Landing/Footer.tsx` icon mạng xã hội, `DemoNotifyModal.tsx` / `PinInputModal.tsx` nút ×, `AlbumPhotoModal.tsx` nút × và ←, thanh công cụ My Albums, nút ⋮ card album, nút đăng xuất | Nút chỉ icon thiếu `aria-label` | Thêm, qua i18n |
| Vừa | `AlbumComponents.tsx` card album | `div` có `onClick`, không Tab tới được | Đổi thành `button` / `Link` |
| Thấp | `LanguageToggle.tsx` | Menu thiếu Esc, phím mũi tên, `role` | Theo [lop-noi.md](thanh-phan/lop-noi.md#menu-thả) |
| Thấp | `Showtime/FloatingIcons.tsx`, `UnwrapAlbum/FloatingDecorations.tsx`, `RibbonEffect.tsx`, `WashiTape.tsx` | Đồ trang trí chưa `aria-hidden` | Thêm `aria-hidden` |

## Thương hiệu, tài nguyên

| Mức | Chỗ | Vấn đề | Sửa |
|---|---|---|---|
| Thấp | `WashiTape.tsx`, `HighlightImagePiece.tsx` | Ảnh nhiễu lấy từ `grainy-gradients.vercel.app` | Tải về `public/images/` |
| Thấp | `FrenchFlap.tsx` | Avatar mặc định lấy từ `encrypted-tbn0.gstatic.com` (link ảnh Google, có thể chết) | Ảnh mặc định trong `public/` |
