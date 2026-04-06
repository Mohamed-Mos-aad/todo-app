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

export const updateTodoListAction = async ()=>{
    
}

export const deleteTodoListAction = async (id: string)=>{
    await prisma.todo.delete({
        where: { id }
    })
    revalidatePath("/");
}
