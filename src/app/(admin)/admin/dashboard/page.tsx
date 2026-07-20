import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardUI from "@/components/layouts/AdminDashboard/DashboardUI";

export default async function DashboardPage() {
    // Artificial delay to inspect the loading animation
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const cookieStore = await cookies();
    const token = cookieStore.get("bb_session")?.value;

    let admin = {
        name: "",
        email: "",
        role: ""
    };

    try {
        if (token) {
            const payload = await verifyToken(token);
            if (payload) {
                const dbAdmin = await prisma.admin.findUnique({
                    where: { id: payload.id },
                    select: { name: true, email: true, role: true }
                });
                if (dbAdmin) {
                    admin = {
                        name: dbAdmin.name,
                        email: dbAdmin.email,
                        role: dbAdmin.role
                    };
                }
            }
        }
    } catch (e) {
        // Safe to ignore here as root admin layout handles authentication redirect
    }

    return (
        <DashboardUI admin={admin} />
    );
}