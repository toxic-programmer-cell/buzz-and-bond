import { NextRequest, NextResponse } from "next/server";
import { GalleryService } from "@/services/gallery.services";
import { GallerySchema } from "@/validations/gallery.schema";

const service = new GalleryService();

export async function GET() {
    try {
        const gallery = await service.findAll();

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