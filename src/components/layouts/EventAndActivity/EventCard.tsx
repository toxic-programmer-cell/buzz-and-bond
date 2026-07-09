"use client";

import React, { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface EventCardProps {
    title?: string;
    description?: string;
    image?: string | StaticImageData;
}

export default function EventCard({ title, description, image }: EventCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const card = cardRef.current;
            // const imageContainer = imageContainerRef.current;
            const glow = glowRef.current;
            if (!card || !glow) return;

            const onMouseMove = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top;  // y position within the element

                // Convert to percentage offsets (-0.5 to 0.5)
                const xPct = (x / rect.width) - 0.5;
                const yPct = (y / rect.height) - 0.5;

                // 3D Tilt rotation angles (max 10 degrees)
                const rotateY = xPct * 12;
                const rotateX = -yPct * 12;

                gsap.to(card, {
                    rotateY: rotateY,
                    rotateX: rotateX,
                    transformPerspective: 1000,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto",
                });

                // Parallax depth effect on the image
                // gsap.to(imageContainer, {
                //     x: xPct * 10,
                //     y: yPct * 10,
                //     duration: 0.3,
                //     ease: "power2.out",
                //     overwrite: "auto",
                // });

                // Position the soft spotlight glow
                gsap.to(glow, {
                    left: `${x}px`,
                    top: `${y}px`,
                    opacity: 0.12,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto",
                });
            };

            const onMouseLeave = () => {
                // Reset card tilt, scale and rotations
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power3.out",
                    overwrite: "auto",
                });

                // Reset image parallax
                // gsap.to(imageContainer, {
                //     x: 0,
                //     y: 0,
                //     duration: 0.5,
                //     ease: "power3.out",
                //     overwrite: "auto",
                // });

                // Hide the spotlight glow
                // gsap.to(glow, {
                //     opacity: 0,
                //     duration: 0.4,
                //     ease: "power3.out",
                //     overwrite: "auto",
                // });
            };

            card.addEventListener("mousemove", onMouseMove);
            card.addEventListener("mouseleave", onMouseLeave);

            return () => {
                card.removeEventListener("mousemove", onMouseMove);
                card.removeEventListener("mouseleave", onMouseLeave);
            };
        },
        { scope: cardRef }
    );

    return (
        <div
            ref={cardRef}
            className="event-card bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-md border border-white/[0.08] rounded-[32px] p-6 text-white flex flex-col h-full hover:border-white/20 transition-colors duration-300 shadow-2xl group relative overflow-hidden select-none"
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Spotlight Glow Overlay */}
            <div
                ref={glowRef}
                className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 pointer-events-none blur-[80px] z-0"
                style={{ left: 0, top: 0 }}
            />

            <div className="flex flex-col h-full relative z-10 pointer-events-none">
                {/* Image Container with Parallax Effect */}
                {/* <div
                    ref={imageContainerRef}
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-neutral-800/40 border border-white/[0.05]"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {image ? (
                        <Image
                            src={image}
                            alt={title || "Event Image"}
                            fill
                            className="object-cover scale-102 group-hover:scale-[1.06] transition-transform duration-500 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center">
                            <span className="text-neutral-500 text-sm">No Image</span>
                        </div>
                    )}
                </div> */}

                {/* Text Container */}
                <div
                    className="px-2 flex flex-col flex-grow"
                    style={{ transform: "translateZ(10px)" }}
                >
                    <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-normal leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
