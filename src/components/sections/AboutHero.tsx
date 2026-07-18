"use client";

import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import heroBg from "@/assets/images/HeroBackgroundTheme.jpg";
import { ArrowDown } from "lucide-react";

export default function AboutHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useGSAP(
        () => {
            // Split title text for staggered character reveal
            if (titleRef.current) {
                const text = titleRef.current.innerText;
                titleRef.current.innerHTML = text
                    .split("")
                    .map((char) =>
                        char === " "
                            ? `<span class="inline-block">&nbsp;</span>`
                            : `<span class="inline-block title-char opacity-0">${char}</span>`
                    )
                    .join("");
            }

            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            // Animate background zoom-out
            tl.fromTo(
                ".hero-bg-wrapper",
                { scale: 1.15, filter: "blur(4px)" },
                { scale: 1, filter: "blur(0px)", duration: 1.8 }
            );

            // Animate title characters
            tl.fromTo(
                ".title-char",
                { y: 50, opacity: 0, rotateX: -45 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.03,
                },
                "-=1.2"
            );

            // Animate subtitle (Buzz & Bond)
            if (subtitleRef.current) {
                tl.fromTo(
                    subtitleRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.6"
                );
            }

            // Animate intro paragraph
            if (textRef.current) {
                tl.fromTo(
                    textRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 0.8, duration: 0.8 },
                    "-=0.4"
                );
            }

            // Animate scroll indicator bouncing
            tl.fromTo(
                ".scroll-indicator",
                { y: -10, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    // onComplete: () => {
                    //     gsap.to(".scroll-indicator", {
                    //         y: 8,
                    //         repeat: -1,
                    //         yoyo: true,
                    //         duration: 1.2,
                    //         ease: "power1.inOut",
                    //     });
                    // },
                },
                // "-=0.2"
            );

            gsap.to(".scroll-indicator", {
                y: 8,
                repeat: -1,
                yoyo: true,
                duration: 1.2,
                ease: "power1.inOut"
            })
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden bg-black border-b border-white/5"
        >
            {/* Background Image & Ambient Blur Overlay */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none hero-bg-wrapper">
                <Image
                    src={heroBg}
                    alt="Buzz and Bond About Background"
                    fill
                    priority
                    placeholder="blur"
                    className="object-cover object-center brightness-[0.3] scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/75 z-10" />
            </div>

            {/* Glowing spot light effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[30vh] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none z-10" />

            <Container className="relative z-20 text-center flex flex-col items-center justify-center h-full pt-20">
                <p
                    ref={subtitleRef}
                    className="text-orange-500 font-accent italic text-xl md:text-3xl tracking-wide mb-4 opacity-0"
                >
                    Buzz & Bond
                </p>

                <h1
                    ref={titleRef}
                    className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white perspective-[1000px] select-none"
                >
                    Connecting Ranchi
                </h1>

                <p
                    ref={textRef}
                    className="mt-8 text-neutral-300 text-sm md:text-lg max-w-xl md:max-w-2xl font-light leading-relaxed px-4 opacity-0"
                >
                    Creating an urban playground of meaningful bonds, vibrant community circles,
                    creative workshop collaborations, and premium events where every encounter sparks a memory.
                </p>

                {/* Scroll Down Indicator */}
                <div className="absolute bottom-8 flex flex-col items-center gap-2 text-neutral-500 scroll-indicator opacity-0 cursor-pointer">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400">
                        Explore Our Story
                    </span>
                    <ArrowDown className="w-4 h-4 text-orange-500" />
                </div>
            </Container>
        </section>
    );
}
