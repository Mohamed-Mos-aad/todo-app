'use server'
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getTodosListAction = async ()=>{
    return await prisma.todo.findMany();
}

export const createTodoListAction = async ({title,description}:{title: string; description?: string})=>{
    await prisma.todo.create({
        data:{
            title,
            description,
        }
    })
    revalidatePath("/");
}

export const updateTodoListAction = async (
    id: string,
    data: {
        title: string;
        description?: string;
        completed?: boolean;
    }
)=>{
    await prisma.todo.update({
        where: { id },
        data: {
            title: data.title,
            description: data.description ?? null,
            completed: data.completed ?? false,
        }
    })
    revalidatePath("/");
}

export const deleteTodoListAction = async (id: string)=>{
    await prisma.todo.delete({
        where: { id }
    })
    revalidatePath("/");
}
