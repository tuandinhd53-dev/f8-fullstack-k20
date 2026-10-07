export const Footer = (content) => {
    return `
 <footer class="border-t border-slate-200 bg-slate-950 text-slate-300">

    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <!-- Main -->
        <div class="grid grid-cols-1 gap-10 md:grid-cols-3">

            <!-- Brand -->
            <div>
                <a
                    href="/"
                    class="inline-flex items-center gap-3"
                >
                    <span
                        class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white"
                    >
                        M
                    </span>

                    <span class="text-xl font-bold text-white">
                        Vanilla Router Shop
                    </span>
                </a>

                <p class="mt-4 max-w-sm text-sm leading-6 text-slate-400">
                    Website bán hàng demo được xây dựng trong quá trình
                    học F8 Fullstack K20, tập trung vào Vanilla JavaScript
                    và Router.
                </p>

                <div class="mt-5 flex flex-wrap gap-2">

                    <span class="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-400">
                        F8 Fullstack K20
                    </span>

                    <span class="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-400">
                        Day 34
                    </span>

                </div>
            </div>

            <!-- Navigation -->
            <div>
                <h3 class="text-sm font-semibold uppercase tracking-wider text-white">
                    Điều hướng
                </h3>

                <ul class="mt-5 space-y-3 text-sm">

                    <li>
                        <a
                            href="/"
                            class="inline-flex transition hover:translate-x-1 hover:text-white"
                        >
                            Trang chủ
                        </a>
                    </li>

                    <li>
                        <a
                            href="/products"
                            class="inline-flex transition hover:translate-x-1 hover:text-white"
                        >
                            Sản phẩm
                        </a>
                    </li>

                    <li>
                        <a
                            href="/cart"
                            class="inline-flex transition hover:translate-x-1 hover:text-white"
                        >
                            Giỏ hàng
                        </a>
                    </li>

                </ul>
            </div>

            <!-- Technologies -->
            <div>
                <h3 class="text-sm font-semibold uppercase tracking-wider text-white">
                    Công nghệ
                </h3>

                <div class="mt-5 grid grid-cols-2 gap-2">

                    <span class="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-center text-xs font-medium text-slate-400">
                        Vanilla JS
                    </span>

                    <span class="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-center text-xs font-medium text-slate-400">
                        Vite
                    </span>

                    <span class="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-center text-xs font-medium text-slate-400">
                        Tailwind CSS
                    </span>

                    <span class="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-center text-xs font-medium text-slate-400">
                        History API
                    </span>

                </div>
            </div>

        </div>

        <!-- Bottom -->
        <div class="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">

            <p class="text-slate-500">
                © 2026 Vanilla Router Shop · F8 Fullstack K20
            </p>

            <p class="text-slate-500">
                Built with Vanilla JavaScript & Tailwind CSS
            </p>

        </div>

    </div>

</footer>`;
};
