# Phòng khám Đa khoa An Tâm – Website đặt lịch khám

Landing page cho phòng khám đa khoa, dùng tông xanh y tế kết hợp trắng, font Mulish. Bố cục lấy cảm hứng từ yteducthanhnhan.com.
Công nghệ: **Vite + HTML/CSS/JavaScript thuần**. Kiểm thử bằng **Playwright**. Tự deploy lên **GitHub Pages**.

🌐 Bản online: https://hoaiditest.github.io/phongkham/

## Cấu trúc trang

1. **Top bar:** mạng xã hội và địa chỉ.
2. **Header sticky:** logo, ô tìm kiếm, hotline, nút "Đặt lịch ngay", menu có danh sách chuyên khoa con. Trên mobile chuyển thành hamburger.
3. **Slider banner:** 3 slide, tự chuyển, có mũi tên và chấm điều hướng.
4. **6 chuyên khoa:** bấm vào sẽ tự chọn chuyên khoa đó trong form.
5. **Giới thiệu:** slogan, danh sách cam kết, dải số liệu có hiệu ứng đếm.
6. **Đội ngũ bác sĩ:** 4 bác sĩ.
7. **Cơ sở vật chất:** lưới ảnh 3×2.
8. **Đối tác:** băng chạy ngang.
9. **Báo chí nói về phòng khám:** 3 thẻ.
10. **Tin tức – Kiến thức:** 4 bài.
11. **Form "Để lại nhu cầu khám":** họ tên, SĐT, năm sinh, chuyên khoa, ngày khám, mã giới thiệu, ghi chú.
12. **Footer 4 cột:** có credit "Thiết kế bởi Mai Duy".
13. **Thanh liên hệ nổi bên phải** (gọi, Messenger, Zalo, chỉ đường), **popup đặt lịch** và **nút lên đầu trang**.

## Cài đặt và chạy

Yêu cầu: Node.js ≥ 18

```bash
npm install
npm run dev
```

Mở trình duyệt tại http://localhost:5173

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` / `npm start` | Chạy trên máy |
| `npm run build` | Build bản production vào thư mục `dist/` |
| `npx playwright install chromium` | Cài trình duyệt cho test (chỉ cần chạy 1 lần) |
| `npm test` | Chạy 6 test, xuất `screenshots/` và `videos/demo.webm` |

## Tùy chỉnh nội dung

| Muốn sửa | File |
|---|---|
| Tên phòng khám, hotline, địa chỉ, giờ làm việc, link mạng xã hội | `src/data/site.js` |
| Slide, chuyên khoa, bác sĩ, cơ sở vật chất, đối tác, báo chí, tin tức | `src/data/content.js` |
| Màu sắc, font | Các biến trong `:root` ở đầu `src/style.css` |
| Logo | `public/images/logo.svg` |

**Thay ảnh thật:**
1. Chép ảnh vào `public/images/`.
2. Trong `src/main.js`, thay `<div class="ph tone-...">` bằng `<img src="/images/ten-anh.webp" alt="..." loading="lazy">`.

> ⚠️ Trước khi đưa web lên chạy thật, cần thay toàn bộ dữ liệu mẫu: tên phòng khám, hotline, địa chỉ, tên bác sĩ, đối tác, bài báo và số giấy phép hoạt động. Theo quy định quảng cáo y tế, website phòng khám nên ghi rõ số giấy phép hoạt động.

## Deploy

Mỗi lần push lên branch `main`, GitHub Actions sẽ tự build và deploy.
Chỉ cần thiết lập một lần: vào **Settings → Pages → Source**, chọn **GitHub Actions**.

## Lỗi thường gặp

| Lỗi | Cách khắc phục |
|---|---|
| Web online bị trắng trang hoặc thiếu CSS | Kiểm tra `base` trong `vite.config.js` phải trùng tên repo (`/phongkham/`). Sau đó nhấn Ctrl+F5. |
| Workflow lỗi ở job deploy | Vào Settings → Pages, đảm bảo Source đang là "GitHub Actions", rồi Re-run job. |
| `Port 5173 is in use` | Tắt tiến trình đang chiếm cổng, hoặc đổi port trong `vite.config.js` và `playwright.config.js`. |
| `Executable doesn't exist` khi chạy test | Chạy `npx playwright install chromium`. |
