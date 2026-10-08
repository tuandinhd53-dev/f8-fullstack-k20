import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");

        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (productId) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.productId === productId,
            );

            if (existingItem) {
                return currentItems.map((item) => {
                    return item.productId === productId
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
                        : item;
                });
            }

            return [
                ...currentItems,
                {
                    productId,
                    quantity: 1,
                },
            ];
        });
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems((currentItems) => {
            return currentItems.map((item) => {
                return item.productId === productId
                    ? {
                          ...item,
                          quantity,
                      }
                    : item;
            });
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((currentItems) => {
            return currentItems.filter((item) => item.productId !== productId);
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}

export default CartProvider;
