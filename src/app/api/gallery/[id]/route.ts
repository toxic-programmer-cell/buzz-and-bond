import { NextRequest, NextResponse } from "next/server";
import { GalleryService } from "@/services/gallery.services";
import { GallerySchema } from "@/validations/gallery.schema";
import { AuthenticationError, verifyApiSession } from "@/lib/api-session";
import { success } from "zod";

const service = new GalleryService();

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {

        const session = await verifyApiSession();

        if (session.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: "You do not have access to this feature" }, { status: 403 })
        }

        const { id } = await params;

        const body = await request.json();

        const data = GallerySchema.partial().parse(body);

        const image = await service.update(id, data);

        return NextResponse.json(image);

    } catch (error) {

        if (error instanceof AuthenticationError) {
            return NextResponse.json({ message: error.message })
        }

        return NextResponse.json(
            { message: "Unable to update image." },
            { status: 500 }
        );
    }
}


export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    try {

        const session = await verifyApiSession();

        if (session.role !== "ADMIN") {
            return NextResponse.json({ success: false, message: "You do not have access to this feature" }, { status: 403 })
        }

        const { id } = await params;

        await service.delete(id);

        return NextResponse.json({
            success: true,
            message: "Image deleted successfully",
        });

    } catch (error) {

        if (error instanceof AuthenticationError) {
            return NextResponse.json({ message: error.message })
        }

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete image",
            },
            {
                status: 500,
            }
        );
    }
}