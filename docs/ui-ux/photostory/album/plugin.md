# Plugin trong album

Plugin là khối tương tác đặt trên trang giấy. Plugin dùng kính mờ (glass) để nổi trên giấy mà vẫn nhìn thấy vân giấy bên dưới. Kính mờ chỉ dùng trong album và đồ trang trí sân khấu giới thiệu; khung app không dùng.

## Chồng ảnh

`PhotoStack` (`Album/Plugin/PhotoStack.tsx`).

| Chế độ | Ở đâu | Thao tác |
|---|---|---|
| Tĩnh (`interactive={false}`) | Trên trang sách | Bấm cả chồng để mở hộp ảnh toàn màn |
| Kéo (`interactive`) | Trong hộp ảnh | Kéo ngang tấm trên cùng quá 50px để bay đi (200ms) rồi xuống đáy chồng; bấm tấm trên cùng để sang lưới |

Bày chồng:

- Chỉ vẽ tối đa 4 tấm.
- Tấm trên cùng: thẳng, cỡ 100%, sáng 100%.
- Mỗi tấm sâu hơn một bậc: nhỏ hơn 3% (từ 95%), nhích lên 12px, xoay luân phiên ±2° nhân theo độ sâu, tối hơn 10% và nhuốm `sepia 20%`.
- Xếp lại bằng spring `stiffness 300, damping 30`.

Khung từng tấm là polaroid ([chat-lieu.md](chat-lieu.md#polaroid)).

## Máy phát kính

`GlassPlayer` (`Album/Plugin/GlassPlayer.tsx`). Hai vai: **nhạc chủ đề** (đầu Showtime, cỡ `sm`, rộng tối đa 250px, lặp lại) và **nhạc câu chuyện** (trên trang, cỡ `md`, rộng hết khối).

```
 ╭──────────────────────────────────────────╮
 │ (▶)  Tên bài hát (serif bold)      ▮▮▮   │  ← vạch nhạc chỉ ở cỡ md
 │      NGHỆ SĨ (sans xs bold)  [Bài chủ đề]│  ← nhãn chỉ ở cỡ sm
 ╰──────────────────────────────────────────╯
```

| Phần | Giá trị |
|---|---|
| Cao | `sm` 40px, `md` 56px |
| Kính | `rounded-full`, nền `white/70` (`sm`) hoặc `white/60` (`md`), mờ 20px, bão hoà 150%, ánh trong 1px trắng phía trên |
| Nền thở | Gradient `orange-50/50 → white/20 → amber-50/50` mờ 50%; khi phát ấm lên `orange-200/30 → amber-200/30` |
| Viền khi dừng | `white/50` + `shadow-lg` |
| Viền khi phát | `orange-400/60` + quầng cam bên trong |
| Nút | Xem [nut.md](../thanh-phan/nut.md#nút-trên-nền-ảnh-nền-tối): tròn, gradient `amber-400 → orange-500`, ▶ / ❚❚ / vòng quay khi đang tải |
| Icon bay | 24 icon nhỏ (nốt nhạc, tim, sao…) rải theo lưới 4×6, màu `orange-300`, `amber-200`, `pink-200`, `white/40`, mờ 50% |
| Tên bài, nghệ sĩ | Lấy qua `/api/soundcloud`; chưa có thì "Unknown Title" / "Unknown Artist" (cần dịch) |

Kính nền trắng nên máy phát **giống nhau ở cả hai chế độ**; chữ trên kính luôn `stone-800` / `stone-500`.

Chỉ một máy phát chạy tại một thời điểm (Redux `audioSlice` + một `ReactPlayer` ẩn toàn cục). Bấm máy phát khác thì chuyển bài; nhạc câu chuyện không lặp, nhạc chủ đề lặp.

## Nhãn địa điểm

`GlassLocationBadge` (`Album/Plugin/GlassLocationBadge.tsx`). Viên thuốc kính mờ mang màu theo chủ đề địa điểm (bảng mười chủ đề ở [mau-sac.md](../co-ban/mau-sac.md#màu-phân-loại-địa-điểm)).

| Cỡ | Đệm | Icon | Chữ |
|---|---|---|---|
| `xs` | `px-2.5 py-1` | 12px | `text-xs` 500 |
| `sm` (trên trang album) | `px-3 py-1.5` | 14px | `text-xs` 600 |
| `md` (mặc định) | `px-4 py-2` | 16px | `text-sm` 600 |
| `lg` | `px-5 py-2.5` | 20px | `text-base` 700 |

- Kính: `rounded-full`, nền màu chủ đề 80%, `backdrop-blur-md`, viền màu chủ đề, `shadow-sm` (rê `shadow-md`), ánh 1px trắng mép trên.
- Icon nét 2,5, không có ô nền.
- Rê: nền đậm lên một bậc, icon phóng 110%, chữ 105%, 300–500ms.
- Nhiều địa điểm thì xếp nối nhau, xuống dòng khi hết chỗ.

## Khung chữ cuộn

Xem [trang-album.md](trang-album.md#khung-chữ-cuộn).
