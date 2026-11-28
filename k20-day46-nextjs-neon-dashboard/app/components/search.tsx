"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);

        const trimmed = term.trim();

        if (trimmed) {
            params.set("search", trimmed);
        } else {
            params.delete("search");
        }

        params.set("page", "1");

        const queryString = params.toString();

        replace(queryString ? `${pathname}?${queryString}` : pathname);
    }

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Tìm kiếm khách hàng..."
                defaultValue={searchParams.get("search") ?? ""}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
        </div>
    );
}
