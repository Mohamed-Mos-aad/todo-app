"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}) {
    useEffect(() => {
        console.error("Route error captured.", { digest: error.digest });
    }, [error.digest]);

    return (
        <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
            <p className="max-w-md text-sm text-muted-foreground">
                We could not complete your request right now. Please try again.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
                <Button onClick={() => unstable_retry()}>Try again</Button>
                <Button asChild variant="outline">
                    <Link href="/">Back to dashboard</Link>
                </Button>
            </div>
        </main>
    );
}
