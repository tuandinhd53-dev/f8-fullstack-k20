# TypeScript Payment Processing

Ứng dụng xử lý thanh toán được xây dựng bằng TypeScript và Vite. Dự án giúp thực hành các kiến thức TypeScript, Type Guard, Generics, thao tác DOM và lập trình hướng đối tượng (OOP).

## 1. Công nghệ sử dụng

- TypeScript
- Vite
- HTML5
- Tailwind CSS
- DOM API

## 2. Chức năng chính

- Xử lý thanh toán bằng 3 phương thức:
    - Thanh toán khi nhận hàng (COD).
    - Chuyển khoản ngân hàng.
    - Ví điện tử (E-Wallet).
- Kiểm tra dữ liệu thanh toán bằng Type Guard.
- Tạo hóa đơn với mã định danh riêng.
- Hiển thị danh sách lịch sử giao dịch.
- Tìm kiếm hóa đơn theo mã hóa đơn.
- Thống kê số lượng giao dịch.
- Tính tổng số tiền đã thanh toán.
- Hiển thị thông báo khi thanh toán thành công hoặc thất bại.

## 3. Cài đặt dự án

Clone repository:

```bash
git clone <https://github.com/tuandinhd53-dev/f8-fullstack-k20.git>
```

Di chuyển vào thư mục dự án:

```bash
cd k20-day42-typescript-payment-processing
```

Cài đặt các thư viện cần thiết:

```bash
npm install
```

## 4. Chạy dự án

Khởi động môi trường phát triển:

```bash
npm run dev
```

Mở đường dẫn Local được hiển thị trong Terminal để sử dụng ứng dụng.

Kiểm tra lỗi TypeScript:

```bash
npx tsc --noEmit
```

## 5. Cấu trúc thư mục

```text
src/
├── main.ts
├── style.css
├── types.ts
├── validators.ts
├── PaymentProcessor.ts
└── utils.ts

index.html
package.json
tsconfig.json
```

## 6. Cách các Class xử lý thanh toán phối hợp với nhau

Dự án sử dụng lập trình hướng đối tượng (OOP), trong đó `PaymentProcessor` là lớp trừu tượng (Abstract Class) đóng vai trò lớp cơ sở.

### PaymentProcessor

Chịu trách nhiệm:

- Lưu trữ thông tin đơn hàng và số tiền thanh toán.
- Khai báo phương thức trừu tượng `pay()`.
- Cung cấp phương thức `createReceipt()` để tạo hóa đơn thanh toán.

### Các lớp xử lý thanh toán

Ba lớp kế thừa từ `PaymentProcessor`:

- `CodPaymentProcessor`: Xử lý thanh toán khi nhận hàng.
- `BankTransferProcessor`: Xử lý thanh toán chuyển khoản.
- `EWalletPaymentProcessor`: Xử lý thanh toán bằng ví điện tử.

Mỗi lớp triển khai phương thức `pay()` theo cách riêng.

### Luồng xử lý thanh toán

1. Người dùng nhập thông tin và gửi biểu mẫu thanh toán.
2. Hàm `isPaymentRequest()` kiểm tra dữ liệu đầu vào.
3. Câu lệnh `switch` xác định phương thức thanh toán.
4. Khởi tạo Class xử lý thanh toán tương ứng.
5. Gọi phương thức `pay()` để thực hiện xử lý.
6. Phương thức `createReceipt()` tạo hóa đơn.
7. Trả về kết quả theo kiểu `PaymentResult`.
8. Cập nhật giao diện, lịch sử giao dịch và thống kê.

## 7. Kiến thức TypeScript đã áp dụng

- **Union Types:** Giới hạn các phương thức thanh toán hợp lệ.
- **Type Guards:** Kiểm tra và xác thực dữ liệu tại runtime.
- **Generics:** Xây dựng hàm `findById<T>()` có thể tái sử dụng.
- **Interfaces:** Định nghĩa cấu trúc dữ liệu thanh toán và hóa đơn.
- **Abstract Class:** Xây dựng lớp cơ sở dùng chung.
- **Inheritance:** Kế thừa các thuộc tính và phương thức từ lớp cha.
- **Polymorphism:** Các lớp xử lý thanh toán triển khai phương thức `pay()` theo cách riêng.
- **DOM Manipulation:** Xử lý biểu mẫu và cập nhật giao diện.

## 8. Tác giả

**Đinh Văn Tuấn**

F8 Full Stack - Bài tập Day 42: TypeScript Payment Processing
