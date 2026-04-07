'use server'
import { prisma } from "@/lib/prisma";

const DEFAULT_PAGE_SIZE = 5;

export const getTodosListAction = async ({
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
}: {
    page?: number;
    pageSize?: number;
} = {}) => {
    const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
    const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : DEFAULT_PAGE_SIZE;
    const now = new Date();
    const startOfCurrentWeek = new Date(now);
    const dayOfWeek = startOfCurrentWeek.getDay();
    const diffToMonday = (dayOfWeek + 6) % 7;

    startOfCurrentWeek.setHours(0, 0, 0, 0);
    startOfCurrentWeek.setDate(startOfCurrentWeek.getDate() - diffToMonday);

    const startOfPreviousWeek = new Date(startOfCurrentWeek);
    startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - 7);

    const [totalCount, completedCount, createdThisWeek, createdLastWeek] = await Promise.all([
        prisma.todo.count(),
        prisma.todo.count({
            where: {
                completed: true,
            },
        }),
        prisma.todo.count({
            where: {
                createdAt: {
                    gte: startOfCurrentWeek,
                },
            },
        }),
        prisma.todo.count({
            where: {
                createdAt: {
                    gte: startOfPreviousWeek,
                    lt: startOfCurrentWeek,
                },
            },
        }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalCount / safePageSize));
    const currentPage = Math.min(safePage, totalPages);

    const items = await prisma.todo.findMany({
        orderBy: {
            createdAt: "desc",
        },
        skip: (currentPage - 1) * safePageSize,
        take: safePageSize,
    });

    return {
        items,
        currentPage,
        pageSize: safePageSize,
        totalCount,
        totalPages,
        completedCount,
        createdThisWeek,
        createdLastWeek,
    };
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
