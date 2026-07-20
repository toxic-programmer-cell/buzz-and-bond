import { AuthenticationError, verifyApiSession } from "@/lib/api-session";
import { EventServices } from "@/services/event.services";
import { EventSchema } from "@/validations/event.schema";
import { NextRequest, NextResponse } from "next/server";

const service = new EventServices();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {

        const { id } = await params;
        const event = await service.findById(id);
        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }
        return NextResponse.json(event);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to fetch event" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await verifyApiSession()
        if (session.role !== "ADMIN") {
            return NextResponse.json({ success: false, message: "You do not have access to this feature" }, { status: 401 })
        }
        const { id } = await params;

        await service.delete(id)

        return NextResponse.json({ message: "Event deleted successfully" })
    } catch (error) {
        if (error instanceof AuthenticationError) {
            return NextResponse.json({ message: error.message }, { status: 403 })
        }

        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await verifyApiSession()
        if (session.role !== "ADMIN") {
            return NextResponse.json({ success: false, message: "You do not have access to this feature" }, { status: 403 })
        }
        const { id } = await params;

        const body = await request.json();

        const data = EventSchema.parse(body);

        const event = await service.update(id, data)

        return NextResponse.json(event);
    } catch (error) {
        if (error instanceof AuthenticationError) {
            return NextResponse.json({ message: error.message }, { status: 403 })
        }

        console.error(error);

        return NextResponse.json(
            {
                message: "Unable to update event"
            },
            {
                status: 500
            }
        );
    }
}