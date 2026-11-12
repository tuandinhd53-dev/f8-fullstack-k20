"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
    const pathname = usePathname();

    const isOverview = pathname === "/dashboard";
    const isProducts = pathname.startsWith("/dashboard/products");

    return (
        <nav className="flex items-center gap-6">
            <Link
                href="/dashboard"
                className={`border-b-2 py-4 text-sm font-medium transition ${
                    isOverview
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
            >
                Tổng quan
            </Link>

            <Link
                href="/dashboard/products"
                className={`border-b-2 py-4 text-sm font-medium transition ${
                    isProducts
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
            >
                Sản phẩm
            </Link>
        </nav>
    );
}
