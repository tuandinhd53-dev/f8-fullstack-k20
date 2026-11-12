const API_URL = process.env.API_URL || "http://localhost:3001";

//  Kiểu dữ liệu của một sản phẩm
type Product = {
    id: number;
    name: string;
    price: number;
};

// Kiểu dữ liệu danh sách sản phẩm có phân trang

type ProductPage = {
    items: Product[];
    total: number;
    totalPages: number;
    currentPage: number;
};

// Kiểu dữ liệu thống kê sản phẩm
type ProductStats = {
    total: number;
    averagePrice: number;
};

/**
 * Hàm gọi API dùng chung.
 * @param path - Đường dẫn API
 * @param options - Các tùy chọn của request
 * @returns Dữ liệu API theo kiểu T
 */
async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}/${path}`, {
        ...options,
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("API Error");
    }

    return res.json();
}

// Lấy tổng số sản phẩm và giá trung bình

export async function getProductStats(): Promise<ProductStats> {
    return request<ProductStats>("products/stats");
}

/**
 * Lấy danh sách sản phẩm theo từ khóa và phân trang.
 * @param query - Từ khóa tìm kiếm
 * @param page - Trang hiện tại
 * @param pageSize - Số sản phẩm mỗi trang
 * @returns Promise chứa danh sách sản phẩm và thông tin phân trang
 */

export function getProducts(
    query: string = "",
    page: number = 1,
    pageSize: number = 5,
): Promise<ProductPage> {
    const param = new URLSearchParams({
        query: query,
        page: page.toString(),
        pageSize: pageSize.toString(),
    });

    return request<ProductPage>(`products?${param.toString()}`);
}

// /Lấy thông tin chi tiết sản phẩm theo ID

export function getProductById(id: number): Promise<Product> {
    return request<Product>(`products/${id}`);
}
