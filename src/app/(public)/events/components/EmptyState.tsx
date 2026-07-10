"use client";

import { CalendarOff } from "lucide-react";

interface EmptyStateProps {
    onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white/[0.02] rounded-[32px] border border-dashed border-white/10">
            <div className="w-16 h-16 rounded-full bg-white/[0.04] flex items-center justify-center text-zinc-500 mb-5">
                <CalendarOff className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-zinc-200 mb-2">No events found</h3>
            <p className="text-zinc-500 text-sm max-w-sm mb-6 leading-relaxed">
                We couldn't find any events matching your search or filter options. Try adjusting your search or resetting filters.
            </p>
            <button
                onClick={onReset}
                className="bg-white hover:bg-orange-500 hover:text-white text-black font-semibold text-xs px-6 py-3 rounded-full transition-all duration-300 cursor-pointer active:scale-[0.98] shadow-lg hover:shadow-orange-500/20"
            >
                Reset Filters
            </button>
        </div>
    );
}
