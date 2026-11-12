# Icon

## Bộ icon

`lucide-react` cho mọi icon giao diện. Không trộn bộ khác, không vẽ SVG tay cho icon đã có trong Lucide (ô tìm kiếm My Albums đang vẽ tay kính lúp, nên đổi sang `Search`).

Ngoại lệ: icon thương hiệu bên thứ ba vẽ SVG riêng, giữ màu gốc của hãng:

| Icon | File | Ghi chú |
|---|---|---|
| Google Maps | `src/components/Common/GoogleMapsIcon.tsx` | Năm màu của Google, mặc định 14px |
| SoundCloud | `src/components/Common/SoundCloudIcon.tsx` | Đen `#000000`, 20px; không đổi màu theo chế độ tối (cần sửa: dùng `currentColor`) |

## Cỡ

| Cỡ | Class | Dùng ở |
|---|---|---|
| 12px | `w-3 h-3` | Icon trong dòng chữ nhỏ (ngày, số ảnh trên card album, nhãn riêng tư) |
| 14px | `size={14}`, `w-3.5 h-3.5` | Chip Music, Location; nút cuộn trong trang album; footer flap |
| 16px | `w-4 h-4` | Mũi tên trong nút hộp thoại, icon thời tiết, nút xoá ô nhập |
| 20px | `w-5 h-5`, `size={20}` | Nút icon, mục sidebar, mũi tên nút lớn, nút đóng hộp thoại |
| 24px | `w-6 h-6` | Nút ☰ và ×, icon trong ô tròn hộp thoại |
| 32px | `w-8 h-8` | Icon card tính năng |
| 40px | `w-10 h-10` | Icon trạng thái rỗng, vòng quay màn chuẩn bị |

## Màu

- Icon đi kèm chữ thì cùng màu chữ.
- Icon nhấn trong ô nền nhạt: ô `amber-50` / tối `amber-900/20`, icon `amber-500`. Ô vuông bo `rounded-lg` (card tính năng 64px, ô thống kê 40px) hoặc tròn (hộp thoại 48px, rỗng 80px).
- Icon trong nút chính: trắng, theo chữ nút.
- Icon trạng thái hiếm khi tô màu; ngoại lệ là trái tim đỏ nhạt (`red-400/80`) ở dòng "Made by".

## Icon theo nghĩa

Dùng nhất quán để người dùng nhận ra:

| Nghĩa | Icon |
|---|---|
| Album | `Book` (thương hiệu không dùng icon Lucide: dùng component `Logo`, xem [thuong-hieu.md](../thuong-hieu.md#logo)) |
| Thư viện album của tôi | `LibraryBig` |
| Được chia sẻ với tôi | `Users` |
| Riêng tư / công khai | `Lock` / `Globe` |
| Ảnh, số ảnh | `Image` |
| Ngày | `Calendar` |
| Nhạc | `Music` |
| Địa điểm | `MapPin` (và icon theo chủ đề ở nhãn địa điểm) |
| Tạo mới | `Plus`, `FolderPlus` (trạng thái rỗng) |
| Mở quà | `Sparkles` (nút), `PackageOpen` (đã sẵn sàng), `Gift` (trang trí) |
| Đang làm | `Construction` (tính năng đang phát triển) |
| Đang tải | `Loader2` + `animate-spin` |
| Thời tiết | `Sun`, `Cloud`, `CloudRain`, `Snowflake`, `CloudMoon` |
