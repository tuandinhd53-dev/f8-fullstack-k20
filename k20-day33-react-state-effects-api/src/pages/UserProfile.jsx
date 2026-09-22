import { useEffect, useState } from "react";
import { Link } from "react-router";

import UserProfileCard from "../components/UserProfileCard";

function UserProfile() {
    const [userId, setUserId] = useState(1);
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchUser() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `https://dummyjson.com/users/${userId}`,
                    {
                        signal: controller.signal,
                    },
                );

                if (!response.ok) {
                    throw new Error("Không thể lấy dữ liệu người dùng");
                }

                const data = await response.json();

                setUser(data);
            } catch (error) {
                if (error.name !== "AbortError") {
                    setError(error.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchUser();

        return () => {
            controller.abort();
        };
    }, [userId]);

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-950 lg:px-8">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <header className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
                    >
                        <span>←</span>
                        Back to exercises
                    </Link>

                    <div className="mt-6">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                            Day 33 · Exercise 01
                        </p>

                        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                            User Profile
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                            Fetch dữ liệu người dùng từ API và xử lý loading,
                            error và state trong React.
                        </p>
                    </div>
                </header>

                {/* User selector */}
                <section className="mb-6 rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-bold text-slate-950">
                                Chọn người dùng
                            </h2>

                            <p className="mt-1 text-sm text-slate-600">
                                Thay đổi ID để gọi lại API.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    setUserId((currentId) =>
                                        Math.max(1, currentId - 1),
                                    )
                                }
                                className="h-10 w-10 rounded-lg border border-slate-300 bg-white font-bold text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600"
                            >
                                −
                            </button>

                            <span className="flex h-10 min-w-12 items-center justify-center rounded-lg bg-slate-100 px-3 text-sm font-bold text-slate-900">
                                #{userId}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setUserId((currentId) => currentId + 1)
                                }
                                className="h-10 w-10 rounded-lg border border-slate-300 bg-white font-bold text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm sm:p-8">
                    {/* Loading */}
                    {loading && (
                        <div className="flex min-h-60 flex-col items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

                            <p className="mt-4 text-sm font-medium text-slate-600">
                                Đang tải thông tin người dùng...
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                            <p className="font-bold text-red-700">
                                Có lỗi xảy ra
                            </p>

                            <p className="mt-1 text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* User */}
                    {!loading && !error && user && (
                        <UserProfileCard user={user} />
                    )}
                </section>
            </div>
        </main>
    );
}

export default UserProfile;
