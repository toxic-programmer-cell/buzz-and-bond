"use client";

import { Plus } from "lucide-react";

interface Props {
    onUpload: () => void;
}

export default function GalleryHeader({ onUpload }: Props) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
            <div>
                <h2 className="text-base font-bold text-zinc-955">
                    Gallery Images
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                    Upload, organize, and manage Buzz & Bond event gallery assets.
                </p>
            </div>

            <button
                onClick={onUpload}
                className="
                    inline-flex
                    items-center
                    justify-center
                    gap-1.5
                    rounded-xl
                    bg-gradient-to-r
                    from-orange-500
                    to-amber-500
                    text-white
                    font-bold
                    px-4
                    py-2.5
                    h-10
                    text-xs
                    shadow-md
                    shadow-orange-500/10
                    hover:translate-y-[-1px]
                    active:translate-y-[1px]
                    transition-all
                    cursor-pointer
                    self-start
                    sm:self-auto
                "
            >
                <Plus className="w-4 h-4" />
                <span>Upload Images</span>
            </button>
        </div>
    );
}