import { NextRequest, NextResponse } from "next/server";
import { GalleryService } from "@/services/gallery.services";
import { GallerySchema } from "@/validations/gallery.schema";

const service = new GalleryService();

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const page =
            Number(searchParams.get("page") ?? "1");

        const limit =
            Number(searchParams.get("limit") ?? "12");

        const gallery =
            await service.findPaginated(page, limit);

        return NextResponse.json(gallery);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { message: "Unable to fetch gallery." },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const data = GallerySchema.parse(body);

        const image = await service.create(data);

        return NextResponse.json(image, {
            status: 201,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { message: "Unable to create gallery image." },
            { status: 500 }
        );
    }
}