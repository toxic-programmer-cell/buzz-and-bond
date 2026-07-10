import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            where: {
                status: "PUBLISHED",
            },
            orderBy: {
                eventDate: "asc",
            },
        });

        return NextResponse.json(events);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { message: "Failed to fetch events" },
            { status: 500 }
        );
    }
}