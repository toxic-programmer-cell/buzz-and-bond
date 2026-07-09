
interface Props {
    open: boolean;
    title: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteDialog({ open, title, onCancel, onConfirm }: Props) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                onClick={onCancel}
                className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] transition-opacity"
            />

            {/* Dialog Box */}
            <div className="relative w-full max-w-md rounded-xl bg-white border border-zinc-200 p-5 shadow-xl z-10 text-zinc-900">
                <h2 className="text-base font-bold text-zinc-900">
                    Delete Event
                </h2>

                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                    Are you sure you want to delete the event <span className="text-zinc-900 font-semibold">"{title}"</span>? This action cannot be undone.
                </p>

                <div className="mt-5 flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="
                            rounded-lg
                            border
                            border-zinc-200
                            bg-white
                            hover:bg-zinc-50
                            px-3.5
                            py-1.5
                            text-xs
                            font-semibold
                            text-zinc-700
                            transition-colors
                            cursor-pointer
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="
                            rounded-lg
                            bg-red-600
                            hover:bg-red-700
                            px-3.5
                            py-1.5
                            text-xs
                            font-semibold
                            text-white
                            shadow-xs
                            transition-colors
                            cursor-pointer
                        "
                    >
                        Delete Event
                    </button>
                </div>
            </div>
        </div>
    );
}