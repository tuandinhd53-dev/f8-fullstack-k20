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
                register: resolve(import.meta.dirname, "register.html"),
                profile: resolve(import.meta.dirname, "profile.html"),
                detail: resolve(import.meta.dirname, "detail.html"),
            },
        },
    },
});
