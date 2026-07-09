import Image from "next/image";
import { Event } from "./types";
import {
    MapPin,
    Calendar as CalendarIcon,
    Clock,
    Users,
    Ticket,
    Edit,
    Trash2
} from "lucide-react";

interface props {
    event: Event;
    onEdit: (event: Event) => void;
    onDelete: (id: string) => void;
}

export default function EventCard({ event, onEdit, onDelete }: props) {
    return (
        <div
            className="
                overflow-hidden
                rounded-xl
                border
                border-zinc-200
                bg-white
                shadow-xs
                hover:shadow-sm
                transition-shadow
                duration-150
                flex
                flex-col
                sm:flex-row
            "
        >
            {/* Cover Image */}
            <div className="relative h-52 w-full sm:w-72 shrink-0 overflow-hidden bg-zinc-100 border-b sm:border-b-0 sm:border-r border-zinc-200">
                <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 288px"
                    className="object-cover"
                />

                {/* Status Badge overlay on image */}
                <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${event.status === "PUBLISHED"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                        {event.status}
                    </span>
                </div>
            </div>

            {/* Event Details */}
            <div className="flex flex-1 flex-col justify-between p-5 text-zinc-900">
                <div>
                    <h2 className="text-base font-bold tracking-tight text-zinc-900 hover:text-orange-600 transition-colors">
                        {event.title}
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500 line-clamp-2 max-w-xl">
                        {event.description}
                    </p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                            <CalendarIcon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span>{new Date(event.eventDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                            <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span>{event.startTime} - {event.endTime}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-3.5 border-t border-zinc-100">
                    {/* Metrics Badges */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 border border-orange-100 text-xs font-bold font-mono">
                            <Ticket className="w-3.5 h-3.5 text-orange-600/70" />
                            <span>{event.price === 0 ? "Free" : `₹${event.price}`}</span>
                        </div>

                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold">
                            <Users className="w-3.5 h-3.5 text-blue-600/70" />
                            <span>{event.seats} Seats</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(event)}
                            className="
                                flex
                                items-center
                                gap-1
                                rounded-lg
                                border
                                border-zinc-200
                                bg-white
                                hover:bg-zinc-50
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-zinc-700
                                hover:text-zinc-900
                                transition-colors
                                cursor-pointer
                            "
                        >
                            <Edit className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Edit</span>
                        </button>

                        <button
                            onClick={() => onDelete(event.id)}
                            className="
                                flex
                                items-center
                                gap-1
                                rounded-lg
                                bg-red-50
                                hover:bg-red-600
                                border
                                border-red-200
                                hover:border-red-600
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-red-600
                                hover:text-white
                                transition-colors
                                cursor-pointer
                            "
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
