import Link from "next/link";
import DashboardNav from "./DashboardNav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                            P
                        </div>

                        <div>
                            <p className="text-base font-bold tracking-tight text-gray-900">
                                Product Dashboard
                            </p>
                            <p className="text-xs text-gray-400">
                                Management System
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/"
                        className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        ← Trang chủ
                    </Link>
                </div>
            </header>

            {/* Navigation */}
            {/* Navigation */}
            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-6xl px-6">
                    <DashboardNav />
                </div>
            </div>

            {/* Main content */}
            <main className="mx-auto min-h-[calc(100vh-121px)] max-w-6xl px-6 py-8 sm:py-10">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-gray-400">
                    Product Dashboard · F8 Fullstack K20
                </div>
            </footer>
        </div>
    );
}
