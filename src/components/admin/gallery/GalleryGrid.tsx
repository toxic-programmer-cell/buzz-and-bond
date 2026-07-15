"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import GalleryCard from "./GalleryCard";
import { GalleryImage } from "./type";

interface Props {
    images: GalleryImage[];
    onDelete: (image: GalleryImage) => void;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function GalleryGrid({
    images,
    onDelete,
    page,
    totalPages,
    onPageChange,
}: Props) {

    if (!images.length) {
        return (
            <div className="rounded-2xl border border-dashed p-20 text-center">
                No Images Found
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                {images.map((image) => (
                    <GalleryCard
                        key={image.id}
                        image={image}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                        disabled={page === 1}
                        onClick={() => onPageChange(page - 1)}
                        className="p-2 rounded-lg border bg-white hover:bg-neutral-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed cursor-pointer transition"
                        aria-label="Previous Page"
                    >
                        <ChevronLeft className="w-4 h-4 text-neutral-600" />
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => {
                            const pageNum = i + 1;
                            const isActive = page === pageNum;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => onPageChange(pageNum)}
                                    className={`w-9 h-9 rounded-lg text-sm font-semibold cursor-pointer transition ${
                                        isActive
                                            ? "bg-black text-white"
                                            : "border bg-white hover:bg-neutral-50 text-neutral-600"
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        disabled={page === totalPages}
                        onClick={() => onPageChange(page + 1)}
                        className="p-2 rounded-lg border bg-white hover:bg-neutral-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed cursor-pointer transition"
                        aria-label="Next Page"
                    >
                        <ChevronRight className="w-4 h-4 text-neutral-600" />
                    </button>
                </div>
            )}
        </div>
    );
}