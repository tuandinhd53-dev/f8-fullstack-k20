import { defaultLayout, authLayout } from "../layouts/layouts.js";
import { Products } from "../pages/Products.js";
import { Home } from "../pages/Home.js";
import { ProductDetail } from "../pages/ProductDetail.js";
import { Cart } from "../pages/Cart.js";
import { SignIn } from "../pages/SignIn.js";
import { SignUp } from "../pages/SignUp.js";
import { NotFound } from "../pages/NotFound.js";

const root = document.querySelector("#app");

const routes = [
    {
        path: "/",
        layout: "default",
        render: () => {
            return Home();
        },
    },
    {
        path: "/products",
        layout: "default",
        render: () => {
            return Products();
        },
    },

    {
        path: "/products/:id",
        layout: "default",
        render: (params) => {
            return ProductDetail(params);
        },
    },

    {
        path: "/cart",
        layout: "default",
        render: () => {
            return Cart();
        },
    },

    {
        path: "/sign-up",
        layout: "auth",
        render: () => {
            return SignUp();
        },
    },

    {
        path: "/sign-in",
        layout: "auth",
        render: () => {
            return SignIn();
        },
    },
];

export function router() {
    const currentPath = location.pathname;

    window.scrollTo(0, 0);

    let params;

    const route = routes.find((r) => {
        const currentPathParts = currentPath.split("/").filter(Boolean);
        const routeParts = r.path.split("/").filter(Boolean);

        if (currentPathParts.length !== routeParts.length) {
            return false;
        }

        for (let i = 0; i < routeParts.length; i++) {
            const part = routeParts[i];

            if (part.startsWith(":")) {
                const paramsName = part.slice(1);

                if (!params) {
                    params = {};
                }

                params[paramsName] = currentPathParts[i];
            } else if (part !== currentPathParts[i]) {
                return false;
            }
        }

        return true;
    });

    if (!route) {
        root.innerHTML = defaultLayout(NotFound());
        return;
    }

    const content = route.render(params);

    const layouts = {
        default: defaultLayout,
        auth: authLayout,
    };

    const currentLayout = layouts[route.layout] || defaultLayout;

    root.innerHTML = currentLayout(content);
}

document.addEventListener("click", (e) => {
    const link = e.target.closest("a");

    if (!link) return;

    const href = link.getAttribute("href");

    if (!href || !href.startsWith("/")) return;

    e.preventDefault();

    history.pushState(null, "", href);

    router();
});

window.addEventListener("popstate", () => {
    router();
});

//
