# Day 44 – Next.js Product Dashboard

## Giới thiệu

Dự án xây dựng trang quản lý sản phẩm bằng Next.js App Router, TypeScript và Tailwind CSS. Frontend lấy dữ liệu từ Express API chạy riêng.

## Công nghệ sử dụng

- Next.js – App Router
- React
- TypeScript
- Tailwind CSS
- Express API
- React Suspense

## Chức năng

### 1. Home page (`/`)

- Trang giới thiệu bài tập.
- Điều hướng đến Dashboard.

### 2. Dashboard (`/dashboard`)

- Hiển thị tổng số sản phẩm.
- Hiển thị giá trung bình.
- Lấy dữ liệu thống kê từ API.

### 3. Product list (`/dashboard/products`)

- Hiển thị danh sách sản phẩm.
- Tìm kiếm sản phẩm.
- Phân trang.
- Điều hướng đến trang chi tiết.

### 4. Product detail (`/dashboard/products/[id]`)

- Lấy sản phẩm theo ID.
- Hiển thị thông tin sản phẩm.
- Kiểm tra ID không hợp lệ.
- Xử lý trường hợp không tìm thấy sản phẩm.

## Cấu trúc dự án

```text
app/
├── dashboard/
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── lib/
│   └── products.ts
├── page.tsx
└── ...

```

## Cài đặt

### 1. Clone project

```bash
git clone <https://github.com/tuandinhd53-dev/f8-fullstack-k20.git>
cd k20-day44-nextjs-product-dashboard
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình môi trường

Tạo file `.env.local` tại thư mục gốc:

```env
API_URL=http://localhost:3001
```

### 4. Khởi chạy Express API

Mở terminal riêng và chạy Express API tại port `3001`.

### 5. Khởi chạy Next.js

Mở terminal khác:

```bash
npm run dev
```

Truy cập:

```text
http://localhost:3000
```

## Kiến thức áp dụng

- Next.js App Router và file-based routing.
- Dynamic Routes với `[id]`.
- Async Server Components.
- Fetch API từ Server Components.
- URLSearchParams để xử lý query parameters.
- Search và Pagination.
- Suspense và loading fallback.
- Error handling với try/catch.
- TypeScript type definitions.
- Client Component và hook `usePathname()`.

## Mục tiêu học tập

Thực hành xây dựng ứng dụng quản lý sản phẩm với Next.js, hiểu cách tổ chức routing, lấy dữ liệu từ API và xử lý trạng thái tải dữ liệu.
