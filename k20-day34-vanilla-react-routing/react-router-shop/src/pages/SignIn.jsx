import { useState } from "react";
import { Link } from "react-router";

function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Vui lòng nhập email.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ.";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Vui lòng nhập mật khẩu.";
        } else if (formData.password.length < 8) {
            newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        alert("Đăng nhập thành công!");
    };

    return (
        <div>
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Đăng nhập
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Đăng nhập vào tài khoản của bạn
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    {errors.email && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Mật khẩu
                        </label>

                        <button
                            type="button"
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                            Quên mật khẩu?
                        </button>
                    </div>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    {errors.password && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Remember */}
                <label className="mt-5 flex cursor-pointer items-center gap-2">
                    <input
                        type="checkbox"
                        name="remember"
                        checked={formData.remember}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />

                    <span className="text-sm text-slate-600">
                        Ghi nhớ đăng nhập
                    </span>
                </label>

                {/* Submit */}
                <button
                    type="submit"
                    className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
                >
                    Đăng nhập
                </button>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Chưa có tài khoản?{" "}
                    <Link
                        to="/sign-up"
                        className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        Đăng ký ngay
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default SignIn;
