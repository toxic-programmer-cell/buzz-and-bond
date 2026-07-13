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

const FALLBACK_GALLERY: GalleryItem[] = [
    {
        id: "fb-1",
        title: "Sunset Social Mixers",
        description: "Connecting folks over coffee, tea, and music at local cafes.",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
        category: "EVENTS",
    },
    {
        id: "fb-2",
        title: "Creative Art & Canvas Circle",
        description: "Weekly art workshop collaborations for creators and hobbyists.",
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
        category: "WORKSHOP",
    },
    {
        id: "fb-3",
        title: "Startup & Builders Meetup",
        description: "Premium networking sessions with local leaders and entrepreneurs.",
        imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop",
        category: "NETWORKING",
    },
    {
        id: "fb-4",
        title: "Community Outdoor Picnic",
        description: "Relaxed Sunday picnics bringing families and friends together.",
        imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop",
        category: "COMMUNITY",
    },
    {
        id: "fb-5",
        title: "Local Artists Open Mic",
        description: "Giving local speakers and musicians a stage to shine.",
        imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
        category: "SPEAKERS",
    },
    {
        id: "fb-6",
        title: "Photography Workshop Walk",
        description: "Exploring the streets of Ranchi through lenses.",
        imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
        category: "WORKSHOP",
    },
    {
        id: "fb-7",
        title: "Board Games & Laughs Night",
        description: "Icebreakers and tactical gaming nights.",
        imageUrl: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1200&auto=format&fit=crop",
        category: "EVENTS",
    },
    {
        id: "fb-8",
        title: "Keynote Speakers Panel",
        description: "Q&A with Ranchi's business and academic icons.",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
        category: "SPEAKERS",
    },
];

const CATEGORIES = ["ALL", "EVENTS", "NETWORKING", "WORKSHOP", "SPEAKERS", "COMMUNITY"];

export default function AnimatedGallery() {
    const [rawGallery, setRawGallery] = useState<GalleryItem[]>([]);
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [loading, setLoading] = useState(true);

    // Lightbox state
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const sectionRef = useRef<HTMLDivElement>(null);
    const lightboxRef = useRef<HTMLDivElement>(null);

    // Fetch data from API
    useEffect(() => {
        async function fetchGallery() {
            try {
                const res = await fetch("/api/gallery");
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setRawGallery(data);
                        setGallery(data);
                    } else {
                        setRawGallery(FALLBACK_GALLERY);
                        setGallery(FALLBACK_GALLERY);
                    }
                } else {
                    setRawGallery(FALLBACK_GALLERY);
                    setGallery(FALLBACK_GALLERY);
                }
            } catch (error) {
                console.error("Failed to fetch gallery images:", error);
                setRawGallery(FALLBACK_GALLERY);
                setGallery(FALLBACK_GALLERY);
            } finally {
                setLoading(false);
            }
        }
        fetchGallery();
    }, []);

    // Filter logic with GSAP transition animation
    const filterCategory = (category: string) => {
        setSelectedCategory(category);

        // 1. Fade out current cards
        gsap.to(".gallery-card-wrapper", {
            opacity: 0,
            scale: 0.95,
            duration: 0.25,
            stagger: 0.03,
            onComplete: () => {
                // 2. Update state inside callback
                const filtered = category === "ALL"
                    ? rawGallery
                    : rawGallery.filter(item => item.category === category);
                setGallery(filtered);

                // 3. Force refresh ScrollTrigger to update sizes & bounds
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 50);
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
    }, [lightboxIndex]);

    const getGridClasses = (index: number) => {
        const pos = index % 7;
        switch (pos) {
            case 0:
                return "col-span-2 row-span-2 md:col-span-4 md:row-span-3";
            case 1:
                return "col-span-2 row-span-2 md:col-span-2 md:row-span-3";
            case 2:
                return "col-span-1 row-span-2 md:col-span-2 md:row-span-4";
            case 3:
                return "col-span-1 row-span-2 md:col-span-2 md:row-span-2";
            case 4:
                return "col-span-1 row-span-1 md:col-span-1 md:row-span-2";
            case 5:
                return "col-span-1 row-span-1 md:col-span-1 md:row-span-2";
            case 6:
                return "col-span-2 row-span-2 md:col-span-2 md:row-span-4";
            default:
                return "";
        }
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
                                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${selectedCategory === category
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

            {loading ? (
                <div className="h-[60vh] flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                </div>
            ) : gallery.length === 0 ? (
                <div className="h-[50vh] flex flex-col items-center justify-center">
                    <p className="text-neutral-500 text-sm italic">No images in this category yet.</p>
                </div>
            ) : (
                /* Grid Section */
                <div className="gallery-grid-section w-full py-12 md:py-20 select-none">
                    <Container>
                        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-[160px] md:auto-rows-[110px] lg:auto-rows-[110px]">
                            {gallery.map((item, index) => {
                                const gridClass = getGridClasses(index);
                                const isSmall = index % 7 === 4 || index % 7 === 5;
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
                    </Container>
                </div>
            )}

            {/* Custom Lightbox Modal */}
            {lightboxIndex !== null && (
                <div
                    ref={lightboxRef}
                    className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] flex items-center justify-center p-4 md:p-8 select-none opacity-0"
                >
                    {/* Background Exit Area */}
                    <div className="absolute inset-0 z-0" onClick={closeLightbox} />

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
                                className="p-2 bg-white/5 border border-white/10 text-neutral-400 hover:text-white rounded-full hover:border-white/30 hover:scale-105 active:scale-95 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Image Viewer Track */}
                        <div className="relative flex-grow w-full flex items-center justify-center my-4 overflow-hidden">
                            {/* Previous Arrow */}
                            <button
                                onClick={() => navigateLightbox("prev")}
                                className="absolute left-2 md:left-4 z-20 p-3 bg-black/60 border border-white/5 text-neutral-400 hover:text-white rounded-full hover:border-orange-500/50 hover:text-orange-500 transition-all hover:scale-105"
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
                                className="absolute right-2 md:right-4 z-20 p-3 bg-black/60 border border-white/5 text-neutral-400 hover:text-white rounded-full hover:border-orange-500/50 hover:text-orange-500 transition-all hover:scale-105"
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
            className={`gallery-card-wrapper group cursor-pointer overflow-hidden border bg-[#0b0b0c] relative shadow-2xl transition-all duration-500 border-gray-500 hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] ${className}`}
        >
            {/* Image Wrapper */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                    src={item.imageUrl}
                    alt={item.title || "Gallery Image"}
                    fill
                    sizes={isSmall ? "(max-width: 768px) 50vw, 25vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                    className="gallery-card-img object-cover scale-[1.03] group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 z-10 opacity-70 group-hover:opacity-85 transition-opacity duration-300" />
            </div>

            {/* Zoom Button Icon on Hover */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm p-2.5 rounded-full border border-white/10 hover:border-orange-500 hover:text-orange-500">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
            </div>

            {/* Text Overlay */}
            {/* <div
                className={`absolute bottom-0 left-0 right-0 z-20 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out ${isSmall ? "p-4 sm:p-5" : "p-6 sm:p-8"
                    }`}
            >
                <span className={`font-bold tracking-widest uppercase text-orange-500 mb-1.5 block ${isSmall ? "text-[8px]" : "text-[10px]"}`}>
                    {item.category}
                </span>
                <h3 className={`font-bold text-white mb-1.5 leading-tight ${isSmall ? "text-xs sm:text-sm" : "text-lg sm:text-xl md:text-2xl"}`}>
                    {item.title}
                </h3>
                {!isSmall && item.description && (
                    <p className="text-neutral-400 text-xs md:text-sm font-light line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                        {item.description}
                    </p>
                )}
                {isSmall && item.description && (
                    <p className="text-neutral-400 text-[10px] sm:text-xs font-light line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                        {item.description}
                    </p>
                )}
            </div> */}
        </div>
    );
}
