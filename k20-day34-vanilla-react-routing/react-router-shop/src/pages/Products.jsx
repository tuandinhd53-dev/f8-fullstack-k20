import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Products() {
    return (
        <section className="min-h-screen bg-slate-50 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Danh sách sản phẩm
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Khám phá các sản phẩm công nghệ mới nhất.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Products;
