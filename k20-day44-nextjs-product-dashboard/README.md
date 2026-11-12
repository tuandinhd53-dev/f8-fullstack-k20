# Day 44 – Next.js Product Dashboard

## 1. Giới thiệu

Xây dựng ứng dụng quản lý sản phẩm sử dụng Next.js App Router, TypeScript và Tailwind CSS. Frontend lấy dữ liệu từ Express API chạy độc lập.

## 2. Công nghệ sử dụng

- Next.js
- React
- TypeScript
- Tailwind CSS
- Express.js
- Fetch API

## 3. Cấu trúc dự án

```text
k20-day44-nextjs-product-dashboard/
├── app/
│   ├── dashboard/
│   │   ├── products/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   └── products.ts
│   └── page.tsx
├── package.json
└── README.md

```

_Lưu ý: Điều chỉnh cấu trúc trên theo đúng vị trí thư mục thực tế của hai ứng dụng._

## 4. Cài đặt và khởi chạy

Yêu cầu: Node.js và npm đã được cài đặt.

### Bước 1: Cài đặt dependencies

Mở terminal tại thư mục frontend:

```bash
npm install
```

Tiếp tục mở terminal tại thư mục Express API:

```bash
npm install
```

### Bước 2: Cấu hình môi trường

Tạo file `.env.local` trong thư mục Next.js:

```env
API_URL=http://localhost:3001
```

### Bước 3: Khởi chạy Express API

**Terminal 1 – Backend (Express API)**

Tại thư mục gốc dự án, chạy:

```bash
cd api
npm install
npm run dev
```

Express API chạy tại:

```text
http://localhost:3001
```

### Bước 4: Khởi chạy Next.js

**Terminal 2 – Frontend (Next.js)**

Mở terminal mới tại thư mục gốc dự án `k20-day44-nextjs-product-dashboard`:

```bash
npm install
npm run dev
```

Next.js chạy tại:

```text
http://localhost:3000
```

**Lưu ý:** Hai terminal phải chạy đồng thời để Next.js có thể gọi Express API.

## 5. Các URL cần truy cập

| URL                                             | Chức năng                        |
| ----------------------------------------------- | -------------------------------- |
| `http://localhost:3000`                         | Trang giới thiệu                 |
| `http://localhost:3000/dashboard`               | Dashboard thống kê               |
| `http://localhost:3000/dashboard/products`      | Danh sách sản phẩm               |
| `http://localhost:3000/dashboard/products/1`    | Chi tiết sản phẩm có ID = 1      |
| `http://localhost:3000/dashboard/products/9999` | Kiểm tra sản phẩm không tồn tại  |
| `http://localhost:3001/products`                | Express API – danh sách sản phẩm |
| `http://localhost:3001/products/stats`          | Express API – thống kê sản phẩm  |
| `http://localhost:3001/products/1`              | Express API – chi tiết sản phẩm  |

## 6. Các chức năng đã hoàn thành

### Home Page

- Trang giới thiệu dự án.
- Điều hướng đến Dashboard.

### Dashboard

- Hiển thị tổng số sản phẩm.
- Hiển thị giá trung bình của sản phẩm.
- Lấy dữ liệu thống kê trực tiếp từ API.

### Product Management

- Hiển thị danh sách sản phẩm.
- Tìm kiếm sản phẩm theo từ khóa.
- Phân trang.
- Xem chi tiết từng sản phẩm.
- Kiểm tra ID không hợp lệ.
- Xử lý trường hợp không tìm thấy sản phẩm.

### UI và kỹ thuật

- Dashboard Layout dùng chung.
- Điều hướng bằng Next.js App Router.
- Dynamic Route với `[id]`.
- Async Server Components.
- Fetch API phía Server.
- Suspense và fallback loading.
- TypeScript.
- Tailwind CSS.

## 7. Kiến thức áp dụng

- Next.js App Router.
- Server Components và Client Components.
- Dynamic Routes và URL Parameters.
- Data Fetching.
- Search và Pagination.
- Error Handling.
- Suspense.
- TypeScript.
- Kết nối Frontend với Backend API.

## 8. Tác giả

Đinh Văn Tuấn

F8 Full Stack K20 – Day 44
