# Khung app và bố cục

## Khung app (người dùng đã đăng nhập)

`PhotostoryShell` + `Sidebar` (`src/components/Application/User/Layout/`), bọc các màn trong nhóm route `(user)`.

```
≥ 1024px (lg)                               < 1024px
┌────────────┬──────────────────────────┐   ┌──────────────────────────┐
│ 📖 Photostory│                          │   │ ☰  Photostory            │ ← thanh trên 64px
├────────────┤   Tên trang (serif 4xl)  │   ├──────────────────────────┤
│ ▣ Album của │   Mô tả                  │   │                          │
│   tôi       │                          │   │   nội dung p-6           │
│ ▢ Chia sẻ   │   [nội dung]             │   │                          │
│ ▢ Cài đặt   │                          │   │                          │
│            │                          │   └──────────────────────────┘
├────────────┤   max-w-7xl, p-10        │   ☰ mở sidebar trượt từ trái,
│ Appearance ◐│                          │   phủ nền stone-900/50 mờ
│ [👤 Tên  ⎋] │                          │
└────────────┴──────────────────────────┘
   288px
```

| Phần | Giá trị |
|---|---|
| Nền trang | `stone-50` / tối `stone-950`, chiều cao cả màn, chỉ vùng nội dung cuộn |
| Sidebar | Rộng 288px (`w-72`), nền `white` / tối `stone-900`, viền phải `stone-200` / tối `stone-800` |
| Đầu sidebar | Cao 64px, logo, viền dưới `stone-100` / tối `stone-800`; điện thoại có nút × |
| Mục điều hướng | `px-4 py-3 rounded-xl text-sm font-medium`, icon 20px, cách nhau 8px |
| Mục đang chọn | `bg-amber-100 text-amber-600 shadow-sm` / tối `bg-amber-900/30 text-amber-400`; so khớp theo đầu đường dẫn |
| Mục thường | `stone-600` / tối `stone-400`, rê `bg-stone-100` / tối `stone-800` |
| Chân sidebar | Dòng "Appearance" + công tắc sáng/tối; khối hồ sơ (avatar, tên, email, đăng xuất) |
| Sidebar điện thoại | Trượt từ trái 300ms, lớp phủ `stone-900/50 backdrop-blur-sm`, bấm lớp phủ hoặc chọn mục để đóng |
| Nội dung | `max-w-7xl mx-auto p-6 lg:p-10`; điện thoại chừa 64px trên cho thanh trên |

Mục điều hướng: Album của tôi (`/my-albums`, `LibraryBig`), Album chia sẻ với tôi (`/shared-with-me`, `Users`), Cài đặt (`/settings`, `Settings`). Hai mục sau chưa có trang.

**Mục đang chọn** chữ `amber-600` trên `amber-100` chỉ đạt 2,86:1. Theo đề xuất P2 đổi chữ sang `amber-700` (4,51:1 trên `amber-100`, vừa đạt).

### Đầu trang trong khung app

```
Tên trang (serif 4xl bold)                    [ + Tạo Album ]
Mô tả một dòng (stone-500)
```

- Tên và mô tả bên trái, nút chính bên phải căn đáy (`md:items-end`); màn hẹp thì xếp dọc.
- Nút chính ẩn khi trang rỗng (trạng thái rỗng đã có nút riêng).
- Cách khối dưới 32px.

### Màn My Albums

Thứ tự khối: đầu trang → 4 ô thống kê → khối dung lượng → thanh công cụ (tìm kiếm, lọc, sắp xếp, lưới/danh sách; dính đầu khi cuộn) → lưới card album hoặc trạng thái rỗng. Thanh công cụ chỉ hiện khi có album.

## Thanh điều hướng landing

`Navbar` (`src/components/Landing/Navbar.tsx`).

| Phần | Giá trị |
|---|---|
| Vị trí | Cố định trên cùng, `z-50` |
| Cao | 64px, từ `md` 80px |
| Nền đầu trang | Trong suốt |
| Nền khi cuộn quá 20px | `white/90` / tối `stone-950/90`, `backdrop-blur-md`, `shadow-sm`, viền dưới; đổi trong 300ms |
| Khung | `max-w-7xl`, logo trái, link giữa (`gap-8`), hành động phải (`gap-4`): Đăng nhập, công tắc, ngôn ngữ, nút "Bắt đầu" |
| Dưới `md` | Ngôn ngữ, công tắc, nút ☰; menu trượt từ phải rộng 256px, link `text-lg`, nút "Bắt đầu" rộng hết |

## Bố cục landing

| Khối | Nền | Bố cục |
|---|---|---|
| Thanh thông báo | Theo tông | Dải trên cùng |
| Hero | Gradient nền ấm | Hai cột từ `lg`: chữ + hai nút trái, minh hoạ album phải |
| Tính năng | `white` / tối `stone-950` | Tiêu đề giữa, lưới 1 → `md` 2 → `lg` 3 card |
| Cách dùng | Gradient nền ấm dọc | Ba bước ngang từ `lg`, nối bằng đường nét đứt `amber-200` |
| CTA | Gradient nắng chiều | Chữ trắng giữa, nút trắng, ba cam kết ngăn bằng `•` |
| Footer | `stone-50` / tối `stone-950`, viền trên | Bốn cột từ `lg`: thương hiệu + mạng xã hội, ba nhóm link; dòng bản quyền dưới |

Mỗi khối `py-20 md:py-32`, nội dung `max-w-7xl`, tiêu đề khối giữa rộng tối đa `max-w-3xl`, cách lưới 64px.

## Bố cục Unwrap

Một cột giữa màn, rộng tối đa 672px (`max-w-2xl`), căn giữa cả dọc: logo lớn → tiêu đề → mô tả → ô nhập mã (rộng tối đa 512px) → mã mẫu, PIN mẫu → nút → bản quyền. Công tắc sáng/tối và ngôn ngữ cố định góc trên phải. Nền gradient ấm + khối mờ + polaroid bay.

## Bố cục Showtime

Toàn màn, không cuộn (`h-screen overflow-hidden`). Sách giữa màn trên nền căn phòng; đồ trang trí ở bốn góc ([nghi-thuc-mo-qua.md](../album/nghi-thuc-mo-qua.md#đồ-trên-showtime-sau-khi-mở)).
