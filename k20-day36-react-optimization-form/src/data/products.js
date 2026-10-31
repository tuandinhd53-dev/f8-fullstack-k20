export const CATEGORIES = [
    "Laptop",
    "Điện thoại",
    "Thời trang",
    "Gia dụng",
    "PC",
];

export const CATEGORY_STYLES = {
    "Điện thoại": {
        badge: "bg-sky-400/10 text-sky-300 ring-sky-400/20",
        border: "hover:border-sky-400/60",
        shadow: "hover:shadow-sky-500/5",
        active: "border-sky-400/60 bg-sky-400/10 text-sky-300",
        star: "text-sky-300",
    },
    Laptop: {
        badge: "bg-violet-400/10 text-violet-300 ring-violet-400/20",
        border: "hover:border-violet-400/60",
        shadow: "hover:shadow-violet-500/5",
        active: "border-violet-400/60 bg-violet-400/10 text-violet-300",
        star: "text-violet-300",
    },
    "Thời trang": {
        badge: "bg-rose-400/10 text-rose-300 ring-rose-400/20",
        border: "hover:border-rose-400/60",
        shadow: "hover:shadow-rose-500/5",
        active: "border-rose-400/60 bg-rose-400/10 text-rose-300",
        star: "text-rose-300",
    },
    "Gia dụng": {
        badge: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
        border: "hover:border-amber-400/60",
        shadow: "hover:shadow-amber-500/5",
        active: "border-amber-400/60 bg-amber-400/10 text-amber-300",
        star: "text-amber-300",
    },
    PC: {
        badge: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
        border: "hover:border-emerald-400/60",
        shadow: "hover:shadow-emerald-500/5",
        active: "border-emerald-400/60 bg-emerald-400/10 text-emerald-300",
        star: "text-emerald-300",
    },
};

export const PRODUCTS = Array.from({ length: 1000 }, (_, index) => ({
    id: index + 1,
    name: `Sản phẩm ${index + 1}`,
    category: CATEGORIES[index % CATEGORIES.length],
    price: (index + 1) * 100000,
    rating: (index % 5) + 1,
}));
