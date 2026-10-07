export const SignUp = () => {
    return `
        <div>
            <div class="mb-6 text-center">
                <h1 class="text-2xl font-bold tracking-tight text-slate-900">
                    Tạo tài khoản
                </h1>

                <p class="mt-2 text-sm text-slate-500">
                    Tạo tài khoản mới tại MyShop
                </p>
            </div>

            <form
                data-auth-form="sign-up"
                novalidate
                class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >

                <!-- Full name -->
                <div>
                    <label
                        for="name"
                        class="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Họ và tên
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    <p
                        data-error="name"
                        class="mt-1 hidden text-xs font-medium text-red-500"
                    ></p>
                </div>

                <!-- Email -->
                <div class="mt-5">
                    <label
                        for="email"
                        class="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    <p
                        data-error="email"
                        class="mt-1 hidden text-xs font-medium text-red-500"
                    ></p>
                </div>

                <!-- Password -->
                <div class="mt-5">
                    <label
                        for="password"
                        class="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Mật khẩu
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Tối thiểu 8 ký tự"
                        class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    <p
                        data-error="password"
                        class="mt-1 hidden text-xs font-medium text-red-500"
                    ></p>
                </div>

                <!-- Confirm password -->
                <div class="mt-5">
                    <label
                        for="confirm-password"
                        class="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Xác nhận mật khẩu
                    </label>

                    <input
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    <p
                        data-error="confirmPassword"
                        class="mt-1 hidden text-xs font-medium text-red-500"
                    ></p>
                </div>

                <!-- Terms -->
                <div class="mt-5">
                    <label class="flex items-start gap-2">
                        <input
                            type="checkbox"
                            name="terms"
                            id="terms"
                            class="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />

                        <span class="text-xs leading-5 text-slate-500">
                            Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật của MyShop.
                        </span>
                    </label>

                    <p
                        data-error="terms"
                        class="mt-1 hidden text-xs font-medium text-red-500"
                    ></p>
                </div>

                <!-- Submit -->
                <button
                    type="submit"
                    class="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
                >
                    Tạo tài khoản
                </button>

                <p class="mt-6 text-center text-sm text-slate-500">
                    Đã có tài khoản?
                    <a
                        href="/sign-in"
                        class="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        Đăng nhập
                    </a>
                </p>

            </form>
        </div>
    `;
};
