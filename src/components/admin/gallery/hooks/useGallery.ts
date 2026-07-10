import { GalleryImage } from "../type";
import { useEffect, useState } from "react";

export default function useGallery() {

    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchGallery = async () => {
        try {
            const response = await fetch('/api/gallery');

            if (!response.ok) {
                throw new Error("Failed to fetch gallery")
            }

            const data = await response.json()

            setImages(data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGallery()
    }, [])

    return { images, loading, fetchGallery }
}