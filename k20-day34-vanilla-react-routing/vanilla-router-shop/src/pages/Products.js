import products from "../data/products.js";
import { ProductCard } from "../components/ProductCard.js";

export const Products = () => {
    const productList = products
        .map((product) => ProductCard(product))
        .join("");

    return `
        <section class="min-h-screen bg-slate-50 py-10">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div class="mb-8">
                    <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Danh sách sản phẩm
                    </h1>

                    <p class="mt-2 text-slate-500">
                        Khám phá các sản phẩm công nghệ mới nhất.
                    </p>
                </div>

                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    ${productList}
                </div>

            </div>
        </section>
    `;
};
