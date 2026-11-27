import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 text-center">
                <div className="space-y-4">
                    <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                        Next.js + Neon PostgreSQL
                    </span>

                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Quản lý hóa đơn
                        <span className="block text-blue-600">
                            đơn giản và hiệu quả
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-base leading-7 text-gray-500">
                        Theo dõi hóa đơn và quản lý thông tin khách hàng trên
                        một nền tảng tập trung. Dữ liệu được lưu trữ và truy vấn
                        trực tiếp từ Neon PostgreSQL.
                    </p>
                </div>

                <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border bg-gray-100 shadow-lg">
                    <Image
                        src="/img.png"
                        alt="Giao diện quản lý hóa đơn"
                        priority
                        className="object-cover "
                        height={400}
                        width={1000}
                    />
                </div>

                <Link
                    href="/dashboard"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    Truy cập Dashboard
                </Link>

                <div className="flex flex-col items-center gap-3 sm:flex-row">
                    <span className="text-sm text-gray-400">
                        Bài tập Next.js - Day 46
                    </span>
                </div>
            </div>
        </main>
    );
}
