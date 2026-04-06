import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getTodosListAction } from "../../actions/todo.actions"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
