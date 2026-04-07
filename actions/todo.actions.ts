'use server'
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_PAGE_SIZE = 5;

const getCurrentUserId = async () => {
    const { userId } = await auth();
    return userId;
};

const requireCurrentUserId = async () => {
    const userId = await getCurrentUserId();

    if (!userId) {
        throw new Error("Unauthorized: user is not signed in.");
    }

    return userId;
};

export const getTodosListAction = async ({
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    completed,
}: {
    page?: number;
    pageSize?: number;
    completed?: boolean;
} = {}) => {
    const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
    const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : DEFAULT_PAGE_SIZE;
    const userId = await getCurrentUserId();

    if (!userId) {
        return {
            items: [],
            currentPage: 1,
            pageSize: safePageSize,
            totalCount: 0,
            totalPages: 1,
            completedCount: 0,
            createdThisWeek: 0,
            createdLastWeek: 0,
        };
    }

    const now = new Date();
    const startOfCurrentWeek = new Date(now);
    const dayOfWeek = startOfCurrentWeek.getDay();
    const diffToMonday = (dayOfWeek + 6) % 7;

    startOfCurrentWeek.setHours(0, 0, 0, 0);
    startOfCurrentWeek.setDate(startOfCurrentWeek.getDate() - diffToMonday);

    const startOfPreviousWeek = new Date(startOfCurrentWeek);
    startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - 7);

    const todoWhere = {
        user_id: userId,
        ...(typeof completed === "boolean" ? { completed } : {}),
    };

    const [totalCount, completedCount, createdThisWeek, createdLastWeek] = await Promise.all([
        prisma.todo.count({
            where: todoWhere,
        }),
        prisma.todo.count({
            where: {
                completed: true,
                ...todoWhere,
            },
        }),
        prisma.todo.count({
            where: {
                ...todoWhere,
                createdAt: {
                    gte: startOfCurrentWeek,
                },
            },
        }),
        prisma.todo.count({
            where: {
                ...todoWhere,
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
        where: todoWhere,
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
    const userId = await requireCurrentUserId();

    await prisma.todo.create({
        data:{
            title,
            description,
            completed: completed ?? false,
            user_id: userId,
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
    const userId = await requireCurrentUserId();

    const updated = await prisma.todo.updateMany({
        where: {
            id,
            user_id: userId,
        },
        data: {
            title: data.title,
            description: data.description ?? null,
            completed: data.completed ?? false,
        }
    });

    if (updated.count === 0) {
        throw new Error("Todo not found or access denied.");
    }
}

export const deleteTodoListAction = async (id: string)=>{
    const userId = await requireCurrentUserId();

    const deleted = await prisma.todo.deleteMany({
        where: {
            id,
            user_id: userId,
        },
    });

    if (deleted.count === 0) {
        throw new Error("Todo not found or access denied.");
    }
}
