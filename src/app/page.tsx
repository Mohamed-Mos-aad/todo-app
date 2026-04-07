// ** Components
import DashboardCard from "@/components/cards/DashboardCard";
import { DashboardTable } from "@/components/table/DashboardTable";
// ** Assets
import { Gauge, NotebookText, Zap } from "lucide-react";
import { redirect } from "next/navigation";
import { getTodosListAction } from "../../actions/todo.actions";

const PAGE_SIZE = 5;



export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;
    const requestedPage = Number.parseInt(pageParam ?? "1", 10);
    const page = Number.isNaN(requestedPage) || requestedPage < 1 ? 1 : requestedPage;

    // ** Data
    const {
        items: todo,
        currentPage,
        pageSize,
        totalCount,
        totalPages,
        completedCount,
        createdThisWeek,
        createdLastWeek,
    } = await getTodosListAction({
        page,
        pageSize: PAGE_SIZE,
    });

    if (page !== currentPage) {
        redirect(currentPage === 1 ? "/" : `/?page=${currentPage}`);
    }


    // ** Handlers
    const calcComplationRateHandler = ()=>{
        const rate = totalCount
            ? ((completedCount / totalCount) * 100).toFixed()
            : 0;

        return rate + "%";
    }

    const activeTasks = totalCount - completedCount;
    const weeklyVelocityState = (() => {
        if (createdThisWeek === 0 && createdLastWeek === 0) {
            return "No activity";
        }

        if (createdLastWeek === 0) {
            return "New momentum";
        }

        const change = ((createdThisWeek - createdLastWeek) / createdLastWeek) * 100;

        if (Math.abs(change) < 1) {
            return "Stable";
        }

        return `${change > 0 ? "+" : ""}${change.toFixed(0)}%`;
    })();



    return (
        <main className="flex flex-col gap-8 p-6 min-h-screen bg-background">
            {/* Header Section */}
            <section className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Overview
                </h1>
                <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                    Welcome back. You have <span className="font-semibold text-primary underline underline-offset-4 decoration-primary/30">{activeTasks} active tasks</span> in your master
                    queue. Focus on high priority items to maintain your velocity.
                </p>
            </section>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    icon={<NotebookText className="size-5" />}
                    state="+12%"
                    title="ACTIVE TASKS"
                    value={totalCount.toString()}
                    key="ACTIVE TASKS"
                />
                <DashboardCard
                    icon={<Gauge className="size-5" />}
                    state="Stable"
                    title="COMPLETION RATE"
                    value={calcComplationRateHandler()}
                    key="Completion Rate"
                />
                <DashboardCard
                    icon={<Zap className="size-5" />}
                    state={weeklyVelocityState}
                    title="WEEKLY VELOCITY"
                    value={createdThisWeek.toString()}
                    key="Weekly Velocity"
                />
            </div>

            {/* Table Section */}
            <section className="mt-4">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Recent Operations</h2>
                    <p className="text-sm text-muted-foreground">Monitor and manage your current task queue.</p>
                </div>
                <DashboardTable
                    todo={todo}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalItems={totalCount}
                    totalPages={totalPages}
                />
            </section>

        </main>
    );
}
