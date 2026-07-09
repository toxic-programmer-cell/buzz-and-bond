"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { ArrowDown, X } from "lucide-react";
import { cn } from "@/utils/cn";

// Import image assets for the events
import img1 from "../../../assets/images/service-1-2.png";
import img2 from "../../../assets/images/service-2-1.png";
import img3 from "../../../assets/images/service-3-1.png";

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

const cardData = [
    {
        image: img1,
        title: "Weekend Events",
        description: "Join our specially curated weekend events — from Ranchi city explorations to themed social gatherings — and make your weekends more vibrant."
    },
    {
        image: img2,
        title: "Adventure & Outdoor",
        description: "Get outdoors and embrace the thrill! Our adventure activities are designed to energize, challenge, and bring together enthusiasts."
    },
    {
        image: img3,
        title: "Community Meetups",
        description: "Connect with people who share your interests. Our meetups create opportunities for friendships, discussions, and shared experiences."
    },
    {
        image: img1,
        title: "Pop-up Experiences",
        description: "Experience the city in a new way! We host unique pop-up events in local cafes, parks, and public spaces to engage our community."
    },
    {
        image: img2,
        title: "Music Circle",
        description: "Gather for live acoustic jam sessions, instrument sharing workshops, and open mic evenings celebrating local musical talents."
    },
    {
        image: img3,
        title: "Board Gaming Club",
        description: "Unplug and play! Bring your strategy skills to our board game meetups featuring classic tabletop games and indie hits."
    },
    {
        image: img1,
        title: "Book Lovers Circle",
        description: "Dive deep into stories and ideas. Share your thoughts on monthly reads and discover new authors in Ranchi."
    },
    {
        image: img2,
        title: "Art & Craft Workshops",
        description: "Unleash your creativity. Learn canvas painting, pottery, and sketching from skilled community creators."
    },
];

export default function Event() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const wheelRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const pendingFlipState = useRef<any>(null);
    const pendingCloseState = useRef<any>(null);
    const prevActiveCardIndexRef = useRef<number | null>(null);

    const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
    const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

    const getImgSrc = (img: any) => {
        if (typeof img === "string") return img;
        if (img && typeof img === "object" && "src" in img) return img.src;
        return "";
    };

    // Coordinate calculation and scroll binding
    useGSAP(
        () => {
            const wheel = wheelRef.current;
            const cards = cardRefs.current.filter(Boolean);
            if (!wheel || cards.length === 0) return;

            // Setup circular layout
            const radius = wheel.offsetWidth / 2;
            const center = radius;
            const slice = 360 / cards.length;
            const DEG2RAD = Math.PI / 180;

            const setupWheel = () => {
                const currentRadius = wheel.offsetWidth / 2;
                const currentCenter = currentRadius;
                cards.forEach((card, i) => {
                    if (!card) return;
                    const angle = i * slice * DEG2RAD;
                    gsap.set(card, {
                        x: currentCenter + currentRadius * Math.sin(angle),
                        y: currentCenter - currentRadius * Math.cos(angle),
                        rotation: i * slice,
                        xPercent: -50,
                        yPercent: -50,
                    });
                });
            };

            setupWheel();
            window.addEventListener("resize", setupWheel);

            // Pulse scroll indicator arrow
            gsap.to(".scroll-arrow", {
                y: 8,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
                duration: 0.8
            });

            // ScrollTrigger for rotating the wheel
            gsap.to(wheel, {
                rotation: -360,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2000", // Pinned for 2000px of scrolling
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            return () => {
                window.removeEventListener("resize", setupWheel);
            };
        },
        { scope: sectionRef }
    );

    // FLIP animation trigger on activeCardIndex change
    // FLIP animation trigger on activeCardIndex change
    useGSAP(
        () => {
            if (activeCardIndex !== null && pendingFlipState.current) {
                const targetImg = sectionRef.current?.querySelector(".preview-img");
                if (targetImg) {
                    Flip.from(pendingFlipState.current, {
                        targets: targetImg,
                        duration: 0.6,
                        scale: true,
                        ease: "power1.inOut",
                    });
                    pendingFlipState.current = null;
                }
            } else if (activeCardIndex === null && prevActiveCardIndexRef.current !== null && pendingCloseState.current) {
                const sourceCard = cardRefs.current[prevActiveCardIndexRef.current];
                const sourceImg = sourceCard?.querySelector("img");
                if (sourceImg) {
                    Flip.from(pendingCloseState.current, {
                        targets: sourceImg,
                        duration: 0.6,
                        scale: true,
                        ease: "power1.inOut",
                    });
                }
                pendingCloseState.current = null;
                prevActiveCardIndexRef.current = null;
            }
        },
        { dependencies: [activeCardIndex], scope: sectionRef }
    );

    const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
        if (activeCardIndex !== null) return;
        setHoveredCardIndex(index);

        const card = e.currentTarget;
        const img = card.querySelector("img");
        const wheel = wheelRef.current;
        const wheelRot = wheel ? gsap.getProperty(wheel, "rotation") as number : 0;

        gsap.to(card, {
            scale: 1.3, // Card gets bigger than other cards
            borderColor: "rgba(249, 115, 22, 0.9)",
            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.9)",
            zIndex: 100, // Come to front
            rotation: -wheelRot, // Rotate upright (Ferris wheel style on hover)
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
        });

        if (img) {
            gsap.to(img, {
                scale: 1.8, // Large zoom for magnifying glass effect
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (activeCardIndex !== null) return;
        const card = e.currentTarget;
        const img = card.querySelector("img");
        if (!img) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPct = x / rect.width;
        const yPct = y / rect.height;

        // Shift the image relative to its center by up to 80px/110px to follow cursor
        const maxShiftX = 80;
        const maxShiftY = 110;
        const moveX = - (xPct - 0.5) * maxShiftX;
        const moveY = - (yPct - 0.5) * maxShiftY;

        gsap.to(img, {
            x: moveX,
            y: moveY,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
        });
    };

    const handleMouseLeave = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
        setHoveredCardIndex(null);

        const card = e.currentTarget;
        const img = card.querySelector("img");
        const slice = 360 / cardData.length;

        gsap.to(card, {
            scale: 1.0,
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.3)",
            zIndex: 10,
            rotation: index * slice, // Return to original angle
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
        });

        if (img) {
            gsap.to(img, {
                scale: 1.0,
                x: 0,
                y: 0,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
            });
        }
    };

    const handleCardClick = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
        if (activeCardIndex !== null) return;
        const cardImg = e.currentTarget.querySelector("img");
        if (!cardImg) return;

        // Capture starting state for Flip
        pendingFlipState.current = Flip.getState(cardImg);
        setActiveCardIndex(index);
    };

    const handleClose = () => {
        if (activeCardIndex === null) return;

        const targetImg = sectionRef.current?.querySelector(".preview-img");
        if (!targetImg) return;

        // Capture starting state of the preview image
        pendingCloseState.current = Flip.getState(targetImg);
        prevActiveCardIndexRef.current = activeCardIndex;
        setActiveCardIndex(null);
    };

    const activeCard = activeCardIndex !== null ? cardData[activeCardIndex] : null;
    const displayedCard = hoveredCardIndex !== null
        ? cardData[hoveredCardIndex]
        : (activeCardIndex !== null ? cardData[activeCardIndex] : cardData[0]);

    return (
        <section
            ref={sectionRef}
            className="w-full h-screen bg-[#070708] relative overflow-hidden select-none flex flex-col justify-center items-center"
        >
            {/* Top & Bottom Blur Shadow Overlays for seamless section blending */}
            <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-black via-black/70 to-transparent backdrop-blur-[2px] pointer-events-none z-20" />
            <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-black via-black/70 to-transparent backdrop-blur-[2px] pointer-events-none z-20" />
            {/* Background texture gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.03)_0%,transparent_70%)] pointer-events-none z-0" />
            <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />

            <div className="max-w-[1400px] w-full h-full mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row relative z-10 items-center justify-between">

                {/* Left Panel: Section Text and Instructions */}
                <div className="w-full lg:w-[40%] flex flex-col justify-center items-start h-1/2 lg:h-full z-20">
                    <span className="text-orange-500 font-accent italic text-lg font-semibold tracking-wider mb-2">
                        Activity & Events
                    </span>
                    <div key={displayedCard.title} className="transition-all duration-300 animate-[fadeIn_0.4s_ease_out]">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-4 leading-none">
                            {displayedCard.title}
                        </h2>
                        <p className="text-sm md:text-base text-neutral-400 max-w-[400px] leading-relaxed mb-8">
                            {displayedCard.description}
                        </p>
                    </div>

                    {/* Scroll / Swipe Indicator */}
                    <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-neutral-500 select-none">
                        <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center">
                            <ArrowDown className="w-4 h-4 text-orange-500 scroll-arrow" />
                        </div>
                        <span>Scroll Down to Spin</span>
                    </div>
                </div>

                {/* Right Panel: The Wheel (Half-circle centered on right edge) */}
                <div className="w-full lg:w-[60%] flex items-center justify-end relative h-1/2 lg:h-full z-10">

                    {/* Centered Anchor Wrapper to isolate translations from GSAP rotations */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-[200px] sm:-right-[300px] md:-right-[400px] lg:-right-[500px] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] pointer-events-none flex items-center justify-center">
                        {/* The Wheel */}
                        <div
                            ref={wheelRef}
                            className="wheel w-full h-full rounded-full border border-white/5 bg-neutral-950/20 relative pointer-events-auto"
                        >
                            {cardData.map((item, index) => (
                                <div
                                    key={index}
                                    ref={(el) => {
                                        cardRefs.current[index] = el;
                                    }}
                                    onClick={(e) => handleCardClick(index, e)}
                                    onMouseEnter={(e) => handleMouseEnter(index, e)}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={(e) => handleMouseLeave(index, e)}
                                    data-card-index={index}
                                    className="wheel__card absolute w-[100px] h-[145px] sm:w-[130px] sm:h-[185px] md:w-[170px] md:h-[240px] lg:w-[220px] lg:h-[310px] rounded-xl bg-neutral-900 border border-white/10 overflow-hidden cursor-pointer flex items-center justify-center p-1.5 shadow-lg origin-center"
                                    style={{ left: 0, top: 0 }}
                                >
                                    <img
                                        src={getImgSrc(item.image)}
                                        alt={item.title}
                                        className={cn(
                                            "w-full h-full object-cover rounded-lg pointer-events-none origin-center",
                                            activeCardIndex === index ? "opacity-0" : "opacity-100"
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Permanently Mounted Details Preview Overlay */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/95 z-50 flex items-start md:items-center justify-center p-4 md:p-6 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-y-auto",
                    activeCardIndex !== null ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={handleClose}
            >
                <div
                    className="max-w-[850px] w-full bg-[#0d0d0e] border border-white/10 rounded-[28px] overflow-hidden flex flex-col md:flex-row relative shadow-2xl p-6 gap-8 my-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-neutral-800 transition-colors duration-200 text-white z-50"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Image Destination Panel */}
                    <div className="w-full md:w-[45%] aspect-[3/4] md:aspect-auto md:h-[400px] bg-neutral-950 rounded-2xl overflow-hidden relative flex items-center justify-center">
                        <img
                            src={getImgSrc(activeCard?.image || img1)}
                            alt={activeCard?.title || ""}
                            className="preview-img w-full h-full object-cover"
                        />
                    </div>

                    {/* Description Content Panel */}
                    <div className="w-full md:w-[55%] flex flex-col justify-center items-start text-white">
                        <span className="text-orange-500 font-accent italic text-lg font-semibold mb-2">
                            Activity Detail
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
                            {activeCard?.title || ""}
                        </h3>
                        <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6">
                            {activeCard?.description || ""}
                        </p>
                        <button
                            onClick={handleClose}
                            className="px-6 py-3 rounded-full border border-orange-500 text-orange-500 font-semibold text-sm tracking-wide hover:bg-orange-500 hover:text-black transition-all duration-300"
                        >
                            Back to Wheel
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
