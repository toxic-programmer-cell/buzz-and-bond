"use client";

import { useRef, useState, useEffect } from "react";
import { Event } from "@/components/admin/events/types";
import EventCard from "./EventCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EventGridProps {
    events?: Event[];
    loading?: boolean;
}

export default function EventGrid({ events = [], loading = false }: EventGridProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftGlow, setShowLeftGlow] = useState(false);
    const [showRightGlow, setShowRightGlow] = useState(false);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;
        setShowLeftGlow(scrollLeft > 10);
        setShowRightGlow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            handleScroll();
            container.addEventListener("scroll", handleScroll);
            window.addEventListener("resize", handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
            window.removeEventListener("resize", handleScroll);
        };
    }, [events]);

    const scroll = (direction: "left" | "right") => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const offset = direction === "left" ? -340 : 340;
        container.scrollBy({ left: offset, behavior: "smooth" });
    };

    if (loading) {
        return (
            <div className="relative w-full">
                <section className="flex gap-6 overflow-x-auto no-scrollbar pb-6 w-full">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse bg-zinc-900/60 rounded-[24px] border border-white/[0.06] overflow-hidden flex flex-col h-[320px] w-[280px] sm:w-[320px] shrink-0"
                        >
                            {/* Image skeleton */}
                            <div className="w-full aspect-video bg-zinc-800" />
                            {/* Body skeleton */}
                            <div className="p-4 flex-grow space-y-3 flex flex-col justify-between">
                                <div className="space-y-2">
                                    <div className="h-3 bg-zinc-800 rounded w-1/4" />
                                    <div className="h-4 bg-zinc-800 rounded w-3/4" />
                                    <div className="h-3 bg-zinc-800 rounded w-full" />
                                </div>
                                <div className="pt-3 border-t border-white/5 flex justify-between">
                                    <div className="h-3 bg-zinc-800 rounded w-1/3" />
                                    <div className="h-3 bg-zinc-800 rounded w-1/4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        );
    }

    return (
        <div className="relative w-full group/slider">
            {/* Left Fade Overlay */}
            <div
                className={`absolute left-0 top-0 bottom-6 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none z-20 transition-opacity duration-300 ${showLeftGlow ? "opacity-100" : "opacity-0"
                    }`}
            />

            {/* Right Fade Overlay */}
            <div
                className={`absolute right-0 top-0 bottom-6 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-20 transition-opacity duration-300 ${showRightGlow ? "opacity-100" : "opacity-0"
                    }`}
            />

            {/* Navigation Arrows */}
            {/* {showLeftGlow && (
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-orange-500 border border-white/10 text-white hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 opacity-0 group-hover/slider:opacity-100"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
            )}

            {showRightGlow && (
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-orange-500 border border-white/10 text-white hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 opacity-0 group-hover/slider:opacity-100"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            )} */}

            {/* Horizontal Scroll Area */}
            <section
                ref={scrollContainerRef}
                className="flex flex-wrap justify-center gap-6 overflow-hidden no-scrollbar pb-6 w-full scroll-smooth snap-x snap-mandatory"
            >
                {events.map((event) => (
                    <div key={event.id} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
                        <EventCard event={event} />
                    </div>
                ))}
            </section>
        </div>
    );
}