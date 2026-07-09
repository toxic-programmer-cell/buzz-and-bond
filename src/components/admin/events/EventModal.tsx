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
            {/* Overlay */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] transition-opacity"
            />

            {/* Modal Box */}
            <div className="relative w-full max-w-2xl rounded-xl bg-white border border-zinc-200 shadow-xl overflow-hidden z-10">
                {children}
            </div>
        </div>
    );
}