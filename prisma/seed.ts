import "dotenv/config";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
    const seedUserId = "seed-user-id";

    await prisma.todo.createMany({
        data: [
            {
                title: "Set up Prisma + MongoDB",
                description: "Connect database and verify local environment.",
                completed: true,
                user_id: seedUserId,
            },
            {
                title: "Build Todo CRUD actions",
                description: "Implement create, update, and delete.",
                completed: false,
                user_id: seedUserId,
            },
            {
                title: "Ship server-side pagination",
                description: "Paginate tasks and bind by authenticated user.",
                completed: false,
                user_id: seedUserId,
            },
        ],
    });
}


main().catch(async e => {
    console.error(e);
    process.exit(1);
}).finally(async ()=>{
    await prisma.$disconnect();
})
