import { CATEGORY_STYLES } from "../data/products";

export function ProductOptimizationView({
    keyword,
    setKeyword,
    category,
    setCategory,
    sort,
    setSort,
    count,
    setCount,
    categories,
    products,
    totalProducts,
    onReset,
    showReset,
}) {
    const controlClass =
        "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 outline-none transition-all duration-200 hover:border-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/15";

    const buttonClass =
        "rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 active:scale-[0.98]";

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <header>
                    <p className="text-sm font-semibold tracking-widest text-cyan-400">
                        REACT PERFORMANCE
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight">
                        Tối ưu bộ lọc sản phẩm
                    </h1>
                    <p className="mt-2 text-sm text-slate-400">
                        Thực hành useMemo với danh sách 1.000 sản phẩm.
                    </p>
                </header>

                {/* Search and sort */}
                <section className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Tìm kiếm sản phẩm
                        </label>
                        <input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Nhập tên sản phẩm..."
                            className={controlClass}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Danh mục
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={controlClass}
                        >
                            <option value="All">Tất cả danh mục</option>
                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Sắp xếp theo giá
                        </label>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className={controlClass}
                        >
                            <option value="default">Mặc định</option>
                            <option value="price-asc">Giá tăng dần</option>
                            <option value="price-desc">Giá giảm dần</option>
                        </select>
                    </div>
                </section>

                {/* Category buttons */}
                <section className="space-y-3">
                    <p className="text-sm font-medium text-slate-300">
                        Lọc nhanh theo danh mục
                    </p>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setCategory("All")}
                            className={`${buttonClass} ${
                                category === "All"
                                    ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-300"
                                    : "border-slate-800 bg-slate-900 text-slate-400 hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:text-cyan-200"
                            }`}
                        >
                            Tất cả
                        </button>

                        {categories.map((item) => {
                            const colors = CATEGORY_STYLES[item];
                            const isActive = category === item;

                            return (
                                <button
                                    key={item}
                                    onClick={() => setCategory(item)}
                                    className={`${buttonClass} ${
                                        isActive && colors
                                            ? colors.active
                                            : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-600 hover:bg-slate-800 hover:text-slate-100"
                                    }`}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Result count and reset */}
                <section className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <p className="text-sm text-slate-400">
                        Tìm thấy{" "}
                        <span className="font-semibold text-cyan-300">
                            {products.length.toLocaleString("vi-VN")}
                        </span>{" "}
                        / {totalProducts.toLocaleString("vi-VN")} sản phẩm
                    </p>

                    {showReset && (
                        <button
                            onClick={onReset}
                            className={`${buttonClass} border-rose-400/30 bg-rose-400/5 text-rose-300 hover:border-rose-400/60 hover:bg-rose-400/10 hover:text-rose-200`}
                        >
                            Đặt lại bộ lọc
                        </button>
                    )}
                </section>

                {/* useMemo test */}
                <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cyan-900/50 bg-cyan-950/20 p-5 transition-colors duration-200 hover:border-cyan-700/60">
                    <div>
                        <h2 className="font-semibold">Kiểm tra useMemo</h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Tăng bộ đếm để kiểm tra việc tính toán lại danh
                            sách.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 font-mono text-cyan-300">
                            Count: {count}
                        </span>
                        <button
                            onClick={() => setCount((prev) => prev + 1)}
                            className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition-all duration-200 hover:border-cyan-300/70 hover:bg-cyan-400/20 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 active:scale-[0.97]"
                        >
                            + Tăng
                        </button>
                    </div>
                </section>

                {/* Product list */}
                {products.length === 0 ? (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-10 text-center">
                        <p className="font-semibold text-slate-200">
                            Không tìm thấy sản phẩm
                        </p>
                        <p className="mt-2 text-sm text-slate-400">
                            Hãy thử từ khóa hoặc danh mục khác.
                        </p>
                    </div>
                ) : (
                    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => {
                            const colors = CATEGORY_STYLES[product.category];

                            return (
                                <article
                                    key={product.id}
                                    className={`group rounded-xl border border-slate-800/90 bg-slate-900/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-lg ${
                                        colors
                                            ? `${colors.border} ${colors.shadow}`
                                            : "hover:border-slate-600"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="font-semibold text-slate-200 transition-colors group-hover:text-white">
                                            {product.name}
                                        </h3>

                                        <span
                                            className={`shrink-0 rounded-md px-2 py-1 text-xs font-medium ring-1 ${
                                                CATEGORY_STYLES[
                                                    product.category
                                                ]?.badge ??
                                                "bg-slate-800 text-slate-300 ring-slate-700"
                                            }`}
                                        >
                                            {product.category}
                                        </span>
                                    </div>

                                    <p className="mt-5 text-xl font-bold tracking-tight text-cyan-300">
                                        {product.price.toLocaleString("vi-VN")}{" "}
                                        ₫
                                    </p>

                                    <div
                                        className={`mt-3 flex items-center gap-0.5 text-base ${
                                            colors
                                                ? colors.star
                                                : "text-amber-300"
                                        }`}
                                        aria-label={`Đánh giá ${product.rating} trên 5 sao`}
                                        title={`${product.rating} trên 5 sao`}
                                    >
                                        {Array.from(
                                            { length: 5 },
                                            (_, index) => (
                                                <span
                                                    key={index}
                                                    className={
                                                        index < product.rating
                                                            ? ""
                                                            : "text-slate-700"
                                                    }
                                                >
                                                    ★
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                )}
            </div>
        </main>
    );
}
