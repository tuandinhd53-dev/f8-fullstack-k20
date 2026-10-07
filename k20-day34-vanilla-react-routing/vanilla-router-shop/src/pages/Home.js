export const Home = () => {
    return `
        <section class="min-h-[calc(100vh-144px)] bg-slate-50">
            <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div class="max-w-3xl">
                    <span class="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
                        F8 Fullstack K20 · Day 34
                    </span>

                    <h1 class="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                        Khám phá sản phẩm
                        <span class="text-indigo-600"> công nghệ</span>
                    </h1>

                    <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                        Vanilla Router Shop là website bán hàng demo được xây dựng bằng
                        Vanilla JavaScript, Vite và Tailwind CSS.
                    </p>

                    <div class="mt-8 flex flex-wrap gap-3">
                        <a
                            href="/products"
                            class="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
                        >
                            Xem sản phẩm
                        </a>

                        <a
                            href="/cart"
                            class="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Xem giỏ hàng
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `;
};
