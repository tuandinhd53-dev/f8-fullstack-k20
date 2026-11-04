
function CategoryList({
    categories,
    selectedCategory,
    onSelectCategory,
}) {
    return (
        <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                        selectedCategory === category
                            ? "bg-emerald-600 text-white"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-700"
                    }`}
                >
                    {category.replaceAll("-", " ")}
                </button>
            ))}
        </div>
    );
}

export default CategoryList;
