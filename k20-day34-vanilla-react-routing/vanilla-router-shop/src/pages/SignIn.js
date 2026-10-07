export const SignIn = () => {
    return `
        <div>
            <div class="mb-6 text-center">
                <h1 class="text-2xl font-bold tracking-tight text-slate-900">
                    Đăng nhập
                </h1>

                <p class="mt-2 text-sm text-slate-500">
                    Đăng nhập vào tài khoản của bạn
                </p>
            </div>

            <form
                data-auth-form="sign-in"
                novalidate
                class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >

                <!-- Email -->
                <div>
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
                    <div class="mb-2 flex items-center justify-between">
                        <label
                            for="password"
                            class="text-sm font-semibold text-slate-700"
                        >
                            Mật khẩu
                        </label>

                        <a
                            href="#"
                            class="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                            Quên mật khẩu?
                        </a>
                    </div>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    <p
                        data-error="password"
                        class="mt-1 hidden text-xs font-medium text-red-500"
                    ></p>
                </div>

                <!-- Remember -->
                <label class="mt-5 flex cursor-pointer items-center gap-2">
                    <input
                        type="checkbox"
                        class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />

                    <span class="text-sm text-slate-600">
                        Ghi nhớ đăng nhập
                    </span>
                </label>

                <!-- Submit -->
                <button
                    type="submit"
                    class="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
                >
                    Đăng nhập
                </button>

                <p class="mt-6 text-center text-sm text-slate-500">
                    Chưa có tài khoản?
                    <a
                        href="/sign-up"
                        class="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        Đăng ký ngay
                    </a>
                </p>

            </form>
        </div>
    `;
};
