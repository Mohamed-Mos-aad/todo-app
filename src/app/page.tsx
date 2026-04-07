// ** Components
import DashboardCard from "@/components/cards/DashboardCard";
import { DashboardTable } from "@/components/table/DashboardTable";
// ** Assets
import { Gauge, NotebookText, Zap } from "lucide-react";
import { getTodosListAction } from "../../actions/todo.actions";

const DASHBOARD_LIMIT = 5;



export default async function Home() {
    const {
        totalCount,
        completedCount,
        createdThisWeek,
        createdLastWeek,
    } = await getTodosListAction({ page: 1, pageSize: 1 });

    const latestUncompletedTodos = await getTodosListAction({
        page: 1,
        pageSize: DASHBOARD_LIMIT,
        completed: false,
    });


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
                    value={activeTasks.toString()}
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
                    <h2 className="text-lg font-semibold text-foreground">Latest Unfinished Tasks</h2>
                    <p className="text-sm text-muted-foreground">Showing your latest {DASHBOARD_LIMIT} tasks that are still in progress.</p>
                </div>
                <DashboardTable
                    todo={latestUncompletedTodos.items}
                    currentPage={1}
                    pageSize={latestUncompletedTodos.pageSize}
                    totalItems={latestUncompletedTodos.totalCount}
                    totalPages={latestUncompletedTodos.totalPages}
                    showPagination={false}
                    footerMessage={`Showing latest ${latestUncompletedTodos.items.length} unfinished tasks.`}
                />
            </section>

        </main>
    );
}
