"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Section from "@/components/sections/Section";
import { Button, MagneticButton } from "@/components/ui";
import pricingPersonImg from "@/assets/images/pricing-person.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Pricing() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            const image = imageRef.current;
            const trigger = imageContainerRef.current;
            const heading = headingRef.current;
            if (!image || !trigger) return;

            // Parallax scroll effect on the portrait image
            gsap.fromTo(
                image,
                {
                    yPercent: -10,
                },
                {
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: trigger,
                        start: "top bottom", // start when the image container enters the screen
                        end: "bottom top",   // end when the image container leaves the screen
                        scrub: true,         // smooth scrubbing tied to scroll
                    },
                }
            );

            // Parallax scroll effect on the pricing heading
            if (heading) {
                gsap.fromTo(
                    heading,
                    {
                        yPercent: -20,
                    },
                    {
                        yPercent: 20,
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            }
        },
        { scope: containerRef }
    );

    return (
        <Section size="lg" className="text-white bg-black overflow-hidden relative min-h-screen flex items-center justify-center py-24 md:py-36">
            <div ref={containerRef} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center w-full relative">

                    {/* Left Column: Big Bold Typography & Pricing Details */}
                    <div className="lg:col-span-7 lg:pr-12 z-20 flex flex-col justify-center gap-8 md:gap-12 animate-fade-in">

                        {/* High-Contrast Editorial Typography with Parallax Ref */}
                        <div className="flex flex-col select-none">
                            <h2
                                ref={headingRef}
                                className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.8] text-white"
                            >
                                Per Session <br />
                                <span className="text-neutral-600 block my-2">Price</span>
                                <span className="block text-orange-500 font-accent italic font-normal tracking-wide lowercase mt-4">
                                    ₹ 249<span className="text-neutral-400 text-2xl lg:text-3xl font-light not-italic uppercase ml-2">/ party</span>
                                </span>
                            </h2>
                        </div>

                        {/* Description with readable max-width */}
                        <p className="text-sm md:text-lg text-neutral-400 leading-relaxed font-normal max-w-[480px]">
                            Access to any one community — Music Circle, Board Gaming Club, or Book Lovers Circle.
                        </p>

                        {/* Premium Magnetic CTA Button */}
                        <div className="flex items-start">
                            <MagneticButton
                                variant="secondary"
                                size="lg"
                                className="uppercase tracking-wider font-bold"
                            >
                                Get in Touch
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Right Column: Portrait Image with Vignette Overlay & Parallax */}
                    <div
                        ref={imageContainerRef}
                        className="lg:col-span-5 lg:col-start-8 lg:col-end-13 relative aspect-[3/4] lg:aspect-auto lg:h-[750px] w-full rounded-[32px] overflow-hidden border border-white/10 shadow-2xl z-10 group"
                    >
                        {/* Soft white/black gradient vignette matching the top/bottom shadows in the screenshot */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-20 pointer-events-none" />

                        <div className="relative w-full h-[120%] -top-[10%]">
                            <Image
                                ref={imageRef}
                                src={pricingPersonImg}
                                alt="Community Member"
                                fill
                                className="object-cover object-center z-10"
                                priority
                                sizes="(max-width: 1024px) 100vw, 40vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}