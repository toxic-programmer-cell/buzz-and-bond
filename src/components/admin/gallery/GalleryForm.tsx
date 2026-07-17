"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, UploadCloud, Loader2 } from "lucide-react";

interface Props {
    onSuccess: () => void;
    onClose?: () => void; // Added optional onClose prop for the modal header close button
}

export default function GalleryForm({
    onSuccess,
    onClose,
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
            for (const file of files) {
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
            }

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
        <div className="flex flex-col h-full text-zinc-900 min-h-0">
            {/* Header */}
            <div className="p-5 md:p-6 pb-4 border-b border-zinc-100 flex-shrink-0 flex items-center justify-between bg-white">
                <div>
                    <h2 className="text-base font-bold text-zinc-950">
                        Upload Gallery Images
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">
                        Add and publish images directly to the event gallery.
                    </p>
                </div>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 text-zinc-400 hover:text-zinc-950 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Content Form Scroll Container */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 min-h-0 space-y-5">
                {/* Upload drag-drop area */}
                <div className="flex flex-col gap-1.5">
                    <label className="flex flex-col items-center justify-center h-44 rounded-2xl border-2 border-dashed border-zinc-200 hover:border-orange-500 bg-zinc-50/40 hover:bg-orange-50/10 cursor-pointer transition-all duration-200 p-6 group">
                        <input
                            hidden
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFiles}
                        />
                        <div className="flex flex-col items-center justify-center text-center select-none">
                            <UploadCloud className="w-8 h-8 text-zinc-400 group-hover:text-orange-500 transition-colors mb-2.5" />
                            <p className="text-xs font-bold text-zinc-950">Select Images</p>
                            <p className="text-[9px] text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Select one or more gallery photos</p>
                        </div>
                    </label>
                </div>

                {previews.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mt-4">
                        {previews.map((preview, index) => (
                            <div
                                key={index}
                                className="relative aspect-square overflow-hidden rounded-xl border border-zinc-200/50 group shadow-3-xs"
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
                                    className="absolute top-1.5 right-1.5 z-10 h-6 w-6 rounded-lg bg-black/60 hover:bg-red-500 text-white flex items-center justify-center transition-all scale-95 cursor-pointer"
                                    aria-label="Remove image"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Sticky Form Footer */}
            <div className="flex justify-between items-center p-5 md:p-6 pt-4 border-t border-zinc-100 bg-zinc-50/50 flex-shrink-0 sticky bottom-0 z-10 backdrop-blur-md">
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider select-none">
                    {files.length} image(s) selected
                </p>

                <div className="flex gap-2">
                    {onClose && (
                        <button
                            type="button"
                            disabled={uploading}
                            onClick={onClose}
                            className="rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 px-4 py-2 h-10 text-xs font-bold text-zinc-700 hover:text-zinc-950 transition-all cursor-pointer shadow-2-xs active:translate-y-[1px]"
                        >
                            Cancel
                        </button>
                    )}

                    <button
                        type="button"
                        disabled={!files.length || uploading}
                        onClick={uploadImages}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-5 py-2 h-10 text-xs shadow-md shadow-orange-500/10 hover:translate-y-[-1px] active:translate-y-[1px] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Uploading...</span>
                            </>
                        ) : (
                            <span>Upload Images</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}