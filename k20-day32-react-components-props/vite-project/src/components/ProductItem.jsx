function ProductItem({ product, onAddToCart }) {
    let finalPrice = product.price;
    if (product.discountPercent > 0) {
        finalPrice =
            product.price - (product.discountPercent * product.price) / 100;
    }
    return (
        <article
            className={`group overflow-hidden rounded-2xl border border-white/10 bg-[#181818] transition duration-300 ${
                product.inStock
                    ? "hover:-translate-y-1 hover:border-white/20 hover:bg-[#202020]"
                    : "opacity-60"
            }`}
        >
            <div className="relative aspect-square overflow-hidden bg-[#242424]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute left-3 top-3 flex flex-col gap-2">
                    {product.discountPercent > 0 && (
                        <span className="rounded-md bg-red-500/90 px-2.5 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                            -{product.discountPercent}%
                        </span>
                    )}

                    {!product.inStock && (
                        <span className="rounded-md bg-black/80 px-2.5 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                            Hết hàng
                        </span>
                    )}
                </div>
            </div>

            <div className="p-4">
                <h2 className="truncate text-base font-semibold text-white">
                    {product.name}
                </h2>

                <div className="mt-2 h-[28px]">
                    {product.discountPercent > 0 ? (
                        <div className="flex items-center justify-between">
                            {/* Giá sau giảm */}
                            <p className="text-lg font-bold text-white">
                                {finalPrice.toLocaleString("vi-VN")}₫
                            </p>

                            {/* Giá gốc */}
                            <p className="text-sm text-gray-500 line-through">
                                {product.price.toLocaleString("vi-VN")}₫
                            </p>
                        </div>
                    ) : (
                        <p className="text-lg font-bold text-white">
                            {finalPrice.toLocaleString("vi-VN")}₫
                        </p>
                    )}
                </div>

                <button
                    onClick={() => onAddToCart(product, finalPrice)}
                    disabled={!product.inStock}
                    m
                    className={`mt-4 w-full rounded-full px-3 py-2 text-sm font-bold transition ${
                        product.inStock
                            ? "bg-[#1ED760] text-black hover:scale-[1.02] active:scale-95"
                            : "cursor-not-allowed bg-gray-700 text-gray-400"
                    }`}
                >
                    {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
                </button>
            </div>
        </article>
    );
}

export default ProductItem;
