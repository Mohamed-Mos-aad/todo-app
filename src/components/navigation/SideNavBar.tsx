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

export function SideNavBar() {
    return (
        // استخدمنا border-border بدلاً من slate-200
        <Sidebar className="border-r border-border bg-sidebar">
            <SidebarHeader className="p-6">
                <div className="flex items-center gap-3">
                    {/* Logo Placeholder */}
                    <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm">
                        T
                    </div>
                    {/* text-foreground عشان يقلب أبيض في الدارك مود */}
                    <h1 className="text-xl font-bold tracking-tight text-foreground">
                        TaskFlow
                    </h1>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-4">
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                isActive
                                className="w-full justify-start gap-3 px-4 py-6 text-base font-medium transition-all data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                            >
                                <LayoutDashboard className="size-5" />
                                <span>Dashboard</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            {/* hover:text-foreground و hover:bg-muted بتخلي التفاعل أنعم في الدارك مود */}
                            <SidebarMenuButton className="w-full justify-start gap-3 px-4 py-6 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all">
                                <CheckSquare className="size-5" />
                                <span>My Tasks</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton className="w-full justify-start gap-3 px-4 py-6 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all">
                                <Bell className="size-5" />
                                <span>Notifications</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
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