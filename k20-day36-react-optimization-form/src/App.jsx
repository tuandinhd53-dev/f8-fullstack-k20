import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import { ProductOptimization } from "./pages/ProductOptimization";

function NotFound() {
    return (
        <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-900">
            {/* HEADER */}
            <header className="border-b border-slate-200/80 bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl text-sky-500">⚛</span>

                        <span className="text-lg font-bold tracking-tight">
                            React Practice
                        </span>

                        <span className="ml-4 hidden text-sm font-medium text-slate-500 sm:block">
                            Buổi 36
                        </span>
                    </div>

                    <div className="flex items-center gap-8">
                        <span className="text-sm font-semibold text-slate-500">
                            K20
                        </span>

                        <span className="text-2xl text-slate-600">☼</span>
                    </div>
                </div>
            </header>

            {/* 404 CONTENT */}
            <main className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl text-blue-600">
                    ⌕
                </div>

                <h1 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-[110px] font-extrabold leading-none tracking-tighter text-transparent sm:text-[140px]">
                    404
                </h1>

                <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                    Không tìm thấy trang
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
                    Rất tiếc! Trang bạn đang tìm kiếm không tồn tại, đã bị xóa
                    hoặc đường dẫn không chính xác.
                </p>

                <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                    ← Quay về trang chủ
                </Link>

                <span className="mt-8 text-xs text-slate-400">
                    React Practice · Page Not Found
                </span>
            </main>

            {/* FOOTER */}
            <footer className="px-5 pb-9 pt-12">
                <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-4">
                    <div className="hidden h-px flex-1 bg-slate-300 sm:block" />

                    <span className="text-xs text-slate-500">⚛ React 19</span>
                    <span className="text-xs text-slate-500">ϟ Vite</span>
                    <span className="text-xs text-slate-500">
                        ≋ Tailwind CSS 4
                    </span>
                    <span className="text-xs text-slate-500">
                        ♧ React Router
                    </span>

                    <div className="hidden h-px flex-1 bg-slate-300 sm:block" />
                </div>
            </footer>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/product-optimization"
                element={<ProductOptimization />}
            />

            {/* Trang 404 cho mọi đường dẫn không tồn tại */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
