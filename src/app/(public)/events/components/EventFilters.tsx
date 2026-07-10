"use client";

import { Search, X } from "lucide-react";

interface EventFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    priceFilter: string;
    setPriceFilter: (filter: string) => void;
}

export default function EventFilters({
    searchQuery,
    setSearchQuery,
    priceFilter,
    setPriceFilter,
}: EventFiltersProps) {
    return (
        <div className="mb-14 flex flex-wrap gap-4 items-center">
            {/* Search Input Container */}
            <div className="relative flex-1 min-w-[280px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search events by title, location, description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-12 pr-10 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white placeholder-zinc-500 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/50 transition-all text-sm font-sans"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        aria-label="Clear search"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Price Filter Select Container */}
            <div className="relative min-w-[180px]">
                <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="w-full h-12 px-4 pr-10 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/50 backdrop-blur-md transition-all text-sm font-sans appearance-none cursor-pointer"
                >
                    <option value="all" className="bg-zinc-950 text-white">All Prices</option>
                    <option value="free" className="bg-zinc-950 text-white">Free Events</option>
                    <option value="paid" className="bg-zinc-950 text-white">Paid Events</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}