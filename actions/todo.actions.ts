'use server'
import { prisma } from "@/lib/prisma";

export const getTodosListAction = async ()=>{
    return await prisma.todo.findMany();
}

export const createTodoListAction = async ({
    title,
    description,
    completed,
}: {
    title: string;
    description?: string;
    completed?: boolean;
})=>{
    await prisma.todo.create({
        data:{
            title,
            description,
            completed: completed ?? false,
        }
    })
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
}

export const deleteTodoListAction = async (id: string)=>{
    await prisma.todo.delete({
        where: { id }
    })
}
