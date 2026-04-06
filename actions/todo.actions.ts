'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getTodosListAction = async ()=>{
    return await prisma.task.findMany();
}

export const createTodoListAction = async ()=>{

}

export const updateTodoListAction = async ()=>{

}

export const deleteTodoListAction = async ()=>{

}