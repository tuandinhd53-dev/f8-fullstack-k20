# K20 Day 38 – React Query, Axios, Lazy Loading & Suspense

## 1. Giới thiệu

Project thực hành React trong chương trình F8 Fullstack K20, gồm 3 chức năng chính của một hệ thống thương mại điện tử:

1. **ProductCatalog:** Khách hàng xem và lọc sản phẩm theo danh mục.
2. **ProductManagement:** Quản trị viên thêm và chỉnh sửa sản phẩm.
3. **ProductDetail:** Khách hàng xem thông tin chi tiết và đánh giá sản phẩm.

Project sử dụng DummyJSON API để thực hành xử lý dữ liệu từ API, quản lý trạng thái server và tối ưu tải component trong React.

## 2. Công nghệ sử dụng

- React
- Vite
- JavaScript (ES6+)
- Tailwind CSS
- shadcn/ui
- Axios
- TanStack Query (React Query)
- React.lazy
- React Suspense

## 3. Chức năng chính

### Bài 1 – ProductCatalog

Xây dựng trang danh sách sản phẩm dành cho khách hàng.

**Chức năng:**

- Hiển thị danh sách sản phẩm.
- Hiển thị ảnh thumbnail, tên sản phẩm và giá.
- Lấy danh sách danh mục từ API.
- Lọc sản phẩm theo danh mục.
- Chuyển đổi giữa danh mục và tất cả sản phẩm.
- Hiển thị trạng thái loading, error và empty.
- Có nút thử lại khi API xảy ra lỗi.

**API sử dụng:**

| Method | Endpoint                   | Mục đích                   |
| ------ | -------------------------- | -------------------------- |
| GET    | `/products`                | Lấy danh sách sản phẩm     |
| GET    | `/products/categories`     | Lấy danh sách danh mục     |
| GET    | `/products/category/:slug` | Lấy sản phẩm theo danh mục |

**Query Key:**

```js
["products", "catalog", selectedCategory];
```

Trong đó `selectedCategory` là `"all"` hoặc slug của danh mục đang chọn.

### Bài 2 – ProductManagement

Xây dựng trang quản lý sản phẩm dành cho quản trị viên.

**Chức năng:**

- Hiển thị bảng sản phẩm gồm tên, giá và tồn kho.
- Thêm sản phẩm mới.
- Chỉnh sửa sản phẩm hiện có.
- Sử dụng Dialog để hiển thị form.
- Điền dữ liệu sản phẩm khi chỉnh sửa.
- Kiểm tra dữ liệu trước khi gửi API.
- Hiển thị trạng thái đang lưu.
- Hiển thị thông báo thành công hoặc lỗi.
- Tự động invalidate query sau khi mutation thành công.

**Quy tắc validation:**

| Trường         | Điều kiện                                      |
| -------------- | ---------------------------------------------- |
| Tên sản phẩm   | Không được để trống hoặc chỉ chứa khoảng trắng |
| Giá            | Phải là số lớn hơn 0                           |
| Tồn kho        | Phải là số nguyên không âm                     |
| Giá và tồn kho | Không được để trống                            |

**API sử dụng:**

| Method | Endpoint        | Mục đích               |
| ------ | --------------- | ---------------------- |
| GET    | `/products`     | Lấy danh sách sản phẩm |
| POST   | `/products/add` | Thêm sản phẩm          |
| PATCH  | `/products/:id` | Chỉnh sửa sản phẩm     |

**Lưu ý:** DummyJSON chỉ mô phỏng thao tác thêm và chỉnh sửa. Dữ liệu thay đổi không được lưu lâu dài trên server.

### Bài 3 – ProductDetail

Xây dựng trang chi tiết sản phẩm dành cho khách hàng.

**Chức năng:**

- Hiển thị tên cửa hàng.
- Hiển thị hình ảnh, tên, giá và mô tả sản phẩm.
- Hiển thị loading và error khi gọi API.
- Có nút thử lại khi API thất bại.
- Mở và ẩn khu vực đánh giá.
- Hiển thị tổng số đánh giá.
- Hiển thị tên người đánh giá, số sao và bình luận.
- Hiển thị thông báo khi sản phẩm chưa có đánh giá.

**API sử dụng:**

| Method | Endpoint      | Mục đích                                   |
| ------ | ------------- | ------------------------------------------ |
| GET    | `/products/1` | Lấy thông tin chi tiết sản phẩm và reviews |

**Lazy Loading:**

Sử dụng `React.lazy()` để tải component `ProductReviews` khi người dùng mở phần đánh giá.

```jsx
const ProductReviews = lazy(() => import("./ProductReviews"));
```

**Suspense:**

Sử dụng `Suspense` để hiển thị giao diện chờ trong khi component đánh giá được tải.

```jsx
{
    showReviews && (
        <Suspense fallback={<p>Đang tải giao diện đánh giá...</p>}>
            <ProductReviews reviews={product.reviews} />
        </Suspense>
    );
}
```

Dữ liệu reviews được lấy cùng API chi tiết sản phẩm và truyền xuống component con thông qua props. Không gọi API lần nữa khi mở đánh giá.

## 4. Cấu hình chung

### Axios Instance

Tạo Axios instance dùng chung cho toàn bộ project.

```js
import axios from "axios";

export const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 10_000,
});
```

Các hàm gọi API được tách riêng khỏi component để dễ quản lý và tái sử dụng.

### TanStack Query

Khởi tạo `QueryClient` và bọc ứng dụng bằng `QueryClientProvider`.

Sử dụng `useQuery` để quản lý dữ liệu lấy từ API và `useMutation` để thực hiện thao tác thêm, chỉnh sửa sản phẩm.

### shadcn/ui

Các component giao diện được sử dụng:

- Button
- Input
- Label
- Dialog

## 5. Cấu trúc thư mục

```text
k20-day38-react-lazy-suspense-axios-shadcn/
│
├── public/
│
├── src/
│   ├── api/
│   │   ├── axiosClient.js
│   │   └── products.js
│   │
│   ├── components/
│   │   └── ui/
│   │       ├── button.jsx
│   │       ├── input.jsx
│   │       ├── label.jsx
│   │       └── dialog.jsx
│   │
│   ├── pages/
│   │   ├── ProductCatalog.jsx
│   │   ├── ProductManagement.jsx
│   │   ├── ProductDetail.jsx
│   │   └── ProductReviews.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── components.json
├── package.json
├── vite.config.js
└── README.md
```

## 6. Cài đặt và chạy project

### Bước 1: Clone repository

```bash
git clone <repository-url>
```

### Bước 2: Di chuyển vào thư mục project

```bash
cd k20-day38-react-lazy-suspense-axios-shadcn
```

### Bước 3: Cài đặt dependencies

```bash
npm install
```

### Bước 4: Chạy development server

```bash
npm run dev
```

Mở địa chỉ Local được hiển thị trong Terminal để xem ứng dụng.

### Build project

```bash
npm run build
```

## 7. Kiến thức đạt được

Sau khi hoàn thành project, các kiến thức thực hành bao gồm:

- Cấu hình và sử dụng Axios instance.
- Tách API logic khỏi UI component.
- Quản lý server state bằng TanStack Query.
- Sử dụng `useQuery` để lấy dữ liệu.
- Sử dụng `useMutation` để thêm và chỉnh sửa dữ liệu.
- Quản lý cache bằng `invalidateQueries`.
- Xử lý loading, error và empty states.
- Xây dựng form và validation dữ liệu.
- Sử dụng Dialog và các component shadcn/ui.
- Truyền dữ liệu giữa component cha và component con.
- Sử dụng conditional rendering.
- Tối ưu tải component bằng `React.lazy()` và `Suspense`.

## 8. Nguồn dữ liệu

- DummyJSON API: https://dummyjson.com/
- React: https://react.dev/
- TanStack Query: https://tanstack.com/query/latest
- Axios: https://axios-http.com/
- shadcn/ui: https://ui.shadcn.com/
- Tailwind CSS: https://tailwindcss.com/

---

## 9. Demo

- **GitHub Repository:** https://github.com/tuandinhd53-dev/f8-fullstack-k20
- Live Demo: ** https://k20-day38-react-lazy-suspense-axios-gold.vercel.app/

**F8 Fullstack K20 – Day 38**

_React Query | Axios | Product Management | Lazy Loading | Suspense_
