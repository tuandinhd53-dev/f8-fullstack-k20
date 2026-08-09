const products = [
    {
        id: 1,
        name: "Tai nghe Bluetooth",
        category: "do-dien-tu",
        price: 350000,
        inStock: true,
    },
    {
        id: 2,
        name: "Áo thun cotton",
        category: "quan-ao",
        price: 150000,
        inStock: true,
    },
    {
        id: 3,
        name: "Sách Lập trình JS căn bản",
        category: "sach",
        price: 120000,
        inStock: false,
    },
    {
        id: 4,
        name: "Bàn phím cơ",
        category: "do-dien-tu",
        price: 890000,
        inStock: true,
    },
    {
        id: 5,
        name: "Quần jean nam",
        category: "quan-ao",
        price: 420000,
        inStock: false,
    },
    {
        id: 6,
        name: "Sách Tư duy nhanh và chậm",
        category: "sach",
        price: 95000,
        inStock: true,
    },
];

const searchBox = document.querySelector("#search-box");
const categoryFilter = document.querySelector("#category-filter");
const sortPriceBtn = document.querySelector("#sort-price-btn");
const productList = document.querySelector("#product-list");
const resultCount = document.querySelector("#result-count");

// Hàm đổi thành giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

function renderProducts(products) {
    productList.innerHTML = "";

    // Số sp
    resultCount.textContent = `Tìm thấy ${products.length} sản phẩm`;

    // Ko tìm thấy

    if (products.length === 0) {
        productList.textContent = "Không tìm thấy sản phẩm nào phù hợp.";
        return;
    }
    products.forEach((product) => {
        // Kiểm tra có hay hết hàng
        let status;
        if (product.inStock) {
            status = "Có hàng";
        } else {
            status = "Hết hàng";
        }

        // Tạo sản phẩm
        const productItem = document.createElement("div");
        // Hết hàng làm mờ
        if (!product.inStock) {
            productItem.classList.add("opacity-50");
        }

        //
        productItem.innerHTML = `
    <h3>${product.name}</h3>
    <p>${product.category}</p>
    <p>${formatPrice(product.price)}</p>
    <p>${status}</p>
`;
        productList.append(productItem);
    });
}

// Tìm sp
searchBox.addEventListener("input", function () {
    const filteredProducts = filterProducts();

    renderProducts(filteredProducts);
});

// Lọc theo danh mục
categoryFilter.addEventListener("change", function () {
    const filteredProducts = filterProducts();

    renderProducts(filteredProducts);
});

function filterProducts() {
    const searchValue = searchBox.value.toLowerCase();
    const categoryValue = categoryFilter.value;

    const filteredProducts = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchValue) &&
            (categoryValue === "all" || categoryValue === product.category)
        );
    });

    return filteredProducts;
}

// Sắp xếp theo giá

let sortAscending = false;
sortPriceBtn.addEventListener("click", function () {
    //  đổi tăng giảm
    sortAscending = !sortAscending;

    // Lấy danh sách sau  lọc
    const filteredProducts = filterProducts();

    // Sắp xếp
    filteredProducts.sort((a, b) => {
        if (sortAscending) {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });

    // Đổi nội dung nút
    if (sortAscending) {
        sortPriceBtn.textContent = "Giá: Thấp → Cao";
    } else {
        sortPriceBtn.textContent = "Giá: Cao → Thấp";
    }

    renderProducts(filteredProducts);
});

renderProducts(products);
