"use client";

import { useRef } from "react";
import { ServiceCard } from "@/components/cards";
import { useServicesAnimation } from "@/components/animations/hooks/useServicesAnimation";
import { MagneticButton } from "../ui/Button";
import img1 from "../../assets/images/service-1-2.png"
import img2 from "../../assets/images/service-2-1.png"
import img3 from "../../assets/images/service-3-1.png"
import Link from "next/link";

export default function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const leftCardRef = useRef<HTMLDivElement>(null);
    const centerCardRef = useRef<HTMLDivElement>(null);
    const rightCardRef = useRef<HTMLDivElement>(null);

    useServicesAnimation({
        sectionRef,
        headerRef,
        leftCardRef,
        centerCardRef,
        rightCardRef,
    });

    const servicesData = [
        {
            img: img1,
            title: "Brand Strategy & Positioning",
            description: "We define your voice, position your brand, and design systems that stand out in crowded digital markets.",
        },
        {
            img: img2,
            title: "Immersive Web & Creative Engineering",
            description: "We build fast, pixel-perfect websites and creative digital experiences using modern stacks and rich interactions.",
        },
        {
            img: img3,
            title: "Performance & Organic Growth",
            description: "We scale brands through structured growth campaigns, custom search optimization, and data-backed analytics.",
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="w-full bg-[#0A0A0A] overflow-hidden py-24 md:py-36 lg:py-48 flex items-center justify-center relative select-none"
        >
            <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 w-full flex flex-col items-center">
                {/* Heading group */}
                <div
                    ref={headerRef}
                    className="flex flex-col items-center text-center mb-16 md:mb-24 lg:mb-32 max-w-[900px] w-full will-change-transform"
                >
                    <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-neutral-500 uppercase mb-4">
                        Our Services
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                        What Makes Buzz & Bond Buzz
                    </h2>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20 md:gap-8 xl:gap-12 w-full items-stretch">
                    <ServiceCard
                        ref={leftCardRef}
                        className="md:col-span-1"
                        img={servicesData[0].img}
                        title={servicesData[0].title}
                        description={servicesData[0].description}
                    />
                    <ServiceCard
                        ref={centerCardRef}
                        className="md:col-span-1"
                        img={servicesData[1].img}
                        title={servicesData[1].title}
                        description={servicesData[1].description}
                    />
                    <ServiceCard
                        ref={rightCardRef}
                        className="md:col-span-2 xl:col-span-1"
                        img={servicesData[2].img}
                        title={servicesData[2].title}
                        description={servicesData[2].description}
                    />
                </div>
                <Link href="/events">
                    <MagneticButton>More services</MagneticButton>
                </Link>
            </div>
        </section>
    );
}
