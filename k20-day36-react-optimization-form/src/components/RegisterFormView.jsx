function RegisterFormView({
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-600/20">
                        R
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Đăng ký tài khoản
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Điền thông tin bên dưới để tạo tài khoản
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-5"
                >
                    {/* Email */}
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-slate-700"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="example@email.com"
                            autoComplete="email"
                            {...register("email")}
                            aria-invalid={!!errors.email}
                            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                                errors.email
                                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                            }`}
                        />

                        {errors.email && (
                            <p className="text-sm font-medium text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-slate-700"
                        >
                            Mật khẩu
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Ít nhất 8 ký tự"
                            autoComplete="new-password"
                            {...register("password")}
                            aria-invalid={!!errors.password}
                            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                                errors.password
                                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                            }`}
                        />

                        {errors.password && (
                            <p className="text-sm font-medium text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm password */}
                    <div className="space-y-2">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-semibold text-slate-700"
                        >
                            Nhập lại mật khẩu
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            autoComplete="new-password"
                            {...register("confirmPassword")}
                            aria-invalid={!!errors.confirmPassword}
                            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                                errors.confirmPassword
                                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                            }`}
                        />

                        {errors.confirmPassword && (
                            <p className="text-sm font-medium text-red-600">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                Đang xử lý...
                            </span>
                        ) : (
                            "Đăng ký"
                        )}
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-xs leading-5 text-slate-500">
                    Bằng việc đăng ký, bạn đồng ý với các điều khoản sử dụng
                    dịch vụ.
                </p>
            </div>
        </div>
    );
}

export default RegisterFormView;
