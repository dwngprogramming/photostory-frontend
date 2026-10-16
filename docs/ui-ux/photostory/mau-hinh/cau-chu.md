# Câu chữ

## Giọng văn

Photostory nói như **một người bạn đang trao quà**: ấm, gần gũi, hơi tinh nghịch, không trang trọng kiểu hành chính.

| Nên | Không nên |
|---|---|
| "Album đang được chuẩn bị, bạn vui lòng đợi một chút nha ~" | "Hệ thống đang xử lý yêu cầu." |
| "Khám phá những khoảnh khắc tuyệt đẹp trong album mà người thương đã dành tặng bạn." | "Nhập mã để truy cập tài nguyên." |
| "Đôi lời xin chào ~", "Sau cùng thì..." | "Lời mở đầu", "Kết thúc" |

Mức độ theo sân khấu:

- **Album, nghi thức:** ấm nhất. Được dùng dấu `~`, dấu `...`, xưng "bạn", gọi người tặng bằng quan hệ ("người yêu", "bạn thân").
- **Giới thiệu:** ấm, rõ ràng, hứa hẹn cụ thể ("Miễn phí - Không cần thẻ tín dụng").
- **Khung app:** gọn, rõ, ít cảm thán. Nhãn nút là động từ ("Tạo Album", "Nâng cấp").
- **Lỗi:** nói chuyện gì xảy ra và làm gì tiếp ("Không thể truy cập. Vui lòng nhập lại mã code."). Không đổ lỗi người dùng, không dấu `~` trong câu lỗi.

## Song ngữ

- `next-intl`, hai ngôn ngữ `vi` và `en`, tệp ở `src/libs/i18n/locales/`. Đường dẫn có tiền tố ngôn ngữ (`/vi/...`, `/en/...`).
- Mọi chữ hiện ra đi qua `useTranslations`. Khoá nhóm theo màn: `Common`, `Landing`, `App.User`, `App.Guest`, `App.Showtime`.
- Thêm khoá thì thêm cả hai tệp cùng lúc.
- Tiếng Anh không dịch từng chữ từ tiếng Việt: "Mở Album Ngay" → "Unwrap Now", "Đang mở album..." → "Unwrapping...". Giữ ẩn dụ mở quà ("unwrap") ở bản tiếng Anh.
- Chữ trong dữ liệu người dùng (tên album, câu chuyện, quan hệ tự đặt) hiện nguyên văn; quan hệ tự đặt chỉ dùng khi đúng ngôn ngữ đang xem (`customRelationshipLocale`).

## Viết hoa

- Tiếng Việt: viết hoa chữ đầu câu và tên riêng. Code đang có kiểu Title Case cho nút ("Tạo Album", "Mở Album Ngay", "Kỷ Niệm"); phần mới viết hoa chữ đầu thôi ("Tạo album") và sửa dần phần cũ cùng đợt dịch.
- Tiếng Anh: nút và tiêu đề dùng Title Case ("Unwrap Now", "Enter Album PIN"); câu mô tả viết thường.
- "Album", "PIN", "Photostory" giữ nguyên ở cả hai ngôn ngữ.

## Mẫu câu

| Tình huống | Tiếng Việt | Tiếng Anh |
|---|---|---|
| Ô không được trống | "{tên} không được để trống." | "{name} cannot be empty." |
| Độ dài | "Mã code phải có ít nhất 5 ký tự và tối đa 30 ký tự!" | "Code must be at least 5 characters and at most 30 characters!" |
| Lỗi chung | "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau." | "An unexpected error occurred. Please try again later." |
| Đang làm | "Đang mở album..." | "Unwrapping..." |
| Hoãn | "Để sau" | "Watch later" |
| Rỗng lần đầu | "Bạn chưa có album nào" | "No albums yet" |
| Không vào được | "Không thể truy cập. Vui lòng nhập lại mã code." | "Cannot access. Please enter code again." |

## Chữ đang viết cứng

Danh sách chỗ phải chuyển sang `next-intl` nằm ở [can-sua.md](../can-sua.md#song-ngữ).
