// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import CartProvider from "./context/CartContext.jsx";

createRoot(document.getElementById("app")).render(
    // <StrictMode>
    <BrowserRouter>
        <CartProvider>
            <App />
        </CartProvider>
    </BrowserRouter>,
    // </StrictMode>,
);
