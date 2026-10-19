import { categories, products } from "../data/products.js";
import { useShop } from "../contexts/ShopContext.jsx";
import ShopView from "../components/ShopView.jsx";

function ShopPage() {
    const { state, dispatch } = useShop();

    function handleSearchChange(event) {
        dispatch({
            type: "SET_SEARCH_KEYWORD",
            payload: event.target.value,
        });
    }

    function handleCategoryChange(category) {
        dispatch({
            type: "SET_CATEGORY",
            payload: category,
        });
    }

    function handleAddToCart(product) {
        dispatch({
            type: "ADD_TO_CART",
            payload: product,
        });
    }

    function handleRemoveFromCart(product) {
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: product,
        });
    }

    function handleIncreaseQuantity(item) {
        dispatch({
            type: "ADD_TO_CART",
            payload: item,
        });
    }

    function handleDecreaseQuantity(item) {
        dispatch({
            type: "DECREASE_QUANTITY",
            payload: item,
        });
    }

    const keyword = state.searchKeyword.trim().toLowerCase();

    const visibleProducts = products.filter((product) => {
        const matchesCategory =
            state.selectedCategory === "all" ||
            product.category === state.selectedCategory;

        const matchesKeyword =
            keyword === "" || product.name.toLowerCase().includes(keyword);
        return matchesCategory && matchesKeyword;
    });

    const cartCount = state.cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    const cartTotal = state.cart.reduce((total, item) => {
        return total + item.quantity * item.price;
    }, 0);

    return (
        <ShopView
            visibleProducts={visibleProducts}
            categories={categories}
            selectedCategory={state.selectedCategory}
            searchKeyword={state.searchKeyword}
            cart={state.cart}
            cartCount={cartCount}
            cartTotal={cartTotal}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
        />
    );
}

export default ShopPage;
