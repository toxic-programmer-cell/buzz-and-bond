"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Event } from "@/components/admin/events/types";
import { MapPin, Users, Calendar } from "lucide-react";

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    useGSAP(
        () => {
            const card = cardRef.current;
            const glow = glowRef.current;
            if (!card || !glow) return;

            const onMouseMove = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const xPct = (x / rect.width) - 0.5;
                const yPct = (y / rect.height) - 0.5;

                const rotateY = xPct * 8;
                const rotateX = -yPct * 8;

                gsap.to(card, {
                    rotateY: rotateY,
                    rotateX: rotateX,
                    transformPerspective: 1000,
                    scale: 1.012,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto",
                });

                gsap.to(glow, {
                    left: `${x}px`,
                    top: `${y}px`,
                    opacity: 0.06,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto",
                });
            };

            const onMouseLeave = () => {
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power3.out",
                    overwrite: "auto",
                });

                gsap.to(glow, {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            };

            card.addEventListener("mousemove", onMouseMove);
            card.addEventListener("mouseleave", onMouseLeave);

            return () => {
                card.removeEventListener("mousemove", onMouseMove);
                card.removeEventListener("mouseleave", onMouseLeave);
            };
        },
        { scope: cardRef }
    );

    return (
        <Link
            ref={cardRef}
            href={`/events/${event.id}`}
            className="group bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 backdrop-blur-md border border-white/[0.06] hover:border-white/15 rounded-[24px] p-4 text-white flex flex-col h-full hover:shadow-[0_15px_30px_rgba(0,0,0,0.35)] transition-all duration-300 relative overflow-hidden select-none cursor-pointer block"
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Spotlight Glow Overlay */}
            <div
                ref={glowRef}
                className="absolute w-56 h-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 pointer-events-none blur-[70px] z-0"
                style={{ left: 0, top: 0 }}
            />

            <div className="flex flex-col h-full relative z-10 pointer-events-none">
                {/* Image Container */}
                <div
                    className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 bg-neutral-800/40 border border-white/[0.04]"
                    style={{ transform: "translateZ(15px)" }}
                >
                    {event.coverImage ? (
                        <Image
                            src={event.coverImage}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-850 to-neutral-900 flex items-center justify-center">
                            <span className="text-zinc-650 text-[10px]">No Image</span>
                        </div>
                    )}
                    {/* Price Badge */}
                    <div className="absolute top-3 right-3 z-10">
                        <span className="bg-orange-500 text-black text-[10px] font-black px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(249,115,22,0.2)] border border-orange-400/20 uppercase tracking-wider">
                            {event.price === 0 ? "Free" : `₹${event.price}`}
                        </span>
                    </div>
                </div>

                {/* Content Body */}
                <div
                    className="flex flex-col flex-grow px-0.5"
                    style={{ transform: "translateZ(8px)" }}
                >
                    {/* Date tag */}
                    <div className="flex items-center gap-1.5 text-orange-500 font-semibold text-[10px] uppercase tracking-wider mb-1.5">
                        <Calendar className="w-3 h-3 shrink-0" />
                        <span>{formattedDate}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-zinc-100 line-clamp-1 mb-1.5 group-hover:text-orange-500 transition-colors duration-300">
                        {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-[11px] leading-relaxed line-clamp-2 mb-4">
                        {event.description}
                    </p>

                    {/* Footer metadata info */}
                    <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-semibold text-zinc-400">
                        <div className="flex items-center gap-1 max-w-[60%]">
                            <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-zinc-500 shrink-0" />
                            <span>{event.seats > 0 ? `${event.seats} seats` : "Sold Out"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}