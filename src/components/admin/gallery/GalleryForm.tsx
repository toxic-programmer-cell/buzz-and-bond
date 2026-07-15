"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
    onSuccess: () => void;
}

export default function GalleryForm({
    onSuccess,
}: Props) {

    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    function removeFile(indexToRemove: number) {
        URL.revokeObjectURL(previews[indexToRemove]);
        setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
        setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    }

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

                    const uploadData = await uploadRes.json();

                    if (!uploadRes.ok) {
                        throw new Error(uploadData.message ?? `Failed to upload ${file.name}`);
                    }
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
                            className="relative aspect-square overflow-hidden rounded-xl border group"
                        >
                            <Image
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                fill
                                sizes="200px"
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="absolute top-2 right-2 z-10 p-1.5 bg-black/60 hover:bg-red-600 border border-white/10 hover:border-red-500 text-white rounded-full transition-all scale-90 hover:scale-100 cursor-pointer"
                                aria-label="Remove image"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
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