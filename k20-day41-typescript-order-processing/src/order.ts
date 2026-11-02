import type {
    Order,
    OrderItem,
    OrderMetadata,
    OrderResult,
    OrderStatus,
    PaymentMethod,
    Product,
    ShippingInfo,
    User,
} from "./types";

// Tạo ID đơn hàng tự tăng
let nextOrderId = 1;

// 1. Lấy thông báo theo trạng thái đơn hàng
export function getOrderStatusMessage(status: OrderStatus): string {
    switch (status) {
        case "pending":
            return "Đơn hàng đang chờ xác nhận";
        case "confirmed":
            return "Đơn hàng đã được xác nhận";
        case "shipping":
            return "Đơn hàng đang được giao";
        case "completed":
            return "Đơn hàng đã giao thành công";
        case "cancelled":
            return "Đơn hàng đã bị hủy";
        default:
            return "Đơn hàng không hợp lệ";
    }
}

// 2. Xử lý kết quả tạo đơn hàng
export function handleOrderResult(result: OrderResult): void {
    if (result.status === "success") {
        console.log("Tạo đơn hàng thành công!");
        console.log("Mã đơn hàng:", result.data.id);
        console.log("Tổng tiền:", result.data.totalAmount);
    } else {
        console.error("Tạo đơn hàng thất bại:", result.message);
    }
}

// 3. Tìm sản phẩm theo ID
export function findProductById(
    products: Product[],
    id: number,
): Product | undefined {
    return products.find((product) => product.id === id);
}

// 4. Lấy tên sản phẩm
export function getProductName(product: Product | undefined): string {
    return product ? product.name : "Sản phẩm không tồn tại";
}

// 5. Định dạng số điện thoại
export function formatPhone(phone: string | null | undefined): string {
    if (phone == null || phone.trim() === "") {
        return "Chưa cập nhật";
    }

    return phone.trim();
}

// 6. Tạo đơn hàng
export function createOrder(
    user: User | undefined,
    products: Product[],
    cart: { productId: number; quantity: number }[],
    shippingInfo: ShippingInfo,
    paymentMethod: PaymentMethod,
    metadata?: OrderMetadata,
): OrderResult {
    // Kiểm tra người dùng
    if (!user) {
        return {
            status: "error",
            message: "Người dùng không hợp lệ",
        };
    }

    // Kiểm tra giỏ hàng
    if (cart.length === 0) {
        return {
            status: "error",
            message: "Giỏ hàng trống",
        };
    }

    // Kiểm tra sản phẩm, số lượng, tồn kho và sản phẩm trùng
    const productIds = new Set<number>();

    for (const item of cart) {
        // Kiểm tra sản phẩm có tồn tại không
        const product = findProductById(products, item.productId);

        if (!product) {
            return {
                status: "error",
                message: `Sản phẩm ID ${item.productId} không tồn tại`,
            };
        }

        // Kiểm tra số lượng mua
        if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
            return {
                status: "error",
                message: `Số lượng sản phẩm ${product.name} không hợp lệ`,
            };
        }

        // Kiểm tra tồn kho của sản phẩm
        if (!Number.isInteger(product.stock) || product.stock < 0) {
            return {
                status: "error",
                message: `Tồn kho của sản phẩm ${product.name} không hợp lệ`,
            };
        }

        if (item.quantity > product.stock) {
            return {
                status: "error",
                message: `Sản phẩm ${product.name} không đủ tồn kho`,
            };
        }

        // Kiểm tra giá sản phẩm
        if (!Number.isFinite(product.price) || product.price < 0) {
            return {
                status: "error",
                message: `Giá sản phẩm ${product.name} không hợp lệ`,
            };
        }

        // Kiểm tra sản phẩm bị trùng trong giỏ hàng
        if (productIds.has(item.productId)) {
            return {
                status: "error",
                message: "Giỏ hàng có sản phẩm bị trùng",
            };
        }

        productIds.add(item.productId);
    }

    // Kiểm tra thông tin giao hàng
    const receiverName = shippingInfo.receiverName.trim();
    const receiverPhone = shippingInfo.receiverPhone.trim();
    const address = shippingInfo.address.trim();

    if (!receiverName || !receiverPhone || !address) {
        return {
            status: "error",
            message: "Thông tin giao hàng không được để trống",
        };
    }

    // Tạo danh sách sản phẩm trong đơn hàng
    const items: OrderItem[] = cart.map((item) => {
        const product = findProductById(products, item.productId)!;

        return {
            productId: product.id,
            productName: product.name,
            quantity: item.quantity,
            unitPrice: product.price,
        };
    });

    // Tính tổng tiền
    const totalAmount = items.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0,
    );

    // Tạo đơn hàng
    const order: Order = {
        id: nextOrderId++,
        userId: user.id,
        items,
        totalAmount,
        status: "pending",
        paymentMethod,
        createdAt: new Date(),
        receiverName,
        receiverPhone,
        address,
        ...(metadata !== undefined ? { metadata } : {}),
    };

    // Trả về kết quả thành công
    return {
        status: "success",
        data: order,
    };
}
