function CartItem({ item, updateQuantity, removeFromCart, formatPrice }) {
    return (
        <div className="flex gap-3 border-b border-slate-100 pb-4">
            <img
                src={item.thumbnail}
                alt={item.title}
                className="h-16 w-16 shrink-0 rounded-lg bg-slate-50 object-contain p-1"
            />

            <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">
                    {item.title}
                </h3>

                <p className="mt-1 text-sm font-bold text-emerald-700">
                    {formatPrice(item.price)}
                </p>

                <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center rounded-lg border border-slate-200">
                        <button
                            onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            aria-label="Giảm số lượng"
                            className="px-2.5 py-1.5 hover:bg-slate-100 disabled:opacity-30"
                        >
                            −
                        </button>

                        <span className="min-w-8 text-center text-sm font-semibold">
                            {item.quantity}
                        </span>

                        <button
                            onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Tăng số lượng"
                            className="px-2.5 py-1.5 hover:bg-slate-100"
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs font-medium text-red-500 hover:text-red-700"
                    >
                        Xóa
                    </button>
                </div>

                <p className="mt-2 text-right text-xs text-slate-500">
                    Thành tiền: {formatPrice(item.price * item.quantity)}
                </p>
            </div>
        </div>
    );
}

export default CartItem;
