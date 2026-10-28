export type CartItem = {
    readonly productId: string;
    name: string;
    unitPrice: number;
    quantity: number;
};

export type Cart = {
    cartId: string;
    currency: "VND";
    items: readonly CartItem[];
    couponCode?: string;
};
