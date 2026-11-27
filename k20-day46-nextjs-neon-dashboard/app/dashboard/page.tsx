import { Suspense } from "react";
import { fetchLatestInvoices } from "../data";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="mt-2 text-slate-500">
                    Tổng quan hóa đơn và khách hàng.
                </p>
            </div>

            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-5">
                    <h2 className="font-semibold text-slate-900">
                        Hóa đơn gần đây
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        5 hóa đơn mới nhất trong hệ thống.
                    </p>
                </div>

                <Suspense
                    fallback={
                        <p className="text-sm text-slate-500">
                            Đang tải 5 hóa đơn mới nhất...
                        </p>
                    }
                >
                    <LatestInvoices />
                </Suspense>
            </section>
        </div>
    );
}

async function LatestInvoices() {
    const latestInvoices = await fetchLatestInvoices();

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs text-slate-500">
                    <tr>
                        <th className="px-6 py-4">Mã hóa đơn</th>
                        <th className="px-6 py-4">Khách hàng</th>
                        <th className="px-6 py-4">Số tiền</th>
                        <th className="px-6 py-4">Trạng thái</th>
                        <th className="px-6 py-4">Ngày tạo</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {latestInvoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td className="px-6 py-4 font-medium">
                                #{invoice.id}
                            </td>
                            <td className="px-6 py-4">{invoice.name}</td>
                            <td className="px-6 py-4">{invoice.amount}</td>
                            <td className="px-6 py-4">{invoice.status}</td>
                            <td className="px-6 py-4">
                                {new Date(invoice.date).toLocaleDateString(
                                    "vi-VN",
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
