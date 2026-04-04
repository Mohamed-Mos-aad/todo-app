import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea";
import {Checkbox} from "@/components/ui/checkbox";

export function AddTodoDialog() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Add Todo</DialogTitle>
                        <DialogDescription>
                            Queue new operation
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="title-1">Title</Label>
                            <Input id="title-1" name="title" placeholder="Title"/>
                        </Field>
                        <Field>
                            <Label htmlFor="description-1">Description</Label>
                            <Textarea id="description-1" name="description" placeholder="Provide operational context or requirements..."/>
                        </Field>
                    </FieldGroup>
                    <Field orientation="horizontal">
                        <Checkbox
                            id="terms-checkbox-2"
                            name="terms-checkbox-2"
                            defaultChecked
                        />
                        <Label htmlFor="terms-checkbox-2">Mark as Completed</Label>
                    </Field>
                    <div className="flex justify-end gap-4">
                        <DialogClose asChild>
                            <Button variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save Task</Button>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}
