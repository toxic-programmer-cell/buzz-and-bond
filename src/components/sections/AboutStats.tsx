"use client";

import { useRef } from "react";
import { Container } from "@/components/ui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Compass, Users, Sparkles, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STATS_DATA = [
    {
        icon: Sparkles,
        value: 50,
        suffix: "+",
        label: "Events Hosted",
        description: "From cozy mixers to high-energy themed celebrations.",
    },
    {
        icon: Users,
        value: 2500,
        suffix: "+",
        label: "Community Members",
        description: "An active circle of dreamers, creators, and doers in Ranchi.",
    },
    {
        icon: Compass,
        value: 15,
        suffix: "+",
        label: "Creative Partners",
        description: "Collaboration with local cafes, artists, and creators.",
    },
    {
        icon: MapPin,
        value: 1,
        suffix: "",
        label: "Vibrant City",
        description: "Dedicated to building the finest social experiences in Ranchi.",
    },
];

export default function AboutStats() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            // Fade in card grid
            gsap.fromTo(
                ".stat-card",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    },
                }
            );

            // Animate number counters
            const statNumbers = gsap.utils.toArray<HTMLElement>(".stat-num");
            statNumbers.forEach((element) => {
                const target = parseInt(element.getAttribute("data-target") || "0", 10);
                const countObj = { val: 0 };

                gsap.to(countObj, {
                    val: target,
                    duration: 2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                    onUpdate: () => {
                        element.innerText = Math.floor(countObj.val).toString();
                    },
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="py-20 md:py-28 bg-[#070707] border-b border-white/5 relative overflow-hidden"
        >
            {/* Ambient Background Grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

            <Container className="relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-orange-500 font-accent italic text-lg md:text-xl block mb-2">
                        Our Impact
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4">
                        Buzz &amp; Bond in Numbers
                    </h2>
                    <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed">
                        In a short span, we have helped transition digital acquaintances into real-life friendships. 
                        Here is how our community is growing.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {STATS_DATA.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={i}
                                className="stat-card bg-[#0b0b0c] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-orange-500/20 transition-colors duration-500 group"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-black transition-all duration-500">
                                        <Icon className="w-6 h-6 text-orange-500 group-hover:text-black transition-colors duration-500" />
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 flex items-baseline">
                                        <span
                                            className="stat-num"
                                            data-target={stat.value}
                                        >
                                            0
                                        </span>
                                        <span className="text-orange-500">{stat.suffix}</span>
                                    </h3>
                                    <p className="text-white text-base font-semibold tracking-wide uppercase mb-3">
                                        {stat.label}
                                    </p>
                                </div>
                                <p className="text-neutral-500 text-xs md:text-sm leading-relaxed">
                                    {stat.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
