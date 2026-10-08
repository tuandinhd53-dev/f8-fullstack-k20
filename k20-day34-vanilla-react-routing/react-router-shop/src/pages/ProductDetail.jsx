import { Link, useParams } from "react-router";
import products from "../data/products";

function ProductDetail() {
    const { productId } = useParams();

    const product = products.find(
        (product) => product.id === Number(productId),
    );

    // Không tìm thấy sản phẩm
    if (!product) {
        return (
            <section className="min-h-[calc(100vh-144px)] bg-slate-50 px-4 py-20">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-3xl">
                        🔍
                    </div>

                    <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                        Không tìm thấy sản phẩm
                    </h1>

                    <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-500">
                        Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã được gỡ
                        khỏi cửa hàng.
                    </p>

                    <Link
                        to="/products"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md"
                    >
                        ← Quay lại sản phẩm
                    </Link>
                </div>
            </section>
        );
    }

    const discountPercent = Math.round(
        (1 - product.price / product.originalPrice) * 100,
    );

    return (
        <section className="min-h-[calc(100vh-144px)] bg-slate-50 py-8 sm:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
                    <Link to="/" className="transition hover:text-indigo-600">
                        Trang chủ
                    </Link>

                    <span>/</span>

                    <Link
                        to="/products"
                        className="transition hover:text-indigo-600"
                    >
                        Sản phẩm
                    </Link>

                    <span>/</span>

                    <span className="max-w-[180px] truncate font-medium text-slate-700">
                        {product.name}
                    </span>
                </div>

                {/* Product */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                        {/* Image */}
                        <div className="relative bg-slate-100 p-5 sm:p-8 lg:p-10">
                            <div className="absolute left-8 top-8 z-10">
                                <span className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                                    -{discountPercent}%
                                </span>
                            </div>

                            <div className="flex min-h-[380px] items-center justify-center overflow-hidden rounded-2xl bg-white p-6 sm:min-h-[500px]">
                                <img
                                    src={product.thumbnail}
                                    alt={product.name}
                                    className="h-full max-h-[500px] w-full object-contain transition duration-500 hover:scale-105"
                                />
                            </div>

                            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                                <span>{product.category}</span>

                                <span className="flex items-center gap-1">
                                    ⭐ {product.rating}
                                </span>
                            </div>
                        </div>

                        {/* Information */}
                        <div className="flex flex-col p-6 sm:p-8 lg:p-12">
                            <div>
                                <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-indigo-600">
                                    {product.category}
                                </span>

                                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    {product.name}
                                </h1>

                                <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
                                    <span className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">
                                        {product.price.toLocaleString("vi-VN")}₫
                                    </span>

                                    <span className="pb-1 text-base text-slate-400 line-through">
                                        {product.originalPrice.toLocaleString(
                                            "vi-VN",
                                        )}
                                        ₫
                                    </span>
                                </div>

                                <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                                    Tiết kiệm{" "}
                                    {(
                                        product.originalPrice - product.price
                                    ).toLocaleString("vi-VN")}
                                    ₫
                                </div>
                            </div>

                            <div className="my-8 h-px bg-slate-200"></div>

                            {/* Description */}
                            <div>
                                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                                    Mô tả sản phẩm
                                </h2>

                                <p className="mt-3 leading-7 text-slate-600">
                                    {product.description}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-xs font-medium text-slate-400">
                                        Đánh giá
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-900">
                                        ⭐ {product.rating}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-xs font-medium text-slate-400">
                                        Đã bán
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-900">
                                        {product.sold}
                                    </p>
                                </div>

                                <div className="col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-1">
                                    <p className="text-xs font-medium text-slate-400">
                                        Tình trạng
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-emerald-600">
                                        Còn hàng
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-8">
                                <button
                                    type="button"
                                    data-action="add"
                                    onClick={() => addToCart(product.id)}
                                    data-product-id={product.id}
                                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-100 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl"
                                >
                                    <span className="text-lg">🛒</span>
                                    Thêm vào giỏ hàng
                                </button>

                                <Link
                                    to="/products"
                                    className="mt-3 flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                                >
                                    Tiếp tục mua sắm
                                </Link>
                            </div>

                            {/* Trust */}
                            <div className="mt-8 grid grid-cols-1 gap-3 border-t border-slate-200 pt-6 sm:grid-cols-3">
                                <div className="text-center">
                                    <div className="text-lg">🚚</div>
                                    <p className="mt-1 text-xs font-semibold text-slate-700">
                                        Giao hàng nhanh
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="text-lg">✓</div>
                                    <p className="mt-1 text-xs font-semibold text-slate-700">
                                        Sản phẩm chính hãng
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="text-lg">↩</div>
                                    <p className="mt-1 text-xs font-semibold text-slate-700">
                                        Đổi trả dễ dàng
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductDetail;
