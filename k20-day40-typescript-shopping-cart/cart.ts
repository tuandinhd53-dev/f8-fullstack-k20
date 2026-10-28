import { Cart, CartItem } from "./types";

export function addItem(cart: Cart, item: CartItem): Cart {
    if (!item.productId || item.productId.trim() === "") {
        throw new Error("ID sản phẩm không được để trống");
    }

    if (!item.name || item.name.trim() === "") {
        throw new Error("Tên sản phẩm không được để trống");
    }

    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        throw new Error("Số lượng phải là số nguyên lớn hơn 0");
    }

    if (!Number.isFinite(item.unitPrice) || item.unitPrice < 0) {
        throw new Error("Đơn giá phải là số không âm");
    }

    const existingItem = cart.items.find(
        (product) => product.productId === item.productId,
    );

    if (existingItem) {
        const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + item.quantity,
        };

        const updatedItems = cart.items.map((product) => {
            if (item.productId === product.productId) {
                return updatedItem;
            }
            return product;
        });

        return {
            ...cart,
            items: updatedItems,
        };
    } else {
        const newItems = [...cart.items, { ...item }];
        return {
            ...cart,
            items: newItems,
        };
    }
}

export function subtotal(cart: Cart): number {
    return cart.items.reduce((sum, item) => {
        return sum + item.quantity * item.unitPrice;
    }, 0);
}

export function discount(cart: Cart): number {
    const couponCode = cart.couponCode === "SALE10";

    if (couponCode) {
        return Math.round(subtotal(cart) * 0.1);
    }

    return 0;
}

export function shippingFee(amountAfterDiscount: number): number {
    if (amountAfterDiscount >= 500000) {
        return 0;
    }

    return 30000;
}

export function formatMoney(value: number): string {
    return `${new Intl.NumberFormat("vi-VN").format(value)}₫`;
}

export function priceRange(cart: Cart): [number, number] {
    if (cart.items.length === 0) {
        throw new Error("Giỏ hàng đang trống, không thể tìm khoảng giá.");
    }

    const prices = cart.items.map((item) => item.unitPrice);

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return [minPrice, maxPrice];
}

export async function validateCoupon(code: string): Promise<boolean> {
    return code.trim() === "SALE10";
}

export function renderInvoice(cart: Cart): string {
    const total = subtotal(cart);
    const discountAmount = discount(cart);
    const afterDiscount = total - discountAmount;
    const shipping = shippingFee(afterDiscount);
    const finalTotal = afterDiscount + shipping;

    const itemLines = cart.items.map((i) => {
        const totalLine = i.quantity * i.unitPrice;

        return `${i.name} | SL: ${i.quantity} | Đơn giá: ${formatMoney(i.unitPrice)} | Thành tiền: ${formatMoney(totalLine)}`;
    });

    return [
        "===== HÓA ĐƠN =====",
        ...itemLines,
        "============",
        `Tổng tiền hàng: ${formatMoney(total)}`,
        `Giảm giá: ${formatMoney(discountAmount)}`,
        `Phí vận chuyển: ${formatMoney(shipping)}`,
        `Tổng thanh toán: ${formatMoney(finalTotal)}`,
    ].join("\n");
}
