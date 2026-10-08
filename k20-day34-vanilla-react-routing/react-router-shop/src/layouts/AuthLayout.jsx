import { Outlet } from "react-router";

function AuthLayout() {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-12">
            <div className="mx-auto w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 flex items-center justify-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
                        M
                    </div>

                    <span className="text-lg font-bold text-slate-900">
                        RouterShop
                    </span>
                </div>

                <Outlet />
            </div>
        </main>
    );
}

export default AuthLayout;
