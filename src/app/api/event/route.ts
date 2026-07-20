import { AuthenticationError, verifyApiSession } from "@/lib/api-session";
import { EventServices } from "@/services/event.services";
import { EventSchema } from "@/validations/event.schema";
import { NextResponse } from "next/server";
import { success } from "zod";

const service = new EventServices()

export async function GET() {
    try {
        const event = await service.findAll();
        return NextResponse.json(event)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error while fetching", error }, { status: 200 })
    }

}

export async function POST(req: Request) {
    try {
        const session = await verifyApiSession()
        if (session.role !== "ADMIN") {
            return NextResponse.json({ success: false, message: "You do not have access to this feature" }, { status: 403 })
        }
        const body = await req.json()
        let data = EventSchema.parse(body)
        const event = await service.create(data)
        return NextResponse.json(event, { status: 201 })
    } catch (error) {
        if (error instanceof AuthenticationError) {
            return NextResponse.json({ message: error.message }, { status: 403 })
        }
        return NextResponse.json({ message: "Error while adding event" })
    }
}