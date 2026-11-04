// URL gốc của API sản phẩm DummyJSON.
const API_URL = "https://dummyjson.com/products";

// Lấy danh sách danh mục sản phẩm từ API.
export const fetchCategories = async () => {
    const res = await fetch(`${API_URL}/category-list`);

    if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    return res.json();
};

export const fetchProductsByCategory = async (category) => {
    const res = await fetch(`${API_URL}/category/${category}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();

    return data.products;
};
