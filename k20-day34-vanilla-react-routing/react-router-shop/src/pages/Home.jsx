import { Link } from "react-router";

function Home() {
    return (
        <section className="min-h-[calc(100vh-144px)] bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <span className="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
                        F8 Fullstack K20 · Day 34
                    </span>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                        Khám phá sản phẩm
                        <span className="text-indigo-600"> công nghệ</span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                        React Router Shop là website bán hàng demo được xây dựng
                        bằng React, React Router, Vite và Tailwind CSS.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            to="/products"
                            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
                        >
                            Xem sản phẩm
                        </Link>

                        <Link
                            to="/cart"
                            className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Xem giỏ hàng
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
