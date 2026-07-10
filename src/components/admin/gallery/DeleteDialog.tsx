"use client";

interface Props {
    open: boolean;
    title?: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteDialog({
    open,
    title,
    onClose,
    onConfirm,
}: Props) {

    if (!open) return null;

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
                        className="rounded-lg border px-5 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="rounded-lg bg-red-500 px-5 py-2 text-white"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}