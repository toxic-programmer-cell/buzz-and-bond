import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies()

        const token = cookieStore.get("bb_session")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    message: "No Token",
                    authenticated: false,
                },
                {
                    status: 401,
                }
            )
        }

        const payload = await verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                {
                    message: "Invalid Token",
                    authenticated: false,
                },
                {
                    status: 401,
                }
            )
        }

        const admin = await prisma.admin.findUnique({
            where: {
                id: payload.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        })

        if (!admin) {
            return NextResponse.json(
                {
                    message: "User not Found",
                    authenticated: false,
                },
                {
                    status: 404
                }
            )
        }

        return NextResponse.json({
            authenticated: true,
            admin
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                message: "Invalid Token",
                authenticated: false
            },
            {
                status: 500
            }
        )
    }
}