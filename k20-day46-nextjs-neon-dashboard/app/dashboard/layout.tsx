import type { ReactNode } from "react";
import NavLink from "../components/nav-link";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <aside className="w-64 shrink-0 border-r border-slate-200 bg-white p-6">
                <Link
                    href="/"
                    className="mb-8 block text-xl font-bold text-slate-900 hover:text-blue-600"
                >
                    Neon Dashboard
                </Link>

                <nav className="flex flex-col gap-2">
                    <NavLink href="/dashboard">Dashboard</NavLink>

                    <NavLink href="/dashboard/invoices">Invoices</NavLink>

                    <NavLink href="/dashboard/customers">Customers</NavLink>
                </nav>
            </aside>

            <main className="min-w-0 flex-1 p-8">{children}</main>
        </div>
    );
}
