# Nguyên tắc chung

## Tinh thần

Photostory là **món quà**, không phải công cụ. Người nhận mở album như mở một hộp quà: có màn che, có ruy băng, có cuốn sách bìa da thật để lật từng trang. Người tạo album thì cần một chỗ làm việc yên tĩnh để sắp xếp kỷ niệm.

Giao diện **ấm, có chất liệu, có nghi thức**: tông đá ấm (`stone`) làm nền, hổ phách (`amber`) làm màu nhấn, chữ có chân cho tiêu đề và câu chuyện, đồ vật thật (giấy, da, băng dính, polaroid) ở nơi người nhận đọc album.

Ba câu để tự kiểm một màn:

1. Màn này thuộc sân khấu nào (giới thiệu, khung app, album)? Độ hiệu ứng có đúng mức của sân khấu đó không?
2. Nếu bỏ hết hiệu ứng, màn có còn đọc được, bấm được không?
3. Đang tải, rỗng, lỗi trông thế nào? Có giữ được không khí ấm, hay rơi về màn trắng trơn?

## Ba sân khấu

| | Giới thiệu | Khung app | Album |
|---|---|---|---|
| Màn | Landing, Unwrap | My Albums, Shared, Settings | Showtime |
| Nền | Gradient `amber-50 → orange-50 → stone-50` (tối: `stone-900 → stone-950`) | `stone-50` (tối: `stone-950`) | Ảnh phòng `vintage-background.jpg` làm mờ 6px |
| Khối | Card trắng có bóng, nhấc lên khi rê | Card trắng viền `stone-200`, bóng nhẹ | Đồ vật thật: sách, polaroid, băng dính |
| Tiêu đề | Serif rất lớn (tới `text-6xl`) | Serif `text-4xl` cho tên trang | Serif trên giấy, chữ ép kim trên bìa |
| Chuyển động | Hiện dần khi cuộn, khối mờ trôi, nút phóng 105% | Chỉ đổi màu, bóng; card nhấc 4px | Nghi thức mở quà 10 giây, lật trang 750ms |
| Tối | Có | Có | Có cho phần quanh sách; **trang giấy luôn sáng** |

Thứ thuộc sân khấu này không mang sang sân khấu khác. Ví dụ: khối mờ trôi (`FloatingDecorations`) không đặt trong khung app; card trắng viền mảnh của khung app không đặt lên trang giấy album.

## Mười luật cốt lõi

1. **Đá ấm làm nền, hổ phách làm nhấn.** Mọi màu trung tính là `stone` (không `gray`, `slate`, `zinc`). Màu nhấn là `amber`; `orange` chỉ đi kèm `amber` trong gradient và trong nhãn nhỏ (chip Music, Location). Chi tiết: [mau-sac.md](co-ban/mau-sac.md).
2. **Một màu nhấn một khu.** Mỗi khu chỉ một nút nền hổ phách cho hành động chính. Hành động phụ dùng nút viền hổ phách hoặc nút chữ.
3. **Serif để kể chuyện, sans để làm việc.** Playfair Display cho tên, tiêu đề, logo; Merriweather cho nội dung câu chuyện; Inter cho nhãn, nút, ô nhập, số liệu. Chi tiết: [chu.md](co-ban/chu.md).
4. **Bóng mang màu ấm.** Bóng nổi khi rê dùng bóng nhuốm hổ phách (`shadow-soft*`); ở chế độ tối dùng bóng đen đậm (`shadow-dark*`). Không dùng bóng xám lạnh cho thứ muốn "nhấc lên".
5. **Trang giấy luôn là giấy.** Bên trong cuốn album không đổi theo chế độ tối: giấy sáng, chữ tối. Chế độ tối chỉ làm tối căn phòng quanh sách.
6. **Đồ vật thật thì lệch một chút.** Polaroid, ảnh nổi bật, băng dính được xoay nghiêng (±2° tới 5°, băng dính ±15° quanh góc gốc). Thứ thẳng tắp tuyệt đối trông như giao diện máy, không như đồ vật.
7. **Nghi thức có nhịp cố định.** Mỗi pha của màn mở quà có thời lượng định sẵn ([nghi-thuc-mo-qua.md](album/nghi-thuc-mo-qua.md)); không cắt ngắn dù dữ liệu tải nhanh (màn chuẩn bị giữ tối thiểu 2 giây).
8. **Song ngữ từ đầu.** Mọi chữ hiện ra đi qua `next-intl` (`vi`, `en`). Không viết cứng chữ trong component. Chi tiết: [cau-chu.md](mau-hinh/cau-chu.md).
9. **Sáng, tối, theo hệ thống.** Mặc định `system`; ba sân khấu đều có bản tối. Tối không phải đảo màu: nền `stone-950/900`, card `stone-900`, viền `stone-800`, màu nhấn sáng lên một bậc (`amber-500` → `amber-400`).
10. **Hiệu ứng không được chặn việc.** Mọi thao tác đi được bằng chuột, chạm và phím; hiệu ứng phải tắt được khi người dùng bật giảm chuyển động ([tro-nang.md](mau-hinh/tro-nang.md)).

## Khác Linepie ở đâu

Để không ai "sửa cho giống Linepie":

| Linepie | Photostory | Lý do |
|---|---|---|
| Một font Be Vietnam Pro | Ba font: Playfair, Merriweather, Inter | Font có chân tạo cảm giác sách, thư tay |
| Màu nhấn cyan, 95% trung tính | Màu nhấn hổ phách, nền gradient ấm ở sân khấu giới thiệu | Không khí kỷ niệm, ánh nắng chiều |
| Phẳng, card không bóng | Card có bóng ấm, nhấc lên khi rê | Đồ vật có thể cầm |
| Không phóng/thu khi bấm | Nút chính phóng 105% ở sân khấu giới thiệu | Mời gọi; khung app thì không phóng |
| Chỉ tiếng Việt | Song ngữ vi/en | Quà có thể gửi cho người nói tiếng Anh |
