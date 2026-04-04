// ** Interfaces
import { Card } from "@/components/ui/card";
import { ReactElement } from "react";

interface CardProps {
    icon: ReactElement;
    state: string;
    title: string;
    value: string;
}

export default function DashboardCard({ icon, state, title, value }: CardProps) {
    return (
        <Card className="flex flex-col p-6 gap-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
                <div className="text-slate-600 bg-slate-100 p-2 rounded-lg">
                    {icon}
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    {state}
                </span>
            </div>

            <div>
                <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase mb-1">
                    {title}
                </p>
                <h2 className="text-3xl font-bold tracking-tight">
                    {value}
                </h2>
            </div>
        </Card>
    );
}