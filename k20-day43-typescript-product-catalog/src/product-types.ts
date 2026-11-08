export const PRODUCT_STATUSES = [
    "in-stock",
    "low-stock",
    "out-of-stock",
] as const;

export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
};

export type ProductUpdate = Partial<Product>;
