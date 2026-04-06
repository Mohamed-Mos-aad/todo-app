'use client'
// ** Hooks && Tools
import { useRouter } from "next/navigation";
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
import { Trash2 } from "lucide-react";
// ** Actions
import { deleteTodoListAction } from "../../../actions/todo.actions";
import { todoProps } from "@/types";
import { AddTodoDialog } from "../AddTodoDialog";



export function DashboardTable({todo}: {todo: todoProps[]}) {
    // ** Hooks && Tools
    const router = useRouter();


    // ** Handlers
    const deleteTodoHandler = async (id: string)=>{
        await deleteTodoListAction(id);
        router.refresh();
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
                    {todo.map((todo, index) => (
                        <TableRow key={todo.id} className="hover:bg-muted/30 transition-colors border-border">
                            <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
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
                                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive" onClick={()=>{deleteTodoHandler(todo.id)}}>
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
                    Showing <span className="font-medium text-foreground">1-3</span> of <span className="font-medium text-foreground">12</span> active todos
                </p>
                <PaginationDemo />
            </div>
        </div>
    )
}