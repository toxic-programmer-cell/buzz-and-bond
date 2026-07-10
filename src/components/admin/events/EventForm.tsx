"use client";

import { EventInput, EventSchema } from "@/validations/event.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Event } from "./types";
import { useEffect } from "react";

interface Props {
    event?: Event
    onClose: () => void;
}

export default function EventForm({ onClose, event }: Props) {

    const emptyEvent: EventInput = {
        title: "",
        description: "",
        location: "",
        eventDate: "",
        startTime: "",
        endTime: "",
        coverImage: "",
        price: 0,
        seats: 0,
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<EventInput>({
        resolver: zodResolver(EventSchema),
    });

    useEffect(() => {
        if (event) {
            reset({
                ...event,
                eventDate: event.eventDate.split("T")[0],
            });
        } else {
            reset(emptyEvent);
        }
    }, [event, reset]);

    async function onSubmit(data: EventInput) {
        try {
            const url = event
                ? `/api/event/${event.id}`
                : "/api/event";

            const method = event
                ? "PATCH"
                : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                alert("Something went wrong.");
                return;
            }

            if (!event) {

                reset(emptyEvent);
            }
            onClose();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 p-5 md:p-6 text-zinc-900"
        >
            <div>
                <h2 className="text-base font-bold text-zinc-900">
                    {event ? "Edit Event" : "Add Event"}
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                    {event ? "Modify the details of the event." : "Fill in the details below to create a new event."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Event Title</label>
                    <input
                        placeholder="e.g. Ranchi Corporate Product Launch"
                        {...register("title")}
                        className="w-full bg-white border border-zinc-300 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg p-2.5 text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors text-sm h-10"
                    />
                    {errors.title && <span className="text-[11px] text-red-600 font-medium">{errors.title.message}</span>}
                </div>

                {/* Location */}
                <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Location</label>
                    <input
                        placeholder="e.g. Radisson Blu, Ranchi"
                        {...register("location")}
                        className="w-full bg-white border border-zinc-300 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg p-2.5 text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors text-sm h-10"
                    />
                    {errors.location && <span className="text-[11px] text-red-600 font-medium">{errors.location.message || "Location must be at least 3 characters"}</span>}
                </div>

                {/* Cover Image URL */}
                <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Cover Image URL</label>
                    <input
                        placeholder="https://example.com/image.jpg"
                        {...register("coverImage")}
                        className="w-full bg-white border border-zinc-300 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg p-2.5 text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors text-sm h-10"
                    />
                    {errors.coverImage && <span className="text-[11px] text-red-600 font-medium">{errors.coverImage.message || "Cover Image must be a valid URL"}</span>}
                </div>

                {/* Event Date */}
                <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Event Date</label>
                    <input
                        type="date"
                        {...register("eventDate")}
                        className="w-full bg-white border border-zinc-300 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg p-2.5 text-zinc-900 focus:outline-none transition-colors text-sm h-10"
                    />
                    {errors.eventDate && <span className="text-[11px] text-red-600 font-medium">{errors.eventDate.message || "Date is required"}</span>}
                </div>

                {/* Seats */}
                <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Total Seats</label>
                    <input
                        type="number"
                        placeholder="100"
                        {...register("seats", { valueAsNumber: true })}
                        className="w-full bg-white border border-zinc-300 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg p-2.5 text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors text-sm h-10"
                    />
                    {errors.seats && <span className="text-[11px] text-red-600 font-medium">{errors.seats.message || "Seats must be at least 1"}</span>}
                </div>

                {/* Start Time */}
                <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Start Time</label>
                    <input
                        type="time"
                        {...register("startTime")}
                        className="w-full bg-white border border-zinc-300 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg p-2.5 text-zinc-900 focus:outline-none transition-colors text-sm h-10"
                    />
                    {errors.startTime && <span className="text-[11px] text-red-600 font-medium">{errors.startTime.message || "Start time is required"}</span>}
                </div>

                {/* End Time */}
                <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">End Time</label>
                    <input
                        type="time"
                        {...register("endTime")}
                        className="w-full bg-white border border-zinc-300 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg p-2.5 text-zinc-900 focus:outline-none transition-colors text-sm h-10"
                    />
                    {errors.endTime && <span className="text-[11px] text-red-600 font-medium">{errors.endTime.message || "End time is required"}</span>}
                </div>

                {/* Price */}
                <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Ticket Price (₹)</label>
                    <input
                        type="number"
                        placeholder="0 for Free"
                        {...register("price", { valueAsNumber: true })}
                        className="w-full bg-white border border-zinc-300 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg p-2.5 text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors text-sm h-10"
                    />
                    {errors.price && <span className="text-[11px] text-red-600 font-medium">{errors.price.message || "Price must be 0 or greater"}</span>}
                </div>

                {/* Description */}
                <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Description</label>
                    <textarea
                        rows={4}
                        placeholder="Describe the event itinerary, speakers, or highlight details..."
                        {...register("description")}
                        className="w-full bg-white border border-zinc-300 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg p-2.5 text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors text-sm resize-none"
                    />
                    {errors.description && <span className="text-[11px] text-red-600 font-medium">{errors.description.message || "Description must be at least 10 characters"}</span>}
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-zinc-100">
                <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={onClose}
                    className="
                        rounded-lg
                        border
                        border-zinc-200
                        bg-white
                        hover:bg-zinc-50
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-zinc-700
                        transition-colors
                        cursor-pointer
                        disabled:opacity-50
                    "
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-1.5
                        rounded-lg
                        bg-orange-600
                        hover:bg-orange-700
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-white
                        shadow-xs
                        transition-colors
                        cursor-pointer
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    "
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>{event ? "Saving..." : "Creating..."}</span>
                        </>
                    ) : (
                        <span>{event ? "Save Changes" : "Create Event"}</span>
                    )}
                </button>
            </div>
        </form>
    );
}