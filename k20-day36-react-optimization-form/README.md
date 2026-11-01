# Hướng dẫn Bài tập React nâng cao: Tối ưu bộ lọc & Form Validation

Dự án này bao gồm hai bài tập thực hành cốt lõi trong phát triển ứng dụng Front-end hiện đại với React, bao gồm kỹ thuật tối ưu hóa hiệu năng render dữ liệu lớn (`useMemo`) và xử lý form thông minh, an toàn (`React Hook Form` kết hợp `Zod`).

---

## 📂 Cấu trúc bài tập

1. **Bài 1:** `ProductFilterOptimizer` — Xây dựng và tối ưu bộ lọc, tìm kiếm và sắp xếp cho danh sách lớn gồm 1.000 sản phẩm mẫu, ngăn chặn việc tính toán lại không cần thiết khi state phụ (như `count`) thay đổi.
2. **Bài 2:** `RegisterForm` — Xây dựng biểu mẫu đăng ký tài khoản với cơ chế xác thực dữ liệu chặt chẽ bằng Zod Schema, xử lý trạng thái bất đồng bộ (`isSubmitting`) khi gọi API giả lập.

---

## 🚀 Hướng dẫn Cài đặt & Chạy dự án

Nếu bạn tích hợp vào dự án React + Vite hiện tại, hãy đảm bảo đã cài đặt các thư viện cần thiết cho Bài 2:

```bash
npm install react-hook-form zod @hookform/resolvers


Chạy môi trường phát triển (Development Server):
npm run dev
```
