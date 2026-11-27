import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Neon Dashboard | Quản lý hóa đơn",
    description:
        "Ứng dụng quản lý hóa đơn và khách hàng được xây dựng bằng Next.js, kết nối cơ sở dữ liệu Neon PostgreSQL.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={`${inter.className} h-full antialiased`}>
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
