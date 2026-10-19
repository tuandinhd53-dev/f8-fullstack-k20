export const initialState = {
    cart: [],
    selectedCategory: "all",
    searchKeyword: "",
};

export function shopReducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART": {
            const product = action.payload;

            const isExitst = state.cart.some((item) => item.id === product.id);

            if (isExitst) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item,
                    ),
                };
            }
            return {
                ...state,
                cart: [...state.cart, { ...product, quantity: 1 }],
            };
        }

        case "DECREASE_QUANTITY": {
            const product = action.payload;

            const decreaseCart = state.cart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item,
            );

            return {
                ...state,
                cart: decreaseCart,
            };
        }

        case "REMOVE_FROM_CART": {
            const product = action.payload;

            const removeCart = state.cart.filter(
                (item) => item.id !== product.id,
            );

            return {
                ...state,
                cart: removeCart,
            };
        }

        case "SET_CATEGORY":
            return {
                ...state,
                selectedCategory: action.payload,
            };

        case "SET_SEARCH_KEYWORD":
            return {
                ...state,
                searchKeyword: action.payload,
            };

        default:
            return state;
    }
}
