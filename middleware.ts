import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    console.log("Middleware running:", request.nextUrl.pathname);

    const token = request.cookies.get("bb_session")?.value;

    const pathname = request.nextUrl.pathname;

    const isLoginPage = pathname === "/login";
    const isDashboardRoute = pathname.startsWith("/dashboard");

    // Protect dashboard routes
    if (isDashboardRoute && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If logged in, don't allow visiting login page
    if (isLoginPage && token) {
        try {
            await verifyToken(token);

            return NextResponse.redirect(
                new URL("/dashboard", request.url)
            );
        } catch {
            // Invalid token → continue to login
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
    matcher: ["/dashboard", "/dashboard/:path*", "/login"],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//     console.log("🔥 MIDDLEWARE HIT:", request.nextUrl.pathname);

//     return new NextResponse("Middleware is running");
// }

// export const config = {
//     matcher: "/:path*",
// };