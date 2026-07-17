"use client";

import { ReactNode } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function GalleryUploadModal({
    open,
    onClose,
    children,
}: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay with Blur */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-zinc-950/45 backdrop-blur-xs transition-opacity duration-300"
            />

            {/* Premium Dialog Container */}
            <div
                data-lenis-prevent
                className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[28px] bg-white border border-zinc-200/60 shadow-2xl z-10 flex flex-col animate-in fade-in zoom-in-95 duration-200"
            >
                {children}
            </div>
        </div>
    );
}