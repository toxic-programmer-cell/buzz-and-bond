"use client";

import GalleryCard from "./GalleryCard";
import { GalleryImage } from "./type";

interface Props {
    images: GalleryImage[];
    onDelete: (image: GalleryImage) => void;
}

export default function GalleryGrid({
    images,
    onDelete,
}: Props) {

    if (!images.length) {
        return (
            <div className="rounded-2xl border border-dashed p-20 text-center">
                No Images Found
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">

            {images.map((image) => (

                <GalleryCard
                    key={image.id}
                    image={image}
                    onDelete={onDelete}
                />

            ))}

        </div>
    );
}