"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
    onSuccess: () => void;
}

export default function GalleryForm({
    onSuccess,
}: Props) {

    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    function handleFiles(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        if (!e.target.files) return;

        const newFiles = Array.from(e.target.files);

        setFiles((prev) => [...prev, ...newFiles]);

        const newPreviews = newFiles.map((file) =>
            URL.createObjectURL(file)
        );

        setPreviews((prev) => [...prev, ...newPreviews]);

        e.target.value = "";
    }

    useEffect(() => {
        return () => {
            previews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [previews]);

    async function uploadImages() {
        if (!files.length) return;

        setUploading(true);

        try {
            await Promise.all(
                files.map(async (file) => {
                    // Upload to Cloudinary
                    const formData = new FormData();
                    formData.append("file", file);

                    const uploadRes = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });

                    if (!uploadRes.ok) {
                        throw new Error(`Failed to upload ${file.name}`);
                    }

                    const uploadData = await uploadRes.json();

                    // Save to database
                    const galleryRes = await fetch("/api/gallery", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            imageUrl: uploadData.url,
                            publicId: uploadData.publicId,
                            title: file.name,
                            category: "EVENTS",
                            isPublished: true,
                        }),
                    });

                    if (!galleryRes.ok) {
                        throw new Error(`Failed to save ${file.name}`);
                    }
                })
            );

            // Clear state
            setFiles([]);
            setPreviews([]);

            onSuccess();

        } catch (error) {
            console.error(error);
            alert("Some images failed to upload.");
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="space-y-6 p-8">

            <h2 className="text-3xl font-bold">
                Upload Gallery Images
            </h2>

            <label className="flex h-48 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed">

                <input
                    hidden
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFiles}
                />

                Select Images

            </label>

            {previews.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {previews.map((preview, index) => (
                        <div
                            key={index}
                            className="relative aspect-square overflow-hidden rounded-xl border"
                        >
                            <Image
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                fill
                                sizes="200px"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}

            <p className="text-sm text-neutral-500">
                {files.length} image(s) selected
            </p>

            <button
                type="button"
                disabled={!files.length || uploading}
                onClick={uploadImages}
                className="rounded-xl bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
                {uploading
                    ? `Uploading ${files.length} image(s)...`
                    : `Upload ${files.length || ""} Image${files.length !== 1 ? "s" : ""}`}
            </button>

        </div>
    );
}