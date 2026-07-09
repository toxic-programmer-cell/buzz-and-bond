import EventCard from "./EventCard";
import { Event } from "./types";
import { Calendar } from "lucide-react";

interface Props {
    events: Event[];
    onEdit: (event: Event) => void;
    onDelete: (id: string) => void;
}

export default function EventList({ events, onEdit, onDelete }: Props) {
    if (!events?.length) {
        return (
            <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-12 text-center flex flex-col items-center justify-center shadow-xs">
                <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-400">
                    <Calendar className="w-6 h-6" />
                </div>
                
                <h2 className="text-sm font-bold text-zinc-900 mt-3">
                    No Events Found
                </h2>

                <p className="mt-1 text-xs text-zinc-500 max-w-xs mx-auto">
                    Click "Add Event" to create and publish your first community event.
                </p>
            </div>
        );
    }
    return (
        <div className="grid gap-6">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    event={event}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}