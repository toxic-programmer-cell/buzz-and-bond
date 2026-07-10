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
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl">

                {children}

            </div>

        </div>
    );
}