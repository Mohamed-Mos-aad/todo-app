"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}) {
    useEffect(() => {
        console.error("Global app error captured.", { digest: error.digest });
    }, [error.digest]);

    return (
        <html lang="en">
            <body
                style={{
                    margin: 0,
                    minHeight: "100vh",
                    display: "grid",
                    placeItems: "center",
                    background: "#0f172a",
                    color: "#f8fafc",
                    fontFamily: "ui-sans-serif, system-ui, sans-serif",
                    padding: "24px",
                }}
            >
                <main
                    style={{
                        maxWidth: 520,
                        width: "100%",
                        textAlign: "center",
                        border: "1px solid rgba(148,163,184,0.35)",
                        borderRadius: 16,
                        padding: 24,
                        background: "rgba(15,23,42,0.72)",
                    }}
                >
                    <h1 style={{ margin: 0, fontSize: 28 }}>Something went wrong</h1>
                    <p style={{ marginTop: 12, color: "#cbd5e1", lineHeight: 1.6 }}>
                        We are unable to load this page right now. Please try again in a moment.
                    </p>
                    <button
                        onClick={() => unstable_retry()}
                        style={{
                            marginTop: 16,
                            border: 0,
                            borderRadius: 10,
                            padding: "10px 16px",
                            fontWeight: 600,
                            cursor: "pointer",
                            background: "#f8fafc",
                            color: "#0f172a",
                        }}
                    >
                        Try again
                    </button>
                </main>
            </body>
        </html>
    );
}
