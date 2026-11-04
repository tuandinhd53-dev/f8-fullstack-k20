import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart, formatPrice }) {
    if (!products || products.length === 0) {
        return (
            <p className="rounded-xl bg-white p-8 text-center text-slate-500">
                Danh mục này chưa có sản phẩm.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    formatPrice={formatPrice}
                />
            ))}
        </div>
    );
}

export default ProductList;
