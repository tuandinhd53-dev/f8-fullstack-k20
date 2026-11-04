function ProductCard({ product, onAddToCart, formatPrice }) {
    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">
            <div className="flex h-48 items-center justify-center p-4">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full object-contain transition group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col p-4">
                <p className="mb-2 text-xs capitalize text-slate-400">
                    {product.category?.replaceAll("-", " ")}
                </p>

                <h3 className="line-clamp-2 min-h-12 font-semibold leading-6">
                    {product.title}
                </h3>

                <p className="mt-3 text-lg font-bold text-emerald-700">
                    {formatPrice(product.price)}
                </p>

                <button
                    onClick={() => onAddToCart(product)}
                    className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                    + Thêm vào giỏ
                </button>
            </div>
        </article>
    );
}

export default ProductCard;
