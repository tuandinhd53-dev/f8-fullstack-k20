export const NotFound = () => {
    return `
        <section class="flex min-h-[70vh] items-center justify-center px-4 py-16">
            <div class="text-center">
                <p class="text-7xl font-black tracking-tight text-indigo-600">
                    404
                </p>

                <h1 class="mt-4 text-2xl font-bold text-slate-900">
                    Không tìm thấy trang
                </h1>

                <p class="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                    Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
                </p>

                <a
                    href="/"
                    class="mt-8 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                    Về trang chủ
                </a>
            </div>
        </section>
    `;
};
