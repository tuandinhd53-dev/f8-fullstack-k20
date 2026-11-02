import {
    createOrder,
    handleOrderResult,
    getOrderStatusMessage,
    findProductById,
    getProductName,
    formatPhone,
} from "./order";

import {
    users,
    products,
    cart,
    shippingInfo,
    paymentMethod,
    metadata,
} from "./data";

// 1. Lấy người dùng cần tạo đơn hàng
const user = users.find((user) => user.id === 1);

// 2. Tạo đơn hàng
const result = createOrder(
    user,
    products,
    cart,
    shippingInfo,
    paymentMethod,
    metadata,
);

// 3. Hiển thị kết quả tạo đơn hàng
handleOrderResult(result);

// 4. Kiểm tra các hàm hỗ trợ
console.log("\n--- Kiểm tra thông tin ---");

console.log("Tên sản phẩm:", getProductName(findProductById(products, 101)));
console.log(
    "Sản phẩm không tồn tại:",
    getProductName(findProductById(products, 999)),
);
console.log("Số điện thoại:", formatPhone(user?.phone));
console.log("Số điện thoại trống:", formatPhone("   "));

// 5. Hiển thị thông báo trạng thái
console.log("\n--- Trạng thái đơn hàng ---");
console.log(getOrderStatusMessage("pending"));
console.log(getOrderStatusMessage("confirmed"));
console.log(getOrderStatusMessage("shipping"));
console.log(getOrderStatusMessage("completed"));
console.log(getOrderStatusMessage("cancelled"));
