import Link from "next/link";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-gray-50 text-gray-900">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6">
                {/* Header */}
                <header className="flex h-20 items-center justify-between border-b border-gray-200">
                    <Link href="/" className="text-lg font-bold">
                        Product Dashboard
                    </Link>

                    <Link
                        href="/dashboard"
                        className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                    >
                        Dashboard →
                    </Link>
                </header>

                {/* Main content */}
                <section className="flex flex-1 flex-col justify-center py-16">
                    <span className="text-sm font-medium text-blue-600">
                        PRODUCT MANAGEMENT
                    </span>

                    <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                        Quản lý sản phẩm
                        <span className="block text-blue-600">
                            dễ dàng và hiệu quả.
                        </span>
                    </h1>

                    <p className="mt-5 max-w-xl leading-7 text-gray-500">
                        Theo dõi thống kê, quản lý danh sách và xem thông tin
                        chi tiết sản phẩm trong một giao diện đơn giản.
                    </p>

                    <div className="mt-8">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Truy cập Dashboard
                            <span className="ml-2">→</span>
                        </Link>
                    </div>

                    {/* Features */}
                    <div className="mt-16 grid gap-5 sm:grid-cols-3">
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <p className="text-sm font-medium text-blue-600">
                                01
                            </p>
                            <h2 className="mt-4 font-semibold">
                                Thống kê sản phẩm
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Theo dõi tổng số lượng và giá trung bình.
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <p className="text-sm font-medium text-blue-600">
                                02
                            </p>
                            <h2 className="mt-4 font-semibold">
                                Danh sách sản phẩm
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Xem và tra cứu dữ liệu sản phẩm.
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <p className="text-sm font-medium text-blue-600">
                                03
                            </p>
                            <h2 className="mt-4 font-semibold">
                                Chi tiết sản phẩm
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Xem thông tin cụ thể của từng sản phẩm.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
                    Product Dashboard · Built with Next.js
                </footer>
            </div>
        </main>
    );
}
