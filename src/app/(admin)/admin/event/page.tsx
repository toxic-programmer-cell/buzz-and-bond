'use client'

import { DeleteDialog, EventForm, EventHeader, EventList, EventModal } from "@/components/admin/events";
import { useState } from "react";
import { Event } from "@/components/admin/events/types";
import useEvents from "@/components/admin/events/hooks/useEvents";
import { Loader2, MessageSquare } from "lucide-react";

export default function EventPage() {
    const { events, loading, fetchEvents } = useEvents();
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    async function deleteEvent() {
        if (!selectedEvent) return;

        const res = await fetch(`/api/event/${selectedEvent.id}`, { method: "DELETE" });

        if (!res.ok) {
            alert("Event Deletion failed");
            return;
        }

        setDeleteOpen(false);
        setSelectedEvent(null);
        fetchEvents();
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-zinc-500 bg-[#F9F9F6]">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600 mb-4" />
                <p className="text-sm font-medium">Loading community events...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F9F9F6] text-zinc-900 font-sans pb-12">

            {/* Top Dark Banner - Reference adapt */}
            <div className="bg-[#18181b] rounded-b-[40px] pt-12 pb-32 px-8 select-none">
                <div className="max-w-[1400px] mx-auto">
                    {/* Breadcrumbs */}
                    <div className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase flex items-center gap-1.5 mb-2">
                        <span>Overview</span>
                        <span className="text-zinc-500">&gt;</span>
                        <span className="text-white font-extrabold">Events</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Events
                    </h1>
                </div>
            </div>

            {/* Overlapping Content Area */}
            <div className="max-w-[1400px] mx-auto w-full px-8 -mt-24 flex flex-col gap-8">

                {/* Main Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Left: Events Card Container */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white rounded-[28px] p-8 shadow-xs border border-zinc-100/50 flex flex-col gap-6">
                            <EventHeader onAdd={() => setOpen(true)} />
                            <EventList
                                events={events}
                                onEdit={(event) => { setSelectedEvent(event); setOpen(true); }}
                                onDelete={(id) => {
                                    const event = events.find((e) => e.id === id);
                                    if (!event) return;
                                    setSelectedEvent(event);
                                    setDeleteOpen(true);
                                }}
                            />
                        </div>
                    </div>

                    {/* Right: Chat Panel Adaptation */}
                    {/* <div className="space-y-6">
                        <div className="bg-white rounded-[28px] shadow-xs border border-zinc-100/50 overflow-hidden flex flex-col h-[420px]">
                            <div className="flex bg-zinc-100/80 p-1 select-none">
                                <button className="flex-1 py-2.5 text-xs font-bold text-center bg-white text-[#0D5C53] rounded-2xl shadow-3-xs">
                                    Updates & Tips
                                </button>
                                <button className="flex-1 py-2.5 text-xs font-bold text-center text-zinc-400 hover:text-zinc-700">
                                    System Helper
                                </button>
                            </div>
                            
                            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs select-none">
                                <div className="flex justify-start">
                                    <div className="bg-red-50 text-red-600 border border-red-100/60 p-3 rounded-2xl max-w-[85%] font-medium">
                                        🔔 Action required: Review seat allocations for रांची Summer Event details.
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <div className="bg-zinc-50 border border-zinc-200/50 text-zinc-700 p-3 rounded-2xl max-w-[85%] font-medium">
                                        Are seats custom configurable per event?
                                    </div>
                                </div>
                                <div className="flex justify-start">
                                    <div className="bg-orange-50 text-orange-700 border border-orange-100/50 p-3 rounded-2xl max-w-[85%] font-medium">
                                        💡 Yes! Simply edit the event and adjust "Total Seats" input field.
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-3 border-t border-zinc-100 bg-zinc-50/50 flex items-center gap-2">
                                <input 
                                    type="text" 
                                    placeholder="Ask admin assistant..." 
                                    className="flex-1 h-9 px-3.5 bg-white border border-zinc-200 rounded-xl text-xs focus:outline-none"
                                    disabled
                                />
                                <button className="h-9 px-4 bg-[#0D5C53] text-white rounded-xl text-xs font-bold shadow-xs cursor-not-allowed" disabled>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Bottom Row Information Cards */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white rounded-[28px] p-6 border border-zinc-100/50 shadow-xs flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100/50 flex items-center justify-center font-bold">
                                📋
                            </div>
                            <h3 className="font-extrabold text-sm text-zinc-950">Events Info</h3>
                        </div>
                        <div className="space-y-2.5 mt-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Total Listings</span>
                                <span className="font-bold text-zinc-900">{events.length} Events</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Free Entry</span>
                                <span className="font-bold text-zinc-900">{events.filter(e => e.price === 0).length} Listings</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Seats Capacity</span>
                                <span className="font-bold text-zinc-900">{events.reduce((acc, e) => acc + e.seats, 0)} Seats</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[28px] p-6 border border-zinc-100/50 shadow-xs flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100/50 flex items-center justify-center font-bold">
                                🤝
                            </div>
                            <h3 className="font-extrabold text-sm text-zinc-950">Coordination</h3>
                        </div>
                        <div className="space-y-2.5 mt-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Coordinator</span>
                                <span className="font-bold text-zinc-900">Ranchi HQ Office</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Scope</span>
                                <span className="font-bold text-zinc-900">Buzz & Bond Ranchi</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Support</span>
                                <span className="font-bold text-zinc-900">active@buzzbond.in</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[28px] p-6 border border-zinc-100/50 shadow-xs flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100/50 flex items-center justify-center font-bold">
                                ⚖️
                            </div>
                            <h3 className="font-extrabold text-sm text-zinc-950">Guidelines</h3>
                        </div>
                        <div className="space-y-2.5 mt-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Free Access</span>
                                <span className="font-bold text-zinc-900">₹0 Ticket Pricing</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Premium Entry</span>
                                <span className="font-bold text-zinc-900">₹499 - ₹2,999 Tickets</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Currency Mode</span>
                                <span className="font-bold text-zinc-900">INR (₹) Standard</span>
                            </div>
                        </div>
                    </div>
                </div> */}

            </div>

            {/* Modals & Dialogs */}
            <EventModal open={open} onClose={() => { setOpen(false); setSelectedEvent(null); }}>
                <EventForm
                    key={selectedEvent?.id || "new"}
                    event={selectedEvent || undefined}
                    onClose={() => {
                        setOpen(false);
                        setSelectedEvent(null);
                        fetchEvents();
                    }}
                />
            </EventModal>

            <DeleteDialog
                open={deleteOpen}
                title={selectedEvent?.title || ""}
                onCancel={() => setDeleteOpen(false)}
                onConfirm={deleteEvent}
            />
        </div>
    );
}