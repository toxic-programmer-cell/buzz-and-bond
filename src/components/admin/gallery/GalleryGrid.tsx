"use client";

import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import GalleryCard from "./GalleryCard";
import { GalleryImage } from "./type";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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

    // Stagger gallery cards entrance
    useGSAP(() => {
        if (images.length > 0) {
            gsap.fromTo(".gallery-grid-item",
                { opacity: 0, y: 15, scale: 0.97 },
                { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.05, ease: "power2.out" }
            );
        }
    }, [images, page]);

    if (!images.length) {
        return (
            <div className="rounded-[24px] border border-dashed border-zinc-200 bg-white p-16 text-center flex flex-col items-center justify-center shadow-xs">
                <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-400">
                    <ImageIcon className="w-6 h-6" />
                </div>

                <h2 className="text-sm font-bold text-zinc-900 mt-3">
                    No Images Found
                </h2>

                <p className="mt-1 text-xs text-zinc-500 max-w-xs mx-auto">
                    Click "Upload Images" to add photos to your community gallery.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                {images.map((image) => (
                    <div key={image.id} className="gallery-grid-item">
                        <GalleryCard
                            image={image}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-8 select-none">
                    <button
                        disabled={page === 1}
                        onClick={() => onPageChange(page - 1)}
                        className="p-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed cursor-pointer transition shadow-2-xs active:translate-y-[1px]"
                        aria-label="Previous Page"
                    >
                        <ChevronLeft className="w-4 h-4 text-zinc-600" />
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => {
                            const pageNum = i + 1;
                            const isActive = page === pageNum;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => onPageChange(pageNum)}
                                    className={`w-9 h-9 rounded-xl text-xs font-bold cursor-pointer transition active:translate-y-[1px] ${isActive
                                            ? "bg-orange-500 border border-orange-500 text-white shadow-sm"
                                            : "border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600"
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
                        className="p-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed cursor-pointer transition shadow-2-xs active:translate-y-[1px]"
                        aria-label="Next Page"
                    >
                        <ChevronRight className="w-4 h-4 text-zinc-600" />
                    </button>
                </div>
            )}
        </div>
    );
}