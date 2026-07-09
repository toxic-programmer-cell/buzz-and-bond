import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("bb_session")?.value;

    if (!token) {
        redirect("/login");
    }

    let admin = {
        name: "Buzz & Bond Admin",
        email: "admin@buzzandbond.com",
        role: "ADMIN",
    };

    try {
        const payload = await verifyToken(token);

        const dbAdmin = await prisma.admin.findUnique({
            where: { id: payload.id },
            select: { name: true, email: true, role: true },
        });

        if (dbAdmin) {
            admin = {
                name: dbAdmin.name,
                email: dbAdmin.email,
                role: dbAdmin.role,
            };
        }
    } catch (e) {
        redirect("/login");
    }

    return (
        <AdminLayoutClient admin={admin}>
            {children}
        </AdminLayoutClient>
    );
}
