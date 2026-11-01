import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RegisterFormView from "../components/RegisterFormView";

const registerSchema = z
    .object({
        email: z
            .string()
            .min(1, "Vui lòng nhập email")
            .email("Email không đúng định dạng"),

        password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),

        confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu nhập lại không khớp",
        path: ["confirmPassword"],
    });

function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert("Đăng ký thành công!");
    };

    return (
        <RegisterFormView
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
        />
    );
}

export default RegisterForm;
