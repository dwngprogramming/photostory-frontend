# Nút

Photostory có năm dạng nút. Mỗi khu chỉ một nút chính.

## Nút chính

Hành động chính của khu: "Bắt đầu", "Mở Album Ngay", "Xem Demo" trong hộp thoại, "Tạo Album".

```tsx
// Khung app, hộp thoại (48px)
<button className="h-12 px-6 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
  Mở album <ArrowRight className="w-4 h-4"/>
</button>
```

| Cỡ | Chiều cao | Đệm ngang | Chữ | Bo | Ở đâu |
|---|---|---|---|---|---|
| Nhỏ | ≈44px (`py-2.5`) | `px-6` | `text-base` 600 | `rounded-lg` | Thanh điều hướng landing |
| Vừa | 48px (`h-12` / `py-3`) | `px-6` | `text-base` 500–600 | `rounded-lg` (khung app), `rounded-xl` (hộp thoại) | My Albums, hộp thoại |
| Lớn | ≈56px (`py-4`, `h-14`) | `px-8` | `text-base` 600, Unwrap `text-lg md:text-xl` | `rounded-xl` (hero), `rounded-2xl` (Unwrap) | Hero, Unwrap |

Theo sân khấu:

- **Giới thiệu:** thêm `shadow-md hover:shadow-soft-lg hover:scale-105` (hero), Unwrap `shadow-lg hover:scale-[1.02] active:scale-[0.98]`.
- **Khung app:** thêm `shadow-soft-lg hover:shadow-soft-xl`, không phóng, không nhấc.
- **Hộp thoại:** không bóng, không phóng, chỉ đổi màu.
- **Trên nền cam (khối CTA):** đảo màu: nền `white`, chữ `amber-600`, rê `amber-50`, `shadow-xl`.

Trạng thái:

| Trạng thái | Trông thế nào |
|---|---|
| Đang xử lý | Thay chữ bằng `Loader2 w-5 h-5 animate-spin` (hộp thoại) hoặc vòng quay + chữ "Đang mở album..." (Unwrap). Giữ nguyên bề rộng nút |
| Khoá | `disabled:opacity-50 disabled:cursor-not-allowed`; nút có phóng thì thêm `disabled:hover:scale-100` |
| Chuyển pha | Unwrap đổi icon + chữ theo pha: `Sparkles` "Mở Album Ngay" → vòng quay "Đang mở album..." → `PackageOpen` "Album sẵn sàng!" |

**Đề xuất P1:** chữ trắng trên `amber-500` đạt 2,15:1. Hai hướng: nền `amber-500` + chữ `stone-950`; hoặc nền `amber-600` (rê `amber-700`) + chữ trắng đậm từ 18px. Giữ như hiện tại cho tới khi chốt.

## Nút viền

Hành động phụ đứng cạnh nút chính: "Xem demo" ở hero.

```tsx
<button className="border-2 border-amber-400 text-amber-600 dark:text-amber-400 px-8 py-4 rounded-xl font-semibold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all flex items-center justify-center gap-2">
  <Play className="w-5 h-5"/> Xem demo
</button>
```

Cùng chiều cao, bo, đệm với nút chính đứng cạnh. Viền 2px.

## Nút chữ

Hành động nhẹ: "Đăng nhập" trên thanh điều hướng, "Để sau" trong hộp thoại, "Nâng cấp dung lượng".

| Biến thể | Class |
|---|---|
| Trung tính | `text-stone-600 dark:text-stone-300 hover:text-amber-500 dark:hover:text-amber-400 font-medium` |
| Trung tính có nền khi rê (hộp thoại) | `h-12 w-full text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl font-medium` |
| Nhấn | `px-5 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg` |

Nút huỷ, "Để sau" luôn trung tính, không tô màu nhấn.

## Nút icon

Nút chỉ có icon: đóng, menu, lọc, sắp xếp, đổi kiểu xem.

| Biến thể | Class |
|---|---|
| Thanh công cụ | `p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800` |
| Đang chọn (kiểu xem) | `p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-amber-600 dark:text-amber-400` |
| Đóng hộp thoại | `absolute right-4 top-4 p-2 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800` |
| Tròn mạng xã hội (footer) | `w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-amber-500 hover:text-white` |

Mọi nút icon **phải** có `aria-label` (nhiều chỗ đang thiếu, xem [can-sua.md](../can-sua.md)).

## Nút trên nền ảnh, nền tối

Đặt trên ảnh hoặc trong hộp ảnh toàn màn.

| Biến thể | Class |
|---|---|
| Đóng hộp ảnh | `fixed top-4 right-4 p-2 rounded-full bg-stone-800/50 hover:bg-stone-700 text-white` |
| "Mở album" hiện khi rê ảnh bìa | `bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-100 px-4 py-2 rounded-lg font-medium shadow-lg`, trượt lên 8px khi hiện |
| Cuộn trong trang album | `px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg border border-white/10 text-xs font-medium`; chưa tới đáy: `bg-stone-800/80` "Cuộn xuống"; ở đáy: `bg-amber-500` "Về đầu" |
| Phát nhạc | Tròn 28px (`sm`) / 40px (`md`), gradient `amber-400 → orange-500`, chữ trắng, bóng cam, nửa trên phủ sáng `white/40` |
