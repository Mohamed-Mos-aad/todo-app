import "dotenv/config";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
    await prisma.user.upsert({
        where: {
            email: "ma3268787",
        },
        update: {},
        create: {
            email: "ma3268787",
            profile_img: "",
            createdAt: new Date(),
        },
    });
}


main().catch(async e => {
    console.error(e);
    process.exit(1);
}).finally(async ()=>{
    await prisma.$disconnect();
})
