import cloudinary from "./cloudinary";

export function extractPublicId(url: string): string | null {
    if (!url) return null;
    const cleanUrl = url.split("?")[0].split("#")[0];
    const parts = cleanUrl.split("/upload/");
    if (parts.length < 2) return null;

    // Get everything after "/upload/"
    const pathAfterUpload = parts[1];

    // Split into segments
    const segments = pathAfterUpload.split("/");

    // If the first segment is a version tag (e.g. v12345678), remove it
    if (segments[0] && /^v\d+$/.test(segments[0])) {
        segments.shift();
    }

    // Join segments back
    const pathWithExtension = segments.join("/");

    // Remove file extension
    const lastDotIndex = pathWithExtension.lastIndexOf(".");
    if (lastDotIndex === -1) return pathWithExtension;

    return pathWithExtension.substring(0, lastDotIndex);
}

export async function deleteImage(publicId: string) {
    if (!publicId) return;
    return cloudinary.uploader.destroy(publicId);
}