# UI/UX Photostory

Cập nhật: 15/10/2026 · Nguồn: code `photostory-frontend` trên nhánh `feature/flip-edge-input` (sau commit `eeed318`).

Bộ tài liệu này ghi lại **ngôn ngữ thiết kế Photostory đang có trong code**, gom thành luật để các màn sau dựng cho khớp. Chỗ code hiện tại lệch luật hoặc có lỗi thì ghi ở [can-sua.md](can-sua.md), không sửa trong tài liệu cho đẹp.

Photostory **không theo** chuẩn UI chung của Linepie (phẳng, một màu nhấn cyan, một font). Photostory là sản phẩm cảm xúc: album ảnh để tặng, mở ra như mở quà. Hai bên chỉ có thể dùng chung hạ tầng (backend, tài khoản), không dùng chung giao diện.

Thứ tự ưu tiên khi hai nơi nói khác nhau:

1. Tài liệu trong thư mục này.
2. Code `photostory-frontend` (chỗ lệch đã liệt kê ở `can-sua.md`).

## Ba sân khấu

Mọi màn Photostory thuộc một trong ba sân khấu. Mỗi sân khấu có độ "diễn" khác nhau; luật chung (màu, font, bo góc) giống nhau, độ đậm hiệu ứng thì khác.

| Sân khấu | Màn | Tinh thần | Độ hiệu ứng |
|---|---|---|---|
| **Giới thiệu** | Landing `/`, Unwrap `/demo/unwrap` | Ấm, mời gọi, hứa hẹn | Cao: nền gradient, khối mờ trôi, polaroid bay, nút nhấc lên khi rê |
| **Khung app** | My Albums `/my-albums`, (sắp có) Shared with me, Settings, Share | Gọn, yên, dễ làm việc | Thấp: nền `stone-50`, card trắng viền mảnh, hiệu ứng nhẹ |
| **Sân khấu album** | Showtime `/showtime/[[...id]]` | Nghi thức mở quà, đồ vật thật | Cao nhất: màn che, dải ruy băng, sách lật, chất liệu da, giấy, băng dính |

Chi tiết ở [nguyen-tac.md](nguyen-tac.md).

## Mục lục

| File | Nội dung |
|---|---|
| [nguyen-tac.md](nguyen-tac.md) | Tinh thần, ba sân khấu, mười luật cốt lõi |
| [thuong-hieu.md](thuong-hieu.md) | Tên, biểu tượng, màu thương hiệu, tên miền |
| **Cơ bản** | |
| [co-ban/mau-sac.md](co-ban/mau-sac.md) | Bảng màu, vai màu, sáng/tối, độ tương phản đã đo, màu phân loại địa điểm |
| [co-ban/chu.md](co-ban/chu.md) | Ba họ font, thang chữ theo vai, định dạng ngày và số |
| [co-ban/kich-thuoc.md](co-ban/kich-thuoc.md) | Khoảng cách, bo góc, chiều cao điều khiển, bóng, lớp chồng (z-index), breakpoint |
| [co-ban/chuyen-dong.md](co-ban/chuyen-dong.md) | Thời lượng, đường cong, hiệu ứng vào/ra, hiệu ứng khi cuộn |
| [co-ban/icon.md](co-ban/icon.md) | Bộ icon Lucide, cỡ, màu, icon thương hiệu bên thứ ba |
| **Thành phần** | |
| [thanh-phan/nut.md](thanh-phan/nut.md) | Nút chính, nút viền, nút chữ, nút icon, nút trên nền ảnh |
| [thanh-phan/o-nhap.md](thanh-phan/o-nhap.md) | Ô nhập mã, ô PIN, ô tìm kiếm, vùng kéo thả ảnh |
| [thanh-phan/the-va-nhan.md](thanh-phan/the-va-nhan.md) | Card, ô số liệu, thanh dung lượng, chip, nhãn trên ảnh |
| [thanh-phan/lop-noi.md](thanh-phan/lop-noi.md) | Hộp thoại, menu thả, toast, thanh thông báo, tour hướng dẫn |
| [thanh-phan/dieu-khien-chung.md](thanh-phan/dieu-khien-chung.md) | Công tắc sáng/tối, chọn ngôn ngữ |
| **Album** | |
| [album/chat-lieu.md](album/chat-lieu.md) | Bìa da, chữ ép kim, giấy, băng dính washi, polaroid, nền phòng |
| [album/trang-album.md](album/trang-album.md) | Cấu trúc sách, các loại trang, nội dung một câu chuyện |
| [album/plugin.md](album/plugin.md) | Chồng ảnh, máy phát nhạc kính, nhãn địa điểm, khung chữ cuộn |
| [album/nghi-thuc-mo-qua.md](album/nghi-thuc-mo-qua.md) | Trình tự Unwrap → Showtime theo từng pha, thời lượng |
| **Mẫu hình** | |
| [mau-hinh/khung-app.md](mau-hinh/khung-app.md) | Sidebar, thanh trên điện thoại, thanh điều hướng landing, bố cục nội dung |
| [mau-hinh/trang-thai.md](mau-hinh/trang-thai.md) | Đang tải, rỗng, lỗi, đang xử lý |
| [mau-hinh/cau-chu.md](mau-hinh/cau-chu.md) | Giọng văn, song ngữ vi/en, mẫu câu |
| [mau-hinh/tro-nang.md](mau-hinh/tro-nang.md) | Focus, bàn phím, nhãn cho trình đọc màn hình, giảm chuyển động |
| **Đối chiếu** | |
| [can-sua.md](can-sua.md) | Chỗ code lệch luật hoặc lỗi, kèm file và mức ưu tiên |

## Quy ước

- Tài liệu viết tiếng Việt, số liệu lấy từ code thật (class Tailwind v4, mã hex trong `src/app/globals.css`).
- Màu viết theo palette Tailwind (`amber-500`); chỉ màu ngoài palette mới ghi hex (`#cfb53b`).
- **Đề xuất** là chưa chốt; code giữ như hiện tại cho tới khi người phụ trách quyết. Đề xuất đang mở ghi ở bảng dưới.
- Đổi token, font hay component dùng chung thì cập nhật file tương ứng trong cùng đợt.

## Đề xuất đang mở

| # | Đề xuất | Vì sao | Chi tiết |
|---|---|---|---|
| P1 | Chữ trắng trên nút `amber-500` chỉ đạt 2,15:1. Chọn một trong hai: (a) nền `amber-500` + chữ `stone-950` (9,2:1); (b) nền `amber-600` + chữ trắng, chữ đậm từ 18px (3,19:1, chỉ đạt mức chữ lớn) | Nút chính là thứ quan trọng nhất trên màn, đang khó đọc ngoài nắng | [nut.md](thanh-phan/nut.md#nút-chính) |
| P2 | Chữ, link, icon màu nhấn trên nền sáng đổi từ `amber-500/600` sang `amber-700` (5,02:1) | `amber-500` trên trắng 2,15:1, `amber-600` 3,19:1 | [mau-sac.md](co-ban/mau-sac.md#tương-phản-đã-đo) |
| P3 | Gom màu vào token ngữ nghĩa trong `@theme` (`--color-accent`, `--color-muted`…) thay cho class màu thô | Hiện 478 chỗ dùng `stone-*`, 269 chỗ `amber-*` viết trực tiếp; đổi tông phải sửa khắp nơi | [mau-sac.md](co-ban/mau-sac.md#token-đề-xuất) |
| ~~P4~~ | **Đã làm (12/11/2026).** Thay biểu tượng `Book` của Lucide bằng logo riêng từ brand kit, qua component `Logo` | Icon chung của thư viện, không nhận diện được | [thuong-hieu.md](thuong-hieu.md#logo) |
| P5 | Gom bo góc nút về theo chiều cao (40px → `rounded-lg`, 48px → `rounded-xl`, 56px → `rounded-2xl`) | Hiện cùng cỡ nút mà chỗ `lg` chỗ `xl` | [kich-thuoc.md](co-ban/kich-thuoc.md#bo-góc) |
| P6 | Tôn trọng `prefers-reduced-motion`: rút nghi thức mở quà còn màn che + mở, tắt khối trôi | Hiện chưa có chỗ nào xét | [tro-nang.md](mau-hinh/tro-nang.md#giảm-chuyển-động) |
