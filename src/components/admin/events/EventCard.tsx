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
                rounded-[22px]
                border
                border-zinc-200/60
                bg-white
                shadow-2-xs
                hover:shadow-md
                hover:border-zinc-300
                transition-all
                duration-300
                flex
                flex-col
                sm:flex-row
                group
                relative
            "
        >
            {/* Cover Image with Zoom Effect */}
            <div className="relative h-full w-full sm:w-72 shrink-0 overflow-hidden bg-zinc-50 border-b sm:border-b-0 sm:border-r border-zinc-200/60">
                <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 288px"
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                    priority
                />

                {/* Status Badge overlay */}
                <div className="absolute top-4 left-4 z-10">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border shadow-sm ${event.status === "PUBLISHED"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                        {event.status}
                    </span>
                </div>
            </div>

            {/* Event Details */}
            <div className="flex flex-1 flex-col justify-between p-6 text-zinc-900 bg-white">
                <div>
                    <h2 className="text-lg font-bold tracking-tight text-zinc-950 hover:text-orange-500 transition-colors duration-200">
                        {event.title}
                    </h2>

                    <p className="mt-1.5 text-xs text-zinc-400 font-medium line-clamp-2 max-w-xl leading-relaxed">
                        {event.description}
                    </p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 select-none">
                        <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
                            <CalendarIcon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span>{new Date(event.eventDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
                            <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span>{event.startTime} - {event.endTime}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-100">
                    {/* Metrics Badges */}
                    <div className="flex items-center gap-2 select-none">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 text-orange-700 border border-orange-100/50 text-xs font-bold font-mono shadow-3-xs">
                            <Ticket className="w-3.5 h-3.5 text-orange-600/70" />
                            <span>{event.price === 0 ? "Free" : `₹${event.price}`}</span>
                        </div>

                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-100/50 text-xs font-bold shadow-3-xs">
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
                                gap-1.5
                                rounded-xl
                                border
                                border-zinc-200
                                bg-white
                                hover:bg-zinc-50
                                px-4
                                py-2
                                text-xs
                                font-bold
                                text-zinc-700
                                hover:text-zinc-950
                                transition-all
                                shadow-2-xs
                                active:translate-y-[1px]
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
                                gap-1.5
                                rounded-xl
                                bg-red-50
                                hover:bg-red-500
                                border
                                border-red-100
                                hover:border-red-500
                                px-4
                                py-2
                                text-xs
                                font-bold
                                text-red-600
                                hover:text-white
                                transition-all
                                shadow-2-xs
                                active:translate-y-[1px]
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
