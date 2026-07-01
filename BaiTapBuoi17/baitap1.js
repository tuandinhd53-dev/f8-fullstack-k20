// Hàm 1: Chuyển tên sản phẩm thành slug URL
function createSlug(text) {
    return text
        .toLowerCase()
        .replace(/\s/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
}

function generateOrderId(productName, quantity) {
    const prefix = productName.slice(0, 3).toUpperCase();
    const length = productName.length;
    return `ORD-${prefix}-${quantity}-${length}`;
}

function formatPrice(price, currency = "VND") {
    if (currency === "VND") {
        // Định dạng kiểu 2.000.000 ₫
        return price.toLocaleString("vi-VN") + " ₫";
    } else if (currency === "USD") {
        // Định dạng kiểu $2,000.00
        return price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    }
    return price.toString();
}

function buildProductUrl(baseUrl, product) {
    const slug = createSlug(product.name);
    return `${baseUrl}/${product.category}/${slug}?id=${product.id}`;
}

console.log(createSlug("MacBook Pro 2024"));
console.log(createSlug("iPhone 15 Pro Max!!!"));
console.log(createSlug("Hello   World"));

console.log(generateOrderId("MacBook Pro", 2));
console.log(generateOrderId("iPhone 15", 5));

console.log(formatPrice(2000000, "VND"));
console.log(formatPrice(1500, "USD"));
console.log(formatPrice(300000));

console.log(
    buildProductUrl("https://shop.vn", {
        name: "MacBook Pro 2024",
        id: 101,
        category: "laptop",
    }),
);

console.log(
    buildProductUrl("https://shop.vn", {
        name: "iPhone 15",
        id: 55,
        category: "phone",
    }),
);


