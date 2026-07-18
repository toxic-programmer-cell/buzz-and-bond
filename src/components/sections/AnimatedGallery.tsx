"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Maximize2, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
    id: string;
    imageUrl: string;
    title: string | null;
    description: string | null;
    category: string;
}

const CATEGORIES = ["ALL", "EVENTS", "NETWORKING", "WORKSHOP", "SPEAKERS", "COMMUNITY"];

export default function AnimatedGallery() {
    const [rawGallery, setRawGallery] = useState<GalleryItem[]>([]);
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Lightbox state
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const sectionRef = useRef<HTMLDivElement>(null);
    const lightboxRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number | null>(null);

    // Fetch data from API
    useEffect(() => {
        async function fetchGallery() {
            setLoading(true);
            try {
                const res = await fetch(`/api/gallery?page=${page}&limit=12`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.gallery) {
                        setRawGallery(data.gallery);
                        // Apply selected category filtering on the new page's raw data
                        const filtered = selectedCategory === "ALL"
                            ? data.gallery
                            : data.gallery.filter((item: GalleryItem) => item.category === selectedCategory);
                        setGallery(filtered);
                        setTotalPages(data.totalPages);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch gallery images:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchGallery();
    }, [page]);

    // Filter logic with GSAP transition animation
    const filterCategory = (category: string) => {
        if (category === selectedCategory) return;

        // 1. Fade out current cards
        gsap.to(".gallery-card-wrapper", {
            opacity: 0,
            scale: 0.95,
            duration: 0.25,
            stagger: 0.02,
            onComplete: () => {
                setSelectedCategory(category);

                // If we're already on page 1, useEffect won't fire since page hasn't changed.
                // In that case, we filter the rawGallery data client-side immediately.
                if (page === 1) {
                    const filtered = category === "ALL"
                        ? rawGallery
                        : rawGallery.filter(item => item.category === category);
                    setGallery(filtered);
                } else {
                    // Changing page to 1 will trigger useEffect which does the fetch & filters.
                    setPage(1);
                }

                // Force refresh ScrollTrigger to update sizes & bounds
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 50);
            }
        });
    };

    // Page navigation with transition animation
    const handlePageChange = (newPage: number) => {
        if (newPage === page || newPage < 1 || newPage > totalPages) return;

        gsap.to(".gallery-card-wrapper", {
            opacity: 0,
            scale: 0.95,
            duration: 0.25,
            stagger: 0.02,
            onComplete: () => {
                setPage(newPage);
            }
        });
    };

    // Scroll reveal stagger triggers
    useGSAP(
        () => {
            if (loading || gallery.length === 0) return;

            const cards = gsap.utils.toArray(".gallery-card-wrapper");
            cards.forEach((card: any) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 30, scale: 0.97 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none none",
                            invalidateOnRefresh: true,
                        }
                    }
                );
            });
        },
        { dependencies: [loading, gallery], scope: sectionRef }
    );

    // Lightbox modal scale reveal animation
    const openLightbox = (index: number) => {
        setLightboxIndex(index);

        // Modal zoom-in
        setTimeout(() => {
            if (lightboxRef.current) {
                gsap.fromTo(
                    lightboxRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.4, ease: "power2.out" }
                );

                gsap.fromTo(
                    ".lightbox-content",
                    { scale: 0.9, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" }
                );
            }
        }, 10);
    };

    const closeLightbox = () => {
        if (lightboxRef.current) {
            gsap.to(".lightbox-content", {
                scale: 0.9,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            });

            gsap.to(lightboxRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => setLightboxIndex(null)
            });
        } else {
            setLightboxIndex(null);
        }
    };

    const navigateLightbox = (direction: "prev" | "next") => {
        if (lightboxIndex === null) return;

        let newIndex = lightboxIndex;
        if (direction === "prev") {
            newIndex = lightboxIndex === 0 ? gallery.length - 1 : lightboxIndex - 1;
        } else {
            newIndex = lightboxIndex === gallery.length - 1 ? 0 : lightboxIndex + 1;
        }

        gsap.to(".lightbox-img-wrapper", {
            opacity: 0,
            x: direction === "prev" ? 30 : -30,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
                setLightboxIndex(newIndex);
                gsap.fromTo(".lightbox-img-wrapper",
                    { opacity: 0, x: direction === "prev" ? -30 : 30 },
                    { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
                );
            }
        });
    };

    // Keyboard handlers for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") navigateLightbox("prev");
            if (e.key === "ArrowRight") navigateLightbox("next");
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex, gallery.length, gallery]);

    // Touch handlers for Lightbox swipe on mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;

        // Threshold of 50px for swipe action
        if (diff > 50) {
            navigateLightbox("next");
        } else if (diff < -50) {
            navigateLightbox("prev");
        }
        touchStartX.current = null;
    };

    const getGridClasses = (index: number) => {
        const pos = index % 12;
        switch (pos) {
            // Block 1 (items 0-5)
            case 0: // Left Tall
                return "col-span-1 row-span-2 md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-2";
            case 1: // Top Wide
                return "col-span-1 row-span-1 md:col-start-2 md:row-start-1 md:col-span-2 md:row-span-1";
            case 2: // Middle Center
                return "col-span-1 row-span-1 md:col-start-2 md:row-start-2 md:col-span-1 md:row-span-1";
            case 3: // Bottom Left
                return "col-span-1 row-span-1 md:col-start-1 md:row-start-3 md:col-span-1 md:row-span-1";
            case 4: // Bottom Center
                return "col-span-1 row-span-1 md:col-start-2 md:row-start-3 md:col-span-1 md:row-span-1";
            case 5: // Right Tall
                return "col-span-1 row-span-2 md:col-start-3 md:row-start-2 md:col-span-1 md:row-span-2";

            // Block 2 (items 6-11)
            case 6: // Left Tall 2
                return "col-span-1 row-span-2 md:col-start-1 md:row-start-4 md:col-span-1 md:row-span-2";
            case 7: // Top Wide 2
                return "col-span-1 row-span-1 md:col-start-2 md:row-start-4 md:col-span-2 md:row-span-1";
            case 8: // Middle Center 2
                return "col-span-1 row-span-1 md:col-start-2 md:row-start-5 md:col-span-1 md:row-span-1";
            case 9: // Bottom Left 2
                return "col-span-1 row-span-1 md:col-start-1 md:row-start-6 md:col-span-1 md:row-span-1";
            case 10: // Bottom Center 2
                return "col-span-1 row-span-1 md:col-start-2 md:row-start-6 md:col-span-1 md:row-span-1";
            case 11: // Right Tall 2
                return "col-span-1 row-span-2 md:col-start-3 md:row-start-5 md:col-span-1 md:row-span-2";

            default:
                return "";
        }
    };

    // Render a grid skeleton to prevent layout shift during fetch loading states
    const renderSkeletonGrid = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[220px]">
                {Array.from({ length: 6 }).map((_, index) => {
                    const gridClass = getGridClasses(index);
                    return (
                        <div
                            key={index}
                            className={`animate-pulse bg-[#111112] border border-white/5 rounded-2xl relative overflow-hidden flex flex-col justify-end p-6 ${gridClass}`}
                        >
                            <div className="h-3 w-1/4 bg-neutral-800/80 rounded mb-2" />
                            <div className="h-5 w-2/3 bg-neutral-800/80 rounded mb-1" />
                            <div className="h-4 w-1/2 bg-neutral-800/80 rounded" />
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <section
            ref={sectionRef}
            className="bg-black text-white relative overflow-hidden"
        >
            {/* Header / Titles */}
            <div className="py-12 md:py-16 border-b border-white/5">
                <Container>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <span className="text-orange-500 font-accent italic text-lg md:text-xl block mb-2">
                                Shared Moments
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
                                Captures &amp; Connections
                            </h2>
                        </div>

                        {/* Category filter pills */}
                        <div className="flex flex-wrap gap-2 md:gap-3 max-w-full overflow-x-auto no-scrollbar scroll-smooth">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => filterCategory(category)}
                                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${selectedCategory === category
                                        ? "bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                                        : "bg-[#0b0b0c] border border-white/5 text-neutral-400 hover:text-white hover:border-white/20"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>

            {/* Grid Section */}
            <div className="gallery-grid-section w-full py-12 md:py-20 select-none">
                <Container>
                    {loading ? (
                        renderSkeletonGrid()
                    ) : gallery.length === 0 ? (
                        <div className="h-[50vh] flex flex-col items-center justify-center border border-white/5 rounded-3xl bg-[#070708]">
                            <p className="text-neutral-500 text-sm italic">No images in this category yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[220px]">
                            {gallery.map((item, index) => {
                                const gridClass = getGridClasses(index);
                                const isSmall = index % 6 === 2 || index % 6 === 3 || index % 6 === 4;
                                return (
                                    <GalleryCard
                                        key={item.id}
                                        item={item}
                                        isSmall={isSmall}
                                        onClick={() => openLightbox(index)}
                                        className={gridClass}
                                    />
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-12">
                            <button
                                disabled={page === 1 || loading}
                                onClick={() => handlePageChange(page - 1)}
                                className="p-2.5 rounded-xl bg-[#0b0b0c] border border-white/5 text-neutral-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:hover:text-neutral-400 disabled:hover:border-white/5 disabled:cursor-not-allowed cursor-pointer transition-all duration-300"
                                aria-label="Previous Page"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-1.5">
                                {Array.from({ length: totalPages }, (_, i) => {
                                    const pageNum = i + 1;
                                    const isActive = page === pageNum;
                                    return (
                                        <button
                                            key={pageNum}
                                            disabled={loading}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`w-9 h-9 rounded-xl text-xs font-semibold tracking-wider cursor-pointer transition-all duration-300 ${isActive
                                                ? "bg-orange-500 text-black font-bold shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                                                : "bg-[#0b0b0c] border border-white/5 text-neutral-400 hover:text-white hover:border-white/20 disabled:opacity-50"
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                disabled={page === totalPages || loading}
                                onClick={() => handlePageChange(page + 1)}
                                className="p-2.5 rounded-xl bg-[#0b0b0c] border border-white/5 text-neutral-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:hover:text-neutral-400 disabled:hover:border-white/5 disabled:cursor-not-allowed cursor-pointer transition-all duration-300"
                                aria-label="Next Page"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </Container>
            </div>

            {/* Custom Lightbox Modal */}
            {lightboxIndex !== null && (
                <div
                    ref={lightboxRef}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] flex items-center justify-center p-4 md:p-8 select-none opacity-0"
                >
                    {/* Background Exit Area */}
                    <div className="absolute inset-0 z-0 cursor-zoom-out" onClick={closeLightbox} />

                    {/* Lightbox Shell */}
                    <div className="lightbox-content relative max-w-[1200px] w-full h-[75vh] md:h-[85vh] flex flex-col justify-between items-center z-10 bg-[#070708] border border-white/10 rounded-3xl p-4 md:p-6 overflow-hidden">

                        {/* Header bar: Title & Exit */}
                        <div className="w-full flex items-center justify-between pb-4 border-b border-white/5">
                            <div className="text-left">
                                <span className="text-[10px] font-bold tracking-widest text-orange-500 uppercase block mb-1">
                                    {gallery[lightboxIndex].category}
                                </span>
                                <h4 className="text-sm md:text-lg font-bold text-white leading-none">
                                    {gallery[lightboxIndex].title || "Buzz & Bond Capture"}
                                </h4>
                            </div>

                            <button
                                onClick={closeLightbox}
                                className="p-2 bg-white/5 border border-white/10 text-neutral-400 hover:text-white rounded-full hover:border-white/30 hover:scale-105 active:scale-95 cursor-pointer transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Image Viewer Track */}
                        <div className="relative flex-grow w-full flex items-center justify-center my-4 overflow-hidden">
                            {/* Previous Arrow */}
                            <button
                                onClick={() => navigateLightbox("prev")}
                                className="absolute left-2 md:left-4 z-20 p-3 bg-black/60 border border-white/5 text-neutral-400 hover:text-white rounded-full hover:border-orange-500/50 hover:text-orange-500 cursor-pointer transition-all hover:scale-105"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            {/* Center image content */}
                            <div className="lightbox-img-wrapper relative w-full h-full max-h-[50vh] md:max-h-[68vh] flex items-center justify-center">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={gallery[lightboxIndex].imageUrl}
                                        alt={gallery[lightboxIndex].title || "Enlarged Gallery Picture"}
                                        fill
                                        sizes="(max-width: 1200px) 100vw, 1200px"
                                        className="object-contain rounded-2xl"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Next Arrow */}
                            <button
                                onClick={() => navigateLightbox("next")}
                                className="absolute right-2 md:right-4 z-20 p-3 bg-black/60 border border-white/5 text-neutral-400 hover:text-white rounded-full hover:border-orange-500/50 hover:text-orange-500 cursor-pointer transition-all hover:scale-105"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Footer details */}
                        <div className="w-full text-center pt-4 border-t border-white/5">
                            <p className="text-xs md:text-sm text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
                                {gallery[lightboxIndex].description || "Moments captured from Ranchi's first dynamic community experience platform."}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

interface GalleryCardProps {
    item: GalleryItem;
    className?: string;
    isSmall?: boolean;
    onClick: () => void;
}

function GalleryCard({ item, className = "", isSmall = false, onClick }: GalleryCardProps) {
    return (
        <div
            onClick={onClick}
            className={`gallery-card-wrapper group cursor-pointer overflow-hidden border bg-[#0b0b0c] relative shadow-2xl transition-all duration-500 border-white/10 hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] rounded-2xl ${className}`}
        >
            {/* Image Wrapper */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                <Image
                    src={item.imageUrl}
                    alt={item.title || "Gallery Image"}
                    fill
                    sizes={isSmall ? "(max-width: 768px) 50vw, 25vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                    className="gallery-card-img object-cover scale-[1.03] group-hover:scale-110 transition-transform duration-700 ease-out rounded-2xl"
                />

                {/* Overlay Gradient (always visible at bottom but darkens on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent z-10 opacity-75 group-hover:opacity-90 transition-opacity duration-300" />
            </div>

            {/* Zoom Button Icon on Hover */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm p-2.5 rounded-full border border-white/10 hover:border-orange-500 hover:text-orange-500">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
            </div>

            {/* Text Overlay (Category & Title visible by default; description reveals on hover) */}
            <div
                className={`absolute bottom-0 left-0 right-0 z-20 flex flex-col justify-end p-4 transition-all duration-300 ${isSmall ? "md:p-4" : "md:p-5"}`}
            >
                <span className={`font-bold tracking-widest uppercase text-orange-500 mb-1 block ${isSmall ? "text-[8px]" : "text-[10px]"}`}>
                    {item.category}
                </span>
                <h3 className={`font-bold text-white leading-tight ${isSmall ? "text-xs sm:text-sm mb-1" : "text-sm sm:text-base md:text-lg mb-1.5"}`}>
                    {item.title || "Buzz & Bond Capture"}
                </h3>
                {item.description && (
                    <p className={`text-neutral-300 font-light leading-normal transition-all duration-300 ${isSmall
                        ? "text-[10px] max-h-0 opacity-0 overflow-hidden group-hover:max-h-6 group-hover:opacity-100"
                        : "text-xs max-h-0 opacity-0 overflow-hidden group-hover:max-h-12 group-hover:opacity-100"
                        }`}>
                        {item.description}
                    </p>
                )}
            </div>
        </div>
    );
}
