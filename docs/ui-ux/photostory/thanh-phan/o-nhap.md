# Ô nhập

Photostory hiện có ít form. Ba ô nhập đang có là mẫu cho các form sau (tạo album, cài đặt).

## Ô nhập thường

Mẫu cho form trong khung app và hộp thoại, rút từ ô PIN:

```tsx
<input className="w-full h-12 px-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"/>
```

| Phần | Giá trị |
|---|---|
| Cao | 48px |
| Nền | `stone-50` / tối `stone-800` (không trong suốt) |
| Viền | 1px `stone-200` / tối `stone-700` |
| Focus | Vòng 2px `amber-500`, viền tắt |
| Placeholder | `stone-400` |
| Khoá | `opacity-70 cursor-not-allowed` |

Nhãn trường đặt **trên** ô (`text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5`), không dùng placeholder thay nhãn. Lỗi đặt dưới ô, `text-sm text-red-600 dark:text-red-400`. Hai luật này chưa có mẫu trong code; khi dựng form tạo album thì theo.

## Ô nhập mã quà (Unwrap)

Ô lớn duy nhất của màn, đứng giữa:

| Phần | Giá trị |
|---|---|
| Cao | 48px, từ `md` 56px |
| Bo | `rounded-2xl` |
| Nền | `white/90` / tối `stone-900/90` + `backdrop-blur-md` (đặt trên nền gradient có khối trôi) |
| Viền | 2px `stone-200` / tối `stone-700`; focus `amber-400` / tối `amber-600` + vòng 4px `amber-100/50` / tối `amber-900/30` |
| Chữ | Căn giữa, `text-md md:text-lg`; placeholder in hoa giãn chữ |
| Bóng | `shadow-lg` / tối `shadow-dark` |
| Nút xoá | Tròn 32px ở mép phải, `bg-stone-100` / tối `stone-800`, chỉ hiện khi có chữ và đang rảnh |
| Ví dụ dưới ô | `text-sm stone-500`, mã mẫu trong `font-mono bg-stone-100 px-1.5 py-0.5 rounded` |
| Gửi | Phím Enter hoặc nút "Mở Album Ngay" bên dưới |
| Kiểm | 5–30 ký tự; sai thì toast lỗi, không đỏ ô |

## Ô PIN

Trong hộp thoại PIN (`PinInputModal`): ô nhập thường + `type="password"`, `maxLength={6}`, `text-center text-lg tracking-[0.5em] font-bold`; placeholder bỏ giãn chữ, bỏ đậm. Tự focus khi mở. Nút gửi khoá khi rỗng hoặc đang kiểm.

## Ô tìm kiếm

Trên thanh công cụ My Albums:

```tsx
<div className="relative flex-1 min-w-[200px]">
  <Search className="w-5 h-5 absolute left-3 top-2.5 text-stone-400"/>
  <input className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 border-none focus:ring-2 focus:ring-amber-500 text-stone-900 dark:text-stone-100 placeholder-stone-400"/>
</div>
```

Ô tìm kiếm là ngoại lệ: nền chìm `stone-100`, không viền, vì nằm trong thanh công cụ đã có nền trắng viền.

## Vùng kéo thả ảnh

Trạng thái rỗng của My Albums cũng là vùng thả ảnh (`react-dropzone`, nhận `image/*`, `video/*`, không mở hộp chọn khi bấm):

| Trạng thái | Viền | Nền | Tiêu đề |
|---|---|---|---|
| Thường | 2px nét đứt `stone-300` / tối `stone-700` | `stone-50/50` / tối `stone-900/50` | "Bạn chưa có album nào" |
| Đang kéo ảnh vào | 2px nét đứt `amber-500` | `amber-50/50` / tối `amber-900/10` | "Thả ảnh để tạo album" |

Cao tối thiểu 400px, `rounded-2xl`, nội dung căn giữa: ô icon tròn 80px `amber-100` + `FolderPlus` 40px, tiêu đề serif `text-2xl`, mô tả `stone-500` rộng tối đa `max-w-xl`, nút chính "Tạo Album".
