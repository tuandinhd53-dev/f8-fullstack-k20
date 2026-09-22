import { Link } from "react-router";

function Home() {
    return (
        <main className="min-h-screen bg-slate-100 text-slate-950">
            <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-20">

                {/* ==================== HERO ==================== */}
                <header className="grid gap-10 border-b border-slate-300 pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        {/* Eyebrow */}
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />

                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
                                React Practice
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="max-w-3xl text-5xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-6xl">
                            Day 33
                            <span className="mt-2 block text-indigo-600">
                                State, Effects & API
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">
                            Thực hành quản lý state, side effects,
                            gọi API và xây dựng component trong React.
                        </p>
                    </div>

                    {/* Exercise count */}
                    <div className="border-l-2 border-indigo-600 pl-5 lg:min-w-28">
                        <p className="text-4xl font-extrabold tracking-tight text-slate-950">
                            02
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-600">
                            Exercises
                        </p>
                    </div>
                </header>

                {/* ==================== EXERCISES ==================== */}
                <section className="pt-12">

                    {/* Section heading */}
                    <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                            Exercises
                        </p>

                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                            Bài tập thực hành
                        </h2>

                        <p className="mt-1 text-sm text-slate-600">
                            Áp dụng kiến thức React vào các bài toán thực tế.
                        </p>
                    </div>

                    {/* Exercise list */}
                    <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">

                        {/* ==================== BÀI 01 ==================== */}
                        <Link
                            to="/exercises/user-profile"
                            className="group grid gap-6 border-b border-slate-200 px-6 py-8 transition hover:bg-slate-50 lg:grid-cols-[80px_1fr_auto] lg:items-center lg:px-8"
                        >
                            {/* Number */}
                            <span className="text-sm font-bold text-slate-500">
                                01
                            </span>

                            {/* Content */}
                            <div>
                                <h3 className="text-xl font-bold text-slate-950 transition group-hover:text-indigo-600">
                                    User Profile
                                </h3>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                                    Lấy thông tin người dùng từ API và
                                    hiển thị profile với loading, error
                                    và navigation.
                                </p>

                                {/* Tags */}
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                        useState
                                    </span>

                                    <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                        useEffect
                                    </span>

                                    <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                        Fetch API
                                    </span>
                                </div>
                            </div>

                            {/* Arrow */}
                            <span className="text-2xl font-light text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-indigo-600">
                                →
                            </span>
                        </Link>

                        {/* ==================== BÀI 02 ==================== */}
                        <Link
                            to="/exercises/products"
                            className="group grid gap-6 px-6 py-8 transition hover:bg-slate-50 lg:grid-cols-[80px_1fr_auto] lg:items-center lg:px-8"
                        >
                            {/* Number */}
                            <span className="text-sm font-bold text-slate-500">
                                02
                            </span>

                            {/* Content */}
                            <div>
                                <h3 className="text-xl font-bold text-slate-950 transition group-hover:text-indigo-600">
                                    Product Explorer
                                </h3>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                                    Hiển thị sản phẩm từ API, tìm kiếm
                                    dữ liệu và xử lý loading, error.
                                </p>

                                {/* Tags */}
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                        API
                                    </span>

                                    <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                        Search
                                    </span>

                                    <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                        Components
                                    </span>
                                </div>
                            </div>

                            {/* Arrow */}
                            <span className="text-2xl font-light text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-indigo-600">
                                →
                            </span>
                        </Link>
                    </div>
                </section>

            </div>
        </main>
    );
}

export default Home;