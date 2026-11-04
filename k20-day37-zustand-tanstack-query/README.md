# Day 37 - Zustand & TanStack Query

Ứng dụng cửa hàng sản phẩm được xây dựng bằng React, sử dụng **Zustand** để quản lý giỏ hàng và **TanStack Query** để lấy dữ liệu sản phẩm từ DummyJSON API.

## 1. Công nghệ sử dụng

- React
- Vite
- JavaScript
- Tailwind CSS
- Zustand
- TanStack Query
- DummyJSON API

## 2. Chức năng chính

### Quản lý giỏ hàng với Zustand

- Thêm sản phẩm vào giỏ hàng.
- Nếu sản phẩm đã tồn tại, tăng số lượng thay vì tạo dòng sản phẩm mới.
- Cập nhật số lượng sản phẩm với số nguyên dương.
- Xóa sản phẩm khỏi giỏ hàng.
- Tính tổng tiền giỏ hàng.
- Hiển thị tổng số lượng sản phẩm trên Header.
- Hiển thị thông tin giỏ hàng trong Modal.
- Đóng Modal bằng nút đóng, nhấn ra ngoài hoặc phím Escape.
- Cập nhật giao diện ngay khi trạng thái giỏ hàng thay đổi.

### Lấy dữ liệu với TanStack Query

- Lấy danh sách danh mục sản phẩm từ DummyJSON API.
- Lấy sản phẩm theo danh mục được chọn.
- Sử dụng `queryKey` để quản lý dữ liệu truy vấn.
- Sử dụng `enabled` để chỉ lấy sản phẩm khi đã chọn danh mục.
- Xử lý các trạng thái loading và error.
- Hiển thị danh sách sản phẩm và trạng thái khi không có dữ liệu.

## 3. API sử dụng

**Danh sách danh mục**

`https://dummyjson.com/products/category-list`

**Sản phẩm theo danh mục**

`https://dummyjson.com/products/category/{categoryName}`

Ví dụ:

`https://dummyjson.com/products/category/smartphones`

## 4. Cài đặt và chạy dự án

### Yêu cầu

- Node.js
- npm

### Bước 1: Clone repository

```bash
git clone <https://github.com/tuandinhd53-dev/f8-fullstack-k20.git>
```

### Bước 2: Di chuyển vào thư mục dự án

```bash
cd k20-day37-zustand-tanstack-query
```

### Bước 3: Cài đặt dependencies

```bash
npm install
```

### Bước 4: Chạy ứng dụng

```bash
npm run dev
```

Mở URL được Vite hiển thị trong terminal để sử dụng ứng dụng.

## 5. Cấu trúc dự án

```text
src/
├── components/
│   ├── Header.jsx
│   ├── CategoryList.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   ├── CartItem.jsx
│   └── CartModal.jsx
├── lib/
│   └── api.js
├── store/
│   └── cartStore.js
├── App.jsx
├── main.jsx
└── index.css
```

## 6. Cách các thành phần hoạt động

### Zustand

`cartStore.js` quản lý trạng thái giỏ hàng và cung cấp các action:

- `addToCart`: thêm sản phẩm hoặc tăng số lượng.
- `updateQuantity`: cập nhật số lượng sản phẩm.
- `removeFromCart`: xóa sản phẩm.
- `getTotalPrice`: tính tổng tiền giỏ hàng.

Các component sử dụng store để đọc dữ liệu và gọi action khi người dùng tương tác.

### TanStack Query

`api.js` chứa các hàm gọi API và kiểm tra lỗi HTTP.

`App.jsx` sử dụng `useQuery` để lấy danh mục và sản phẩm theo danh mục. Khi danh mục thay đổi, `queryKey` thay đổi để TanStack Query quản lý truy vấn tương ứng.

### Components

Các component được chia theo trách nhiệm giao diện:

- `Header`: hiển thị tiêu đề và số lượng sản phẩm trong giỏ.
- `CategoryList`: hiển thị danh mục sản phẩm.
- `ProductCard`: hiển thị thông tin một sản phẩm.
- `ProductList`: hiển thị danh sách sản phẩm.
- `CartItem`: hiển thị một sản phẩm trong giỏ hàng.
- `CartModal`: hiển thị chi tiết giỏ hàng và tổng tiền.

## 7. Kiến thức thực hành

- Quản lý global state với Zustand.
- Sử dụng selector để đọc state cần thiết.
- Quản lý server state với TanStack Query.
- Sử dụng `useQuery`, `queryKey`, `queryFn` và `enabled`.
- Tách component theo trách nhiệm.
- Xử lý loading, error và empty state.
- Làm việc với API bất đồng bộ bằng `async/await`.
- Cập nhật state bất biến trong React.
- Kết hợp dữ liệu API với trạng thái giỏ hàng.

## 8. Links

- **GitHub Repository:** `https://github.com/tuandinhd53-dev/f8-fullstack-k20.git`
- **Live Demo:** `https://k20-day37-zustand-tanstack-query-delta.vercel.app/`
