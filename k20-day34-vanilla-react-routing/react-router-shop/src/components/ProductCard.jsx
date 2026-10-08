import { Link } from "react-router";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
    const { addToCart } = useCart();

    const discountPercent = Math.round(
        (1 - product.price / product.originalPrice) * 100,
    );

    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Image */}
            <Link to={`/products/${product.id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm backdrop-blur">
                        {product.category}
                    </span>

                    <span className="absolute right-3 top-3 rounded-md bg-red-500 px-2.5 py-1.5 text-xs font-bold text-white shadow-sm">
                        -{discountPercent}%
                    </span>
                </div>
            </Link>

            {/* Content */}
            <div className="p-5">
                {/* Rating / Sold */}
                <div className="flex items-center gap-3 text-sm">
                    <span className="font-semibold text-amber-500">
                        ★ {product.rating}
                    </span>

                    <span className="h-4 w-px bg-slate-200"></span>

                    <span className="text-slate-500">
                        Đã bán {product.sold}
                    </span>
                </div>

                {/* Name */}
                <Link to={`/products/${product.id}`}>
                    <h2 className="mt-3 min-h-[56px] line-clamp-2 text-lg font-semibold leading-7 text-slate-900 transition hover:text-indigo-600">
                        {product.name}
                    </h2>
                </Link>

                {/* Price */}
                <div className="mt-3">
                    <p className="text-xl font-bold text-red-600">
                        {product.price.toLocaleString("vi-VN")}đ
                    </p>

                    <p className="mt-1 text-sm text-slate-400 line-through">
                        {product.originalPrice.toLocaleString("vi-VN")}đ
                    </p>
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-2">
                    <button
                        data-action="add"
                        data-product-id={product.id}
                        onClick={() => addToCart(product.id)}
                        className="add-to-cart flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
                    >
                        Thêm vào giỏ
                    </button>

                    <Link
                        to={`/products/${product.id}`}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        Chi tiết
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;
