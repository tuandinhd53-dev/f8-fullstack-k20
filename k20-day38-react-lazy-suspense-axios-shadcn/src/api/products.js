import { api } from "./axiosClient";

//  Lấy danh sách sản phẩm
export async function getProducts() {
    const res = await api.get("/products");
    return res.data.products;
}
// Lấy danh sách danh mục

export async function getCategories() {
    const res = await api.get("/products/categories");
    return res.data;
}

// Lấy sản phẩm thuộc một danh mục.
export async function getProductsByCategory(slug) {
    const res = await api.get(`/products/category/${slug}`);
    return res.data.products;
}

// Thêm sản phẩm.
export async function addProduct(product) {
    const res = await api.post("/products/add", product);
    return res.data;
}

// Chỉnh sửa sản phẩm
export async function updateProduct(id, product) {
    const res = await api.patch(`/products/${id}`, product);
    return res.data;
}

// Lấy thông tin sản phẩm

export async function getProductById(id) {
    const res = await api.get(`/products/${id}`);
    return res.data;
}
