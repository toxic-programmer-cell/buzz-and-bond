import { createToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                {
                    message: "Email and password required",
                },
                {
                    status: 400,
                }
            )
        }

        const admin = await prisma.admin.findUnique({
            where: {
                email,
            }
        })

        if (!admin) {
            return NextResponse.json(
                {
                    message: "Invalid Credential",
                },
                {
                    status: 401,
                }
            )
        }

        const valid = await bcrypt.compare(password, admin.password)

        if (!valid) {
            return NextResponse.json(
                {
                    message: "Invalid Credential",
                },
                {
                    status: 401,
                }
            )
        }

        const token = await createToken({
            id: admin.id,
            email: admin.email,
            role: admin.role,
        })

        const cookieStore = await cookies()

        cookieStore.set("bb_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return NextResponse.json({
            success: true,
        })
    } catch (error) {
        console.log(error)

        return NextResponse.json(
            {
                message: "Something went wrong",
            },
            {
                status: 500,
            }
        )

    }
}