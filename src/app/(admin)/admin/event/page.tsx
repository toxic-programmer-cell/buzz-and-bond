'use client'

import { DeleteDialog, EventForm, EventHeader, EventList, EventModal } from "@/components/admin/events";
import { useState } from "react";
import { Event } from "@/components/admin/events/types";
import useEvents from "@/components/admin/events/hooks/useEvents";
import { Loader2 } from "lucide-react";

export default function EventPage() {

    const { events, loading, fetchEvents } = useEvents();

    // const [events] = useState<Event[]>([]);
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    async function deleteEvent() {
        if (!selectedEvent) return;

        const res = await fetch(`/api/event/${selectedEvent.id}`, { method: "DELETE" })

        if (!res.ok) {
            alert("Event Deletion failed")
            return;
        }

        setDeleteOpen(false)
        setSelectedEvent(null)
        fetchEvents()
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-zinc-500">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600 mb-4" />
                <p className="text-sm font-medium">Loading community events...</p>
            </div>
        )
    }

    return (
        <>
            <div className="space-y-10">
                <EventHeader onAdd={() => setOpen(true)} />
                <EventModal open={open} onClose={() => setOpen(false)}>
                    <EventForm
                        onClose={() => {
                            setOpen(false);
                            fetchEvents();
                        }}
                    />
                </EventModal>
                <DeleteDialog open={deleteOpen} title={selectedEvent?.title || ""} onCancel={() => setDeleteOpen(false)} onConfirm={deleteEvent} />

                <EventList events={events} onEdit={(event) => { setSelectedEvent(event) }} onDelete={(id) => { const event = events.find((e) => e.id === id); if (!event) return; setSelectedEvent(event); setDeleteOpen(true) }} />
            </div>
        </>
    );
}