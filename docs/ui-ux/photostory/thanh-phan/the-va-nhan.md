# Card, ô số liệu, nhãn

## Card

Công thức gốc: nền `white` / tối `stone-900`, viền 1px `stone-200` / tối `stone-800`, bo `rounded-xl`.

| Card | Thêm gì | Rê |
|---|---|---|
| **Card album** (khung app) | `overflow-hidden`; ảnh bìa tỉ lệ 4:3 nền `stone-100`; thân `p-4` | `-translate-y-1` + `shadow-soft-lg`; ảnh bìa phóng 105% trong 700ms; lớp đen 20% + nút "Mở album"; tên album đổi `amber-600` / tối `amber-500` |
| **Ô thống kê** (khung app) | `p-5 shadow-sm` | `shadow-soft-lg` |
| **Khối dung lượng** (khung app) | `p-6 shadow-sm`, xếp ngang từ `md` | Không |
| **Thanh công cụ** (khung app) | `p-4 rounded-lg shadow-sm sticky top-0 z-10` | Không |
| **Card tính năng** (landing) | `p-8 shadow-md` / tối `shadow-dark`; viền tối `stone-700` | `-translate-y-2`, viền `amber-300` / tối `amber-700`, `shadow-soft-lg` / tối `shadow-dark-lg` |
| **Ô icon bước** (landing) | 64px, `p-4 rounded-lg shadow-sm`, viền `stone-100` / tối `stone-800` | Không |

Luật:

- Card bấm được (card album) thì cả card là vùng bấm, nút ⋮ bên trong chặn lan sự kiện.
- Ở khung app, card chỉ nhấc 4px (`-translate-y-1`). Nhấc 8px (`-translate-y-2`) dành cho sân khấu giới thiệu.
- Card không đặt trong trang giấy album; trang giấy dùng đồ vật ([chat-lieu.md](../album/chat-lieu.md)).

### Card album

```
┌───────────────────────────┐
│ [ảnh bìa 4:3]    🔒 private│  ← nhãn trên ảnh, góc trên phải
│                           │
├───────────────────────────┤
│ Tên album (serif lg, 1 dòng)  ⋮ │
│ 📅 Oct 2025      🖼 24 ảnh │  ← text-sm stone-500, icon 12px
└───────────────────────────┘
```

Thiếu ảnh bìa: giữ khung `stone-100`, đặt icon `Image` 32px `stone-300` ở giữa (chưa có trong code, cần thêm).

## Ô số liệu

```
┌──────────────────┐
│ [■ icon]         │  ← ô 40px rounded-lg amber-50, icon 20px amber-500
│                  │
│ 1.234            │  ← text-2xl font-bold sans stone-800
│ Tổng số ảnh       │  ← text-sm font-medium stone-500
└──────────────────┘
```

Lưới 2 cột, từ `lg` 4 cột, `gap-4`. Số luôn sans, không serif.

## Thanh dung lượng

- Rãnh: cao 8px (`h-2`), `rounded-full`, `stone-100` / tối `stone-800`.
- Phần đã dùng: gradient `amber-400 → amber-600`, chạy tới giá trị trong 1s ease-out.
- Trên thanh: tên khối bên trái (`font-semibold`), bên phải `{đã dùng}GB / {tổng}GB` với số đã dùng đậm `stone-900`.
- Từ 90% trở lên nên đổi phần đã dùng sang `red-500` và thêm một dòng chữ báo (chưa có trong code).

## Chip

| Chip | Class | Ở đâu |
|---|---|---|
| Chip mời (hero) | `px-4 py-2 rounded-full text-sm font-medium bg-orange-50 text-orange-600 border border-orange-200` / tối `bg-orange-900/30 text-orange-400 border-orange-800/50` | "✨ Miễn phí - Không cần thẻ tín dụng" |
| Chip loại nội dung (album) | `inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600 border border-orange-200` + icon 14px | "Music", "Location" trên trang câu chuyện |
| Nhãn "Bài chủ đề" | `px-1 rounded-full bg-yellow-200/60 border border-yellow-400/80`, chữ đen 10px | Máy phát nhạc cỡ `sm` |

Chip loại nội dung trên trang album đi kèm dòng ghi nguồn bên phải (`text-[11px] stone-400`): "Powered by SoundCloud", "Using Google Maps", kèm icon hãng.

## Nhãn trên ảnh

Đặt trên ảnh bìa, không phụ thuộc chế độ sáng/tối:

```
absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md flex items-center gap-1
```

Icon 12px (`Lock` riêng tư, `Globe` công khai). Chữ phải đi qua i18n (đang in thẳng giá trị `private` / `public`).

## Avatar

| Chỗ | Cỡ | Khi thiếu ảnh |
|---|---|---|
| Hồ sơ cuối sidebar | 40px tròn, nền `amber-100` / tối `amber-900/50` | Icon `User` 20px `amber-600` / tối `amber-400` |
| Flap đầu album | 100px tròn, giữa | Ảnh mặc định theo giới tính (`male`, `female`, `other`) |

Hồ sơ cuối sidebar: khối `p-3 rounded-xl bg-stone-50 border border-stone-100` / tối `bg-stone-800/50 border-stone-800`, tên `text-sm font-bold` cắt một dòng, email `text-xs stone-500` cắt một dòng, nút đăng xuất 18px bên phải.
