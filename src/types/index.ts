export interface todoProps{
    id: string;
    title: string;
    description: string | null; // 👈 مهم
    completed: boolean;
    createdAt: Date;
}