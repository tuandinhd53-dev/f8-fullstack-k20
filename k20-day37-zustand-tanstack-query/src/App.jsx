import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProductsByCategory } from "./lib/api";
import { useState } from "react";

function App() {
    // Lưu danh mục mà người dùng đang chọn.
    const [selectedCategory, setSelectedCategory] = useState("");

    // Lấy danh sách danh mục và trạng thái truy vấn từ TanStack Query.

    const {
        data: categories,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    // Lấy sản phẩm theo danh mục đang chọn.

    const {
        data: products,
        isPending: isProductsPending,
        isError: isProductsError,
        error: productsError,
    } = useQuery({
        queryKey: ["products", selectedCategory],
        queryFn: () => fetchProductsByCategory(selectedCategory),
        enabled: Boolean(selectedCategory),
    });

    //  API đang tải dữ liệu.
    if (isPending) {
        return <p>Đang tải danh mục...</p>;
    }

    //  API trả về lỗi.
    if (isError) {
        return <p>Lỗi: {error.message}</p>;
    }

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">Danh mục sản phẩm</h1>
            <p>Danh mục đang chọn: {selectedCategory || "Chưa chọn"}</p>

            <ul className="space-y-2">
                {categories.map((category) => (
                    <li key={category}>
                        <button
                            onClick={() => setSelectedCategory(category)}
                            className="rounded border p-3 hover:bg-gray-100"
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
            {!selectedCategory && <p>Vui lòng chọn danh mục.</p>}

            {selectedCategory && isProductsPending && (
                <p>Đang tải sản phẩm...</p>
            )}

            {selectedCategory && isProductsError && (
                <p>Lỗi tải sản phẩm: {productsError.message}</p>
            )}

            {products && products.length === 0 && (
                <p>Danh mục này chưa có sản phẩm.</p>
            )}

            {products && products.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div key={product.id} className="rounded-lg border p-4">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="mb-3 h-40 w-full object-contain"
                            />
                            <h2 className="font-semibold">{product.title}</h2>
                            <p className="mt-2 text-green-700">
                                ${product.price}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
