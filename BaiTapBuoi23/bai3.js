function createOrderSystem() {
    const cart = [];

    function addToCart(name, price, qty) {
        cart.push({
            name,
            price,
            qty,
        });
        return cart.length;
    }

    function checkout(distance) {
        let shippingFee = 0;
        const subtotal = cart.reduce((total, item) => {
            return total + item.qty * item.price;
        }, 0);
        if (subtotal >= 500000) {
            shippingFee = 0;
        } else if (distance <= 5) {
            shippingFee = 15000;
        } else if (distance <= 20) {
            shippingFee = 30000;
        } else {
            shippingFee = 50000;
        }

        const finalTotal = subtotal + shippingFee;

        cart.length = 0;

        return {
            subtotal,
            shippingFee,
            finalTotal,
        };
    }

    function getCartSize() {
        return cart.length;
    }

    return {
        addToCart,
        checkout,
        getCartSize,
    };
}

const store = createOrderSystem();

console.log(store.addToCart("Mũ lưỡi trai", 120000, 1));
// 1  (số sản phẩm hiện có trong giỏ)
console.log(store.getCartSize());
// 1

console.log(store.checkout(15));

// { subtotal: 120000, shippingFee: 30000, finalTotal: 150000 }

console.log(store.getCartSize());
// 0  (giỏ hàng đã tự làm trống sau khi thanh toán)

// --- Một hệ thống khác, hoàn toàn độc lập ---
const store2 = createOrderSystem();

console.log(store2.addToCart("Tất", 30000, 2));
// 1
console.log(store2.checkout(3));

// { subtotal: 60000, shippingFee: 15000, finalTotal: 75000 }

// --- Đơn hàng lớn, được miễn phí ship dù khoảng cách xa ---
const store3 = createOrderSystem();
console.log(store3.addToCart("Áo khoác", 600000, 1));
// 1
console.log(store3.checkout(30));

// { subtotal: 600000, shippingFee: 0, finalTotal: 600000 }

// store gốc và store2, store3 không hề ảnh hưởng lẫn nhau
console.log(store.getCartSize());
// 0
console.log(store2.getCartSize());
// 0
console.log(store3.getCartSize());
// 0
