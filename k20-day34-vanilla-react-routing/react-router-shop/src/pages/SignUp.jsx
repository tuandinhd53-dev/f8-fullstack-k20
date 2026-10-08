import { useState } from "react";
import { Link } from "react-router";

function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
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

        if (!formData.name.trim()) {
            newErrors.name = "Vui lòng nhập họ và tên.";
        }

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

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
        }

        if (!formData.terms) {
            newErrors.terms = "Vui lòng đồng ý với điều khoản.";
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

        alert("Đăng ký thành công!");
    };

    return (
        <div>
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Tạo tài khoản
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Tạo tài khoản mới tại MyShop
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
                {/* Full name */}
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Họ và tên
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nguyễn Văn A"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    {errors.name && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="mt-5">
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
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Mật khẩu
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Tối thiểu 8 ký tự"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    {errors.password && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm password */}
                <div className="mt-5">
                    <label
                        htmlFor="confirm-password"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Xác nhận mật khẩu
                    </label>

                    <input
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Nhập lại mật khẩu"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                    {errors.confirmPassword && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {/* Terms */}
                <div className="mt-5">
                    <label className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            name="terms"
                            id="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />

                        <span className="text-xs leading-5 text-slate-500">
                            Tôi đồng ý với điều khoản sử dụng và chính sách bảo
                            mật của MyShop.
                        </span>
                    </label>

                    {errors.terms && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                            {errors.terms}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
                >
                    Tạo tài khoản
                </button>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Đã có tài khoản?{" "}
                    <Link
                        to="/sign-in"
                        className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        Đăng nhập
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
