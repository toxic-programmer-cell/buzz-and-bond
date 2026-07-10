import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
    const existing = await prisma.admin.findUnique({
        where: {
            email: "admin@example.com",
        }
    })

    if (existing) {
        console.log("Email already exists")
        return;
    }

    const hashedPassword = await bcrypt.hash("example@123", 12);

    await prisma.admin.create({
        data: {
            name: "Buzz & Bond Admin",
            email: "admin@buzzandbond.com",
            password: hashedPassword,
        }
    })

    console.log("Admin created successfully")
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    })
