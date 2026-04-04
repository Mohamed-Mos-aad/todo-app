"use client";


// ** Components
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { AddTodoDialog } from "@/components/AddTodoDialog";
import { LayoutDashboard, CheckSquare, Bell } from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

export function SideNavBar() {
    const pathname = usePathname();
    const isLinkActive = (path: string) => pathname === path;

    return (
        <Sidebar className="border-r border-border bg-sidebar">
            <SidebarHeader className="p-6">
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm">
                        T
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-foreground">
                        TaskFlow
                    </h1>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-4">
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        <Link href="/">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={isLinkActive("/")}
                                    className="w-full justify-start gap-3 px-4 py-6 text-base font-medium transition-all data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                                >
                                    <LayoutDashboard className="size-5" />
                                    <span>Dashboard</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>

                        <Link href="/tasks">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={isLinkActive("/tasks")}
                                    className="w-full justify-start gap-3 px-4 py-6 text-base font-medium transition-all data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                                    >
                                    <CheckSquare className="size-5" />
                                    <span>My Tasks</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>

                        <Link href="/notifications">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={isLinkActive("/notifications")}
                                    className="w-full justify-start gap-3 px-4 py-6 text-base font-medium transition-all data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                                    >
                                    <Bell className="size-5" />
                                    <span>Notifications</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-6 mt-auto">
                {/* border-border بدلاً من slate-100 */}
                <div className="w-full pt-4 border-t border-border/50">
                    <AddTodoDialog />
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}