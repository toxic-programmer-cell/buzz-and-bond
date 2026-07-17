"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
    GalleryHeader,
    GalleryGrid,
    useGallery,
    GalleryUploadModal,
    GalleryForm,
} from "@/components/admin/gallery";

import { GalleryImage } from "@/components/admin/gallery/type";
import DeleteDialog from "@/components/admin/gallery/DeleteDialog";

export default function GalleryPage() {
    const { images, loading, fetchGallery, page, totalPages, setPage } = useGallery();
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const handleDeleteClick = (image: GalleryImage) => {
        setSelectedImage(image);
        setDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedImage) return;

        await fetch(`/api/gallery/${selectedImage.id}`, {
            method: "DELETE",
        });

        setDeleteOpen(false);
        setSelectedImage(null);
        fetchGallery();
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-zinc-500 bg-[#F9F9F6]">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-4" />
                <p className="text-sm font-medium">Loading gallery photos...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F9F9F6] text-zinc-900 font-sans pb-12">

            {/* Top Dark Banner */}
            <div className="bg-[#18181b] rounded-b-[40px] pt-12 pb-32 px-8 select-none">
                <div className="max-w-[1400px] mx-auto">
                    {/* Breadcrumbs */}
                    <div className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase flex items-center gap-1.5 mb-2">
                        <span>Overview</span>
                        <span className="text-zinc-500">&gt;</span>
                        <span className="text-white font-extrabold">Gallery</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Gallery
                    </h1>
                </div>
            </div>

            {/* Overlapping Content Area */}
            <div className="max-w-[1400px] mx-auto w-full px-8 -mt-24 flex flex-col gap-8">

                {/* Main Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Left: Gallery Grid Card Container */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white rounded-[28px] p-8 shadow-xs border border-zinc-100/50 flex flex-col gap-6">
                            <GalleryHeader onUpload={() => setOpen(true)} />
                            <GalleryGrid
                                images={images}
                                onDelete={handleDeleteClick}
                                page={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        </div>
                    </div>

                    {/* Right: Side Helper Chat Panel */}
                    {/* <div className="space-y-6">
                        <div className="bg-white rounded-[28px] shadow-xs border border-zinc-100/50 overflow-hidden flex flex-col h-[420px]">
                            <div className="flex bg-zinc-100/80 p-1 select-none">
                                <button className="flex-1 py-2.5 text-xs font-bold text-center bg-white text-[#0D5C53] rounded-2xl shadow-3-xs">
                                    Asset Info
                                </button>
                                <button className="flex-1 py-2.5 text-xs font-bold text-center text-zinc-400 hover:text-zinc-700">
                                    Upload Log
                                </button>
                            </div>

                            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs select-none">
                                <div className="flex justify-start">
                                    <div className="bg-orange-50 text-orange-700 border border-orange-100/50 p-3 rounded-2xl max-w-[85%] font-medium">
                                        💡 Size Tip: Try to compress gallery images below 2MB for optimized site load times.
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <div className="bg-zinc-50 border border-zinc-200/50 text-zinc-700 p-3 rounded-2xl max-w-[85%] font-medium">
                                        What dimensions work best for covers?
                                    </div>
                                </div>
                                <div className="flex justify-start">
                                    <div className="bg-blue-50 text-blue-700 border border-blue-100/50 p-3 rounded-2xl max-w-[85%] font-medium">
                                        🖼️ Recommended aspect ratios are 16:9 or square (1:1) formats.
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 border-t border-zinc-100 bg-zinc-50/50 flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Ask media manager..."
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

                {/* Bottom Row Info Cards */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white rounded-[28px] p-6 border border-zinc-100/50 shadow-xs flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100/50 flex items-center justify-center font-bold">
                                💾
                            </div>
                            <h3 className="font-extrabold text-sm text-zinc-950">Storage Details</h3>
                        </div>
                        <div className="space-y-2.5 mt-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Asset Provider</span>
                                <span className="font-bold text-zinc-900">Cloudinary Sync</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">File Formats</span>
                                <span className="font-bold text-zinc-900">PNG, JPG, WEBP</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Upload Quota</span>
                                <span className="font-bold text-zinc-900">Unlimited Assets</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[28px] p-6 border border-zinc-100/50 shadow-xs flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100/50 flex items-center justify-center font-bold">
                                ⚖️
                            </div>
                            <h3 className="font-extrabold text-sm text-zinc-950">Permissions</h3>
                        </div>
                        <div className="space-y-2.5 mt-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Access Scope</span>
                                <span className="font-bold text-zinc-900">Public Gallery</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Authorizations</span>
                                <span className="font-bold text-zinc-900">Admin-only write</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Policy sync</span>
                                <span className="font-bold text-zinc-900">Auto-Enforced</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[28px] p-6 border border-zinc-100/50 shadow-xs flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100/50 flex items-center justify-center font-bold">
                                ⚙️
                            </div>
                            <h3 className="font-extrabold text-sm text-zinc-950">System Link</h3>
                        </div>
                        <div className="space-y-2.5 mt-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Sync Mode</span>
                                <span className="font-bold text-zinc-900">Dynamic DB Feed</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Optimization</span>
                                <span className="font-bold text-zinc-900">On-the-fly CDN</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Status</span>
                                <span className="font-bold text-emerald-600">Online & Active</span>
                            </div>
                        </div>
                    </div>
                </div> */}

            </div>

            {/* Modals & Dialogs */}
            <GalleryUploadModal
                open={open}
                onClose={() => setOpen(false)}
            >
                <GalleryForm
                    onSuccess={() => {
                        setOpen(false);
                        setPage(1);
                        fetchGallery(1);
                    }}
                    onClose={() => setOpen(false)}
                />
            </GalleryUploadModal>

            <DeleteDialog
                open={deleteOpen}
                title={selectedImage?.title}
                onClose={() => setDeleteOpen(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}