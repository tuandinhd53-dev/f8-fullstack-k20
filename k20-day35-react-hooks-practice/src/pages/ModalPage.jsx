import { useRef, useState } from "react";
import Modal from "../components/Modal";

function ModalPage() {
    const modalRef = useRef(null);
    const [acceptedAt, setAcceptedAt] = useState(null);

    function handleAccept() {
        setAcceptedAt(new Date());
    }

    function formatAcceptedTime(date) {
        return new Intl.DateTimeFormat("vi-VN", {
            dateStyle: "long",
            timeStyle: "medium",
        }).format(date);
    }

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-5">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                        R
                    </div>

                    <div>
                        <h1 className="font-bold">React Hooks Practice</h1>
                        <p className="text-xs text-slate-500">
                            Day 35 · Bài tập 3
                        </p>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
                <div className="max-w-3xl">
                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                        BÀI THỰC HÀNH
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                        Custom Modal với useImperativeHandle
                    </h2>

                    <p className="mt-4 leading-7 text-slate-600">
                        Bài tập này giúp bạn hiểu cách component cha điều khiển
                        một component con thông qua ref, trong khi component con
                        tự quản lý trạng thái của chính nó.
                    </p>
                </div>

                <section className="mt-10 grid gap-4 sm:grid-cols-3">
                    <article className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="font-mono text-sm font-bold text-blue-600">
                            01
                        </div>
                        <h3 className="mt-3 font-semibold">useRef</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Tạo ref để component cha tham chiếu đến Modal.
                        </p>
                    </article>

                    <article className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="font-mono text-sm font-bold text-violet-600">
                            02
                        </div>
                        <h3 className="mt-3 font-semibold">
                            useImperativeHandle
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Expose hai phương thức open() và close().
                        </p>
                    </article>

                    <article className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="font-mono text-sm font-bold text-emerald-600">
                            03
                        </div>
                        <h3 className="mt-3 font-semibold">Đóng gói state</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            isOpen được quản lý bên trong Modal, không nằm ở
                            component cha.
                        </p>
                    </article>
                </section>

                <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-lg font-bold">
                                Demo bảng điều khoản
                            </h3>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                                Mở Modal, xem nội dung minh họa và thử chức năng
                                chấp nhận điều khoản.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => modalRef.current?.open()}
                            className="shrink-0 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                        >
                            {acceptedAt
                                ? "Xem lại điều khoản"
                                : "Mở bảng điều khoản"}
                        </button>
                    </div>

                    {acceptedAt && (
                        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="size-5"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="m5 12 4 4L19 6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                            <div>
                                <p className="font-semibold text-emerald-900">
                                    Bạn đã chấp nhận điều khoản demo
                                </p>
                                <p className="mt-1 text-sm leading-6 text-emerald-800">
                                    Thời gian: {formatAcceptedTime(acceptedAt)}
                                </p>
                            </div>
                        </div>
                    )}

                    <p className="mt-5 text-xs leading-5 text-slate-400">
                        Đây là bài thực hành React. Điều khoản và thời gian chấp
                        nhận chỉ có ý nghĩa minh họa.
                    </p>
                </section>
            </div>

            <Modal ref={modalRef} onAgree={handleAccept} />
        </main>
    );
}

export default ModalPage;
