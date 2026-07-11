"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui";
import { Event } from "@/components/admin/events/types";
import { Calendar, Clock, MapPin, Ticket, Users, ArrowLeft, CheckCircle } from "lucide-react";
import usePayment from "@/hooks/usePayment";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function EventDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [isBooking, setIsBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const { pay } = usePayment();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`/api/event/${id}`);
                if (!res.ok) {
                    throw new Error("Event details could not be found.");
                }
                const data = await res.json();
                setEvent(data);
            } catch (err: any) {
                setError(err.message || "Failed to load event");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    // console.log(event);

    const handleBookTickets = () => {
        if (!event || event.seats <= 0) return;
        setIsBooking(true);

        pay("EVENT", event.id, ticketQuantity)

        setIsBooking(false)
    };

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen pt-28 pb-16 relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none select-none z-0" />
                <Container className="relative z-10 max-w-6xl">
                    <div className="animate-pulse flex flex-col lg:flex-row gap-10 lg:gap-16">
                        {/* Image skeleton */}
                        <div className="w-full lg:w-[45%] aspect-[4/3] rounded-3xl bg-zinc-800 shrink-0" />
                        {/* Content skeleton */}
                        <div className="flex-grow space-y-6">
                            <div className="h-6 bg-zinc-800 rounded w-1/4" />
                            <div className="h-12 bg-zinc-800 rounded w-3/4" />
                            <div className="h-4 bg-zinc-800 rounded w-1/3" />
                            <div className="space-y-3 pt-4">
                                <div className="h-3 bg-zinc-800 rounded w-full" />
                                <div className="h-3 bg-zinc-800 rounded w-full" />
                                <div className="h-3 bg-zinc-800 rounded w-2/3" />
                            </div>
                            <div className="h-20 bg-zinc-900 rounded-2xl border border-zinc-800/50 mt-6" />
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="bg-black text-white min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none z-0" />
                <Container className="relative z-10 text-center space-y-6 max-w-md">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto text-2xl font-bold">
                        !
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-150">Event not found</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        {error || "The event you are looking for does not exist or has been removed."}
                    </p>
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-500 hover:text-orange-400 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to events
                    </Link>
                </Container>
            </div>
        );
    }

    const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const isSoldOut = event.seats <= 0;

    return (
        <div className="bg-black text-white min-h-screen pt-28 pb-16 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none select-none z-0" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none select-none z-0" />

            <Container className="relative z-10 max-w-6xl">
                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-orange-500 transition-all duration-300 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to all events
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                    {/* Left Column: Image Card */}
                    <div className="w-full lg:w-[45%] shrink-0">
                        <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-neutral-900 border border-white/[0.08] shadow-2xl group/image">
                            {event.coverImage ? (
                                <Image
                                    src={event.coverImage}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
                                    sizes="(max-width: 1024px) 100vw, 45vw"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center">
                                    <span className="text-neutral-500 text-sm">No Image Available</span>
                                </div>
                            )}

                            {/* Corner Badges */}
                            <div className="absolute top-4 left-4">
                                <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-white/10">
                                    {event.seats > 0 ? "Bookings Open" : "Closed"}
                                </span>
                            </div>
                            <div className="absolute top-4 right-4">
                                <span className="bg-orange-500 text-black text-[11px] font-black px-3.5 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                                    {event.price === 0 ? "Free" : `₹${event.price}`}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Information */}
                    <div className="flex-grow space-y-8 w-full">
                        <div className="space-y-4">
                            {/* Date, Time & Location Headers */}
                            <div className="flex items-center gap-1.5 text-orange-500 font-accent italic text-base md:text-lg font-bold">
                                <Calendar className="w-4.5 h-4.5 shrink-0" />
                                <span>{formattedDate}</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                                {event.title}
                            </h1>

                            <div className="flex items-center gap-2 text-neutral-400 text-sm sm:text-base">
                                <MapPin className="w-4.5 h-4.5 text-neutral-500 shrink-0" />
                                <span>{event.location}</span>
                            </div>
                        </div>

                        {/* Event Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 rounded-[24px] bg-white/[0.02] border border-white/[0.04] backdrop-blur-md">
                            <div className="flex flex-col">
                                <span className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-orange-500" /> Timing
                                </span>
                                <span className="text-zinc-200 text-xs font-semibold">
                                    {event.startTime} {event.endTime ? `- ${event.endTime}` : ""}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
                                    <Ticket className="w-3.5 h-3.5 text-orange-500" /> Ticket Price
                                </span>
                                <span className="text-zinc-200 text-xs font-semibold">
                                    {event.price === 0 ? "Free Entry" : `₹${event.price} / ticket`}
                                </span>
                            </div>
                            <div className="flex flex-col col-span-2 md:col-span-1">
                                <span className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
                                    <Users className="w-3.5 h-3.5 text-orange-500" /> Availability
                                </span>
                                <span className="text-zinc-200 text-xs font-semibold">
                                    {isSoldOut ? (
                                        <span className="text-red-500 font-bold uppercase">Sold Out</span>
                                    ) : (
                                        `${event.seats} Seats Remaining`
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-white tracking-wide border-b border-white/5 pb-2">
                                About the Event
                            </h3>
                            <p className="text-neutral-400 text-sm leading-relaxed whitespace-pre-wrap">
                                {event.description}
                            </p>
                        </div>

                        {/* Booking Card */}
                        <div className="p-6 rounded-[28px] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-white/[0.08] shadow-2xl relative overflow-hidden">
                            {/* Accent Glow */}
                            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-orange-500/5 blur-[50px] pointer-events-none" />

                            {bookingSuccess ? (
                                <div className="text-center py-6 space-y-4 animate-[fadeIn_0.5s_ease_out]">
                                    <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto">
                                        <CheckCircle className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <h3 className="text-lg font-bold text-white">Tickets Booked Successfully!</h3>
                                        <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                                            We've reserved {ticketQuantity} {ticketQuantity === 1 ? "ticket" : "tickets"} for you. Check your email for registration details.
                                        </p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => setBookingSuccess(false)}
                                            className="text-xs font-semibold text-orange-500 hover:text-orange-400 transition-colors uppercase tracking-wider mt-2 cursor-pointer"
                                        >
                                            Book More Tickets
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-white text-base">Select Tickets</h4>
                                            <p className="text-xs text-neutral-400">
                                                {isSoldOut ? "No seats left for this event." : `Choose number of tickets (Max ${Math.min(5, event.seats)} per booking)`}
                                            </p>
                                        </div>

                                        {!isSoldOut && (
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setTicketQuantity(prev => Math.max(1, prev - 1))}
                                                    disabled={ticketQuantity <= 1}
                                                    className="w-9 h-9 rounded-full border border-white/10 hover:border-orange-500 flex items-center justify-center text-zinc-300 hover:text-white disabled:opacity-40 disabled:hover:border-white/10 cursor-pointer active:scale-95 transition-all"
                                                >
                                                    -
                                                </button>
                                                <span className="text-base font-bold w-6 text-center">{ticketQuantity}</span>
                                                <button
                                                    onClick={() => setTicketQuantity(prev => Math.min(Math.min(5, event.seats), prev + 1))}
                                                    disabled={ticketQuantity >= Math.min(5, event.seats)}
                                                    className="w-9 h-9 rounded-full border border-white/10 hover:border-orange-500 flex items-center justify-center text-zinc-300 hover:text-white disabled:opacity-40 disabled:hover:border-white/10 cursor-pointer active:scale-95 transition-all"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-white/5 gap-4">
                                        <div className="space-y-0.5">
                                            <span className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider">Total Price</span>
                                            <span className="block text-2xl font-black text-white leading-none">
                                                {event.price === 0 ? "Free" : `₹${event.price * ticketQuantity}`}
                                            </span>
                                        </div>

                                        <button
                                            onClick={handleBookTickets}
                                            disabled={isSoldOut || isBooking}
                                            className="bg-orange-500 hover:bg-orange-600 active:scale-[0.98] disabled:bg-zinc-800 disabled:text-zinc-500 disabled:scale-100 disabled:cursor-not-allowed text-black font-extrabold text-xs px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.15)] flex items-center justify-center gap-2 cursor-pointer shrink-0"
                                        >
                                            {isBooking ? (
                                                <span className="flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce" />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce [animation-delay:0.2s]" />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce [animation-delay:0.4s]" />
                                                </span>
                                            ) : isSoldOut ? (
                                                "Sold Out"
                                            ) : (
                                                "Book Tickets Now"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
