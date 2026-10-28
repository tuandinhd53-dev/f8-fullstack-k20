import {
    addItem,
    subtotal,
    discount,
    shippingFee,
    formatMoney,
    priceRange,
    validateCoupon,
    renderInvoice,
} from "./cart";

import type { Cart } from "./types";

const cart: Cart = {
    cartId: "cart-01",
    currency: "VND",
    items: [],
    couponCode: "SALE10",
};

const cartWithMouse = addItem(cart, {
    productId: "p1",
    name: "Chuột máy tính",
    unitPrice: 150000,
    quantity: 2,
});

const finalCart = addItem(cartWithMouse, {
    productId: "p2",
    name: "Bàn phím",
    unitPrice: 500000,
    quantity: 1,
});

async function main(): Promise<void> {
    console.log(renderInvoice(finalCart));
    console.log("Tổng tiền hàng:", formatMoney(subtotal(finalCart)));
    console.log("Khoảng giá:", priceRange(finalCart));

    console.log(
        "Phí vận chuyển:",
        formatMoney(shippingFee(subtotal(finalCart) - discount(finalCart))),
    );

    const isValid = await validateCoupon("SALE10");
    console.log("Mã giảm giá hợp lệ:", isValid);
}
main();
