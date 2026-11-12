# Nghi thức mở quà

Từ lúc người nhận gõ mã tới lúc cuốn sách hiện ra là một chuỗi pha cố định, khai báo trong enum `UnwrapPhase` (`src/types.ts`). Đây là phần "diễn" nhất của Photostory; thời lượng là một phần của thiết kế, không phải độ trễ cần tối ưu.

## Toàn cảnh

```
UNWRAP (/demo/unwrap)                        SHOWTIME (/showtime/...)
IDLE → LOADING → [PIN?] → CURTAIN_CLOSE  ⇒  PREPARING_ALBUM → SILENCE → INTRO_TEXT
                                             → ICONS_FLOAT → RIBBON_EXPAND
                                             → VERTICAL_SPLIT → CURTAIN_OPEN → REVEALED → tour
```

Ý đồ: màn che **đóng dọc** (trên–dưới) ở trang Unwrap như gói quà lại; sang Showtime, màn che nằm sẵn **trái–phải**, dải ruy băng chạy ngang, vạch tách chạy dọc như cắt dây, rồi hai nửa giấy gói kéo sang hai bên.

## Pha ở Unwrap

| Pha | Thời lượng | Màn hình |
|---|---|---|
| `IDLE` | Tới khi người dùng gửi | Ô nhập mã, nút "Mở Album Ngay" |
| `LOADING` | Tối thiểu 1s kể từ lúc gửi | Ô nhập khoá; nút hiện vòng quay "Đang mở album..." |
| Hộp PIN | Tới khi nhập đúng | Album riêng tư thì hiện hộp nhập PIN, quay về `IDLE` phía sau |
| `CURTAIN_CLOSE` | 1,1s | Nút "Album sẵn sàng!"; nền trang mờ dần (sáng: sáng 90% + mờ 4px; tối: sáng 40% + mờ 6px) và thu 98% trong 1s; hai tấm màn trên và dưới trượt vào giữa trong 1s |
| Chuyển trang | — | Sang `/showtime?key=…` (công khai) hoặc `/showtime/{id}` (riêng tư) |

Màn che đóng: mỗi tấm cao 50% màn, nền `stone-200` / tối `stone-950`, viền mép giữa 2px `amber-600/20` / tối `amber-500/30`, bóng `shadow-2xl`.

## Pha ở Showtime

| Pha | Chuyển sau | Màn hình |
|---|---|---|
| `PREPARING_ALBUM` | Khi tải xong, **tối thiểu 2s** | Nền `stone-100` / tối `stone-950`; vòng quay `amber-700` / tối `amber-400` có quầng sáng nhấp nháy; "Chuẩn bị Album..." serif chữ đồng; dòng mô tả in hoa giãn chữ |
| `SILENCE` | 0,8s | Tối và trống: khoảng lặng trước khi diễn |
| `INTRO_TEXT` | 3,5s | Màn che trái–phải đóng kín; lời mở đầu hiện ở giữa: "Một album đặc biệt, / được tạo ra bởi {quan hệ} của bạn, {tên}"; gạch chân vàng chạy ra 100px |
| `ICONS_FLOAT` | 0,5s | Lời mở đầu tan (phóng 110% + mờ 10px, 0,8s); 20 icon (quà, sao, nốt nhạc, tim, lấp lánh) hiện và trôi trên giấy gói |
| `RIBBON_EXPAND` | 2s | Dải ruy băng cao 48px (từ `md` 64px) chạy ngang từ trái sang phải trong 1,75s, đầu dải có máy bay giấy |
| `VERTICAL_SPLIT` | 2,6s | Vạch dọc rộng 48px (`md` 64px) chạy từ trên xuống trong 1,75s, đầu vạch có máy bay giấy |
| `CURTAIN_OPEN` | 1s | Ruy băng và vạch tan (0,5s); hai nửa màn kéo sang hai bên trong 1s; logo, công tắc sáng/tối, máy phát nhạc chủ đề, bản quyền hiện dần (trễ 1s) |
| `REVEALED` | — | Gỡ màn che khỏi DOM; cuốn sách sẵn sàng; tour hướng dẫn tự chạy |

Tổng từ lúc dữ liệu sẵn sàng tới lúc thấy sách: khoảng 10,4 giây.

## Màu của nghi thức

| Phần | Sáng | Tối |
|---|---|---|
| Màn che | `stone-200` | `stone-950` |
| Chữ đồng (lời mở đầu, chuẩn bị) | gradient `amber-700 → amber-900 → amber-700` | gradient `amber-200 → amber-100 → amber-200` + bóng chữ đen |
| Dòng phụ lời mở đầu | `amber-800/90` | `amber-400/90` |
| Icon bay | `amber-700/20` | `amber-400/30` |
| Ruy băng, vạch tách | gradient `yellow-600 → amber-500 → yellow-400`, bóng `amber-900/20` | gradient `amber-500 → amber-400 → amber-200`, quầng sáng vàng |
| Máy bay giấy | `amber-800` | `amber-100` + quầng sáng |

Sáng dùng vàng đậm trên nền đá nhạt để đủ tương phản; tối dùng vàng nhạt có quầng sáng để "phát sáng" trên nền đen.

## Đồ trên Showtime sau khi mở

| Vị trí | Thứ |
|---|---|
| Trên trái (`top-4 left-6`) | Logo bản tối (`variant="dark"`), cao 32px |
| Trên giữa (`top-16`, từ `md` `top-3`) | Máy phát nhạc chủ đề cỡ `sm` |
| Trên phải (`top-4 right-6`) | Công tắc sáng/tối |
| Dưới giữa (`bottom-4`) | Dòng bản quyền `text-sm stone-300` / tối `stone-400` |

## Luật

- Không cắt pha khi dữ liệu về nhanh; thời gian tối thiểu của `LOADING` (1s) và `PREPARING_ALBUM` (2s) giữ để nghi thức không giật.
- Lỗi ở bất kỳ pha nào: quay về `/demo/unwrap`, kèm toast nếu biết lý do ("Không thể truy cập. Vui lòng nhập lại mã code."). Không để người dùng kẹt trên màn che.
- Pha mới thêm vào enum `UnwrapPhase` và vào bảng trên cùng đợt; ghi rõ thời lượng.
- Giảm chuyển động: xem [chuyen-dong.md](../co-ban/chuyen-dong.md#giảm-chuyển-động).
- Chưa có cách bỏ qua nghi thức cho người xem lại album lần hai. Nếu thêm: nút chữ nhỏ "Bỏ qua" ở góc dưới phải, chỉ hiện từ pha `INTRO_TEXT`, nhảy thẳng tới `CURTAIN_OPEN`.
