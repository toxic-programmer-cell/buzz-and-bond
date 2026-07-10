"use client";

interface Props {
    onUpload: () => void;
}

export default function GalleryHeader({ onUpload }: Props) {
    return (
        <div className="flex items-center justify-between">

            <div>

                <h1 className="text-4xl font-bold">
                    Gallery
                </h1>

                <p className="mt-2 text-neutral-500">
                    Manage Buzz & Bond gallery images.
                </p>

            </div>

            <button
                onClick={onUpload}
                className="rounded-xl bg-black px-6 py-3 text-white transition hover:scale-105"
            >
                + Upload Images
            </button>

        </div>
    );
}