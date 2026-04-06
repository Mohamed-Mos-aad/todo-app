export interface todoProps{
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: Date;
}