import { getCart } from "../services/cart.js";

export const Header = () => {
    const currentPath = location.pathname;

    const cart = getCart();

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const isProductsActive =
        currentPath === "/products" || currentPath.startsWith("/products/");

    const activeClass = "bg-white text-indigo-600 shadow-sm";

    const inactiveClass =
        "text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm";

    return `
        <header class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
            <div class="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                <!-- Logo -->
                <a href="/" class="group flex items-center gap-3">
                    <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-sm transition duration-300 group-hover:scale-105 group-hover:bg-indigo-700">
                        M
                    </span>

                    <div>
                        <span class="block text-lg font-bold tracking-tight text-slate-900">
                            Vanilla Router Shop
                        </span>

                        <span class="hidden text-[11px] font-medium text-slate-400 sm:block">
                            Tech Store
                        </span>
                    </div>
                </a>

                <!-- Navigation -->
                <nav class="hidden items-center gap-1 rounded-xl bg-slate-100 p-1 md:flex">
                    <a href="/" class="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-indigo-600 hover:shadow-sm ${
                        currentPath === "/" ? activeClass : inactiveClass
                    }">
                        Trang chủ
                    </a>

                    <a href="/products" class="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-indigo-600 hover:shadow-sm  ${
                        isProductsActive ? activeClass : inactiveClass
                    }">
                        Sản phẩm
                    </a>

                    <a href="/cart" class="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-indigo-600 hover:shadow-sm  ${
                        currentPath === "/cart" ? activeClass : inactiveClass
                    }">
                        Giỏ hàng
                    </a>
                </nav>

                <!-- Right -->
                <div class="flex items-center gap-2">

                    <!-- Cart -->
                    <a
                        href="/cart"
                        class="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        aria-label="Giỏ hàng"
                    >
                        🛒

                        ${
                            cartCount > 0
                                ? `
                                    <span class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                                        ${cartCount}
                                    </span>
                                `
                                : ""
                        }
                    </a>

                    <!-- Sign in -->
                    <a
                        href="/sign-in"
                        class="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 sm:inline-flex"
                    >
                        Đăng nhập
                    </a>

                    <!-- Sign up -->
                    <a
                        href="/sign-up"
                        class="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
                    >
                        Đăng ký
                    </a>

                </div>
            </div>
        </header>
    `;
};
