// Đại diện cho một sản phẩm trong hệ thống.
export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
};

// Danh sách trạng thái tồn kho.
// Dùng as const để TypeScript giữ nguyên các giá trị literal.
export const PRODUCT_STATUSES = [
    "in-stock",
    "low-stock",
    "out-of-stock",
] as const;

// Tạo union type tự động từ các phần tử của PRODUCT_STATUSES.
// Kết quả: "in-stock" | "low-stock" | "out-of-stock"
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

// Partial biến tất cả thuộc tính của Product thành optional.
// Dùng khi cập nhật một phần thông tin sản phẩm.
export type ProductUpdate = Partial<Product>;

// Record yêu cầu có đủ các key thuộc ProductStatus.
// Mỗi key tương ứng với một nhãn tiếng Việt.
export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
    "in-stock": "Còn hàng",
    "low-stock": "Sắp hết hàng",
    "out-of-stock": "Hết hàng",
};

// Mapped type tạo các trường lỗi dựa trên keyof Product.
// Mỗi trường đều optional và có kiểu string.
export type ProductFieldErrors = {
    [K in keyof Product]?: string;
};
