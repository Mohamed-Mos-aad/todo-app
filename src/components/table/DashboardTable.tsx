import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PaginationDemo } from "@/components/PaginationDemo";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

const tasks = [
    {
        id: "#RT-4021",
        title: "Optimize database shard clusters",
        status: "In Progress",
        createdAt: "Oct 24, 2023",
    },
    {
        id: "#RT-3982",
        title: "Deploy v2.4 hotfix for API auth",
        status: "High Priority",
        createdAt: "Oct 23, 2023",
    },
    {
        id: "#RT-3910",
        title: "Weekly system integrity report",
        status: "Completed",
        createdAt: "Oct 21, 2023",
    },
]

export function DashboardTable() {
    return (
        <div className="w-full space-y-4 bg-card p-4 rounded-xl border shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="w-30 font-bold text-foreground">ID</TableHead>
                        <TableHead className="font-bold text-foreground">Title</TableHead>
                        <TableHead className="font-bold text-foreground">Status</TableHead>
                        <TableHead className="font-bold text-foreground">Created At</TableHead>
                        <TableHead className="text-right font-bold px-6 text-foreground">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id} className="hover:bg-muted/30 transition-colors border-border">
                            <TableCell className="font-medium text-muted-foreground">{task.id}</TableCell>
                            <TableCell className="font-semibold text-foreground">{task.title}</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                                    {task.status}
                                </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{task.createdAt}</TableCell>
                            <TableCell className="text-right px-6">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-primary">
                                        <Edit className="size-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive">
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 pt-2 border-t border-border/50">
                <p className="text-sm text-nowrap text-muted-foreground">
                    Showing <span className="font-medium text-foreground">1-3</span> of <span className="font-medium text-foreground">12</span> active tasks
                </p>
                <PaginationDemo />
            </div>
        </div>
    )
}