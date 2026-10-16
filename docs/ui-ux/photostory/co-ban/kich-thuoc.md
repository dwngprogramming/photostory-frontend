# Kích thước

## Khoảng cách

Thang 4px của Tailwind. Các nhịp đang dùng lặp lại nhiều nhất:

| Chỗ | Giá trị |
|---|---|
| Lề ngang trang landing | `px-4 sm:px-6 lg:px-8`, khung `max-w-7xl mx-auto` |
| Nhịp dọc giữa các khối landing | `py-20 md:py-32` |
| Khoảng giữa tiêu đề khối và nội dung | `mb-16` |
| Lề nội dung khung app | `p-6 lg:p-10`, khung `max-w-7xl mx-auto` |
| Khoảng giữa các khối trong khung app | `space-y-8` (`mb-8` giữa thống kê và lưới) |
| Lưới card | `gap-6` (album), `gap-4` (ô thống kê), `gap-8` (card tính năng) |
| Đệm card | `p-4` (card album), `p-5` (ô thống kê), `p-6` (khối dung lượng, hộp thoại), `p-8` (card tính năng) |
| Đệm trang album | `p-8` |
| Khoảng icon và chữ trong nút | `gap-2` (nút lớn Unwrap `gap-3`) |

## Bo góc

Đang dùng:

| Bo | Dùng ở |
|---|---|
| `rounded-sm` (2px) | Polaroid bay ở Unwrap, mép trang album |
| `rounded-md` (6px) | Nhãn riêng tư trên ảnh bìa album |
| `rounded-lg` (8px) | Nút ở thanh điều hướng, nút trong khung app, ô tìm kiếm, thanh công cụ, ô icon nhỏ, nút chọn ngôn ngữ, bìa album |
| `rounded-xl` (12px) | Card (album, thống kê, tính năng), nút lớn hero, nút và ô nhập trong hộp thoại, mục sidebar, menu thả |
| `rounded-2xl` (16px) | Hộp thoại, vùng kéo thả rỗng, ô nhập và nút ở Unwrap, khung minh hoạ hero |
| `rounded-full` | Chip, nhãn địa điểm, máy phát nhạc, nút tròn, avatar, công tắc sáng/tối |

**Đề xuất P5:** bo theo chiều cao để cùng cỡ thì cùng bo.

| Chiều cao | Bo |
|---|---|
| Dưới 40px (nút icon, nút nhỏ) | `rounded-lg` |
| 40–48px (nút, ô nhập thường) | `rounded-lg` cho khung app; `rounded-xl` cho hộp thoại |
| 48–56px (nút lớn, ô nhập mã) | `rounded-xl` |
| Từ 56px | `rounded-2xl` |
| Card | `rounded-xl` |
| Hộp thoại, lớp nổi lớn | `rounded-2xl` |
| Menu thả | `rounded-xl` |
| Chip, nhãn, nút tròn | `rounded-full` |

Đồ vật trong album (giấy, polaroid, băng dính) giữ bo rất nhỏ (`rounded-sm` hoặc `rounded-[1px]`): giấy thật không bo tròn.

## Chiều cao điều khiển

| Điều khiển | Chiều cao |
|---|---|
| Thanh điều hướng landing | 64px (`h-16`), từ `md` 80px (`h-20`) |
| Thanh trên khung app (điện thoại), đầu sidebar | 64px (`h-16`) |
| Nút icon | 36px (`p-2` + icon 20px) |
| Nút chọn ngôn ngữ | 40px (`h-10`) |
| Công tắc sáng/tối | 32px (`h-[2em]` với `text-base`), rộng 56px |
| Nút ở thanh điều hướng | ≈44px (`py-2.5`) |
| Nút trong khung app | 48px (`py-3`) |
| Nút và ô nhập trong hộp thoại | 48px (`h-12`) |
| Nút và ô nhập ở Unwrap | 48px, từ `md` 56px (`h-12 md:h-14`) |
| Nút lớn hero | ≈56px (`py-4`) |
| Máy phát nhạc | 40px (`sm`), 56px (`md`) |

Vùng chạm tối thiểu 40px trên điện thoại. Nút icon 36px cần thêm vùng đệm vô hình khi đặt sát nhau.

## Lớp chồng (z-index)

| z | Lớp |
|---|---|
| `10` | Thanh công cụ dính (My Albums) |
| `30` | Thanh trên khung app (điện thoại) |
| `40` | Lớp phủ sidebar (điện thoại) |
| `50` | Thanh điều hướng landing, sidebar, menu điện thoại landing, menu thả, nút sáng/tối ở Unwrap |
| `60` | Màn che (Curtains) |
| `70` | Icon bay (FloatingIcons) |
| `80` / `90` | Ruy băng, vạch tách / icon máy bay |
| `100` | Lời mở đầu, logo + công tắc + máy phát trên Showtime, hộp thoại (`ModalWrapper`) |
| `120` | Nút đóng hộp ảnh toàn màn |
| `1000` | Lớp nhận thao tác lật trang (`FlipInputLayer`) |

Luật: lớp mới chọn trong bảng trên, không tự đặt số. `GlassLocationBadge` đang đặt `zIndex: 9999` nội tuyến, cần đưa về bảng ([can-sua.md](../can-sua.md)).

## Breakpoint

Tailwind mặc định: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.

| Ngưỡng | Đổi gì |
|---|---|
| `md` | Landing: thanh điều hướng đầy đủ thay cho menu ☰; cỡ chữ hero lên một bậc |
| `lg` | Khung app: sidebar cố định thay cho sidebar trượt + thanh trên; hero chia hai cột |
| Album | `useIsMobile()`: điện thoại hiện một trang (`usePortrait`), máy tính hiện hai trang và dịch sách nửa trang khi đang ở bìa |

Lưới card album: 1 cột → `md` 2 → `xl` 3 → `2xl` 4. Ô thống kê: 2 cột → `lg` 4.
