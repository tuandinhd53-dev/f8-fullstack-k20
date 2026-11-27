import { Suspense } from "react";
import { fetchCustomers } from "../../data";

export default function CustomersPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-8">
            {/* Page heading */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Khách hàng
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Quản lý và theo dõi danh sách khách hàng trong hệ thống.
                    </p>
                </div>
            </div>

            {/* Customer table */}
            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-5">
                    <h2 className="font-semibold text-slate-900">
                        Danh sách khách hàng
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Thông tin khách hàng được lưu trong hệ thống.
                    </p>
                </div>

                <Suspense
                    fallback={
                        <p className="p-6 text-sm text-slate-500">
                            Đang tải danh sách khách hàng...
                        </p>
                    }
                >
                    <CustomerList />
                </Suspense>
            </section>
        </div>
    );
}

async function CustomerList() {
    const customers = await fetchCustomers();

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                        <th className="w-20 px-6 py-4 font-semibold">STT</th>
                        <th className="px-6 py-4 font-semibold">
                            Tên khách hàng
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {customers.length > 0 ? (
                        customers.map((customer, index) => (
                            <tr
                                key={`${customer.name}-${index}`}
                                className="transition hover:bg-slate-50"
                            >
                                <td className="px-6 py-4 text-slate-400">
                                    {index + 1}
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-600">
                                            {customer.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <span className="font-medium text-slate-900">
                                            {customer.name}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={2}
                                className="px-6 py-12 text-center text-slate-500"
                            >
                                Chưa có khách hàng nào.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
