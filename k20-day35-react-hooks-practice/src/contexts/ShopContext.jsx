import { createContext, useContext, useReducer } from "react";
import { initialState, shopReducer } from "../reducers/shopReducer";

export const ShopContext = createContext(null);

export function ShopProvider({ children }) {
    const [state, dispatch] = useReducer(shopReducer, initialState);

    return (
        <ShopContext.Provider value={{ state, dispatch }}>
            {children}
        </ShopContext.Provider>
    );
}

export function useShop() {
    const context = useContext(ShopContext);

    if (!context) {
        throw new Error("useShop must be used within ShopProvider");
    }

    return context;
}
