import { router } from "../router/router.js";

import {
    addToCart,
    getCart,
    clearCart,
    updateQuantity,
    removeFromCart,
} from "../services/cart.js";

document.addEventListener("click", (e) => {
    const button = e.target.closest("[data-action]");

    if (!button) return;

    const action = button.dataset.action;
    const productId = Number(button.dataset.productId);

    console.log("action:", action);

    switch (action) {
        case "add": {
            addToCart(productId);
            router();
            break;
        }

        case "increase": {
            const cart = getCart();
            const item = cart.find((i) => i.productId === productId);

            const newQuantity = item.quantity + 1;

            updateQuantity(productId, newQuantity);
            router();
            break;
        }

        case "decrease": {
            const cart = getCart();
            const item = cart.find((i) => i.productId === productId);

            const newQuantity = item.quantity - 1;

            updateQuantity(productId, newQuantity);
            router();
            break;
        }

        case "remove": {
            removeFromCart(productId);
            router();
            break;
        }

        case "clear": {
            clearCart();
            router();
            break;
        }
    }
});
