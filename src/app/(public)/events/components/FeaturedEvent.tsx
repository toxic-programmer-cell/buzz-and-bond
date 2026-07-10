"use client";

import Image from "next/image";
import { Event } from "@/components/admin/events/types";
import { Calendar, MapPin, Ticket, Users } from "lucide-react";

interface FeaturedEventProps {
    event?: Event;
    loading?: boolean;
}

export default function FeaturedEvent({ event, loading = false }: FeaturedEventProps) {
    if (loading) {
        return (
            <div className="animate-pulse bg-zinc-950 p-6 md:p-8 rounded-[32px] border border-zinc-800 flex flex-col lg:flex-row gap-6 md:gap-8 items-center mb-12 w-full">
                {/* Image skeleton */}
                <div className="w-full lg:w-[38%] aspect-video rounded-2xl bg-zinc-800 shrink-0" />
                {/* Content skeleton */}
                <div className="flex-grow w-full space-y-3">
                    <div className="h-3.5 bg-zinc-800 rounded w-1/4" />
                    <div className="h-8 bg-zinc-800 rounded w-2/3" />
                    <div className="space-y-1.5">
                        <div className="h-3 bg-zinc-800 rounded w-full" />
                        <div className="h-3 bg-zinc-800 rounded w-4/5" />
                    </div>
                    <div className="h-10 bg-zinc-800 rounded w-1/4 mt-4" />
                </div>
            </div>
        );
    }

    if (!event) return null;

    const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <section className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-6 md:p-8 rounded-[32px] border border-white/[0.06] hover:border-white/[0.12] hover:-translate-y-1 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row gap-6 md:gap-8 items-center mb-12 transition-all duration-500 group/featured">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-orange-500/10 pointer-events-none blur-[100px] z-0" />

            {/* Left Column: Image */}
            <div className="relative w-full lg:w-[38%] aspect-video rounded-2xl overflow-hidden shrink-0 bg-neutral-800/40 border border-white/[0.05] z-10">
                {event.coverImage ? (
                    <Image
                        src={event.coverImage}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover/featured:scale-105"
                        sizes="(max-width: 1024px) 100vw, 30vw"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center">
                        <span className="text-neutral-500 text-xs">No Image</span>
                    </div>
                )}
                <div className="absolute top-3 left-3 bg-orange-500 text-black font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Featured
                </div>
            </div>

            {/* Right Column: Content */}
            <div className="flex-grow flex flex-col justify-between w-full z-10">
                <div>
                    {/* Date & Time */}
                    <div className="text-orange-500 font-accent italic text-base md:text-lg font-bold mb-2 flex items-center gap-2 flex-wrap">
                        <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                        <span>{formattedDate}</span>
                        {event.startTime && (
                            <>
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500/30 hidden sm:inline" />
                                <span className="text-neutral-400 font-sans text-xs not-italic font-medium">
                                    {event.startTime} {event.endTime ? `- ${event.endTime}` : ""}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2.5">
                        {event.title}
                    </h2>

                    {/* Description */}
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed mb-4 max-w-xl">
                        {event.description}
                    </p>
                </div>

                {/* Event Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 mb-6">
                    <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                            <span className="text-neutral-500 text-[10px] uppercase tracking-wider mb-0.5">Location</span>
                            <span className="text-neutral-200 text-xs font-semibold line-clamp-1">{event.location}</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Ticket className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                            <span className="text-neutral-500 text-[10px] uppercase tracking-wider mb-0.5">Price</span>
                            <span className="text-orange-500 text-xs font-bold">
                                {event.price === 0 ? "Free" : `₹${event.price}`}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 col-span-2 sm:col-span-1">
                        <Users className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                            <span className="text-neutral-500 text-[10px] uppercase tracking-wider mb-0.5">Availability</span>
                            <span className="text-neutral-200 text-xs font-semibold">
                                {event.seats > 0 ? `${event.seats} Seats Left` : "Sold Out"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Book Button */}
                <div>
                    <button className="bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-black font-semibold text-xs px-6 py-3 rounded-full transition-all duration-300 shadow-[0_4px_15px_rgba(249,115,22,0.2)] cursor-pointer">
                        Book Tickets
                    </button>
                </div>
            </div>
        </section>
    );
}