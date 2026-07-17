"use client";

import { EventInput, EventSchema } from "@/validations/event.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UploadCloud, PlusCircle, AlertCircle, X } from "lucide-react";
import { Event } from "./types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import MarkdownEditor from "@/MarkdownEditor";

interface Props {
    event?: Event
    onClose: () => void;
}

export default function EventForm({ onClose, event }: Props) {
    const [preview, setPreview] = useState("");
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
            const urls: string[] = [];
            for (const file of Array.from(files)) {
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

                urls.push(data.url);
            }

            setGalleryPreview(prev => {
                const updated = [...prev, ...urls];
                setValue("gallery", updated);
                return updated;
            });

            e.target.value = "";
        } catch (error) {
            console.error("Gallery upload error", error);
        } finally {
            setGalleryUploading(false);
        }
    }

    const removeGalleryImage = (url: string) => {
        const updated = galleryPreview.filter(image => image !== url);
        setGalleryPreview(updated);
        setValue("gallery", updated);
    };

    useEffect(() => {
        if (event) {
            const galleryUrls = event.gallery.map(image => image.imageUrl);

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
            setPreview("");
            setGalleryPreview([]);
        }
    }, [event, reset]);

    async function onSubmit(data: EventInput) {
        try {
            const url = event ? `/api/event/${event.id}` : "/api/event";
            const method = event ? "PATCH" : "POST";

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
            data-lenis-prevent
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col text-zinc-900 min-h-0 h-full"
        >
            {/* Form Header */}
            <div className="p-5 md:p-6 pb-4 border-b border-zinc-100 flex-shrink-0 flex items-center justify-between bg-white">
                <div>
                    <h2 className="text-base font-bold text-zinc-950">
                        {event ? "Edit Event" : "Add Event"}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">
                        {event ? "Modify the details of the event." : "Fill in the details below to create a new event."}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 text-zinc-400 hover:text-zinc-950 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Form Fields Scroll Container */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 min-h-0 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Title */}
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Event Title</label>
                        <input
                            placeholder="e.g. Ranchi Corporate Product Launch"
                            {...register("title")}
                            className="w-full bg-white border border-zinc-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-3.5 py-2 text-zinc-800 placeholder-zinc-400 focus:outline-none transition-all text-sm h-11"
                        />
                        {errors.title && (
                            <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                {errors.title.message}
                            </span>
                        )}
                    </div>

                    {/* Location */}
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Location</label>
                        <input
                            placeholder="e.g. Radisson Blu, Ranchi"
                            {...register("location")}
                            className="w-full bg-white border border-zinc-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-3.5 py-2 text-zinc-800 placeholder-zinc-400 focus:outline-none transition-all text-sm h-11"
                        />
                        {errors.location && (
                            <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                {errors.location.message || "Location must be at least 3 characters"}
                            </span>
                        )}
                    </div>

                    {/* Cover Image Upload Area */}
                    <div className="col-span-2 flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Cover Image</label>
                        <label className="flex flex-col items-center justify-center h-40 rounded-2xl border-2 border-dashed border-zinc-200 hover:border-orange-500 bg-zinc-50/40 hover:bg-orange-50/10 cursor-pointer transition-all duration-200 p-6 group">
                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={uploadImage}
                            />
                            <div className="flex flex-col items-center justify-center text-center">
                                <UploadCloud className="w-8 h-8 text-zinc-400 group-hover:text-orange-500 transition-colors mb-2" />
                                <p className="text-xs font-bold text-zinc-950">
                                    {coverUploading ? "Uploading cover..." : "Upload cover image"}
                                </p>
                                <p className="text-[9px] text-zinc-400 mt-1 uppercase tracking-wider font-semibold">PNG, JPG, WEBP up to 5MB</p>
                            </div>
                        </label>

                        {preview && (
                            <div className="relative h-44 overflow-hidden rounded-2xl border border-zinc-200/50 mt-2 select-none">
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

                    {/* Gallery Images Upload Area */}
                    <div className="col-span-2 flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Gallery Images</label>
                        <label className="flex flex-col items-center justify-center h-32 rounded-2xl border-2 border-dashed border-zinc-200 hover:border-orange-500 bg-zinc-50/40 hover:bg-orange-50/10 cursor-pointer transition-all duration-200 p-4 group">
                            <input
                                hidden
                                multiple
                                type="file"
                                accept="image/*"
                                onChange={uploadGallery}
                            />
                            <div className="flex flex-col items-center justify-center text-center">
                                <PlusCircle className="w-7 h-7 text-zinc-400 group-hover:text-orange-500 transition-colors mb-1.5" />
                                <p className="text-xs font-bold text-zinc-950">
                                    {galleryUploading ? "Uploading gallery images..." : "Upload gallery images"}
                                </p>
                                <p className="text-[9px] text-zinc-400 mt-0.5 uppercase tracking-wider font-semibold">Select multiple files</p>
                            </div>
                        </label>

                        {galleryPreview.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                                {galleryPreview.map((image) => (
                                    <div
                                        key={image}
                                        className="relative aspect-square rounded-xl overflow-hidden border border-zinc-200/50 group"
                                    >
                                        <Image
                                            fill
                                            src={image}
                                            alt=""
                                            className="object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeGalleryImage(image)}
                                            className="absolute top-1.5 right-1.5 h-6 w-6 rounded-lg bg-black/60 hover:bg-red-500 text-white flex items-center justify-center transition-colors text-sm font-bold cursor-pointer"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Event Date */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Event Date</label>
                        <input
                            type="date"
                            {...register("eventDate")}
                            className="w-full bg-white border border-zinc-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-3.5 py-2 text-zinc-800 focus:outline-none transition-all text-sm h-11"
                        />
                        {errors.eventDate && (
                            <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                {errors.eventDate.message || "Date is required"}
                            </span>
                        )}
                    </div>

                    {/* Seats */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Total Seats</label>
                        <input
                            type="number"
                            placeholder="100"
                            {...register("seats", { valueAsNumber: true })}
                            className="w-full bg-white border border-zinc-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-3.5 py-2 text-zinc-800 placeholder-zinc-400 focus:outline-none transition-all text-sm h-11"
                        />
                        {errors.seats && (
                            <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                {errors.seats.message || "Seats must be at least 1"}
                            </span>
                        )}
                    </div>

                    {/* Start Time */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Start Time</label>
                        <input
                            type="time"
                            {...register("startTime")}
                            className="w-full bg-white border border-zinc-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-3.5 py-2 text-zinc-800 focus:outline-none transition-all text-sm h-11"
                        />
                        {errors.startTime && (
                            <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                {errors.startTime.message || "Start time is required"}
                            </span>
                        )}
                    </div>

                    {/* End Time */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">End Time</label>
                        <input
                            type="time"
                            {...register("endTime")}
                            className="w-full bg-white border border-zinc-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-3.5 py-2 text-zinc-800 focus:outline-none transition-all text-sm h-11"
                        />
                        {errors.endTime && (
                            <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                {errors.endTime.message || "End time is required"}
                            </span>
                        )}
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Ticket Price (₹)</label>
                        <input
                            type="number"
                            placeholder="0 for Free"
                            {...register("price", { valueAsNumber: true })}
                            className="w-full bg-white border border-zinc-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-3.5 py-2 text-zinc-800 placeholder-zinc-400 focus:outline-none transition-all text-sm h-11"
                        />
                        {errors.price && (
                            <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                {errors.price.message || "Price must be 0 or greater"}
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Description</label>
                        <textarea
                            rows={3}
                            placeholder="Describe the event itinerary, speakers, or highlight details..."
                            {...register("description")}
                            className="w-full bg-white border border-zinc-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-3.5 py-2.5 text-zinc-800 placeholder-zinc-400 focus:outline-none transition-all text-sm resize-none"
                        />
                        {errors.description && (
                            <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                {errors.description.message || "Description must be at least 10 characters"}
                            </span>
                        )}
                    </div>

                    {/* Content Markdown Editor */}
                    <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                Event Content
                            </label>

                            {/* GitHub styled tab triggers */}
                            <div className="flex gap-1 select-none">
                                <button
                                    type="button"
                                    onClick={() => setMarkdownTab("write")}
                                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${markdownTab === "write"
                                        ? "border-orange-500 text-orange-600"
                                        : "border-transparent text-zinc-400 hover:text-zinc-700"
                                        }`}
                                >
                                    Write
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMarkdownTab("preview")}
                                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${markdownTab === "preview"
                                        ? "border-orange-500 text-orange-600"
                                        : "border-transparent text-zinc-400 hover:text-zinc-700"
                                        }`}
                                >
                                    Preview
                                </button>
                            </div>
                        </div>

                        <Controller
                            control={control}
                            name="content"
                            render={({ field }) => (
                                <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-2-xs">
                                    <MarkdownEditor
                                        value={field.value ?? ""}
                                        onChange={field.onChange}
                                        preview={markdownTab === "write" ? "edit" : "preview"}
                                    />
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* Sticky Form Footer */}
            <div className="flex justify-end gap-2 p-5 md:p-6 pt-4 border-t border-zinc-100 bg-zinc-50/50 flex-shrink-0 sticky bottom-0 z-10 backdrop-blur-md">
                <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={onClose}
                    className="
                        rounded-xl
                        border
                        border-zinc-200
                        bg-white
                        hover:bg-zinc-50
                        px-4
                        py-2
                        h-10
                        text-xs
                        font-bold
                        text-zinc-700
                        transition-all
                        cursor-pointer
                        shadow-2-xs
                        active:translate-y-[1px]
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
                        rounded-xl
                        bg-gradient-to-r
                        from-orange-500
                        to-amber-500
                        text-white
                        font-bold
                        px-5
                        py-2
                        h-10
                        text-xs
                        shadow-md
                        shadow-orange-500/10
                        hover:translate-y-[-1px]
                        active:translate-y-[1px]
                        transition-all
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