import type {
    User,
    Product,
    ShippingInfo,
    PaymentMethod,
    OrderMetadata,
} from "./types";

const users: User[] = [
    {
        id: 1,
        fullName: "Nguyen Van An",
        email: "an@example.com",
        phone: "0901234567",
    },
];

const products: Product[] = [
    {
        id: 101,
        name: "Laptop",
        price: 15000000,
        stock: 5,
        category: "computer",
    },
    {
        id: 102,
        name: "Wireless Mouse",
        price: 350000,
        stock: 10,
        category: "accessory",
    },
];

const cart = [
    {
        productId: 101,
        quantity: 1,
    },
    {
        productId: 102,
        quantity: 2,
    },
];

const shippingInfo: ShippingInfo = {
    receiverName: "Nguyen Van B",
    receiverPhone: "0912345678",
    address: "Ha Noi",
};

const paymentMethod: PaymentMethod = "COD";

const metadata: OrderMetadata = {
    note: "Giao hàng vào buổi sáng",
    couponCode: "WELCOME10",
};

export { users, products, cart, shippingInfo, paymentMethod, metadata };
