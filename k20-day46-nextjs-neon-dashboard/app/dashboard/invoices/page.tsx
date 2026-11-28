import { Suspense } from "react";
import Search from "@/app/components/search";
import InvoicesTable from "@/app/components/invoices-table";

type InvoicesPageProps = {
    searchParams: Promise<{
        search?: string;
        page?: string;
    }>;
};

export default function Page({ searchParams }: InvoicesPageProps) {
    return (
        <div className="w-full space-y-6">
            
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Hóa đơn
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Quản lý danh sách hóa đơn của khách hàng.
                </p>
            </div>

            {/* Thanh tìm kiếm */}
            <Suspense fallback={<p>Đang tải tìm kiếm...</p>}>
                <Search />
            </Suspense>

            {/* Bảng hóa đơn */}
            <Suspense fallback={<p>Đang tải hóa đơn...</p>}>
                <InvoicesTable searchParams={searchParams} />
            </Suspense>
        </div>
    );
}