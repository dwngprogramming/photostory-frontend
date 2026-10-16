# Trạng thái

Mọi màn phải dựng đủ bốn trạng thái: đang tải, rỗng, lỗi, có dữ liệu. Trạng thái giữ không khí của sân khấu, không rơi về màn trắng trơn.

## Đang tải

| Chỗ | Cách hiện |
|---|---|
| Showtime trước khi có album | Màn chuẩn bị riêng (`PreparingAlbum`): vòng quay có quầng sáng + "Chuẩn bị Album..." chữ đồng, tối thiểu 2s |
| Nút đang gửi | Vòng quay thay chữ hoặc đứng trước chữ, nút khoá, bề rộng không đổi ([nut.md](../thanh-phan/nut.md#nút-chính)) |
| Máy phát đang tải bài | Vòng quay trong nút tròn |
| Ảnh đang tải | Khung giữ đúng tỉ lệ, nền `stone-100` (polaroid, ảnh bìa card) |
| Trang khung app tải danh sách | **Chưa có.** Dựng khung chờ đúng hình: 4 ô thống kê và 6 card album màu `stone-100` / tối `stone-800`, `animate-pulse` |

Không dùng một vòng quay giữa màn cho trang khung app: người dùng mất chỗ bám và trang nhảy khi dữ liệu về.

## Rỗng

| Chỗ | Cách hiện |
|---|---|
| My Albums chưa có album | Vùng kéo thả lớn: icon, tiêu đề serif, mô tả, nút "Tạo Album"; kéo ảnh vào là tạo album ([o-nhap.md](../thanh-phan/o-nhap.md#vùng-kéo-thả-ảnh)) |
| Tìm kiếm không ra kết quả | **Chưa có.** Một dòng `stone-500` giữa vùng lưới: "Không có album nào khớp với "{từ khoá}"." + nút chữ "Xoá tìm kiếm" |
| Câu chuyện không nhạc / không địa điểm | Bỏ hẳn khối đó trên trang ảnh |
| Album không có lời kết | Bỏ trang lời kết |

Trạng thái rỗng lần đầu (chưa từng có dữ liệu) được làm to, có minh hoạ, có lời mời. Trạng thái rỗng do lọc chỉ một dòng.

## Lỗi

| Lỗi | Cách hiện |
|---|---|
| Mã sai độ dài | Toast lỗi "Mã code phải có ít nhất 5 ký tự và tối đa 30 ký tự!" |
| Mã không tồn tại, PIN sai | Toast lỗi từ interceptor của axios; ô nhập giữ nguyên chữ để sửa |
| Vào Showtime thiếu mã hoặc phiên hết hạn | Quay về `/demo/unwrap` + toast "Không thể truy cập. Vui lòng nhập lại mã code." |
| Dữ liệu trả về không đúng dạng | Toast "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.", quay về `IDLE` |
| Tính năng chưa có | Hộp thoại "Tính năng đang phát triển" với nút "Xem Demo" và "Để sau" |
| Tải danh sách trong khung app thất bại | **Chưa có.** Khối giữa vùng nội dung: câu nói chuyện gì xảy ra + nút viền "Thử lại" |

Luật: lỗi không bao giờ để người dùng kẹt trên màn che hay màn chuẩn bị; luôn có đường về.

## Đang xử lý một thao tác

- Ô nhập và nút gửi khoá trong lúc gửi.
- Không đóng hộp thoại khi đang xử lý; đóng sau khi có kết quả (hộp PIN đóng sau khi hết thời gian chờ tối thiểu).
- Thao tác thành công trong khung app: toast `success` ngắn ("Đã lưu album.").
