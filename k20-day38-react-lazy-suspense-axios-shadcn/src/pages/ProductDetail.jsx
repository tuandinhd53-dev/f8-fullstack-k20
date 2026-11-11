import { lazy, Suspense, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/products";
import { Button } from "@/components/ui/button";
const ProductReviews = lazy(() => import("./ProductReviews"));

function ProductDetail() {
    const [showReviews, setShowReviews] = useState(false);

    const {
        data: product,
        isPending,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["product", 1],
        queryFn: () => getProductById(1),
    });

    // Loading API
    if (isPending) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
                    <p className="text-sm text-gray-500">
                        Đang tải thông tin sản phẩm...
                    </p>
                </div>
            </div>
        );
    }

    // API error
    if (isError) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4">
                <div className="max-w-md text-center">
                    <h2 className="text-xl font-semibold">
                        Không thể tải sản phẩm
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        {error.message}
                    </p>

                    <Button className="mt-5" onClick={() => refetch()}>
                        Thử lại
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Store header */}
                <header className="mb-8 flex items-center justify-between border-b pb-5">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Bài 3
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Chi tiết sản phẩm và review bằng React.lazy +
                            Suspense
                        </p>
                    </div>
                </header>

                {/* Product information */}
                <section className="grid gap-8 rounded-2xl border bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
                    {/* Product image */}
                    <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-gray-50 p-6">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-72 w-full object-contain transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Product details */}
                    <div className="flex flex-col justify-center">
                        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-400">
                            Product detail
                        </p>

                        <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                            {product.title}
                        </h2>

                        <p className="mt-4 text-3xl font-bold text-green-700">
                            ${product.price}
                        </p>

                        <div className="my-6 border-t" />

                        <h3 className="mb-2 text-sm font-semibold">
                            Mô tả sản phẩm
                        </h3>

                        <p className="text-sm leading-7 text-gray-600">
                            {product.description}
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            Thông tin sản phẩm từ cửa hàng
                        </div>
                    </div>
                </section>

                {/* Reviews section */}
                <section className="mt-8 rounded-2xl border bg-white p-5 shadow-sm sm:p-8">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-bold">
                                Đánh giá sản phẩm
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Xem nhận xét từ những người mua hàng
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant={showReviews ? "outline" : "default"}
                            onClick={() => setShowReviews((prev) => !prev)}
                        >
                            {showReviews ? "Ẩn đánh giá" : "Xem đánh giá"}
                        </Button>
                    </div>

                    {showReviews && (
                        <div className="mt-6 border-t pt-6">
                            <Suspense
                                fallback={
                                    <div className="flex items-center gap-3 py-6 text-sm text-gray-500">
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
                                        Đang tải giao diện đánh giá...
                                    </div>
                                }
                            >
                                <ProductReviews reviews={product.reviews} />
                            </Suspense>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

export default ProductDetail;
