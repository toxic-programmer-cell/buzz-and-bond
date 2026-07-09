import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import DashboardUI from "@/components/sections/DashboardUI";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("bb_session")?.value;

    // if (!token) {
    //     redirect("/login");
    // }

    let admin = {
        name: "Buzz & Bond Admin",
        email: "admin@buzzandbond.com",
        role: "ADMIN"
    };

    // try {
    //     const payload = await verifyToken(token);
    //     admin = {
    //         name: (payload.name as string) || "Buzz & Bond Admin",
    //         email: (payload.email as string) || "admin@buzzandbond.com",
    //         role: (payload.role as string) || "ADMIN"
    //     };
    // } catch (e) {
    //     // If JWT signature verification fails, force redirect to login
    //     redirect("/login");
    // }

    return (
        <>
            {/* <DashboardUI admin={admin} /> */}
            <div>
                <h1>Admin Dashboard</h1>
            </div>
        </>
    );
}