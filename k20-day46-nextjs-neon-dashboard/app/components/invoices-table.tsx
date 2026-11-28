import { fetchFilteredInvoices, fetchTotalPages } from "@/app/data";

import Pagination from "./pagination";

type InvoicesPageProps = {
    searchParams: Promise<{
        search?: string;
        page?: string;
    }>;
};

export default async function InvoicesTable({
    searchParams,
}: InvoicesPageProps) {
    const { search, page } = await searchParams;

    const currentPage = Number(page) || 1;
    const query = search || "";

    const [invoices, totalPages] = await Promise.all([
        fetchFilteredInvoices(query, currentPage),
        fetchTotalPages(query),
    ]);

    return (
        <div className="w-full space-y-6">
            {invoices.length === 0 ? (
                <p className="rounded-xl border border-slate-200 bg-white px-5 py-10 text-center text-slate-500">
                    Không tìm thấy hóa đơn nào
                </p>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-5 py-4 font-semibold">ID</th>
                                <th className="px-5 py-4 font-semibold">
                                    Khách hàng
                                </th>
                                <th className="px-5 py-4 font-semibold">
                                    Số tiền
                                </th>
                                <th className="px-5 py-4 font-semibold">
                                    Trạng thái
                                </th>
                                <th className="px-5 py-4 font-semibold">
                                    Ngày
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {invoices.length > 0 ? (
                                invoices.map((invoice) => (
                                    <tr
                                        key={invoice.id}
                                        className="hover:bg-slate-50"
                                    >
                                        <td className="px-5 py-4">
                                            {invoice.id}
                                        </td>

                                        <td className="px-5 py-4 font-medium text-slate-900">
                                            {invoice.name}
                                        </td>

                                        <td className="px-5 py-4">
                                            {invoice.amount.toLocaleString(
                                                "vi-VN",
                                            )}{" "}
                                            ₫
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    invoice.status === "paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                {invoice.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-slate-500">
                                            {new Date(
                                                invoice.date,
                                            ).toLocaleDateString("vi-VN")}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-5 py-10 text-center text-slate-500"
                                    >
                                        Không tìm thấy hóa đơn nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                query={query}
            />
        </div>
    );
}
