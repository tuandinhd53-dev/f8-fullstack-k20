import { useEffect } from "react";
import CartItem from "./CartItem";

function CartModal({
    isOpen,
    onClose,
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    formatPrice,
}) {
    // Đóng modal bằng phím Escape.
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    // Không render modal nếu đang đóng.
    if (!isOpen) return null;

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-modal-title"
                className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                {/* Header modal */}
                <div className="flex items-center justify-between border-b border-slate-200 p-5">
                    <div>
                        <h2
                            id="cart-modal-title"
                            className="text-xl font-bold text-slate-900"
                        >
                            Giỏ hàng của bạn
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {cartCount} sản phẩm
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        aria-label="Đóng giỏ hàng"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-600 transition hover:bg-slate-200"
                    >
                        ×
                    </button>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="overflow-y-auto p-5">
                    {cartItems.length === 0 ? (
                        <div className="py-10 text-center">
                            <p className="font-semibold text-slate-700">
                                Giỏ hàng đang trống
                            </p>
                            <p className="mt-2 text-sm text-slate-500">
                                Hãy thêm sản phẩm bạn muốn mua.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    updateQuantity={updateQuantity}
                                    removeFromCart={removeFromCart}
                                    formatPrice={formatPrice}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Tổng tiền */}
                <div className="border-t border-slate-200 p-5">
                    <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold text-slate-700">
                            Tổng cộng
                        </span>
                        <span className="text-xl font-extrabold text-emerald-700">
                            {formatPrice(getTotalPrice())}
                        </span>
                    </div>

                    <button
                        disabled={cartItems.length === 0}
                        onClick={() =>
                            alert("Bài tập hiện chưa có chức năng thanh toán.")
                        }
                        className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    >
                        Tiến hành thanh toán
                    </button>
                </div>
            </section>
        </div>
    );
}

export default CartModal;
