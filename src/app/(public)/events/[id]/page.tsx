"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui";
import { Event } from "@/components/admin/events/types";
import { Calendar, Clock, MapPin, Ticket, Users, ArrowLeft, CheckCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import usePayment from "@/hooks/usePayment";
import { Markdown } from "@/components/Markdown";

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

    // Lightbox modal state for gallery images
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

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

    const handleBookTickets = () => {
        if (!event || event.seats <= 0) return;
        setIsBooking(true);

        pay("EVENT", event.id, ticketQuantity)

        setIsBooking(false)
    };

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen pt-28 pb-16 relative overflow-hidden tech-grid">
                {/* Ambient Background Glows */}
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[150px] pointer-events-none select-none z-0 animate-float-glow-1" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none select-none z-0 animate-float-glow-2" />

                <Container className="relative z-10 max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                        {/* Image skeleton */}
                        <div className="w-full lg:w-[45%] aspect-[4/3] rounded-3xl animate-shimmer shrink-0 border border-white/5" />

                        {/* Content skeleton */}
                        <div className="flex-grow space-y-6">
                            <div className="h-6 animate-shimmer rounded w-1/4" />
                            <div className="h-14 animate-shimmer rounded w-3/4" />
                            <div className="h-5 animate-shimmer rounded w-1/3" />
                            <div className="space-y-3 pt-4">
                                <div className="h-3 animate-shimmer rounded w-full" />
                                <div className="h-3 animate-shimmer rounded w-full" />
                                <div className="h-3 animate-shimmer rounded w-2/3" />
                            </div>
                            <div className="h-24 animate-shimmer rounded-2xl border border-zinc-800/50 mt-6" />
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="bg-black text-white min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden tech-grid">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[150px] pointer-events-none z-0" />

                <Container className="relative z-10 text-center max-w-md px-4">
                    <div className="p-8 rounded-[32px] bg-white/[0.01] border border-red-500/20 backdrop-blur-xl shadow-[0_0_50px_rgba(239,68,68,0.05)] space-y-6">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto text-2xl font-extrabold shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                            !
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight text-white animate-pulse">Event not found</h2>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                {error || "The event you are looking for does not exist or has been removed."}
                            </p>
                        </div>
                        <div className="pt-2">
                            <Link
                                href="/events"
                                className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-red-500/10 border border-red-500/30 hover:bg-red-500 hover:text-black hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] px-6 py-3 rounded-full transition-all duration-300 active:scale-[0.98]"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back to events
                            </Link>
                        </div>
                    </div>
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
        <div className="bg-black text-white min-h-screen relative overflow-hidden tech-grid pb-24">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[180px] pointer-events-none select-none z-0 animate-float-glow-1" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none select-none z-0 animate-float-glow-2" />

            {/* Back Button Floating on top of hero */}
            <div className="absolute top-28 left-6 z-30">
                <Link
                    href="/events"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-orange-500 bg-black/60 border border-white/5 hover:border-orange-500/30 hover:bg-orange-500/5 backdrop-blur-md px-4 py-2 rounded-full transition-all duration-300 group shadow-lg"
                >
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    Back to all events
                </Link>
            </div>

            {/* Structure top element: Curved header banner (Hero) */}
            <div className="relative h-[32rem] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {event.coverImage ? (
                        <Image
                            src={event.coverImage}
                            alt={event.title}
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-950" />
                    )}
                    <div className="absolute inset-0 bg-black/75 backdrop-blur-[3px]" />
                </div>

                <div className="relative z-10 text-center space-y-4 px-6 max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight uppercase bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
                        {event.title}
                    </h1>
                    <div className="flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span className="text-orange-500">→</span>
                        <Link href="/events" className="hover:text-white transition-colors">Events</Link>
                        <span className="text-orange-500">→</span>
                        <span className="text-orange-500 font-extrabold">{event.title}</span>
                    </div>
                </div>
                {/* Curved transition bar matching the target structure */}
                <div className="absolute bottom-0 w-full h-16 bg-black rounded-t-[3.5rem] z-20" />
            </div>

            {/* Structure main content body container */}
            <Container className="relative z-30 max-w-7xl px-6">
                <div className="grid md:grid-cols-2 gap-16 items-start">

                    {/* Structure Left: flex gap-6 layout */}
                    <div className="flex gap-6 lg:h-[28rem] w-full">
                        {/* Tall main cover card */}
                        <div
                            onClick={() => setActiveImageIndex(0)}
                            className="flex-1 rounded-[2.5rem] h-full overflow-hidden shadow-xl border border-white/5 relative group/gal cursor-pointer bg-neutral-950"
                        >
                            {event.coverImage ? (
                                <Image
                                    src={event.coverImage}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover/gal:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                                    <span className="text-zinc-500 text-xs">No Image Available</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-orange-950/20 opacity-0 group-hover/gal:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider text-white border border-white/10">
                                    View Image
                                </span>
                            </div>
                        </div>

                        {/* Stacked right columns */}
                        <div className="flex-grow flex-1 space-y-6 flex flex-col justify-between h-full">
                            {/* Top Square image */}
                            <div
                                onClick={() => event.gallery && event.gallery.length > 0 ? setActiveImageIndex(0) : null}
                                className="rounded-[2.5rem] overflow-hidden shadow-lg aspect-square border border-white/5 relative group/gal2 cursor-pointer bg-neutral-900"
                            >
                                <Image
                                    src={event.gallery && event.gallery.length > 0 ? event.gallery[0].imageUrl : (event.coverImage || "")}
                                    alt="Event detail"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover/gal2:scale-105"
                                />
                                <div className="absolute inset-0 bg-orange-950/20 opacity-0 group-hover/gal2:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider text-white border border-white/10">
                                        View Image
                                    </span>
                                </div>
                            </div>

                            {/* Bottom availability metrics stat box */}
                            <div className="bg-white/[0.01] border border-white/[0.06] backdrop-blur-md text-white p-8 rounded-[2.5rem] text-center shadow-2xl flex flex-col justify-center items-center flex-1">
                                <div className="text-5xl font-black mb-1 text-orange-500">
                                    {isSoldOut ? "0" : event.seats}
                                </div>
                                <div className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">
                                    {isSoldOut ? "Sold Out" : "Seats Remaining"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Structure Right: padded content panel card with grid items and booking selectors */}
                    <div className="bg-white/[0.01] border border-white/[0.05] backdrop-blur-md p-10 md:p-14 rounded-[2.5rem] space-y-8 shadow-2xl relative overflow-hidden group/details">
                        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-orange-500/5 blur-[40px] pointer-events-none" />

                        <div className="space-y-4">
                            <span className="text-xs font-black uppercase tracking-[0.25em] text-orange-500">
                                Event Description
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] text-white">
                                Innovative Strategies for Event Prosperity
                            </h2>
                        </div>

                        <p className="text-neutral-400 leading-relaxed text-sm whitespace-pre-wrap">
                            {event.description}
                        </p>

                        {/* Info details grid structure containing event details */}
                        <div className="grid grid-cols-2 gap-y-5 gap-x-6 border-t border-b border-white/5 py-6">
                            {[
                                { label: "Event Date", value: formattedDate, icon: Calendar },
                                { label: "Timing", value: `${event.startTime} ${event.endTime ? `- ${event.endTime}` : ""}`, icon: Clock },
                                { label: "Location", value: event.location, icon: MapPin },
                                { label: "Ticket Price", value: event.price === 0 ? "Free Entry" : `₹${event.price}`, icon: Ticket },
                            ].map((item, i) => (
                                <div key={item.label} className="flex items-start gap-2.5">
                                    <div className="size-5.5 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <item.icon className="size-3 text-orange-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                                            {item.label}
                                        </span>
                                        <span className="text-[11px] font-semibold text-neutral-300 leading-tight">
                                            {item.value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Booking area corresponding to learn more/button section of structure */}
                        <div className="pt-2">
                            {bookingSuccess ? (
                                <div className="text-center py-4 space-y-4 animate-[fadeIn_0.5s_ease_out]">
                                    <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(249,115,22,0.15)]">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base font-bold text-white">Tickets Booked Successfully!</h3>
                                        <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                                            We've reserved {ticketQuantity} {ticketQuantity === 1 ? "ticket" : "tickets"} for you. Check your email for details.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setBookingSuccess(false)}
                                        className="text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors uppercase tracking-widest border-b border-orange-500/30 hover:border-orange-400 pb-0.5 cursor-pointer"
                                    >
                                        Book More Tickets
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-white text-sm">Select Tickets</h4>
                                            <p className="text-[10px] text-neutral-400">
                                                {isSoldOut ? "No seats left." : `Choose quantity (Max ${Math.min(5, event.seats)} per booking)`}
                                            </p>
                                        </div>

                                        {!isSoldOut && (
                                            <div className="flex items-center gap-3 bg-black/40 border border-white/5 px-2.5 py-1 rounded-full shrink-0">
                                                <button
                                                    onClick={() => setTicketQuantity(prev => Math.max(1, prev - 1))}
                                                    disabled={ticketQuantity <= 1}
                                                    className="w-7 h-7 rounded-full border border-white/10 bg-white/[0.02] hover:border-orange-500/50 flex items-center justify-center text-zinc-300 hover:text-white disabled:opacity-40 disabled:hover:border-white/10 disabled:cursor-not-allowed cursor-pointer active:scale-90 transition-all font-bold text-xs"
                                                >
                                                    -
                                                </button>
                                                <span className="text-xs font-bold w-5 text-center text-white">{ticketQuantity}</span>
                                                <button
                                                    onClick={() => setTicketQuantity(prev => Math.min(Math.min(5, event.seats), prev + 1))}
                                                    disabled={ticketQuantity >= Math.min(5, event.seats)}
                                                    className="w-7 h-7 rounded-full border border-white/10 bg-white/[0.02] hover:border-orange-500/50 flex items-center justify-center text-zinc-300 hover:text-white disabled:opacity-40 disabled:hover:border-white/10 disabled:cursor-not-allowed cursor-pointer active:scale-90 transition-all font-bold text-xs"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5 gap-4">
                                        <div className="space-y-0.5 flex-grow">
                                            <span className="text-neutral-500 text-[9px] uppercase font-bold tracking-wider block">Total Price</span>
                                            {event.price === 0 ? (
                                                <span className="block text-xl font-black text-emerald-400 leading-none">Free</span>
                                            ) : (
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-xl font-black text-white leading-none">
                                                        ₹{event.price * ticketQuantity}
                                                    </span>
                                                    {ticketQuantity > 1 && (
                                                        <span className="text-[9px] text-neutral-500 font-medium">
                                                            (₹{event.price} × {ticketQuantity})
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={handleBookTickets}
                                            disabled={isSoldOut || isBooking}
                                            className="bg-orange-500 hover:bg-orange-600 active:scale-[0.97] disabled:bg-zinc-800 disabled:text-zinc-500 disabled:scale-100 disabled:cursor-not-allowed text-black font-extrabold text-xs px-8 py-3 rounded-full transition-all duration-300 shadow-[0_4px_15px_rgba(249,115,22,0.15)] hover:shadow-[0_4px_20px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest shrink-0"
                                        >
                                            {isBooking ? (
                                                <span className="flex items-center gap-1.5 py-0.5 px-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce" />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce [animation-delay:0.2s]" />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce [animation-delay:0.4s]" />
                                                </span>
                                            ) : isSoldOut ? (
                                                "Sold Out"
                                            ) : (
                                                "Book Tickets"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* Secondary Layout for Markdown content & additional gallery */}
                {(event.content || (event.gallery && event.gallery.length > 0)) && (
                    <div className="mt-16 border-t border-white/5 pt-16 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                        {/* Markdown Event Content */}
                        {event.content && (
                            <div className="w-full lg:w-[55%] shrink-0 p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/[0.03] backdrop-blur-md shadow-xl space-y-6">
                                <h3 className="text-xl font-bold text-white tracking-wide border-b border-white/5 pb-3">
                                    Detailed Information
                                </h3>
                                <div className="prose-custom text-neutral-300 text-sm leading-relaxed space-y-4 
                                    [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-6 [&_h1]:mb-2
                                    [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-6 [&_h2]:mb-2
                                    [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-white [&_h3]:mt-4 [&_h3]:mb-1
                                    [&_p]:leading-relaxed [&_p]:mb-4
                                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-2
                                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-2
                                    [&_li]:text-neutral-400 [&_strong]:text-white [&_strong]:font-bold
                                    [&_a]:text-orange-400 [&_a]:underline hover:[&_a]:text-orange-300
                                    [&_blockquote]:border-l-4 [&_blockquote]:border-orange-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4
                                ">
                                    <Markdown content={event.content} />
                                </div>
                            </div>
                        )}

                        {/* Additional Gallery Items */}
                        {event.gallery && event.gallery.length > 0 && (
                            <div className="flex-grow w-full space-y-6">
                                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                                    Gallery
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {event.gallery.slice(0, 3).map((image, idx) => {
                                        const isLastDisplayed = idx === 2;
                                        const showOverlay = isLastDisplayed && event.gallery.length > 3;
                                        const remainingCount = event.gallery.length - 3;

                                        return (
                                            <div
                                                key={image.id}
                                                onClick={() => setActiveImageIndex(idx)}
                                                className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/5 cursor-pointer group/gal bg-neutral-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-[0_8px_20px_rgba(249,115,22,0.15)]"
                                            >
                                                <Image
                                                    src={image.imageUrl}
                                                    alt={`Event Gallery ${idx + 1}`}
                                                    fill
                                                    className="object-cover transition-transform duration-750 ease-out group-hover/gal:scale-105"
                                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 15vw"
                                                />
                                                {showOverlay ? (
                                                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center transition-colors duration-300 group-hover/gal:bg-black/60">
                                                        <span className="text-2xl font-black text-white">+{remainingCount}</span>
                                                        <span className="text-[10px] uppercase font-bold tracking-widest text-orange-400 mt-1">
                                                            View More
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="absolute inset-0 bg-orange-950/20 opacity-0 group-hover/gal:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                        <span className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider text-white border border-white/10">
                                                            View Image
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Container>

            {/* Gallery Lightbox Modal */}
            {activeImageIndex !== null && event.gallery && event.gallery[activeImageIndex] && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-[fadeIn_0.2s_ease_out]">
                    <div
                        className="absolute inset-0 cursor-zoom-out"
                        onClick={() => setActiveImageIndex(null)}
                    />

                    {/* Close Button */}
                    <button
                        onClick={() => setActiveImageIndex(null)}
                        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-105"
                        aria-label="Close Lightbox"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Prev Button */}
                    {event.gallery.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveImageIndex(prev =>
                                    prev !== null
                                        ? (prev - 1 + event.gallery.length) % event.gallery.length
                                        : 0
                                );
                            }}
                            className="absolute left-6 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-105"
                            aria-label="Previous Image"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    )}

                    {/* Next Button */}
                    {event.gallery.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveImageIndex(prev =>
                                    prev !== null
                                        ? (prev + 1) % event.gallery.length
                                        : 0
                                );
                            }}
                            className="absolute right-6 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-105"
                            aria-label="Next Image"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    )}

                    {/* Large Image Container */}
                    <div className="relative max-w-[90vw] max-h-[80vh] aspect-[4/3] w-full sm:w-[600px] md:w-[800px] overflow-hidden rounded-2xl border border-white/10 select-none animate-[zoomIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]">
                        <Image
                            src={event.gallery[activeImageIndex].imageUrl}
                            alt={`Gallery view index ${activeImageIndex}`}
                            fill
                            className="object-contain"
                            priority
                        />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-300 border border-white/10">
                            {activeImageIndex + 1} / {event.gallery.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
