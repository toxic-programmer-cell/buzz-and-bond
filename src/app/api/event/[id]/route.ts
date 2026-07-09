import { EventServices } from "@/services/event.services";
import { NextRequest, NextResponse } from "next/server";

const service = new EventServices();

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        await service.delete(id)

        return NextResponse.json({ message: "Event deleted successfully" })
    } catch (error) {

        console.log(error)

        return NextResponse.json({ message: "Event delete failed" }, { status: 500 })
    }
}