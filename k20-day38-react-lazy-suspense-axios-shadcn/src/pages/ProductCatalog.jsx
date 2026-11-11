import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    getProducts,
    getProductsByCategory,
    getCategories,
} from "@/api/products";

function ProductCatalog() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Truy vấn Products
    const {
        data: products = [],
        isPending: isProductPending,
        isError: isProductError,
        error: productError,
        refetch: refetchProducts,
    } = useQuery({
        queryKey: ["products", "catalog", selectedCategory],
        queryFn: () =>
            selectedCategory === "all"
                ? getProducts()
                : getProductsByCategory(selectedCategory),
    });

    // Truy vấn Categories

    const {
        data: categories = [],
        isPending: isCategoriesPending,
        isError: isCategoriesError,
        error: categoriesError,
        refetch: refetchCategories,
    } = useQuery({
        queryKey: ["products", "categories"],
        queryFn: getCategories,
    });
    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="mb-10">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
                        My Store
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Khám phá sản phẩm
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                        Khám phá bộ sưu tập sản phẩm của chúng tôi. Tìm kiếm
                        những sản phẩm phù hợp với nhu cầu của bạn.
                    </p>
                </header>

                {/* Categories */}
                <section className="mb-10">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-slate-900">
                            Danh mục sản phẩm
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Lựa chọn danh mục bạn muốn khám phá
                        </p>
                    </div>

                    {/* Categories Loading */}
                    {isCategoriesPending && (
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className="h-9 w-24 animate-pulse rounded-full bg-slate-200"
                                />
                            ))}
                        </div>
                    )}

                    {/* Categories Error */}
                    {isCategoriesError && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                            <p className="text-sm text-red-600">
                                Không thể tải danh mục:{" "}
                                {categoriesError.message}
                            </p>

                            <Button
                                type="button"
                                variant="outline"
                                className="mt-3"
                                onClick={() => refetchCategories()}
                            >
                                Thử tải lại
                            </Button>
                        </div>
                    )}

                    {/* Categories Success */}
                    {!isCategoriesPending && !isCategoriesError && (
                        <div className="flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant={
                                    selectedCategory === "all"
                                        ? "default"
                                        : "outline"
                                }
                                className="rounded-full"
                                onClick={() => setSelectedCategory("all")}
                            >
                                Tất cả
                            </Button>

                            {categories.map((category) => (
                                <Button
                                    key={category.slug}
                                    type="button"
                                    variant={
                                        selectedCategory === category.slug
                                            ? "default"
                                            : "outline"
                                    }
                                    className="rounded-full"
                                    onClick={() =>
                                        setSelectedCategory(category.slug)
                                    }
                                >
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    )}
                </section>

                {/* Products */}
                <section>
                    <div className="mb-5 flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Sản phẩm
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {selectedCategory === "all"
                                    ? "Tất cả sản phẩm"
                                    : categories.find(
                                          (item) =>
                                              item.slug === selectedCategory,
                                      )?.name}
                            </p>
                        </div>

                        {!isProductPending && !isProductError && (
                            <p className="text-sm text-slate-500">
                                {products.length} sản phẩm
                            </p>
                        )}
                    </div>

                    {/* Products Loading */}
                    {isProductPending && (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <div
                                    key={item}
                                    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                                >
                                    <div className="h-52 animate-pulse bg-slate-200" />

                                    <div className="space-y-3 p-4">
                                        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                                        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Products Error */}
                    {isProductError && (
                        <div className="rounded-xl border border-red-200 bg-white px-6 py-12 text-center">
                            <h3 className="font-semibold text-slate-900">
                                Không thể tải sản phẩm
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                {productError.message}
                            </p>

                            <Button
                                type="button"
                                className="mt-5"
                                onClick={() => refetchProducts()}
                            >
                                Thử tải lại
                            </Button>
                        </div>
                    )}

                    {/* Products Empty */}
                    {!isProductPending &&
                        !isProductError &&
                        products.length === 0 && (
                            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                                <h3 className="font-semibold text-slate-900">
                                    Không tìm thấy sản phẩm
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Danh mục này hiện chưa có sản phẩm nào.
                                </p>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="mt-5"
                                    onClick={() => setSelectedCategory("all")}
                                >
                                    Xem tất cả sản phẩm
                                </Button>
                            </div>
                        )}

                    {/* Products Success */}
                    {!isProductPending &&
                        !isProductError &&
                        products.length > 0 && (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {products.map((product) => (
                                    <article
                                        key={product.id}
                                        className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        {/* Product Image */}
                                        <div className="relative flex h-56 items-center justify-center overflow-hidden bg-white p-5">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.title}
                                                loading="lazy"
                                                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                            />

                                            {/* Discount Badge */}
                                            {product.discountPercentage > 0 && (
                                                <span className="absolute left-3 top-3 rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                                                    -
                                                    {Math.round(
                                                        product.discountPercentage,
                                                    )}
                                                    %
                                                </span>
                                            )}

                                            {/* Stock Badge */}
                                            {product.stock === 0 ? (
                                                <span className="absolute right-3 top-3 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                                                    Hết hàng
                                                </span>
                                            ) : product.stock <= 10 ? (
                                                <span className="absolute right-3 top-3 rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                                                    Sắp hết hàng
                                                </span>
                                            ) : null}
                                        </div>

                                        {/* Product Information */}
                                        <div className="border-t border-slate-100 p-4">
                                            <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-slate-800">
                                                {product.title}
                                            </h3>

                                            {/* Price */}
                                            <div className="mt-3 flex items-center justify-between">
                                                <p className="text-lg font-bold text-slate-900">
                                                    $
                                                    {product.price.toLocaleString(
                                                        "en-US",
                                                    )}
                                                </p>

                                                {/* Rating */}
                                                <div className="flex items-center gap-1">
                                                    <span className="text-lg text-amber-400">
                                                        ★
                                                    </span>

                                                    <span className="text-sm font-semibold text-slate-700">
                                                        {typeof product.rating ===
                                                        "number"
                                                            ? product.rating.toFixed(
                                                                  1,
                                                              )
                                                            : "Chưa có đánh giá"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                </section>

                {/* Footer */}
                <footer className="mt-12 border-t border-slate-200 pt-6 text-center">
                    <p className="text-xs text-slate-400">
                        © 2026 My Store. All rights reserved.
                    </p>
                </footer>
            </div>
        </main>
    );
}
export default ProductCatalog;
