# Day 43 - TypeScript Product Catalog

Ứng dụng quản lý danh sách sản phẩm được xây dựng bằng TypeScript và Node.js.

## 1. Công nghệ sử dụng

- TypeScript
- Node.js
- tsx
- TypeScript Strict Mode (`strict: true`)

## 2. Cài đặt

Clone repository:

```bash
git clone <YOUR_REPOSITORY_URL>
cd k20-day43-typescript-product-catalog
```

Cài đặt dependencies:

```bash
npm install
```

## 3. Chạy chương trình

Chạy trực tiếp TypeScript:

```bash
npm run dev
```

Kiểm tra lỗi TypeScript:

```bash
npx tsc --noEmit
```

Build TypeScript:

```bash
npm run build
```

Chạy JavaScript sau khi build:

```bash
npm start
```

## 4. Cấu trúc thư mục

```text
k20-day43-typescript-product-catalog/
├── src/
│   ├── product-types.ts
│   ├── product-service.ts
│   └── main.ts
├── dist/
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## 5. Chức năng

- Hiển thị danh sách sản phẩm.
- Tìm sản phẩm theo ID.
- Cập nhật một hoặc nhiều thuộc tính sản phẩm.
- Lọc sản phẩm bằng generic function.
- Xác định trạng thái tồn kho.
- Hiển thị nhãn trạng thái bằng Record.
- Đọc thuộc tính sản phẩm bằng keyof và indexed access type.

## 6. Trách nhiệm từng module

### `product-types.ts`

Định nghĩa các kiểu dữ liệu:

- `Product`
- `ProductStatus`
- `ProductUpdate`
- `ProductFieldErrors`

Đồng thời định nghĩa danh sách trạng thái và object ánh xạ trạng thái sang nhãn tiếng Việt.

### `product-service.ts`

Quản lý dữ liệu sản phẩm và xử lý nghiệp vụ:

- `getAllProducts()`
- `findProductById()`
- `updateProduct()`
- `getProductField()`
- `filterBy()`
- `getProductStatus()`

### `main.ts`

Là điểm bắt đầu của chương trình.

Import các module, gọi hàm xử lý và hiển thị kết quả để kiểm tra các chức năng.

## 7. Kiến thức TypeScript áp dụng

- Type Annotation
- Union Types
- Literal Types
- `as const`
- `typeof`
- `keyof`
- Indexed Access Types
- `Partial<T>`
- `Record<K, V>`
- Mapped Types
- Generic Functions
- Type-only Imports
- Strict Type Checking

## 8. Mục tiêu bài tập

Thực hành cách tổ chức ứng dụng TypeScript thành nhiều module, quản lý kiểu dữ liệu và xây dựng các hàm xử lý dữ liệu có tính an toàn kiểu.
