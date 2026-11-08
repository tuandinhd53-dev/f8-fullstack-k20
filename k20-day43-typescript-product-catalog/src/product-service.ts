// Chỉ import kiểu dữ liệu, không import giá trị runtime.
import type { Product, ProductUpdate, ProductStatus } from "./product-types";

// Dữ liệu sản phẩm ban đầu.
const products: Product[] = [
    {
        id: 101,
        name: "Laptop Air",
        price: 24990000,
        category: "computer",
        stock: 8,
    },
    {
        id: 102,
        name: "Chuột không dây",
        price: 450000,
        category: "accessory",
        stock: 4,
    },
    {
        id: 103,
        name: "Bàn phím cơ",
        price: 1290000,
        category: "accessory",
        stock: 12,
    },
    {
        id: 104,
        name: "Màn hình 27 inch",
        price: 5990000,
        category: "computer",
        stock: 0,
    },
    {
        id: 105,
        name: "Tai nghe Bluetooth",
        price: 1890000,
        category: "audio",
        stock: 5,
    },
];

// Lấy toàn bộ danh sách sản phẩm.
export function getAllProducts(): Product[] {
    return products;
}

// Tìm sản phẩm theo ID.
// Nếu không tìm thấy, trả về undefined.
export function findProductById(id: number): Product | undefined {
    return products.find((product) => product.id === id);
}

// Cập nhật một hoặc nhiều thuộc tính của sản phẩm.
export function updateProduct(
    id: number,
    update: ProductUpdate,
): Product | undefined {
    // Tìm vị trí sản phẩm trong mảng.
    const indexProduct = products.findIndex((product) => product.id === id);

    // Không tìm thấy sản phẩm.
    if (indexProduct === -1) {
        return undefined;
    }

    // Tạo object mới:
    // - Lấy toàn bộ dữ liệu cũ.
    // - Ghi đè những trường được truyền vào update.
    const updatedProduct = {
        ...products[indexProduct],
        ...update,
    };

    // Thay sản phẩm cũ bằng sản phẩm mới.
    products[indexProduct] = updatedProduct;

    return updatedProduct;
}

// Hàm đọc một thuộc tính cụ thể của Product.
// K bị giới hạn trong các key hợp lệ của Product.
// Product[K] đảm bảo kiểu trả về tương ứng với key được truyền vào.
export function getProductField<K extends keyof Product>(
    product: Product,
    key: K,
): Product[K] {
    return product[key];
}

// Hàm lọc dữ liệu generic.
// T: kiểu dữ liệu của từng phần tử.
// K: key hợp lệ của T.
// T[K]: kiểu dữ liệu tương ứng với key đó.
export function filterBy<T, K extends keyof T>(
    items: T[],
    key: K,
    value: T[K],
): T[] {
    return items.filter((item) => item[key] === value);
}

// Xác định trạng thái tồn kho dựa trên số lượng.
export function getProductStatus(stock: number): ProductStatus {
    if (stock === 0) {
        return "out-of-stock";
    }

    if (stock <= 5) {
        return "low-stock";
    }

    return "in-stock";
}
