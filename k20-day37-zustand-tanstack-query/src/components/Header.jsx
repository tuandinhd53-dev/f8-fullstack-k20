function Header({ cartCount, onOpenCart }) {
    return (
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">
                        TechStore
                    </h1>
                    <p className="text-xs text-slate-500">
                        Your everyday technology
                    </p>
                </div>

                <button
                    onClick={onOpenCart}
                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                    <span>Giỏ hàng</span>
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-400 px-1.5 text-xs font-bold text-slate-950">
                        {cartCount}
                    </span>
                </button>
            </div>
        </header>
    );
}

export default Header;
