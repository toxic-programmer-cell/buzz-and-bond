
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

        const ALLOWED_TYPES = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/jpg",
            "image/gif",
        ];

        if (!file) {
            return NextResponse.json({ message: "no file uploaded" }, { status: 400 });
        }

        if (!ALLOWED_TYPES.includes(file.type) && file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                {
                    message:
                        "Only JPG, JPEG, PNG, WEBP and GIF images of maximum of 5MB are allowed.",
                },
                {
                    status: 400,
                }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'buzz-and-bond/events',
                    resource_type: "image",
                    overwrite: false,
                    unique_filename: true,
                },
                (error, result) => {
                    if (error) return reject(error);
                    if (!result) {
                        return reject(new Error("Upload failed"))
                    }
                    resolve(result);
                }
            )
            stream.end(buffer)
        });

        return NextResponse.json({ url: result.secure_url, publicId: result.public_id })
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Upload failed",
            },
            {
                status: 500,
            }
        );
    }
}