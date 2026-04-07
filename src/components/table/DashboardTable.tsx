'use client'
// ** Hooks && Tools
import { useRouter } from "next/navigation";
import { useState } from "react";
// ** Components
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
// ** Assets
import { Loader2, Trash2 } from "lucide-react";
// ** Actions
import { deleteTodoListAction } from "../../../actions/todo.actions";
import { todoProps } from "@/types";
import { AddTodoDialog } from "../AddTodoDialog";



export function DashboardTable({
    todo,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
}: {
    todo: todoProps[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}) {
    // ** Hooks && Tools
    const router = useRouter();
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);


    // ** Handlers
    const deleteTodoHandler = async (id: string)=>{
        setPendingDeleteId(id);
        try {
            await deleteTodoListAction(id);
            router.refresh();
        } finally {
            setPendingDeleteId(null);
        }
    }


    
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
                    {todo.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                No todos found.
                            </TableCell>
                        </TableRow>
                    ) : todo.map((todo, index) => (
                        <TableRow key={todo.id} className="hover:bg-muted/30 transition-colors border-border">
                            <TableCell className="font-medium text-muted-foreground">{(currentPage - 1) * pageSize + index + 1}</TableCell>
                            <TableCell className="font-semibold text-foreground">{todo.title}</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                                    {todo.completed? 'Completed' : "UnCompleted"}
                                </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{todo.createdAt?.toLocaleDateString()}</TableCell>
                            <TableCell className="text-right px-6">
                                <div className="flex justify-end gap-2">
                                    <AddTodoDialog todo={todo} />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="size-8 text-muted-foreground hover:text-destructive"
                                        onClick={()=>{deleteTodoHandler(todo.id)}}
                                        disabled={pendingDeleteId === todo.id}
                                    >
                                        {pendingDeleteId === todo.id ? (
                                            <Loader2 className="size-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="size-4" />
                                        )}
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 pt-2 border-t border-border/50">
                <p className="text-sm text-nowrap text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalItems)}</span> of <span className="font-medium text-foreground">{totalItems}</span> todos
                </p>
                <PaginationDemo currentPage={currentPage} totalPages={totalPages} />
            </div>
        </div>
    )
}
