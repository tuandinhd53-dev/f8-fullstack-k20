import { create } from "zustand";

export const useCartStore = create((set, get) => ({
    items: [],

    // thêm sản phẩm
    addToCart: (product) => {
        const { items } = get();

        const productFound = items.find((item) => item.id === product.id);

        if (productFound) {
            set({
                items: items.map((item) => {
                    if (item.id === product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        };
                    }
                    return item;
                }),
            });
        } else {
            set({
                items: [...items, { ...product, quantity: 1 }],
            });
        }
    },

    // cập nhật số lượng
    updateQuantity: (id, quantity) => {
        if (!Number.isInteger(quantity) || quantity <= 0) return;
        const { items } = get();

        set({
            items: items.map((item) => {
                return item.id === id ? { ...item, quantity } : item;
            }),
        });
    },

    // xóa sản phẩm
    removeFromCart: (id) => {
        const { items } = get();

        set({
            items: items.filter((item) => item.id !== id),
        });
    },
    //  tính tổng tiền
    getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0);
    },
}));
export default useCartStore;
