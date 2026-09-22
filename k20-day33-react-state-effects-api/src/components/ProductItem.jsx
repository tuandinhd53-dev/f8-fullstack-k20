import Badge from "./Badge";

function ProductItem({ product }) {
    const finalPrice =
        product.price - (product.price * product.discountPercentage) / 100;

    const isOutOfStock = product.stock === 0;

    const formatPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <article
            className={`group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100 ${
                isOutOfStock ? "opacity-55" : ""
            }`}
        >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-violet-50">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <Badge>Discount {product.discountPercentage}%</Badge>

                    {isOutOfStock && (
                        <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                            Out of stock
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col p-5">
                <div className="mb-4">
                    <h2 className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-slate-900">
                        {product.title}
                    </h2>

                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                        {product.category}
                    </p>
                </div>

                {/* Price */}
                <div className="mb-5">
                    <p className="text-xs font-medium text-slate-400">
                        Original price
                    </p>

                    <p className="text-sm font-medium text-slate-400 line-through">
                        {formatPrice.format(product.price)}
                    </p>

                    <p className="mt-1 text-2xl font-extrabold tracking-tight text-violet-600">
                        {formatPrice.format(finalPrice)}
                    </p>
                </div>

                {/* Stock */}
                <div className="mb-4 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-400">Stock</span>

                    <span
                        className={
                            isOutOfStock
                                ? "font-bold text-red-500"
                                : "font-bold text-emerald-500"
                        }
                    >
                        {isOutOfStock
                            ? "Out of stock"
                            : `${product.stock} available`}
                    </span>
                </div>

                {/* Button */}
                <button
                    disabled={isOutOfStock}
                    onClick={() => alert(`Added ${product.title} to cart`)}
                    className="w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                >
                    {isOutOfStock ? "Out of stock" : "Add to cart"}
                </button>
            </div>
        </article>
    );
}

export default ProductItem;
