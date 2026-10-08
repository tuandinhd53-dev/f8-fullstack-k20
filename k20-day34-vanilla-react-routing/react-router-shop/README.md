# K20 — Day 34: Vanilla & React Routing Shop

Repo chứa **2 dự án routing độc lập** cùng xây dựng một website bán hàng đơn giản bằng 2 cách tiếp cận:

| #     | Dự án                   | Công nghệ                                       | Thư mục                                         |
| ----- | ----------------------- | ----------------------------------------------- | ----------------------------------------------- |
| Bài 1 | **Vanilla Router Shop** | HTML + Vanilla JavaScript + Tailwind CSS + Vite | [`vanilla-router-shop/`](./vanilla-router-shop) |
| Bài 2 | **React Router Shop**   | React + Vite + React Router + Tailwind CSS      | [`react-router-shop/`](./react-router-shop)     |

---

## 🔗 Live Demo

- **Bài 1 — Vanilla Router Shop:** https://k20-day34-vanilla-react-router-shop.vercel.app
- **Bài 2 — React Router Shop:** https://k20-day34-react-router-shop.vercel.app

> Hai dự án được deploy thành 2 project Vercel riêng và cùng sử dụng repository này với Root Directory tương ứng.

## 📌 Repository

https://github.com/hangloc31/k20-day34-vanilla-react-routing

---

## 📄 Các page trong cả 2 dự án

- Home Page
- Product List Page
- Product Detail Page
- Cart Page
- Sign Up Page
- Sign In Page
- Not Found Page

## 🛣️ Routes

| Route           | Trang          |
| --------------- | -------------- |
| `/`             | Home           |
| `/products`     | Product List   |
| `/products/:id` | Product Detail |
| `/cart`         | Cart           |
| `/sign-up`      | Sign Up        |
| `/sign-in`      | Sign In        |
| `*`             | Not Found      |

---

# 🥇 Bài 1 — Vanilla Router Shop

Website bán hàng được xây dựng bằng **HTML, Vanilla JavaScript và Tailwind CSS**, không sử dụng React hoặc framework SPA khác.

### Routing

- Tự xây dựng router bằng JavaScript.
- Sử dụng History API.
- Hỗ trợ `pushState` và `popstate`.
- Hỗ trợ dynamic route `/products/:id`.
- Điều hướng nội bộ không reload toàn bộ trang.
- Xử lý route không tồn tại bằng Not Found Page.
- Reset scroll khi chuyển trang.

### Layout

**Default Layout** dùng cho:

- Home
- Products
- Product Detail
- Cart

Bao gồm Header, Navigation và Footer.

**Auth Layout** dùng cho:

- Sign Up
- Sign In

Form được tách khỏi giao diện chính của shop và căn giữa màn hình.

### Active Menu

- Home active tại `/`.
- Products active tại `/products` và `/products/:id`.
- Cart active tại `/cart`.
- Sign In active tại `/sign-in`.
- Sign Up active tại `/sign-up`.

### Cart

Giỏ hàng được quản lý bằng JavaScript và `localStorage`.

Chức năng:

- Thêm sản phẩm
- Tăng / giảm số lượng
- Xóa sản phẩm
- Xóa toàn bộ giỏ hàng
- Tính tổng tiền
- Giữ dữ liệu khi reload trang

### Form

Sign Up và Sign In là form demo với validation phía client.

Không sử dụng authentication hoặc API thật.

---

# 🥈 Bài 2 — React Router Shop

Xây dựng lại Router Shop bằng **React + Vite + React Router + Tailwind CSS**.

### React Router

Sử dụng:

- `BrowserRouter`
- `Routes`
- `Route`
- `Link`
- `NavLink`
- `Outlet`
- `useParams`
- `useLocation`

### Layout

**DefaultLayout**

```text
Header
  ↓
Outlet
  ↓
Page
  ↓
Footer
```

Dùng cho Home, Products, Product Detail, Cart.
AuthLayout
Dùng cho Sign Up và Sign In, với giao diện form căn giữa và logo riêng.
Product Detail
Sử dụng dynamic route:
/products/:productId

Lấy productId từ URL bằng useParams() và tìm sản phẩm tương ứng trong dữ liệu.
Components
components/
├── Header.jsx
├── Footer.jsx
├── ProductCard.jsx
└── ScrollToTop.jsx

Dữ liệu sản phẩm:
data/
└── products.js

Quản lý giỏ hàng:
context/
└── CartContext.jsx

Cart Context
Sử dụng Context API và useState để quản lý giỏ hàng dùng chung.
Chức năng:

- Add to Cart
- Update Quantity
- Remove Item
- Clear Cart
- Hiển thị số lượng sản phẩm trên Header
- Lưu giỏ hàng vào localStorage
  Form
  Sign Up và Sign In sử dụng React controlled form:
- useState
- onChange
- onSubmit
- Validation cơ bản
- Hiển thị lỗi theo từng field
  Không gọi API authentication thật.
  Scroll Reset
  Sử dụng ScrollToTop với:
  useLocation
  useEffect
  window.scrollTo()

để đưa trang về đầu khi chuyển route.
🎨 UI
Cả hai dự án sử dụng Tailwind CSS với:

- Responsive layout
- Product grid
- Product cards
- Form UI
- Hover state
- Active state
- Button interaction
- Spacing và typography rõ ràng
  🚀 Chạy local
  Bài 1 — Vanilla
  cd vanilla-router-shop
  npm install
  npm run dev

Bài 2 — React
cd react-router-shop
npm install
npm run dev

Build production
npm run build
npm run preview

📁 Cấu trúc repository
k20-day34-vanilla-react-routing/
│
├── vanilla-router-shop/
│ ├── index.html
│ ├── src/
│ ├── package.json
│ └── ...
│
├── react-router-shop/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── data/
│ │ ├── layouts/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── ...
│
└── README.md

🧠 Kiến thức thực hành
Vanilla JavaScript

- Custom Router
- History API
- Dynamic Route
- Layout
- Active Navigation
- 404
- Scroll Reset
- LocalStorage
- DOM rendering
  React
- React Router
- Nested Routes
- Layout + Outlet
- Link / NavLink
- useParams
- useLocation
- useState
- useEffect
- Context API
- LocalStorage
- Controlled Form
- Client-side Validation
