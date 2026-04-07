import { redirect } from "next/navigation";
import { DashboardTable } from "@/components/table/DashboardTable";
import { getTodosListAction } from "../../../actions/todo.actions";

const PAGE_SIZE = 8;

export default async function TasksPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;
    const requestedPage = Number.parseInt(pageParam ?? "1", 10);
    const page = Number.isNaN(requestedPage) || requestedPage < 1 ? 1 : requestedPage;

    const todosData = await getTodosListAction({
        page,
        pageSize: PAGE_SIZE,
    });

    if (page !== todosData.currentPage) {
        redirect(todosData.currentPage === 1 ? "/tasks" : `/tasks?page=${todosData.currentPage}`);
    }

    return (
        <main className="flex flex-col gap-6 p-6 min-h-screen bg-background">
            <section className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    My Tasks
                </h1>
                <p className="text-sm text-muted-foreground">
                    All your tasks in one place, including completed and unfinished.
                </p>
            </section>

            <DashboardTable
                todo={todosData.items}
                currentPage={todosData.currentPage}
                pageSize={todosData.pageSize}
                totalItems={todosData.totalCount}
                totalPages={todosData.totalPages}
                showPagination
            />
        </main>
    );
}
