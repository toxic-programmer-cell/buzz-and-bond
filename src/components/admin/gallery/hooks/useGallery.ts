import { GalleryImage } from "../type";
import { useEffect, useState } from "react";

export default function useGallery() {

    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchGallery = async (targetPage = page) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/gallery?page=${targetPage}&limit=12`);

            if (!response.ok) {
                throw new Error("Failed to fetch gallery")
            }

            const data = await response.json()
            setImages(data.gallery || [])
            setTotalPages(data.totalPages || 1)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGallery(page)
    }, [page])

    return { images, loading, fetchGallery, page, totalPages, setPage }
}