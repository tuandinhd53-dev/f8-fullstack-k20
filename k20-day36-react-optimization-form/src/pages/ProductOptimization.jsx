import { useMemo, useState } from "react";
import { ProductOptimizationView } from "../components/ProductOptimizationView";
import { CATEGORIES, PRODUCTS } from "../data/products";

export function ProductOptimization() {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("All");
    const [count, setCount] = useState(0);
    const [sort, setSort] = useState("default");

    const showReset =
        keyword !== "" ||
        category !== "All" ||
        sort !== "default" ||
        count !== 0;

    function handleReset() {
        setKeyword("");
        setCategory("All");
        setSort("default");
        setCount(0);
    }

    const sortedProducts = useMemo(() => {
        console.log("ĐANG LỌC VÀ SẮP XẾP LẠI DANH SÁCH...");
        const returnfilter = PRODUCTS.filter((product) => {
            const matchKeyword = product.name
                .toLowerCase()
                .includes(keyword.trim().toLowerCase());

            const matchCategory =
                category === "All" || product.category === category;

            return matchCategory && matchKeyword;
        });

        const sortedProducts = [...returnfilter];
        if (sort === "price-asc") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sort === "price-desc") {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        return sortedProducts;
    }, [keyword, category, sort]);

    return (
        <ProductOptimizationView
            keyword={keyword}
            setKeyword={setKeyword}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            count={count}
            setCount={setCount}
            categories={CATEGORIES}
            products={sortedProducts}
            totalProducts={PRODUCTS.length}
            onReset={handleReset}
            showReset={showReset}
        />
    );
}
