import { useEffect, useState } from "react";

function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
    }).format(price);
}

export default function ShopView({
    visibleProducts = [],
    categories = [],
    selectedCategory = "all",
    searchKeyword = "",
    cart = [],
    cartCount = 0,
    cartTotal = 0,
    onSearchChange,
    onCategoryChange,
    onAddToCart,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onRemoveFromCart,
}) {
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Đóng modal bằng phím Escape và khóa cuộn nền khi modal đang mở.
    useEffect(() => {
        if (!isCartOpen) return undefined;

        function handleKeyDown(event) {
            if (event.key === "Escape") setIsCartOpen(false);
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isCartOpen]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                    <a href="/" className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-black text-white shadow-lg shadow-indigo-200">
                            M
                        </div>
                        <div>
                            <p className="text-xl font-black tracking-tight">
                                My<span className="text-indigo-600">Shop</span>
                            </p>
                            <p className="text-xs text-slate-500">
                                Công nghệ cho mọi ngày
                            </p>
                        </div>
                    </a>

                    <button
                        type="button"
                        onClick={() => setIsCartOpen(true)}
                        aria-haspopup="dialog"
                        aria-expanded={isCartOpen}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2.5 text-sm font-bold text-indigo-700 transition hover:border-indigo-200 hover:bg-indigo-100 sm:px-4"
                    >
                        <span aria-hidden="true" className="text-lg">
                            🛒
                        </span>
                        <span className="hidden sm:inline">Giỏ hàng</span>
                        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-xs text-white">
                            {cartCount}
                        </span>
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                {/* Hero banner */}
                <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-500 p-6 text-white shadow-xl shadow-indigo-200/50 sm:p-9 lg:p-12">
                    <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full border-[40px] border-white/10" />
                    <div className="pointer-events-none absolute -bottom-32 right-1/3 -z-10 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

                    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                        <div>
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wider text-indigo-50">
                                ✦ KHÁM PHÁ CÔNG NGHỆ
                            </span>
                            <h1 className="mt-5 max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                                Công nghệ tốt.
                                <br />
                                Trải nghiệm tốt hơn.
                            </h1>
                            <p className="mt-4 max-w-lg text-sm leading-7 text-indigo-100 sm:text-base">
                                Khám phá điện thoại, laptop, tai nghe và phụ
                                kiện phục vụ học tập, công việc và giải trí.
                            </p>
                            <button
                                type="button"
                                onClick={() =>
                                    document
                                        .getElementById("products")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
                            >
                                Khám phá sản phẩm{" "}
                                <span aria-hidden="true">→</span>
                            </button>
                        </div>

                        <div className="hidden w-52 rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm md:block lg:w-60">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 text-5xl">
                                💻
                            </div>
                            <p className="mt-5 text-sm text-indigo-100">
                                Bộ sưu tập
                            </p>
                            <p className="mt-1 text-3xl font-black">
                                {visibleProducts.length}
                                <span className="ml-2 text-base font-semibold">
                                    sản phẩm
                                </span>
                            </p>
                            <p className="mt-2 text-xs leading-5 text-indigo-100">
                                Tìm kiếm nhanh theo tên và danh mục.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Search and category filters */}
                <section id="products" className="scroll-mt-24 pt-9">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-bold text-indigo-600">
                                CATALOGUE
                            </p>
                            <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                                Sản phẩm nổi bật
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Tìm sản phẩm phù hợp với nhu cầu của bạn.
                            </p>
                        </div>
                        <p className="text-sm text-slate-500">
                            Hiển thị{" "}
                            <span className="font-bold text-slate-900">
                                {visibleProducts.length}
                            </span>{" "}
                            sản phẩm
                        </p>
                    </div>

                    <div className="mt-6">
                        <label
                            htmlFor="product-search"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Tìm kiếm sản phẩm
                        </label>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
                            <span className="text-xl" aria-hidden="true">
                                ⌕
                            </span>
                            <input
                                id="product-search"
                                type="search"
                                value={searchKeyword}
                                onChange={onSearchChange}
                                placeholder="Ví dụ: iPhone, Dell, tai nghe..."
                                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-slate-400"
                            />
                            {searchKeyword && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        onSearchChange?.({
                                            target: { value: "" },
                                        })
                                    }
                                    className="shrink-0 rounded-lg px-2 py-1 text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                >
                                    Xóa
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {categories.map((category) => {
                            const isActive = selectedCategory === category;
                            const label =
                                category === "all" ? "Tất cả" : category;

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => onCategoryChange?.(category)}
                                    aria-pressed={isActive}
                                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                                        isActive
                                            ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-200"
                                            : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                                    }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Product grid only: the cart is no longer permanently displayed here */}
                <section className="mt-7" aria-label="Danh sách sản phẩm">
                    {visibleProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {visibleProducts.map((product) => (
                                <article
                                    key={product.id}
                                    className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60"
                                >
                                    <div
                                        className="relative m-3 overflow-hidden rounded-2xl bg-slate-100"
                                        style={{
                                            backgroundColor: `${product.color}18`,
                                        }}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            loading="lazy"
                                            className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                        <span className="absolute left-3 top-3 rounded-lg border border-white/70 bg-white/90 px-2.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm backdrop-blur">
                                            {product.category}
                                        </span>
                                    </div>

                                    <div className="p-4 pt-2">
                                        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                                            {product.category}
                                        </p>
                                        <h3 className="mt-2 min-h-12 text-base font-bold leading-6 text-slate-900 transition group-hover:text-indigo-700">
                                            {product.name}
                                        </h3>
                                        <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                                            {product.description}
                                        </p>
                                        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                                            <p className="text-base font-black tracking-tight text-slate-900 sm:text-lg">
                                                {formatPrice(product.price)}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onAddToCart?.(product)
                                                }
                                                aria-label={`Thêm ${product.name} vào giỏ hàng`}
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-2xl font-medium text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                            <div className="text-5xl" aria-hidden="true">
                                🔎
                            </div>
                            <h3 className="mt-5 text-xl font-bold">
                                Không tìm thấy sản phẩm
                            </h3>
                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                Thử từ khóa khác hoặc chọn danh mục khác để xem
                                thêm sản phẩm.
                            </p>
                        </div>
                    )}
                </section>

                <footer className="mt-12 border-t border-slate-200 py-6 text-center text-sm text-slate-500">
                    © MyShop — Dự án thực hành React Hooks · Day 35
                </footer>
            </main>

            {/* Compact cart modal */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-3 backdrop-blur-[2px] sm:p-5"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setIsCartOpen(false);
                        }
                    }}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cart-modal-title"
                        className="flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl"
                    >
                        {/* Modal header */}
                        <header className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-lg">
                                    🛒
                                </div>
                                <div className="min-w-0">
                                    <h2
                                        id="cart-modal-title"
                                        className="truncate text-lg font-black text-slate-900"
                                    >
                                        Giỏ hàng của bạn
                                    </h2>
                                    <p className="mt-0.5 text-xs text-slate-500">
                                        {cartCount} sản phẩm · {cart.length} mặt
                                        hàng
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsCartOpen(false)}
                                aria-label="Đóng giỏ hàng"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                            >
                                ×
                            </button>
                        </header>

                        {/* Modal items */}
                        {cart.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center px-5 py-10 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
                                    🛍️
                                </div>
                                <h3 className="mt-4 font-bold text-slate-900">
                                    Giỏ hàng đang trống
                                </h3>
                                <p className="mt-1 max-w-xs text-sm leading-6 text-slate-500">
                                    Thêm sản phẩm yêu thích để chúng xuất hiện ở
                                    đây.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setIsCartOpen(false)}
                                    className="mt-4 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                                >
                                    Tiếp tục mua sắm
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 sm:px-4">
                                    <div className="space-y-2.5">
                                        {cart.map((item) => (
                                            <article
                                                key={item.id}
                                                className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-16 w-16 shrink-0 rounded-xl bg-white object-cover sm:h-[72px] sm:w-[72px]"
                                                />

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="min-w-0">
                                                            <p className="text-[11px] font-semibold text-indigo-600">
                                                                {item.category}
                                                            </p>
                                                            <h3 className="mt-0.5 line-clamp-2 text-sm font-bold leading-5 text-slate-900">
                                                                {item.name}
                                                            </h3>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                onRemoveFromCart?.(
                                                                    item,
                                                                )
                                                            }
                                                            aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
                                                            title="Xóa sản phẩm"
                                                            disabled={
                                                                !onRemoveFromCart
                                                            }
                                                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
                                                        >
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                className="h-4 w-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M4 7h16M10 11v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                                                        <div className="inline-flex h-8 items-center rounded-lg border border-slate-200 bg-white">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    onDecreaseQuantity?.(
                                                                        item,
                                                                    )
                                                                }
                                                                aria-label={`Giảm số lượng ${item.name}`}
                                                                disabled={
                                                                    !onDecreaseQuantity ||
                                                                    item.quantity <=
                                                                        1
                                                                }
                                                                className="flex h-8 w-8 items-center justify-center rounded-l-lg text-base font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-35"
                                                            >
                                                                −
                                                            </button>
                                                            <span className="min-w-7 px-1 text-center text-xs font-bold tabular-nums text-slate-900">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    onIncreaseQuantity?.(
                                                                        item,
                                                                    )
                                                                }
                                                                aria-label={`Tăng số lượng ${item.name}`}
                                                                disabled={
                                                                    !onIncreaseQuantity
                                                                }
                                                                className="flex h-8 w-8 items-center justify-center rounded-r-lg text-base font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-35"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <p className="text-sm font-black text-slate-900">
                                                            {formatPrice(
                                                                item.price *
                                                                    item.quantity,
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>

                                {/* Sticky total/footer */}
                                <footer className="border-t border-slate-100 bg-white px-4 py-4 sm:px-5">
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Tổng thanh toán
                                            </p>
                                            <p className="mt-0.5 text-xs text-slate-400">
                                                Chưa gồm phí giao hàng
                                            </p>
                                        </div>
                                        <p className="text-lg font-black text-indigo-700 sm:text-xl">
                                            {formatPrice(cartTotal)}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsCartOpen(false)}
                                        className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.99]"
                                    >
                                        Tiếp tục mua sắm
                                    </button>
                                </footer>
                            </>
                        )}
                    </section>
                </div>
            )}
        </div>
    );
}
