
import { Suspense } from "react";
import { getProductStats } from "../lib/products";

async function DashboardStats() {
    const stats = await getProductStats();

    return (
        <div className="grid gap-5 sm:grid-cols-2">
            {/* Total products */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">
                        Tổng sản phẩm
                    </p>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-lg text-blue-600">
                        #
                    </div>
                </div>

                <div className="mt-5 flex items-end gap-2">
                    <p className="text-3xl font-bold tracking-tight text-gray-900">
                        {stats.total}
                    </p>
                    <span className="mb-1 text-sm text-gray-500">
                        sản phẩm
                    </span>
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-400">
                        Tổng số sản phẩm hiện có trong hệ thống
                    </p>
                </div>
            </div>

            {/* Average price */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">
                        Giá trung bình
                    </p>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-lg font-semibold text-emerald-600">
                        ₫
                    </div>
                </div>

                <div className="mt-5 flex items-end gap-2">
                    <p className="text-3xl font-bold tracking-tight text-gray-900">
                        {stats.averagePrice}
                    </p>
                    <span className="mb-1 text-sm text-gray-500">
                        đơn vị giá
                    </span>
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-400">
                        Mức giá trung bình của toàn bộ sản phẩm
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-gray-50 p-6 sm:p-8">
            <div className="mx-auto max-w-6xl space-y-8">
                {/* Page heading */}
                <div>
                    <p className="text-sm font-medium text-blue-600">
                        OVERVIEW
                    </p>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Tổng quan về dữ liệu sản phẩm trong hệ thống.
                    </p>
                </div>

                {/* Statistics */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-base font-semibold text-gray-800">
                            Thống kê sản phẩm
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Dữ liệu được lấy trực tiếp từ API.
                        </p>
                    </div>

                    <Suspense
                        fallback={
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="h-40 animate-pulse rounded-xl border border-gray-200 bg-white" />
                                <div className="h-40 animate-pulse rounded-xl border border-gray-200 bg-white" />
                            </div>
                        }
                    >
                        <DashboardStats />
                    </Suspense>
                </section>
            </div>
        </main>
    );
}
