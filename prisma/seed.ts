import "dotenv/config";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
    await prisma.todo.create({
        data: {
            title: "",
            description: "",
        }
    })
}


main().catch(async e => {
    console.error(e);
    process.exit(1);
}).finally(async ()=>{
    await prisma.$disconnect();
})
