import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
    plugins: [tailwindcss()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(import.meta.dirname, "index.html"),
                login: resolve(import.meta.dirname, "login.html"),
                signup: resolve(import.meta.dirname, "signup.html"),
            },
        },
    },
});
