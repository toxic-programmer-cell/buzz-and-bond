import { AlertTriangle, Loader2 } from "lucide-react";

interface Props {
    open: boolean;
    title: string;
    onCancel: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
}

export default function DeleteDialog({ open, title, onCancel, onConfirm, isDeleting }: Props) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay with Backdrop Blur */}
            <div
                onClick={onCancel}
                className="absolute inset-0 bg-zinc-950/45 backdrop-blur-xs transition-opacity duration-300"
            />

            {/* Dialog Box */}
            <div className="relative w-full max-w-md rounded-[28px] bg-white border border-zinc-200/60 p-6 shadow-2xl z-10 text-zinc-900 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3.5 pb-4 border-b border-zinc-100">
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-100 text-red-500">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <h2 className="text-base font-bold text-zinc-950">
                        Delete Event
                    </h2>
                </div>

                <p className="mt-4 text-xs font-medium text-zinc-500 leading-relaxed">
                    Are you sure you want to delete the event <span className="text-zinc-950 font-bold">"{title}"</span>? This action is permanent and cannot be undone.
                </p>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="
                            rounded-xl
                            border
                            border-zinc-200
                            bg-white
                            hover:bg-zinc-50
                            px-4
                            py-2
                            text-xs
                            font-bold
                            text-zinc-700
                            transition-all
                            shadow-2-xs
                            active:translate-y-[1px]
                            cursor-pointer
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="
                            inline-flex 
                            items-center 
                            gap-2
                            rounded-xl
                            bg-red-600
                            hover:bg-red-700
                            px-4
                            py-2
                            text-xs
                            font-bold
                            text-white
                            shadow-md
                            shadow-red-500/10
                            transition-all
                            active:translate-y-[1px]
                            cursor-pointer
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        {isDeleting ?
                            <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Deleting...</span>
                            </> :
                            <span>Delete Event</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}