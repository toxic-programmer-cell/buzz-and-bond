import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {

    const token = request.cookies.get("bb_session")?.value;

    const pathname = request.nextUrl.pathname;

    const isLoginPage = pathname === "/login";
    const isDashboardRoute = pathname.startsWith("/admin");

    // Protect dashboard routes
    if (isDashboardRoute && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If logged in, don't allow visiting login page
    if (isLoginPage && token) {
        try {
            await verifyToken(token);

            return NextResponse.redirect(
                new URL("/admin/dashboard", request.url)
            );
        } catch {

        }
    }

    // Verify token for protected routes
    if (isDashboardRoute && token) {
        try {
            await verifyToken(token);

            return NextResponse.next();
        } catch {
            const response = NextResponse.redirect(
                new URL("/login", request.url)
            );

            response.cookies.delete("bb_session");

            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};
