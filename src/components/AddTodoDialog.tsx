"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus } from "lucide-react";

export function AddTodoDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full font-semibold shadow-sm gap-2">
                    <Plus className="size-4" />
                    New Task
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-106.25 p-0 overflow-hidden bg-card border-border">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="p-6">
                        <DialogHeader>
                            {/* استخدمنا text-foreground عشان يقلب أبيض في الدارك */}
                            <DialogTitle className="text-xl font-bold text-foreground">
                                Add New Task
                            </DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground">
                                Fill in the details below to queue a new operation.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-5 py-6">
                            {/* Title Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="title" className="text-sm font-semibold text-foreground/80">
                                    Task Title
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Database Migration"
                                    className="bg-background border-border focus-visible:ring-primary"
                                />
                            </div>

                            {/* Description Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="description" className="text-sm font-semibold text-foreground/80">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Provide operational context or requirements..."
                                    className="min-h-[100px] resize-none bg-background border-border focus-visible:ring-primary"
                                />
                            </div>

                            {/* Status Checkbox - ستايل متوافق مع الدارك مود */}
                            <div className="flex items-center space-x-3 rounded-lg border border-border p-3 bg-muted/30">
                                <Checkbox id="completed" className="border-primary data-[state=checked]:bg-primary" />
                                <div className="grid gap-1.5 leading-none">
                                    <Label
                                        htmlFor="completed"
                                        className="text-sm font-medium cursor-pointer text-foreground"
                                    >
                                        Mark as Completed
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        Check this if the task is already finished.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions Footer */}
                        <div className="flex justify-end gap-3 pt-2">
                            <DialogClose asChild>
                                <Button variant="ghost" type="button" className="text-muted-foreground hover:text-foreground">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" className="px-6">
                                Save Task
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}