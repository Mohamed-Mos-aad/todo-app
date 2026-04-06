"use client";
// ** Hooks 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
// ** Components
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
// ** Assets
import { Edit, Loader2, Plus } from "lucide-react";
import { createTodoListAction, updateTodoListAction } from "../../actions/todo.actions";
import { useRouter } from "next/navigation";
// ** Interfaces
import { todoProps } from "@/types";



export function AddTodoDialog({todo}: {todo?: todoProps}) {
    // ** Hooks && Tools
    const router = useRouter();
    const isEditMode = Boolean(todo);
    const [open, setOpen] = useState(false);

    const todoFormSchema = z.object({
        title: z
        .string()
        .min(4, "Title length min 4")
        .max(160, "Title length max 160"),
        description: z
        .string()
        .max(1000, "Description length max 1000")
        .optional(),
        completed: z.boolean().optional(),
    });

    type TodoFormValues = z.infer<typeof todoFormSchema>;

    const form = useForm<TodoFormValues>({
        resolver: zodResolver(todoFormSchema),
        defaultValues: {
            title: todo?.title ?? "",
            description: todo?.description ?? "",
            completed: todo?.completed ?? false,
        },
    });

    const { isSubmitting } = form.formState;

    useEffect(() => {
        if (!open) return;

        form.reset({
            title: todo?.title ?? "",
            description: todo?.description ?? "",
            completed: todo?.completed ?? false,
        });
    }, [form, open, todo]);

    const onSubmit = async (data: TodoFormValues) => {
        if (isEditMode && todo) {
            await updateTodoListAction(todo.id, {
                title: data.title,
                description: data.description || "",
                completed: data.completed ?? false,
            })
        } else {
            await createTodoListAction({
                title: data.title,
                description: data.description,
                completed: data.completed ?? false,
            })
        }
        setOpen(false);
        router.refresh();
    };



    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {
                isEditMode ? 
                <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-primary" disabled={isSubmitting}>
                    <Edit className="size-4" />
                </Button>
                :
                <Button className="w-full font-semibold shadow-sm gap-2" disabled={isSubmitting}>
                    <Plus className="size-4" />
                    New Task
                </Button>
            }
        </DialogTrigger>

        <DialogContent className="sm:max-w-105 p-0 overflow-hidden bg-card border-border">
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-6">
                <DialogHeader>
                <DialogTitle className="text-xl font-bold text-foreground">
                    {isEditMode ? "Edit Task" : "Add New Task"}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                    Fill in the details below to queue a new operation.
                </DialogDescription>
                </DialogHeader>

                <div className="grid gap-5 py-6">
                {/* Title */}
                <div className="grid gap-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                    id="title"
                    {...form.register("title")}
                    placeholder="e.g., Database Migration"
                    disabled={isSubmitting}
                    />
                    {form.formState.errors.title && (
                    <p className="text-red-500 text-xs">
                        {form.formState.errors.title.message}
                    </p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                    id="description"
                    {...form.register("description")}
                    placeholder="Provide operational context..."
                    disabled={isSubmitting}
                    />
                </div>
                <div className="flex items-center space-x-3 rounded-lg border p-3">
                    <Checkbox
                    checked={form.watch("completed")}
                    disabled={isSubmitting}
                    onCheckedChange={(val) =>
                        form.setValue("completed", !!val)
                    }
                    />
                    <Label>Mark as Completed</Label>
                </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                <DialogClose asChild>
                    <Button variant="ghost" type="button" disabled={isSubmitting}>
                    Cancel
                    </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                    {isSubmitting ? (isEditMode ? "Updating..." : "Saving...") : (isEditMode ? "Update Task" : "Save Task")}
                </Button>
                </div>
            </div>
            </form>
        </DialogContent>
        </Dialog>
    );
}
