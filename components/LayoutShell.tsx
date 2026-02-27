"use client";

import { usePathname } from "next/navigation";

// Server components (NavWrapper, Footer) are passed as props from the root layout
// so they still render on the server while this client component controls visibility.
export default function LayoutShell({
    children,
    nav,
    footer,
}: {
    children: React.ReactNode;
    nav: React.ReactNode;
    footer: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");

    return (
        <>
            {!isAdmin && nav}
            {children}
            {!isAdmin && footer}
        </>
    );
}
