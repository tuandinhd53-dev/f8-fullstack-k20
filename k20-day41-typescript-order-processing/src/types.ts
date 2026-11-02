// BaseEntity

interface BaseEntity {
    id: number;
}

//  Product — Sản phẩm
interface Product extends BaseEntity {
    name: string;
    price: number;
    stock: number;
    category: string;
}

// User — Người dùng
interface User extends BaseEntity {
    fullName: string;
    email: string;
    phone?: string;
}

// OrderItem — Chi tiết đơn hàng
interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
}

//ShippingInfo — Thông tin giao hàng
interface ShippingInfo {
    receiverName: string;
    receiverPhone: string;
    address: string;
}

// PaymentMethod — Phương thức thanh toán
type PaymentMethod = "COD" | "BANK_TRANSFER" | "E_WALLET";

// OrderStatus — Trạng thái đơn hàng
type OrderStatus =
    | "pending"
    | "confirmed"
    | "shipping"
    | "completed"
    | "cancelled";

// Order — Đơn hàng
interface Order extends BaseEntity, ShippingInfo {
    userId: number;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    createdAt: Date;
    metadata?: OrderMetadata;
}

// Khai báo OrderMetadata
interface OrderMetadata {
    note?: string;
}

interface OrderMetadata {
    couponCode?: string;
}

// Khai báo OrderResult
type OrderResult =
    | { status: "success"; data: Order }
    | { status: "error"; message: string };

// Mở rộng kiểu dữ liệu bằng intersection type
interface AuditInfo {
    createdBy: number;
    updatedAt: Date;
}

// kiểu ManagedProduct
type ManagedProduct = Product & AuditInfo;

export {
    BaseEntity,
    Product,
    User,
    OrderItem,
    ShippingInfo,
    Order,
    OrderMetadata,
    AuditInfo,
    PaymentMethod,
    OrderStatus,
    OrderResult,
    ManagedProduct,
};
