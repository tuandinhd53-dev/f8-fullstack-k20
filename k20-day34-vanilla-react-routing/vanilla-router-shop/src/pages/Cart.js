import { getCart } from "../services/cart.js";
import products from "../data/products.js";


export const Cart = () => {
    const cartItems = getCart();

    const cartProducts = cartItems
        .map((item) => {
            const product = products.find(
                (product) => product.id === item.productId,
            );

            if (!product) return null;

            return {
                product,
                quantity: item.quantity,
            };
        })
        .filter(Boolean);

    const total = cartProducts.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
    }, 0);

    return `
        <section class="min-h-[calc(100vh-144px)] bg-slate-50 py-8">
            <div class="mx-auto max-w-6xl px-4 sm:px-6">

                <!-- Header -->
                <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p class="text-xs font-bold uppercase tracking-widest text-indigo-600">
                            Shopping Cart
                        </p>

                        <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                            Giỏ hàng của bạn
                        </h1>

                        <p class="mt-1 text-sm text-slate-500">
                            Kiểm tra sản phẩm trước khi thanh toán.
                        </p>
                    </div>

                    ${
                        cartProducts.length > 0
                            ? `
                                <div class="flex items-center justify-between gap-3">
                                    <span class="text-sm text-slate-500">
                                        ${cartProducts.length} sản phẩm
                                    </span>

                                    <button
                                        type="button"
                                        data-action="clear"
                                        class="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-500 transition-all duration-200 hover:border-red-400 hover:bg-red-50 hover:text-red-600 active:scale-95"
                                    >
                                        <span>🗑</span>
                                        Xóa tất cả
                                    </button>
                                </div>
                            `
                            : ""
                    }
                </div>

                ${
                    cartProducts.length === 0
                        ? `
                            <!-- Empty Cart -->
                            <div class="border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                                <div class="mx-auto flex h-16 w-16 items-center justify-center bg-indigo-50 text-2xl">
                                    🛒
                                </div>

                                <h2 class="mt-5 text-xl font-bold text-slate-900">
                                    Giỏ hàng đang trống
                                </h2>

                                <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                    Bạn chưa thêm sản phẩm nào vào giỏ hàng.
                                </p>

                                <a
                                    href="/products"
                                    class="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-95"
                                >
                                    Khám phá sản phẩm
                                    <span>→</span>
                                </a>
                            </div>
                        `
                        : `
                            <!-- Main Content -->
                            <div class="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-start">

                                <!-- Product List -->
                                <div>

                                    <!-- List Header -->
                                    <div class="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">
                                        <h2 class="text-base font-bold text-slate-900">
                                            Sản phẩm
                                        </h2>

                                        <span class="text-xs text-slate-400">
                                            ${cartProducts.length} sản phẩm
                                        </span>
                                    </div>

                                    <!-- Products -->
                                    <div class="space-y-3">

                                        ${cartProducts
                                            .map((item) => {
                                                const { product, quantity } =
                                                    item;

                                                const subtotal =
                                                    product.price * quantity;

                                                return `
                                                    <article
                                                        class="border border-slate-200 bg-white p-3 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md sm:p-4"
                                                    >

                                                        <div class="flex gap-3 sm:gap-4">

                                                            <!-- Image -->
                                                            <a
                                                                href="/products/${product.id}"
                                                                class="group shrink-0"
                                                            >
                                                                <img
                                                                    src="${product.thumbnail}"
                                                                    alt="${product.name}"
                                                                    class="h-20 w-20 rounded-lg object-cover ring-1 ring-slate-200 transition-transform duration-200 group-hover:scale-[1.03] sm:h-24 sm:w-24"
                                                                />
                                                            </a>

                                                            <!-- Content -->
                                                            <div class="min-w-0 flex-1">

                                                                <div class="flex items-start justify-between gap-3">

                                                                    <div class="min-w-0">
                                                                        <a
                                                                            href="/products/${product.id}"
                                                                            class="line-clamp-2 text-sm font-bold text-slate-900 transition-colors duration-200 hover:text-indigo-600 sm:text-base"
                                                                        >
                                                                            ${product.name}
                                                                        </a>

                                                                        <p class="mt-0.5 text-xs text-slate-400">
                                                                            ${product.category}
                                                                        </p>
                                                                    </div>

                                                                    <!-- Price -->
                                                                    <p class="shrink-0 text-sm font-bold text-indigo-600">
                                                                        ${product.price.toLocaleString("vi-VN")} ₫
                                                                    </p>

                                                                </div>

                                                                <!-- Bottom Row -->
                                                                <div class="mt-3 flex flex-wrap items-center justify-between gap-3">

                                                                    <!-- Quantity -->
                                                                    <div class="flex items-center">

                                                                        <button
                                                                            type="button"
                                                                            data-product-id="${product.id}"
                                                                            data-action="decrease"
                                                                            class="flex h-8 w-8 items-center justify-center rounded-l-md border border-slate-200 bg-white text-base font-semibold text-slate-500 transition-all duration-150 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200"
                                                                            aria-label="Giảm số lượng"
                                                                        >
                                                                            −
                                                                        </button>

                                                                        <span
                                                                            class="flex h-8 min-w-9 items-center justify-center border-y border-slate-200 bg-slate-50 px-2 text-sm font-semibold text-slate-800"
                                                                        >
                                                                            ${quantity}
                                                                        </span>

                                                                        <button
                                                                            type="button"
                                                                            data-product-id="${product.id}"
                                                                            data-action="increase"
                                                                            class="flex h-8 w-8 items-center justify-center rounded-r-md border border-slate-200 bg-white text-base font-semibold text-slate-500 transition-all duration-150 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200"
                                                                            aria-label="Tăng số lượng"
                                                                        >
                                                                            +
                                                                        </button>

                                                                    </div>

                                                                    <!-- Subtotal -->
                                                                    <div class="flex items-center gap-3">

                                                                        <div class="text-right">
                                                                            <p class="text-[10px] uppercase tracking-wide text-slate-400">
                                                                                Thành tiền
                                                                            </p>

                                                                            <p class="text-sm font-bold text-slate-900">
                                                                                ${subtotal.toLocaleString("vi-VN")} ₫
                                                                            </p>
                                                                        </div>

                                                                        <!-- Remove -->
                                                                        <button
                                                                            type="button"
                                                                            data-product-id="${product.id}"
                                                                            data-action="remove"
                                                                            class="flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-slate-400 transition-all duration-150 hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:bg-red-100"
                                                                            aria-label="Xóa sản phẩm"
                                                                            title="Xóa sản phẩm"
                                                                        >
                                                                            🗑
                                                                        </button>

                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </div>

                                                    </article>
                                                `;
                                            })
                                            .join("")}

                                    </div>
                                </div>

                                <!-- Summary -->
                                <aside class="lg:sticky lg:top-20">

                                    <div class="border border-slate-200 bg-white p-5 shadow-sm">

                                        <div class="flex items-center justify-between">
                                            <h2 class="text-base font-bold text-slate-900">
                                                Tóm tắt đơn hàng
                                            </h2>

                                            <span class="text-xs text-slate-400">
                                                ${cartProducts.length} SP
                                            </span>
                                        </div>

                                        <div class="mt-5 space-y-3 text-sm">

                                            <div class="flex justify-between">
                                                <span class="text-slate-500">
                                                    Tạm tính
                                                </span>

                                                <span class="font-semibold text-slate-900">
                                                    ${total.toLocaleString("vi-VN")} ₫
                                                </span>
                                            </div>

                                            <div class="flex justify-between">
                                                <span class="text-slate-500">
                                                    Vận chuyển
                                                </span>

                                                <span class="font-semibold text-emerald-600">
                                                    Miễn phí
                                                </span>
                                            </div>

                                        </div>

                                        <div class="my-5 border-t border-slate-200"></div>

                                        <div class="flex items-end justify-between">
                                            <span class="text-sm text-slate-500">
                                                Tổng cộng
                                            </span>

                                            <span class="text-xl font-bold text-slate-900">
                                                ${total.toLocaleString("vi-VN")} ₫
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            class="mt-5 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]"
                                        >
                                            Tiến hành thanh toán
                                        </button>

                                        <a
                                            href="/products"
                                            class="mt-2.5 flex w-full items-center justify-center rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                                        >
                                            ← Tiếp tục mua hàng
                                        </a>

                                    </div>

                                </aside>

                            </div>
                        `
                }

            </div>
        </section>
    `;
};