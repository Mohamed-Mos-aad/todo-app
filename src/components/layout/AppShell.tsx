"use client";

import { usePathname } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavBar from "@/components/navigation/NavBar";
import { SideNavBar } from "@/components/navigation/SideNavBar";

export default function AppShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthRoute =
        pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

    if (isAuthRoute) {
        return <main className="min-h-screen">{children}</main>;
    }

    return (
        <SidebarProvider>
            <SideNavBar />
            <SidebarInset>
                <NavBar />
                <main className="p-4">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
