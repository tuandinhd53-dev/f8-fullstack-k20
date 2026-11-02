# Day 41 - TypeScript Order Processing

## 1. Giới thiệu

Dự án thực hành TypeScript với Node.js, xây dựng chức năng xử lý đơn hàng và kiểm tra kiểu dữ liệu nghiêm ngặt.

## 2. Công nghệ sử dụng

- TypeScript
- Node.js
- tsx
- npm

## 3. Cấu trúc dự án

```text
k20-day41-typescript-order-processing/
├── src/
│   ├── types.ts
│   ├── order.ts
│   ├── data.ts
│   └── main.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## 4. Chức năng

- Khai báo kiểu dữ liệu bằng `interface`, `type`.
- Sử dụng kế thừa interface và interface merging.
- Sử dụng union type, intersection type và optional properties.
- Tìm kiếm sản phẩm theo ID.
- Kiểm tra thông tin người dùng, sản phẩm, số lượng và tồn kho.
- Tạo đơn hàng và tính tổng tiền.
- Xử lý kết quả bằng discriminated union.
- Hiển thị thông tin đơn hàng và trạng thái đơn hàng.
- Kiểm tra dữ liệu bằng TypeScript strict mode.

## 5. Cài đặt

Clone repository:

```bash
git clone <repository-url>
cd k20-day41-typescript-order-processing
```

Cài đặt dependencies:

```bash
npm install
```

## 6. Chạy chương trình

Chạy trực tiếp TypeScript bằng `tsx`:

```bash
npm start
```

## 7. Kiểm tra TypeScript

Chạy lệnh:

```bash
npm run check
```

Nếu không có thông báo lỗi, TypeScript đã kiểm tra thành công.

Chế độ kiểm tra nghiêm ngặt được bật trong `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

## 8. Kết quả mong đợi

Chương trình tạo đơn hàng thành công và hiển thị:

- Mã đơn hàng.
- Tổng tiền đơn hàng.
- Tên sản phẩm.
- Kết quả tìm kiếm sản phẩm.
- Thông tin số điện thoại.
- Thông báo trạng thái đơn hàng.

Với dữ liệu mẫu hiện tại, tổng tiền đơn hàng là **15.700.000 VND**.

## 9. Kiến thức rút ra

- Tổ chức code TypeScript thành nhiều module.
- Import và export dữ liệu, kiểu dữ liệu và hàm.
- Kiểm tra dữ liệu đầu vào trước khi xử lý.
- Tính toán tổng tiền từ danh sách sản phẩm.
- Sử dụng strict mode để phát hiện lỗi kiểu dữ liệu.
