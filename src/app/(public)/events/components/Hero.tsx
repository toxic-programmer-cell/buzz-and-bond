"use client";

import { Container } from "@/components/ui";
import { Search, X } from "lucide-react";

interface HeroProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    priceFilter: string;
    setPriceFilter: (filter: string) => void;
}

export default function Hero({
    searchQuery,
    setSearchQuery,
    priceFilter,
    setPriceFilter,
}: HeroProps) {
    const handleScrollToContent = () => {
        window.scrollBy({
            top: window.innerHeight * 0.45,
            behavior: "smooth",
        });
    };

    return (
        <section className="relative flex min-h-[35vh] md:min-h-[40vh] items-center overflow-hidden bg-black text-white py-10 md:py-14 border-b border-white/[0.04]">
            {/* Ambient Background Lights */}
            <div className="absolute top-1/4 right-[-10%] w-[45vw] h-[45vw] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none select-none z-0" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-orange-500/5 blur-[100px] pointer-events-none select-none z-0" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

            <Container className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 w-full">
                    {/* Left Column: Heading and Tag */}
                    <div className="w-full lg:w-[58%] text-left">
                        <p className="mb-3 font-semibold text-orange-500 uppercase tracking-widest text-xs">
                            Buzz & Bond Events
                        </p>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                            Discover events that create meaningful connections.
                        </h1>

                        <p className="mt-4 max-w-xl text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                            Workshops, networking sessions, meetups and unforgettable experiences built around Ranchi's community.
                        </p>

                        <button
                            onClick={handleScrollToContent}
                            className="mt-6 rounded-full border border-orange-500/50 bg-orange-500/10 hover:bg-orange-500 hover:text-black px-6 py-2.5 text-orange-500 hover:scale-103 active:scale-[0.98] font-bold text-xs tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.1)] cursor-pointer"
                        >
                            Browse Events
                        </button>
                    </div>

                    {/* Right Column: Search and Filter Box */}
                    <div className="w-full lg:w-[36%] shrink-0 bg-white/[0.02] backdrop-blur-md border border-white/[0.06] p-6 rounded-[28px] shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-white tracking-wide border-b border-white/5 pb-2">
                                Find your next vibe
                            </h3>

                            {/* Search */}
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Search</label>
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search by title, location..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-10 pl-10 pr-8 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/50 transition-all text-xs"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                                            aria-label="Clear search"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Price range */}
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Price Range</label>
                                <div className="relative">
                                    <select
                                        value={priceFilter}
                                        onChange={(e) => setPriceFilter(e.target.value)}
                                        className="w-full h-10 px-3 pr-8 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500/50 transition-all text-xs appearance-none cursor-pointer"
                                    >
                                        <option value="all" className="bg-zinc-950 text-white">All Prices</option>
                                        <option value="free" className="bg-zinc-950 text-white">Free Events</option>
                                        <option value="paid" className="bg-zinc-950 text-white">Paid Events</option>
                                    </select>
                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}