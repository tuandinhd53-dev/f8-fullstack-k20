import ProductItem from "./ProductItem";

function ProductList({ products, onAddToCart }) {
    return (
        <div className="mx-auto grid max-w-5xl grid-cols-4 gap-5">
            {products.map((product) => {
                return (
                    <ProductItem
                        onAddToCart={onAddToCart}
                        key={product.id}
                        product={product}
                    />
                );
            })}
        </div>
    );
}

export default ProductList;
