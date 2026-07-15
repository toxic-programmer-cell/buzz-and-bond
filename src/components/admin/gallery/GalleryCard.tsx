"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { GalleryImage } from "./type";

interface Props {
    image: GalleryImage;
    onDelete: (image: GalleryImage) => void;
}

export default function GalleryCard({
    image,
    onDelete,
}: Props) {
    return (
        <div className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300 flex flex-col">

            {/* Image Container with Hover Zoom */}
            <div className="relative aspect-square overflow-hidden bg-neutral-50 border-b">
                <Image
                    src={image.imageUrl}
                    alt={image.title ?? "Gallery"}
                    fill
                    sizes="300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Details Section */}
            <div className="flex flex-col flex-grow p-4 justify-between gap-3 bg-white">
                <div className="space-y-1">
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-100 rounded-md">
                        {image.category}
                    </span>
                    <h3 className="font-semibold text-neutral-800 text-sm md:text-base line-clamp-1" title={image.title || "Untitled"}>
                        {image.title || "Untitled"}
                    </h3>
                </div>

                <button
                    onClick={() => onDelete(image)}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-500 hover:text-white border border-red-100 hover:border-red-500 rounded-xl cursor-pointer transition-all duration-200"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                </button>
            </div>

        </div>
    );
}