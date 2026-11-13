import { Routes, Route } from "react-router";

// Layouts
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/AuthLayout";
import EmbedLayout from "@/layouts/EmbedLayout";

// Pages
import HomePage from "@/pages/Home/HomePage";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import ForgotPasswordPage from "@/pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/Auth/ResetPasswordPage";
import EmbedPostPage from "@/pages/Embed/EmbedPostPage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";

function AppRouter() {
    return (
        <Routes>
            {/* Main layout */}
            <Route element={<DefaultLayout />}>
                <Route path="/" element={<HomePage />} />
            </Route>

            {/* Authentication layout */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            {/* Embed layout */}
            <Route element={<EmbedLayout />}>
                <Route
                    path="/:username/post/:postId/embed"
                    element={<EmbedPostPage />}
                />
            </Route>

            {/* Not found */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRouter;
