import products from "../data/products";

export const ProductDetail = (prams) => {
    const product = products.find((p) => p.id === Number(prams.id));

    if (!product) {
        return `
            <section class="min-h-[calc(100vh-144px)] bg-slate-50 px-4 py-20">
                <div class="mx-auto max-w-2xl text-center">
                    <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-3xl">
                        🔍
                    </div>

                    <h1 class="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                        Không tìm thấy sản phẩm
                    </h1>

                    <p class="mx-auto mt-3 max-w-lg leading-7 text-slate-500">
                        Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã được
                        gỡ khỏi cửa hàng.
                    </p>

                    <a
                        href="/products"
                        class="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md"
                    >
                        ← Quay lại sản phẩm
                    </a>
                </div>
            </section>
        `;
    }

    const discountPercent = Math.round(
        (1 - product.price / product.originalPrice) * 100,
    );

    return `
        <section class="min-h-[calc(100vh-144px)] bg-slate-50 py-8 sm:py-12">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <!-- Breadcrumb -->
                <div class="mb-6 flex items-center gap-2 text-sm text-slate-500">
                    <a
                        href="/"
                        class="transition hover:text-indigo-600"
                    >
                        Trang chủ
                    </a>

                    <span>/</span>

                    <a
                        href="/products"
                        class="transition hover:text-indigo-600"
                    >
                        Sản phẩm
                    </a>

                    <span>/</span>

                    <span class="max-w-[180px] truncate font-medium text-slate-700">
                        ${product.name}
                    </span>
                </div>

                <!-- Product -->
                <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div class="grid lg:grid-cols-[1.05fr_0.95fr]">

                        <!-- Image -->
                        <div class="relative bg-slate-100 p-5 sm:p-8 lg:p-10">

                            <div class="absolute left-8 top-8 z-10">
                                <span class="inline-flex items-center rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                                    -${discountPercent}%
                                </span>
                            </div>

                            <div class="flex min-h-[380px] items-center justify-center overflow-hidden rounded-2xl bg-white p-6 sm:min-h-[500px]">
                                <img
                                    src="${product.thumbnail}"
                                    alt="${product.name}"
                                    class="h-full max-h-[500px] w-full object-contain transition duration-500 hover:scale-105"
                                />
                            </div>

                            <div class="mt-4 flex items-center justify-between text-sm text-slate-500">
                                <span>
                                    ${product.category}
                                </span>

                                <span class="flex items-center gap-1">
                                    ⭐ ${product.rating}
                                </span>
                            </div>
                        </div>

                        <!-- Information -->
                        <div class="flex flex-col p-6 sm:p-8 lg:p-12">

                            <div>
                                <span class="inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-indigo-600">
                                    ${product.category}
                                </span>

                                <h1 class="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    ${product.name}
                                </h1>

                                <div class="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
                                    <span class="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">
                                        ${product.price.toLocaleString("vi-VN")}₫
                                    </span>

                                    <span class="pb-1 text-base text-slate-400 line-through">
                                        ${product.originalPrice.toLocaleString("vi-VN")}₫
                                    </span>
                                </div>

                                <div class="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                                    Tiết kiệm
                                    ${(product.originalPrice - product.price).toLocaleString("vi-VN")}₫
                                </div>
                            </div>

                            <div class="my-8 h-px bg-slate-200"></div>

                            <!-- Description -->
                            <div>
                                <h2 class="text-sm font-bold uppercase tracking-wider text-slate-900">
                                    Mô tả sản phẩm
                                </h2>

                                <p class="mt-3 leading-7 text-slate-600">
                                    ${product.description}
                                </p>
                            </div>

                            <!-- Stats -->
                            <div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p class="text-xs font-medium text-slate-400">
                                        Đánh giá
                                    </p>

                                    <p class="mt-1 text-lg font-bold text-slate-900">
                                        ⭐ ${product.rating}
                                    </p>
                                </div>

                                <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p class="text-xs font-medium text-slate-400">
                                        Đã bán
                                    </p>

                                    <p class="mt-1 text-lg font-bold text-slate-900">
                                        ${product.sold}
                                    </p>
                                </div>

                                <div class="col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-1">
                                    <p class="text-xs font-medium text-slate-400">
                                        Tình trạng
                                    </p>

                                    <p class="mt-1 text-lg font-bold text-emerald-600">
                                        Còn hàng
                                    </p>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="mt-8">
                                <button
                                    type="button"
                                   data-action="add"
                                    data-product-id="${product.id}"
                                    class="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-100 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl"
                                >
                                    <span class="text-lg">🛒</span>
                                    Thêm vào giỏ hàng
                                </button>

                                <a
                                    href="/products"
                                    class="mt-3 flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                                >
                                    Tiếp tục mua sắm
                                </a>
                            </div>

                            <!-- Trust -->
                            <div class="mt-8 grid grid-cols-1 gap-3 border-t border-slate-200 pt-6 sm:grid-cols-3">
                                <div class="text-center">
                                    <div class="text-lg">🚚</div>
                                    <p class="mt-1 text-xs font-semibold text-slate-700">
                                        Giao hàng nhanh
                                    </p>
                                </div>

                                <div class="text-center">
                                    <div class="text-lg">✓</div>
                                    <p class="mt-1 text-xs font-semibold text-slate-700">
                                        Sản phẩm chính hãng
                                    </p>
                                </div>

                                <div class="text-center">
                                    <div class="text-lg">↩</div>
                                    <p class="mt-1 text-xs font-semibold text-slate-700">
                                        Đổi trả dễ dàng
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
};
