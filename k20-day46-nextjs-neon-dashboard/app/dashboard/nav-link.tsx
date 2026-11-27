"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavLinkProps = {
    href: string;
    children: ReactNode;
};
export default function NavLink({ href, children }: NavLinkProps) {
    const pathName = usePathname();
    const isActive =
        href === "/dashboard" ? pathName === href : pathName.startsWith(href);

    return (
        <Link
            href={href}
            className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
        >
            {children}
        </Link>
    );
}
