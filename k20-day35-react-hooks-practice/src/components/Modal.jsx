import { useImperativeHandle, useState } from "react";

function Modal({ ref, onAgree }) {
    const [isOpen, setIsOpen] = useState(false);

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    function handleAgree() {
        onAgree?.();
        close();
    }

    useImperativeHandle(ref, () => ({
        open,
        close,
    }));

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    close();
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="terms-title"
                className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                <header className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                            Demo · Day 35
                        </span>

                        <h2
                            id="terms-title"
                            className="mt-2 text-xl font-bold text-slate-900"
                        >
                            Điều khoản sử dụng
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Nội dung minh họa cho bài thực hành.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={close}
                        aria-label="Đóng Modal"
                        className="flex size-9 items-center justify-center rounded-lg text-2xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        ×
                    </button>
                </header>

                <div className="overflow-y-auto px-6 py-5">
                    <div className="rounded-xl bg-blue-50 p-4">
                        <p className="text-sm font-semibold text-blue-900">
                            Mục đích của bảng điều khoản
                        </p>
                        <p className="mt-1 text-sm leading-6 text-blue-800">
                            Đây không phải điều khoản pháp lý thực tế. Bạn đang
                            thử nghiệm cách mở, đóng và giao tiếp giữa các
                            component trong React.
                        </p>
                    </div>

                    <div className="mt-6 space-y-5">
                        <section>
                            <h3 className="font-semibold text-slate-900">
                                1. Sử dụng nền tảng
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Người dùng sử dụng dịch vụ đúng mục đích và tôn
                                trọng các quy định được công bố.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold text-slate-900">
                                2. Bảo mật tài khoản
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Người dùng có trách nhiệm bảo vệ thông tin đăng
                                nhập và không chia sẻ tài khoản trái phép.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold text-slate-900">
                                3. Xác nhận đồng ý
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Khi nhấn Đồng ý, trang demo sẽ ghi nhận thời
                                điểm bạn chấp nhận để minh họa việc cập nhật
                                state từ component cha.
                            </p>
                        </section>
                    </div>
                </div>

                <footer className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={close}
                        className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        Đóng
                    </button>

                    <button
                        type="button"
                        onClick={handleAgree}
                        className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >
                        Đồng ý điều khoản
                    </button>
                </footer>
            </section>
        </div>
    );
}

export default Modal;
