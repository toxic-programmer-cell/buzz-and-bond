"use client";

import { EventInput, EventSchema } from "@/validations/event.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Event } from "./types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import MarkdownEditor from "@/MarkdownEditor";
import { MarkdownPreview } from "@/components/Markdown";


interface Props {
    event?: Event
    onClose: () => void;
}

export default function EventForm({ onClose, event }: Props) {

    const [preview, setPreview] = useState("");
    // const [uploading, setUploading] = useState(false);
    const [coverUploading, setCoverUploading] = useState(false);
    const [galleryUploading, setGalleryUploading] = useState(false);
    const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
    const [markdownTab, setMarkdownTab] = useState<"write" | "preview">("write");

    const emptyEvent: EventInput = {
        title: "",
        description: "",
        content: "",
        location: "",
        eventDate: "",
        startTime: "",
        endTime: "",
        coverImage: "",
        price: 0,
        seats: 0,
        gallery: [],
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
        control,
        reset
    } = useForm<EventInput>({
        resolver: zodResolver(EventSchema),
        defaultValues: emptyEvent,
    });

    const uploadImage = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setCoverUploading(true);

        try {

            const formData = new FormData();

            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data.message);
                return;
            }

            setPreview(data.url);

            setValue("coverImage", data.url);
            e.target.value = "";

        } catch (error) {

            console.error(error);

        } finally {

            setCoverUploading(false);

        }
    };

    async function uploadGallery(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const files = e.target.files;

        if (!files) return;

        setGalleryUploading(true);

        try {

            // for (const file of Array.from(files)) {

            //     const formData = new FormData();

            //     formData.append("file", file);

            //     const response = await fetch("/api/upload", {
            //         method: "POST",
            //         body: formData,
            //     });

            //     const data = await response.json();

            //     if (response.ok) {
            //         urls.push(data.url);
            //     }
            // }

            const urls = await Promise.all(
                Array.from(files).map(async (file) => {

                    const formData = new FormData();

                    formData.append("file", file);

                    const response = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.message);
                    }

                    return data.url;
                })
            );

            setGalleryPreview(prev => {
                const updated = [...prev, ...urls];

                setValue("gallery", updated);

                return updated;
            });

            e.target.value = "";

        } catch (error) {
            throw new Error("Something went wrong while uploading gallery image.");

        } finally {

            setGalleryUploading(false);

        }
    }

    const removeGalleryImage = (url: string) => {

        const updated =
            galleryPreview.filter(
                image => image !== url
            );

        setGalleryPreview(updated);

        setValue("gallery", updated);

    };

    useEffect(() => {
        if (event) {
            const galleryUrls =
                event.gallery.map(image => image.imageUrl);

            reset({
                title: event.title,
                description: event.description,
                content: event.content ?? "",
                location: event.location,
                eventDate: event.eventDate.split("T")[0],
                startTime: event.startTime,
                endTime: event.endTime,
                coverImage: event.coverImage,
                price: event.price,
                seats: event.seats,
                gallery: galleryUrls,
            });

            setPreview(event.coverImage);

            setGalleryPreview(galleryUrls);
        } else {
            reset(emptyEvent);
            setPreview("")
            setGalleryPreview([])
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
            className="flex flex-col text-zinc-900 min-h-0"
        >
            <div className="p-5 md:p-6 pb-4 border-b border-zinc-100 flex-shrink-0">
                <h2 className="text-base font-bold text-zinc-900">
                    {event ? "Edit Event" : "Add Event"}
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                    {event ? "Modify the details of the event." : "Fill in the details below to create a new event."}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-5 md:p-6 min-h-0">
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
                    <div className="col-span-2 space-y-4">

                        <label className="flex h-48 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:border-black">

                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={uploadImage}
                            />

                            {coverUploading
                                ? "Uploading..."
                                : "Click to Upload Cover Image"}

                        </label>

                        {preview && (

                            <div className="relative h-60 overflow-hidden rounded-xl">

                                <Image
                                    src={preview}
                                    alt="Preview"
                                    fill
                                    sizes="100vw"
                                    className="object-cover"
                                />

                            </div>

                        )}

                    </div>

                    {/* Gallery Images */}
                    <div className="col-span-2 space-y-4">

                        <label className="text-sm font-medium">
                            Gallery Images
                        </label>

                        <label className="flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed">

                            <input
                                hidden
                                multiple
                                type="file"
                                accept="image/*"
                                onChange={uploadGallery}
                            />

                            {galleryUploading
                                ? "Uploading Gallery..."
                                : "Upload Gallery Images"}

                        </label>

                        {galleryPreview.length > 0 && (

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                {galleryPreview.map((image) => (

                                    <div
                                        key={image}
                                        className="relative aspect-square rounded-xl overflow-hidden"
                                    >

                                        <Image
                                            fill
                                            src={image}
                                            alt=""
                                            className="object-cover"
                                        />

                                        <button type="button"
                                            onClick={() => removeGalleryImage(image)}
                                            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/70 text-white hover:bg-red-600 transition"
                                        >
                                            ×
                                        </button>

                                    </div>

                                ))}

                            </div>

                        )}
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

                    {/* Markdown */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mr-2">
                            Event Content
                        </label>

                        <div className="inline-flex rounded-lg border border-zinc-200 overflow-hidden">

                            <button
                                type="button"
                                onClick={() => setMarkdownTab("write")}
                                className={`px-4 py-2 text-sm transition
                ${markdownTab === "write"
                                        ? "bg-orange-600 text-white"
                                        : "bg-white text-zinc-600 hover:bg-zinc-50"
                                    }`}
                            >
                                Write
                            </button>

                            <button
                                type="button"
                                onClick={() => setMarkdownTab("preview")}
                                className={`px-4 py-2 text-sm transition
                ${markdownTab === "preview"
                                        ? "bg-orange-600 text-white"
                                        : "bg-white text-zinc-600 hover:bg-zinc-50"
                                    }`}
                            >
                                Preview
                            </button>

                        </div>

                        <Controller
                            control={control}
                            name="content"
                            render={({ field }) => (
                                <MarkdownEditor
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                    preview={markdownTab === "write" ? "edit" : "preview"}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2 p-5 md:p-6 pt-4 border-t border-zinc-100 bg-zinc-50/50 flex-shrink-0">
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