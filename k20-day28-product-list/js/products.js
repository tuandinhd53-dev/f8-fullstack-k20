// Dom
const countProducts = document.querySelector("#product-count");
const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const sortSelect = document.querySelector("#sort-select");
const loading = document.querySelector("#loading");
const errorMessage = document.querySelector("#error");
const productList = document.querySelector("#product-list");
const pagination = document.querySelector("#pagination");

const prevPage = document.querySelector("#prev-page");
const nextPage = document.querySelector("#next-page");
const pageInput = document.querySelector("#page-input");
const goPage = document.querySelector("#go-page");
const pageInfo = document.querySelector("#page-info");

//
let allProducts = [];
let products = [];
let totalPages = 0;
const limit = 20;
let currentPage = 1;
let totalProducts = 0;

// Xử lí API - Data

async function getProducts() {
    // Loading khi mở trang
    loading.classList.remove("hidden");

    try {
        const response = await fetch("https://dummyjson.com/products?limit=0");

        if (!response.ok) {
            throw new Error("API Error");
        }

        const data = await response.json();

        // Toàn bộ sản phẩm
        allProducts = data.products;

        // Product = toàn bộ sản phẩm
        products = [...allProducts];

        // Tổng số sản phẩm
        totalProducts = products.length;

        // Tính số trang
        totalPages = Math.ceil(totalProducts / limit);

        // Hiển thị tổng sản phẩm
        countProducts.textContent = `${totalProducts} sản phẩm`;

        // Tạo Cate từ dữ liệu
        renderCategories(allProducts);

        // Render
        applyFilters();

        // Loading thành công ẩn
        loading.classList.add("hidden");
    } catch (error) {
        console.log("Lỗi:", error);

        // Lỗi ẩn loading hiện Lỗi
        loading.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
}

// Render Products
function renderProducts(products) {
    // Không có sản phẩm
    if (products.length === 0) {
        productList.innerHTML = `
            <div class="col-span-full py-12 text-center">
                <p class="text-lg font-semibold text-[#4D3D3D]">
                    Không tìm thấy sản phẩm
                </p>

                <p class="mt-2 text-sm text-[#8A6F76]">
                    Hãy thử thay đổi từ khóa hoặc bộ lọc.
                </p>
            </div>
        `;

        return;
    }

    // Tạo card
    const html = products
        .map(
            (product) => `
    <a
                    href="./detail.html?id=${product.id}"
                    class="group block cursor-pointer overflow-hidden rounded-xl border border-[#F3C4D2] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E94F7D]"
                >

                    <!-- Thumbnail + Discount -->
                    <div class="relative aspect-[4/3] overflow-hidden bg-[#FFF0F4]">

                        <img
                            src="${product.thumbnail}"
                            alt="${product.title}"
                            loading="lazy"
                            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        ${
                            product.discountPercentage > 0
                                ? `
                                    <span
                                        class="absolute left-3 top-3 rounded-md bg-[#E94F7D] px-2 py-0.5 text-xs font-bold text-white shadow-sm"
                                    >
                                        -${Math.round(product.discountPercentage)}%
                                    </span>
                                `
                                : ""
                        }

                    </div>


                    <!-- Product information -->
                    <div class="p-3">

                        <h2
                            class="line-clamp-2 min-h-10 text-sm font-semibold text-[#4D3D3D]"
                        >
                            ${product.title}
                        </h2>


                        <!-- Rating + Stock -->
                        <div class="mt-2 flex items-center gap-1.5 text-xs">

                            <span
                                class="text-[#F5B942]"
                                aria-hidden="true"
                            >
                                ${"★".repeat(Math.round(product.rating))}${"☆".repeat(5 - Math.round(product.rating))}
                            </span>

                            <span>
                                ${product.rating}
                            </span>

                            <span class="text-[#8A6F76]">
                                (Còn ${product.stock} sản phẩm)
                            </span>

                        </div>


                        <!-- Price -->
                        <div class="mt-2 flex items-center gap-2">

                            <span class="text-base font-bold text-[#E94F7D]">
                                $${(
                                    product.price *
                                    (1 - product.discountPercentage / 100)
                                ).toFixed(2)}
                            </span>

                            ${
                                product.discountPercentage > 0
                                    ? `
                                        <span class="text-xs text-[#A89B9B] line-through">
                                            $${product.price}
                                        </span>
                                    `
                                    : ""
                            }

                        </div>


                        <!-- Detail -->
                        <div
                            class="mt-3 flex w-full items-center justify-center rounded-md bg-[#E94F7D] px-3 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-[#D94370]"
                        >
                            Xem chi tiết
                        </div>

                    </div>

                </a>`,
        )
        .join("");
    productList.innerHTML = html;
}

// Tạo Categories
function renderCategories(products) {
    const categories = [
        ...new Set(products.map((product) => product.category)),
    ];
    const option = categories
        .map((category) => {
            const categoryName =
                category.charAt(0).toUpperCase() + category.slice(1);

            return `
            <option value="${category}">
                ${categoryName}
            </option>
        `;
        })
        .join("");
    categoryFilter.innerHTML = `
    <option value="">Tất cả danh mục</option>
    ${option}
`;
}

//

function getCurrentPageProducts() {
    const start = (currentPage - 1) * limit;
    const end = start + limit;

    return products.slice(start, end);
}

function applyFilters() {
    // Search
    const keyword = searchInput.value.toLowerCase();

    // Category
    const category = categoryFilter.value;

    // Sort
    const sort = sortSelect.value;

    // Tạo array
    let result = [...allProducts];

    // Search
    if (keyword) {
        result = result.filter((product) => {
            return product.title.toLowerCase().includes(keyword);
        });
    }

    // Category
    if (category) {
        result = result.filter((product) => {
            return product.category === category;
        });
    }

    // Sort
    if (sort === "sort-asc") {
        result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "sort-desc") {
        result.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sort === "price-asc") {
        result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
        result.sort((a, b) => b.price - a.price);
    }

    // Lưu kết quả
    products = result;

    totalProducts = products.length;

    totalPages = Math.ceil(totalProducts / limit);

    // Nếu không còn trang hiện tại
    if (totalPages === 0 || currentPage > totalPages) {
        currentPage = 1;
    }

    countProducts.textContent = `${totalProducts} sản phẩm`;

    renderPagination();

    renderProducts(getCurrentPageProducts());
}

// Pagination

function renderPagination() {
    if (totalPages === 0) {
        pageInfo.textContent = "Không có trang";

        prevPage.disabled = true;
        nextPage.disabled = true;

        return;
    }

    pageInfo.textContent = `Trang ${currentPage} / ${totalPages}`;

    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === totalPages;
}

// Trang tiếp theo

nextPage.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;

        renderPagination();
        renderProducts(getCurrentPageProducts());
    }
});

// Trang trước

prevPage.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;

        renderPagination();

        renderProducts(getCurrentPageProducts());
    }
});

// Nhập trang muốn đến

goPage.addEventListener("click", () => {
    const page = Number(pageInput.value);

    // Kiểm tra số trang

    if (!Number.isInteger(page) || page < 1 || page > totalPages) {
        return;
    }

    currentPage = page;

    renderPagination();

    renderProducts(getCurrentPageProducts());

    // Xóa input
    pageInput.value = "";
});

// Event

searchInput.addEventListener("input", () => {
    currentPage = 1;

    applyFilters();
});

categoryFilter.addEventListener("change", () => {
    currentPage = 1;

    applyFilters();
});
sortSelect.addEventListener("change", () => {
    currentPage = 1;

    applyFilters();
});

getProducts();
