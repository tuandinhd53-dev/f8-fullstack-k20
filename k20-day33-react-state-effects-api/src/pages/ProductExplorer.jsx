import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";

function ProductExplorer() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchProducts() {
            try {
                setLoading(true);
                setError(null);

                let url = "https://dummyjson.com/products?limit=10";

                if (searchTerm === "") {
                    url = "https://dummyjson.com/products?limit=10";
                } else {
                    url = `https://dummyjson.com/products/search?q=${searchTerm}`;
                }

                const res = await fetch(url, {
                    signal: controller.signal,
                });

                const data = await res.json();

                setProducts(data.products);
            } catch (error) {
                if (error.name === "AbortError") {
                    return;
                }

                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();

        return () => controller.abort();
    }, [searchTerm]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <header className="mb-10 text-center">
                    <div className="mb-3 inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-semibold text-violet-700 shadow-sm">
                        ✨ Product Explorer
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Explore Our Products
                    </h1>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                        Search, explore and discover products from our
                        collection.
                    </p>
                </header>

                {/* Search */}
                <section className="mx-auto mb-8 max-w-2xl">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearch={setSearchTerm}
                    />
                </section>

                {/* Status */}
                <div className="mb-6 flex min-h-8 items-center justify-between">
                    {!loading && !error && (
                        <p className="text-sm font-medium text-slate-500">
                            <span className="font-bold text-violet-600">
                                {products.length}
                            </span>{" "}
                            products found
                        </p>
                    )}

                    {loading && (
                        <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-medium text-violet-600">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
                            Loading products...
                        </div>
                    )}

                    {error && (
                        <div className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                            Something went wrong: {error}
                        </div>
                    )}
                </div>

                {/* Products */}
                {!error && <ProductList products={products} />}
            </div>
        </main>
    );
}

export default ProductExplorer;
