import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-900">
            {/* HEADER */}
            <header className="border-b border-slate-200/80 bg-white/90">
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

                    <div className="flex items-center gap-7">
                        <span className="text-sm font-semibold text-slate-500">
                            K20
                        </span>
                    </div>
                </div>
            </header>

            {/* MAIN */}
            <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-12 pt-12 sm:px-8">
                {/* HERO */}
                <section className="mb-11 text-center">
                    {/* Badge */}
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600">
                        <span>▣</span>
                        K20 · Day 36
                    </div>

                    {/* Title */}
                    <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                        React Optimization{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                            Practice
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                        Thực hành tối ưu hiệu năng React với useMemo, xử lý dữ
                        liệu 1.000 sản phẩm và xây dựng form đăng ký với React
                        Hook Form kết hợp Zod.
                    </p>
                </section>

                {/* EXERCISE LIST */}
                <section className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
                    {/* ================================= */}
                    {/* BÀI 1 */}
                    {/* ================================= */}

                    <article className="flex flex-col rounded-2xl border border-white bg-white p-6 shadow-[0_8px_35px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(15,23,42,0.09)]">
                        {/* Card Header */}
                        <div className="mb-4 flex items-center gap-5">
                            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-3xl text-blue-600">
                                ☷
                            </div>

                            <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    BÀI 1
                                </span>

                                <h2 className="mt-1 text-lg font-bold leading-snug tracking-tight text-slate-900">
                                    Tối ưu bộ lọc 1.000 sản phẩm
                                </h2>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="mb-5 text-sm leading-6 text-slate-500">
                            Xây dựng chức năng tìm kiếm theo tên, lọc sản phẩm
                            theo danh mục và sắp xếp giá. Sử dụng useMemo để tối
                            ưu hiệu năng xử lý dữ liệu lớn và hạn chế tính toán
                            không cần thiết khi component render lại.
                        </p>

                        {/* Skills */}
                        <div className="mb-4 min-h-[124px] flex-1 rounded-xl bg-slate-50 p-4">
                            <div className="mb-3 flex items-center gap-2">
                                <span className="text-xl text-slate-600">
                                    ◎
                                </span>

                                <span className="text-sm font-semibold text-slate-700">
                                    Kỹ năng đạt được
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {[
                                    "useMemo",
                                    "useState",
                                    "filter",
                                    "sort",
                                    "Dependency Array",
                                    "Performance",
                                ].map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Button */}
                        <Link
                            to="product-optimization"
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-700"
                        >
                            Làm bài 1<span>→</span>
                        </Link>
                    </article>

                    {/* ================================= */}
                    {/* BÀI 2 */}
                    {/* ================================= */}

                    <article className="flex flex-col rounded-2xl border border-white bg-white p-6 shadow-[0_8px_35px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(15,23,42,0.09)]">
                        {/* Card Header */}
                        <div className="mb-4 flex items-center gap-5">
                            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-3xl text-purple-700">
                                ▤
                            </div>

                            <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    BÀI 2
                                </span>

                                <h2 className="mt-1 text-lg font-bold leading-snug tracking-tight text-slate-900">
                                    Form Đăng Ký Tài Khoản
                                </h2>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="mb-5 text-sm leading-6 text-slate-500">
                            Xây dựng form đăng ký tài khoản với React Hook Form
                            và Zod. Kiểm tra email, mật khẩu, xác nhận mật khẩu
                            và xử lý submit bất đồng bộ với async/await, mô
                            phỏng quá trình gửi dữ liệu lên API.
                        </p>

                        {/* Skills */}
                        <div className="mb-4 min-h-[124px] flex-1 rounded-xl bg-indigo-50/60 p-4">
                            <div className="mb-3 flex items-center gap-2">
                                <span className="text-xl text-purple-600">
                                    ◎
                                </span>

                                <span className="text-sm font-semibold text-slate-700">
                                    Kỹ năng đạt được
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {[
                                    "React Hook Form",
                                    "Zod",
                                    "zodResolver",
                                    "Validation",
                                    "async/await",
                                    "Form State",
                                ].map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-indigo-600"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Button */}
                        <Link
                            to="/bai-2"
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700"
                        >
                            Làm bài 2<span>→</span>
                        </Link>
                    </article>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="px-5 pb-9 pt-12">
                <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-4">
                    <div className="hidden h-px flex-1 bg-slate-300 sm:block" />

                    <span className="text-xs font-medium text-slate-500">
                        ⚛ React 19
                    </span>

                    <span className="text-xs font-medium text-slate-500">
                        ϟ Vite
                    </span>

                    <span className="text-xs font-medium text-slate-500">
                        ≋ Tailwind CSS 4
                    </span>

                    <span className="text-xs font-medium text-slate-500">
                        ♧ React Router
                    </span>

                    <div className="hidden h-px flex-1 bg-slate-300 sm:block" />
                </div>
            </footer>
        </div>
    );
}

export default Home;
