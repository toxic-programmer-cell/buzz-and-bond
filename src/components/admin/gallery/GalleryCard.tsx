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
        <div className="group overflow-hidden rounded-[20px] border border-zinc-200/60 bg-white shadow-2-xs hover:shadow-md hover:border-zinc-300 transition-all duration-300 flex flex-col relative">

            {/* Image Container with Hover Zoom */}
            <div className="relative aspect-square overflow-hidden bg-zinc-50 border-b border-zinc-100">
                <Image
                    src={image.imageUrl}
                    alt={image.title ?? "Gallery"}
                    fill
                    sizes="(max-width: 640px) 50vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                    priority
                />
            </div>

            {/* Details Section */}
            <div className="flex flex-col flex-grow p-4 justify-between gap-3 bg-white">
                <div className="space-y-1.5 select-none">
                    <span className="inline-block px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-100/50 rounded-lg">
                        {image.category}
                    </span>
                    <h3 className="font-bold text-zinc-950 text-xs md:text-sm line-clamp-1" title={image.title || "Untitled"}>
                        {image.title || "Untitled"}
                    </h3>
                </div>

                <button
                    onClick={() => onDelete(image)}
                    className="w-full flex items-center justify-center gap-1.5 h-9 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-500 hover:text-white border border-red-100 hover:border-red-500 rounded-xl cursor-pointer transition-all duration-200 shadow-3-xs active:translate-y-[1px]"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                </button>
            </div>

        </div>
    );
}