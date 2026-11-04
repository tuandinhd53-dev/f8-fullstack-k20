import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProductsByCategory } from "./lib/api";
import { useCartStore } from "./stores/cartStore";

import Header from "./components/Header";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import CartModal from "./components/CartModal";

function App() {
    // Danh mục đang chọn.
    const [selectedCategory, setSelectedCategory] = useState("");

    // Trạng thái mở/đóng modal.
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Lấy state và actions từ Zustand.
    const cartItems = useCartStore((state) => state.items);
    const addToCart = useCartStore((state) => state.addToCart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const getTotalPrice = useCartStore((state) => state.getTotalPrice);

    // Tổng số lượng sản phẩm trong giỏ.
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    // Tải danh mục.
    const {
        data: categories,
        isPending: isCategoriesPending,
        isError: isCategoriesError,
        error: categoriesError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    // Tải sản phẩm theo danh mục.
    const {
        data: products,
        isPending: isProductsPending,
        isError: isProductsError,
        error: productsError,
    } = useQuery({
        queryKey: ["products", selectedCategory],
        queryFn: () => fetchProductsByCategory(selectedCategory),
        enabled: Boolean(selectedCategory),
    });

    // Format giá USD từ API.
    const formatPrice = (price) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* Header nhận callback mở modal */}
            <Header
                cartCount={cartCount}
                onOpenCart={() => setIsCartOpen(true)}
            />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                {/* Banner */}
                <section className="mb-8 rounded-3xl bg-slate-900 px-6 py-8 text-white sm:px-10 sm:py-10">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-400">
                        Discover your next device
                    </p>
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Công nghệ phù hợp với bạn.
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                        Khám phá sản phẩm và quản lý giỏ hàng của bạn.
                    </p>
                </section>

                {/* Danh mục */}
                <section>
                    <p className="text-sm font-medium text-emerald-700">
                        CATALOGUE
                    </p>
                    <h2 className="mb-5 mt-1 text-2xl font-bold text-slate-900">
                        Danh mục sản phẩm
                    </h2>

                    {isCategoriesPending && (
                        <p className="mb-5 text-slate-500">
                            Đang tải danh mục...
                        </p>
                    )}

                    {isCategoriesError && (
                        <p className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">
                            {categoriesError.message}
                        </p>
                    )}

                    {categories && (
                        <CategoryList
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />
                    )}
                </section>

                {/* Danh sách sản phẩm */}
                <section className="mt-8">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold capitalize text-slate-900">
                            {selectedCategory
                                ? selectedCategory.replaceAll("-", " ")
                                : "Sản phẩm"}
                        </h2>

                        {products && (
                            <span className="text-sm text-slate-500">
                                {products.length} sản phẩm
                            </span>
                        )}
                    </div>

                    {!selectedCategory && (
                        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                            Vui lòng chọn danh mục để xem sản phẩm.
                        </p>
                    )}

                    {selectedCategory && isProductsPending && (
                        <p className="rounded-xl bg-white p-8 text-center text-slate-500">
                            Đang tải sản phẩm...
                        </p>
                    )}

                    {selectedCategory && isProductsError && (
                        <p className="rounded-xl bg-red-50 p-4 text-red-700">
                            {productsError.message}
                        </p>
                    )}

                    {selectedCategory &&
                        !isProductsPending &&
                        !isProductsError &&
                        products && (
                            <ProductList
                                products={products}
                                onAddToCart={addToCart}
                                formatPrice={formatPrice}
                            />
                        )}
                </section>
            </main>

            {/* Modal giỏ hàng chỉ render khi mở */}
            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                getTotalPrice={getTotalPrice}
                formatPrice={formatPrice}
            />

            <footer className="mt-10 border-t border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
                TechStore · React + TanStack Query + Zustand
            </footer>
        </div>
    );
}

export default App;
