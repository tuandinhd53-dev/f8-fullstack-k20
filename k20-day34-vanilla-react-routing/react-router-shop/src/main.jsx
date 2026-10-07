// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <App />,
    // </StrictMode>,
);

const app = document.querySelector("#app");

app.innerHTML = `
    <nav class="flex gap-3 p-6">
        <button data-route="/">Home</button>
        <button data-route="/products">Products</button>
        <button data-route="/cart">Cart</button>
    </nav>

    <main id="page" class="p-6">
        <h1 class="text-3xl font-bold">Home Page</h1>
    </main>
`;

const page = document.querySelector("#page");

document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
        const path = button.dataset.route;

        history.pushState({}, "", path);

        page.innerHTML = `
            <h1 class="text-3xl font-bold">
                ${path === "/" ? "Home Page" : path.slice(1) + " Page"}
            </h1>
        `;
    });
});
