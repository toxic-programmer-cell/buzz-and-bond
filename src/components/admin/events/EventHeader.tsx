"use client";

import { Plus } from "lucide-react";

interface props {
    onAdd: () => void;
}

export default function EventHeader({ onAdd }: props) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
            <div>
                <h1 className="text-xl font-bold tracking-tight text-zinc-900">
                    Events Management
                </h1>

                <p className="mt-1 text-xs text-zinc-500">
                    Create, update, and manage all Buzz & Bond community events.
                </p>
            </div>

            <button
                onClick={onAdd}
                className="
                    inline-flex
                    items-center
                    justify-center
                    gap-1.5
                    rounded-lg
                    bg-orange-600
                    hover:bg-orange-700
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    text-white
                    shadow-sm
                    transition-colors
                    cursor-pointer
                    self-start
                    sm:self-auto
                "
            >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
            </button>
        </div>
    );
}