// ** Components
import DashboardCard from "@/components/cards/DashboardCard";
import { DashboardTable } from "@/components/table/DashboardTable";
// ** Assets
import { Gauge, NotebookText, Zap } from "lucide-react";
import { getTodosListAction } from "../../actions/todo.actions";

export const dynamic = "force-dynamic";



export default async function Home() {
    // ** Data
    const todo = await getTodosListAction()



    return (
        <main className="flex flex-col gap-8 p-6 min-h-screen bg-background">
            {/* Header Section */}
            <section className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Overview
                </h1>
                <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                    Welcome back. You have <span className="font-semibold text-primary underline underline-offset-4 decoration-primary/30">12 active tasks</span> in your master
                    queue. Focus on high priority items to maintain your velocity.
                </p>
            </section>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    icon={<NotebookText className="size-5" />}
                    state="+12%"
                    title="ACTIVE TASKS"
                    value="12"
                    key="ACTIVE TASKS"
                />
                <DashboardCard
                    icon={<Gauge className="size-5" />}
                    state="Stable"
                    title="COMPLETION RATE"
                    value="94.2%"
                    key="Completion Rate"
                />
                <DashboardCard
                    icon={<Zap className="size-5" />}
                    state="Focus"
                    title="WEEKLY VELOCITY"
                    value="48"
                    key="Weekly Velocity"
                />
            </div>

            {/* Table Section */}
            <section className="mt-4">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Recent Operations</h2>
                    <p className="text-sm text-muted-foreground">Monitor and manage your current task queue.</p>
                </div>
                <DashboardTable todo={todo}/>
            </section>

        </main>
    );
}
