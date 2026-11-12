import { getProducts } from "@/app/lib/products";
import Link from "next/link";

// Kiểu dữ liệu searchParams từ URL

type ProductsPageProps = {
    searchParams: Promise<{ query?: string; page?: string }>;
};

export default async function ProductsPage({
    searchParams,
}: ProductsPageProps) {
    // Lấy tham số từ URL
    const params = await searchParams;

    const query = params.query || "";
    const page = Math.max(1, Number(params.page) || 1);

    const {
        items: products,
        total,
        totalPages,
        currentPage,
    } = await getProducts(query, page);

    const isPreviousDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;

    const createPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams();

        if (query) {
            params.set("query", query);
        }

        params.set("page", pageNumber.toString());

        return `/dashboard/products?${params.toString()}`;
    };

    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-6xl space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Sản phẩm
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Quản lý danh sách sản phẩm trong hệ thống.
                    </p>
                </div>

                {/* Summary */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <p className="text-sm text-gray-500">Tổng số sản phẩm</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                        {total}
                    </p>
                </div>

                <form
                    method="GET"
                    action="/dashboard/products"
                    className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row"
                >
                    <div className="flex flex-1 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
                        <svg
                            className="h-5 w-5 shrink-0 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path strokeLinecap="round" d="m16 16 4 4" />
                        </svg>

                        <input
                            type="text"
                            name="query"
                            defaultValue={query}
                            placeholder="Tìm theo tên sản phẩm..."
                            className="h-11 w-full bg-transparent px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="h-11 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                    >
                        Tìm kiếm
                    </button>
                </form>

                {/* Product table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <div className="border-b border-gray-200 px-5 py-4">
                        <h2 className="font-semibold text-gray-900">
                            Danh sách sản phẩm
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="px-5 py-3 font-medium">
                                        ID
                                    </th>
                                    <th className="px-5 py-3 font-medium">
                                        Tên sản phẩm
                                    </th>
                                    <th className="px-5 py-3 font-medium">
                                        Giá
                                    </th>
                                    <th className="px-5 py-3 text-right font-medium">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {products.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-5 py-4 text-gray-500">
                                            #{product.id}
                                        </td>

                                        <td className="px-5 py-4 font-medium text-gray-900">
                                            {product.name}
                                        </td>

                                        <td className="px-5 py-4 text-gray-700">
                                            {product.price.toLocaleString(
                                                "vi-VN",
                                            )}{" "}
                                            đ
                                        </td>

                                        <td className="px-5 py-4 text-right">
                                            <Link
                                                href={`/dashboard/products/${product.id}`}
                                                className="font-medium text-blue-600 hover:text-blue-700"
                                            >
                                                Xem chi tiết
                                            </Link>
                                        </td>
                                    </tr>
                                ))}

                                {products.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-5 py-10 text-center text-gray-500"
                                        >
                                            Không tìm thấy sản phẩm.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                    {/* Previous */}
                    <Link
                        href={createPageUrl(currentPage - 1)}
                        aria-disabled={isPreviousDisabled}
                        className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                            isPreviousDisabled
                                ? "pointer-events-none border-gray-200 text-gray-300"
                                : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        Previous
                    </Link>

                    {/* Current page */}
                    <p className="text-sm text-gray-600">
                        Trang{" "}
                        <span className="font-semibold text-gray-900">
                            {currentPage}
                        </span>
                        {" / "}
                        <span className="font-semibold text-gray-900">
                            {totalPages}
                        </span>
                    </p>

                    {/* Next */}
                    <Link
                        href={createPageUrl(currentPage + 1)}
                        aria-disabled={isNextDisabled}
                        className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                            isNextDisabled
                                ? "pointer-events-none border-gray-200 text-gray-300"
                                : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        Next
                    </Link>
                </div>
            </div>
        </main>
    );
}
