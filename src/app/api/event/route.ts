import { EventServices } from "@/services/event.services";
import { EventSchema } from "@/validations/event.schema";
import { NextResponse } from "next/server";

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
        const body = await req.json()
        let data = EventSchema.parse(body)
        const event = await service.create(data)
        return NextResponse.json(event, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error while adding event" })
    }
}