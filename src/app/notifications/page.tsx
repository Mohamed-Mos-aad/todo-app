import Link from "next/link";
import { Bell, CheckCheck, Clock3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTodosListAction } from "../../../actions/todo.actions";

export default async function NotificationsPage() {
    const [overview, recentCompleted, recentPending] = await Promise.all([
        getTodosListAction({ page: 1, pageSize: 1 }),
        getTodosListAction({ page: 1, pageSize: 5, completed: true }),
        getTodosListAction({ page: 1, pageSize: 5, completed: false }),
    ]);

    const pendingCount = overview.totalCount - overview.completedCount;
    const hasAnyTodos = overview.totalCount > 0;

    return (
        <main className="flex flex-col gap-6 p-6 min-h-screen bg-background">
            <section className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Notifications
                </h1>
                <p className="text-sm text-muted-foreground">
                    Quick daily digest about your task flow.
                </p>
            </section>

            {!hasAnyTodos ? (
                <section className="rounded-xl border bg-card p-6 text-center space-y-3">
                    <div className="mx-auto grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
                        <Sparkles className="size-5" />
                    </div>
                    <h2 className="text-lg font-semibold">No notifications yet</h2>
                    <p className="text-sm text-muted-foreground">
                        Start by creating a task and we will keep this page updated with useful insights.
                    </p>
                    <Button asChild>
                        <Link href="/tasks">Go to tasks</Link>
                    </Button>
                </section>
            ) : (
                <>
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <article className="rounded-xl border bg-card p-4 space-y-2">
                            <div className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Bell className="size-4" />
                            </div>
                            <h3 className="font-semibold">Pending Attention</h3>
                            <p className="text-2xl font-bold">{pendingCount}</p>
                            <p className="text-sm text-muted-foreground">
                                Tasks still waiting for completion.
                            </p>
                        </article>

                        <article className="rounded-xl border bg-card p-4 space-y-2">
                            <div className="inline-flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                                <CheckCheck className="size-4" />
                            </div>
                            <h3 className="font-semibold">Completed</h3>
                            <p className="text-2xl font-bold">{overview.completedCount}</p>
                            <p className="text-sm text-muted-foreground">
                                Great progress so far.
                            </p>
                        </article>

                        <article className="rounded-xl border bg-card p-4 space-y-2">
                            <div className="inline-flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                                <Clock3 className="size-4" />
                            </div>
                            <h3 className="font-semibold">Created This Week</h3>
                            <p className="text-2xl font-bold">{overview.createdThisWeek}</p>
                            <p className="text-sm text-muted-foreground">
                                Keep your momentum going.
                            </p>
                        </article>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <article className="rounded-xl border bg-card p-4">
                            <h3 className="font-semibold mb-3">Recently Completed</h3>
                            {recentCompleted.items.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No completed tasks yet.</p>
                            ) : (
                                <ul className="space-y-2">
                                    {recentCompleted.items.map((todo) => (
                                        <li
                                            key={todo.id}
                                            className="rounded-md border px-3 py-2 text-sm text-muted-foreground"
                                        >
                                            <span className="font-medium text-foreground">{todo.title}</span>
                                            <span className="block text-xs">
                                                {todo.createdAt?.toLocaleDateString()}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </article>

                        <article className="rounded-xl border bg-card p-4">
                            <h3 className="font-semibold mb-3">Current Focus</h3>
                            {recentPending.items.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    You are all caught up. No pending tasks right now.
                                </p>
                            ) : (
                                <ul className="space-y-2">
                                    {recentPending.items.map((todo) => (
                                        <li
                                            key={todo.id}
                                            className="rounded-md border px-3 py-2 text-sm text-muted-foreground"
                                        >
                                            <span className="font-medium text-foreground">{todo.title}</span>
                                            <span className="block text-xs">
                                                Added {todo.createdAt?.toLocaleDateString()}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </article>
                    </section>
                </>
            )}
        </main>
    );
}
