# Neon Dashboard (`k20-day46-nextjs-neon-dashboard`)

Ứng dụng web quản lý hóa đơn và khách hàng được xây dựng bằng **Next.js (App Router)**, **Tailwind CSS** và kết nối trực tiếp với cơ sở dữ liệu **Neon PostgreSQL** thông qua truy vấn SQL thuần.

## Công nghệ sử dụng

- **Framework:** Next.js (App Router, Server Components)
- **Ngôn ngữ:** TypeScript
- **Giao diện:** Tailwind CSS, Font `Inter` (`next/font/google`)
- **Cơ sở dữ liệu:** Neon PostgreSQL (`@neondatabase/serverless`)

## Hướng dẫn cài đặt và chạy dự án

### 1. Cài đặt thư viện
Di chuyển vào thư mục dự án và cài đặt các gói phụ thuộc:

```bash
npm install
```

### 2. Cấu hình biến môi trường (`.env.local`)
Tạo một file tên là `.env.local` ở thư mục gốc của dự án (ngang hàng với `package.json`) và thêm chuỗi kết nối từ Neon PostgreSQL:

```env
DATABASE_URL="postgresql://<user>:<password>@<endpoint>.neon.tech/<dbname>?sslmode=require"
```

> **Lưu ý bảo mật:**
> - Không đặt tiền tố `NEXT_PUBLIC_` cho biến `DATABASE_URL` để tránh lộ thông tin kết nối xuống trình duyệt.
> - Tuyệt đối không đưa file `.env.local` hoặc chuỗi kết nối thật lên GitHub.

### 3. Khởi tạo dữ liệu trên Neon PostgreSQL
1. Đăng nhập vào trang quản trị **Neon** và mở mục **SQL Editor**.
2. Mở file `db.sql` nằm ở thư mục gốc của repository này, sao chép toàn bộ nội dung và chạy trong **SQL Editor** để tạo 2 bảng `customers` (4 dòng) và `invoices` (12 dòng).

### 4. Khởi chạy ứng dụng
Chạy server phát triển ở môi trường local:

```bash
npm run dev
```

Mở trình duyệt và truy cập địa chỉ: `http://localhost:3000`

## Các URL cần mở để kiểm tra chức năng

- **`http://localhost:3000/`**: Trang chủ giới thiệu ứng dụng, hiển thị ảnh tĩnh bằng `next/image` và nút điều hướng vào Dashboard.
- **`http://localhost:3000/dashboard`**: Trang tổng quan hiển thị 5 hóa đơn mới nhất (ID: `12, 11, 10, 9, 8`).
- **`http://localhost:3000/dashboard/customers`**: Danh sách 4 khách hàng sắp xếp theo thứ tự ID (`Minh`, `Hoa`, `Phúc`, `Lan`).
- **`http://localhost:3000/dashboard/invoices`**: Danh sách toàn bộ hóa đơn sắp xếp theo ngày giảm dần (tối đa 5 hóa đơn/trang, tổng cộng 3 trang).
- **`http://localhost:3000/dashboard/invoices?search=Minh&page=2`**: Kiểm tra trạng thái tìm kiếm theo tên khách hàng (không phân biệt hoa/thường) kết hợp phân trang đồng bộ qua URL (hiển thị duy nhất hóa đơn ID `1`).