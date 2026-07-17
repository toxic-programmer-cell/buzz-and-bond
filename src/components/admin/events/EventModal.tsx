import { ReactNode } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function EventModal({ open, onClose, children }: Props) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay with Blur */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-zinc-950/45 backdrop-blur-xs transition-opacity duration-300"
            />

            {/* Premium Dialog Container */}
            <div className="relative w-full max-w-2xl rounded-[28px] bg-white border border-zinc-200/60 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[calc(100vh-3rem)] animate-in fade-in zoom-in-95 duration-200">
                {children}
            </div>
        </div>
    );
}