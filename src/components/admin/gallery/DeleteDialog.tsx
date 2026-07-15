"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
    open: boolean;
    title?: string;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
}

export default function DeleteDialog({
    open,
    title,
    onClose,
    onConfirm,
}: Props) {
    const [isDeleting, setIsDeleting] = useState(false);

    if (!open) return null;

    const handleConfirm = async () => {
        setIsDeleting(true);
        try {
            await onConfirm();
        } catch (error) {
            console.error("Error during deletion:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-md rounded-2xl bg-white p-6">

                <h2 className="text-2xl font-semibold">
                    Delete Image
                </h2>

                <p className="mt-4 text-gray-500">
                    Are you sure you want to delete
                    <strong> {title || "this image"}</strong>?
                </p>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="rounded-lg border px-5 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleConfirm}
                        disabled={isDeleting}
                        className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-5 py-2 text-white hover:bg-red-600 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Delete"
                        )}
                    </button>

                </div>

            </div>

        </div>
    );
}