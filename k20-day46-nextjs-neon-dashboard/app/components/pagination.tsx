import Link from "next/link";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    query: string;
};

export default function Pagination({
    currentPage,
    totalPages,
    query,
}: PaginationProps) {
    if (totalPages === 0) return null;

    const createPageURL = (page: number) => {
        const params = new URLSearchParams();

        if (query) {
            params.set("search", query);
        }

        params.set("page", String(page));

        return `/dashboard/invoices?${params.toString()}`;
    };

    // Giới hạn số trang
    const prevPage = Math.max(1, currentPage - 1);
    const nextPage = Math.min(totalPages, currentPage + 1);

    // Xác định trạng thái nút
    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;

    return (
        <div className="flex items-center justify-between">
            {/* Previous */}
            <Link
                href={createPageURL(prevPage)}
                aria-disabled={isFirstPage}
                tabIndex={isFirstPage ? -1 : undefined}
                className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                    isFirstPage
                        ? "pointer-events-none cursor-not-allowed opacity-40"
                        : "border-slate-200 hover:bg-slate-50"
                }`}
            >
                Trang trước
            </Link>

            {/* Current page */}
            <p className="text-sm text-slate-600">
                Trang <span className="font-semibold">{currentPage}</span> /{" "}
                <span className="font-semibold">{totalPages}</span>
            </p>

            {/* Next */}
            <Link
                href={createPageURL(nextPage)}
                aria-disabled={isLastPage}
                tabIndex={isLastPage ? -1 : undefined}
                className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                    isLastPage
                        ? "pointer-events-none cursor-not-allowed opacity-40"
                        : "border-slate-200 hover:bg-slate-50"
                }`}
            >
                Trang sau
            </Link>
        </div>
    );
}
