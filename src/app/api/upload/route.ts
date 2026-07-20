
import { AuthenticationError, verifyApiSession } from "@/lib/api-session";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const session = await verifyApiSession();
        if (session.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 403 })
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;

        const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

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

        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                {
                    message: `Unsupported file type: ${file.type}`,
                },
                { status: 400 }
            );
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                {
                    message: `File size is ${(file.size / 1024 / 1024).toFixed(2)} MB. Maximum allowed is 5 MB.`,
                },
                { status: 400 }
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
        if (error instanceof AuthenticationError) {
            return NextResponse.json({ message: error.message })
        }


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