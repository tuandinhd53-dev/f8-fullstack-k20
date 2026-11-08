// Import các hàm xử lý sản phẩm.
import {
    getAllProducts,
    findProductById,
    updateProduct,
    getProductField,
    filterBy,
    getProductStatus,
} from "./product-service";

// Import object chứa nhãn trạng thái.
import { PRODUCT_STATUS_LABELS } from "./product-types";

// 1. Lấy toàn bộ sản phẩm và hiển thị trạng thái tồn kho.
console.log("===== ALL PRODUCTS =====");

const products = getAllProducts();

products.forEach((product) => {
    const status = getProductStatus(product.stock);
    const statusLabel = PRODUCT_STATUS_LABELS[status];

    console.log({
        ...product,
        status,
        statusLabel,
    });
});

// 2. Tìm sản phẩm theo ID.
console.log("\n===== FIND PRODUCT =====");

console.log("ID 101:", findProductById(101));
console.log("ID 999:", findProductById(999));

// 3. Cập nhật riêng giá sản phẩm.
console.log("\n===== UPDATE PRICE =====");

const updatedPrice = updateProduct(101, {
    price: 25990000,
});

console.log("Updated product:", updatedPrice);

// 4. Cập nhật nhiều trường cùng lúc.
console.log("\n===== UPDATE MULTIPLE FIELDS =====");

const updatedInfo = updateProduct(102, {
    name: "Chuột không dây Logitech",
    stock: 10,
});

console.log("Updated product:", updatedInfo);

// 5. Lọc sản phẩm theo category.
console.log("\n===== FILTER BY CATEGORY =====");

const computerProducts = filterBy(products, "category", "computer");

console.log("Computer products:", computerProducts);

// 6. Lọc sản phẩm theo stock.
console.log("\n===== FILTER BY STOCK =====");

const outOfStockProducts = filterBy(products, "stock", 0);

console.log("Out of stock products:", outOfStockProducts);

// 7. Kiểm tra kiểu trả về của getProductField.
console.log("\n===== GET PRODUCT FIELD =====");

const firstProduct = findProductById(101);

if (firstProduct) {
    const productName = getProductField(firstProduct, "name");
    const productPrice = getProductField(firstProduct, "price");

    console.log("Name:", productName);
    console.log("Price:", productPrice);
}

// 8. Kiểm tra TypeScript từ chối key/value không tương thích.
// @ts-expect-error category có kiểu string, không nhận number.
filterBy(products, "category", 123);

// 9. Cập nhật sản phẩm không tồn tại.
console.log("\n===== UPDATE MISSING PRODUCT =====");

const missingProduct = updateProduct(999, {
    price: 1000000,
});

console.log("Missing product:", missingProduct);
