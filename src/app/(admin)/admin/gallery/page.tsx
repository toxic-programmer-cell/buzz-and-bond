"use client";

import { useState } from "react";

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

    const [selectedImage, setSelectedImage] =
        useState<GalleryImage | null>(null);

    const handleDeleteClick = (image: GalleryImage) => {
        setSelectedImage(image)
        setDeleteOpen(true)
    }

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
        return <div>Loading...</div>;
    }

    return (
        <main className="space-y-8">

            <GalleryHeader
                onUpload={() => setOpen(true)}
            />

            <GalleryGrid
                images={images}
                onDelete={handleDeleteClick}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
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
                />
            </GalleryUploadModal>

            <DeleteDialog
                open={deleteOpen}
                title={selectedImage?.title}
                onClose={() => setDeleteOpen(false)}
                onConfirm={confirmDelete}
            />

        </main>
    );
}