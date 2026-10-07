function getCart() {
    const cart = localStorage.getItem("cart");

    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
    const cart = getCart();

    const existingItem = cart.find((i) => i.productId === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            productId,
            quantity: 1,
        });
    }

    saveCart(cart);
}

function removeFromCart(productId) {
    const cart = getCart();

    const newCart = cart.filter((i) => i.productId !== productId);

    saveCart(newCart);
}

function clearCart() {
    saveCart([]);
}

function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        return removeFromCart(productId);
    }
    const cart = getCart();

    const existingItem = cart.find((i) => i.productId === productId);

    if (!existingItem) return;

    existingItem.quantity = quantity;

    saveCart(cart);
}

export { getCart, addToCart, removeFromCart, clearCart, updateQuantity };
