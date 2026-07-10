"use client";

import Image from "next/image";
import { GalleryImage } from "./types";

interface Props {
    image: GalleryImage;
    onDelete: (image: GalleryImage) => void;
}

export default function GalleryCard({
    image,
    onDelete,
}: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border bg-white">

            <div className="relative aspect-square">

                <Image
                    src={image.imageUrl}
                    alt={image.title ?? "Gallery"}
                    fill
                    sizes="300px"
                    className="object-cover"
                />

            </div>

            <div className="space-y-2 p-4">

                <h3 className="font-semibold">
                    {image.title || "Untitled"}
                </h3>

                <p className="text-sm text-neutral-500">
                    {image.category}
                </p>

                <button
                    onClick={() => onDelete(image)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white"
                >
                    Delete
                </button>

            </div>

        </div>
    );
}