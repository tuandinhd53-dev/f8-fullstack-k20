import { NavLink } from "react-router";
import { useCart } from "../context/CartContext";

function Header() {
    const { cartItems } = useCart();

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    const activeClass = "bg-white text-indigo-600 shadow-sm";

    const inactiveClass =
        "text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm";

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <NavLink to="/" className="group flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-sm transition duration-300 group-hover:scale-105 group-hover:bg-indigo-700">
                        M
                    </span>

                    <div>
                        <span className="block text-lg font-bold tracking-tight text-slate-900">
                            Vanilla Router Shop
                        </span>

                        <span className="hidden text-[11px] font-medium text-slate-400 sm:block">
                            Tech Store
                        </span>
                    </div>
                </NavLink>

                {/* Navigation */}
                <nav className="hidden items-center gap-1 rounded-xl bg-slate-100 p-1 md:flex">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                isActive ? activeClass : inactiveClass
                            }`
                        }
                    >
                        Trang chủ
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                isActive ? activeClass : inactiveClass
                            }`
                        }
                    >
                        Sản phẩm
                    </NavLink>

                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            `rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                isActive ? activeClass : inactiveClass
                            }`
                        }
                    >
                        Giỏ hàng
                    </NavLink>
                </nav>

                {/* Right */}
                <div className="flex items-center gap-2">
                    {/* Cart */}
                    <NavLink
                        to="/cart"
                        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        aria-label="Giỏ hàng"
                    >
                        🛒
                        {cartCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </NavLink>

                    {/* Sign in */}
                    <NavLink
                        to="/sign-in"
                        className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 sm:inline-flex"
                    >
                        Đăng nhập
                    </NavLink>

                    {/* Sign up */}
                    <NavLink
                        to="/sign-up"
                        className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
                    >
                        Đăng ký
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default Header;
