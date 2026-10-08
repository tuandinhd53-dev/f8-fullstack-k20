import { NavLink } from "react-router";

function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Main */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {/* Brand */}
                    <div>
                        <NavLink
                            to="/"
                            className="inline-flex items-center gap-3"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
                                M
                            </span>

                            <span className="text-xl font-bold text-white">
                                React Router Shop
                            </span>
                        </NavLink>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
                            Website bán hàng demo được xây dựng trong quá trình
                            học F8 Fullstack K20, tập trung vào React và React
                            Router.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            <span className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-400">
                                F8 Fullstack K20
                            </span>

                            <span className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-400">
                                Day 34
                            </span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Điều hướng
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">
                            <li>
                                <NavLink
                                    to="/"
                                    end
                                    className="inline-flex transition hover:translate-x-1 hover:text-white"
                                >
                                    Trang chủ
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/products"
                                    className="inline-flex transition hover:translate-x-1 hover:text-white"
                                >
                                    Sản phẩm
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/cart"
                                    className="inline-flex transition hover:translate-x-1 hover:text-white"
                                >
                                    Giỏ hàng
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Công nghệ
                        </h3>

                        <div className="mt-5 grid grid-cols-2 gap-2">
                            <span className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-center text-xs font-medium text-slate-400">
                                React
                            </span>

                            <span className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-center text-xs font-medium text-slate-400">
                                Vite
                            </span>

                            <span className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-center text-xs font-medium text-slate-400">
                                Tailwind CSS
                            </span>

                            <span className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-center text-xs font-medium text-slate-400">
                                React Router
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-slate-500">
                        © 2026 React Router Shop · F8 Fullstack K20
                    </p>

                    <p className="text-slate-500">
                        Built with React & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
