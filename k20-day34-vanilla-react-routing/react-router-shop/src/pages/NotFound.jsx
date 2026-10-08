import { Link } from "react-router";

function NotFound() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
            <div className="text-center">
                <p className="text-7xl font-bold text-indigo-600">404</p>

                <h1 className="mt-4 text-2xl font-bold text-slate-900">
                    Không tìm thấy trang
                </h1>

                <p className="mt-2 text-slate-500">
                    Trang bạn đang tìm kiếm không tồn tại.
                </p>

                <Link
                    to="/"
                    className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                    Về trang chủ
                </Link>
            </div>
        </main>
    );
}

export default NotFound;
