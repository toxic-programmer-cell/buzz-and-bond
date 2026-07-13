"use client";

import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import service1 from "@/assets/images/service-1-2.png";
import service2 from "@/assets/images/service-2-1.png";
import service3 from "@/assets/images/service-3-1.png";

gsap.registerPlugin(ScrollTrigger);

export default function AboutStory() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imgContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Parallax movement for the overlapping image grid
            const cards = gsap.utils.toArray<HTMLElement>(".parallax-card");

            cards.forEach((card, index) => {
                // Different speed/direction for each card
                const speed = (index + 1) * 35;
                gsap.fromTo(
                    card,
                    { y: speed * 1.5 },
                    {
                        y: -speed * 1.5,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            });

            // Fade in text headers on scroll
            gsap.fromTo(
                ".fade-up-item",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-36 bg-black overflow-hidden border-b border-white/5"
        >
            {/* Ambient background glows */}
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-center">
                    
                    {/* Left Column: Story Text */}
                    <div ref={textRef} className="lg:col-span-6 flex flex-col justify-center">
                        <span className="text-orange-500 font-accent italic text-lg md:text-xl fade-up-item mb-2 block">
                            Our Origin
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-8 leading-none fade-up-item">
                            We exist to craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400 to-orange-500">meaningful</span> connections.
                        </h2>
                        
                        <div className="space-y-6 text-neutral-400 text-sm md:text-base font-light leading-relaxed fade-up-item">
                            <p>
                                In a world dominated by digital screens, true human connection can feel like a rare luxury. 
                                <strong> Buzz and Bond</strong> was born from a simple realization: Ranchi needed a space 
                                where like-minded people could shed reservations, share experiences, and celebrate community.
                            </p>
                            <p>
                                We design events that transcend standard networking or social gathering tropes. 
                                From intimate acoustic jam sessions and curated culinary tours to high-energy team sports, 
                                craft workshops, and startup mixers—we break the ice so you can build the bond.
                            </p>
                            <p className="border-l-2 border-orange-500 pl-4 italic text-neutral-300 font-accent text-lg">
                                &ldquo;It&apos;s not about how many people you meet; it&apos;s about the depth of the bonds you form.&rdquo;
                            </p>
                            <p>
                                Whether you are new to the city, an artist looking for a canvas, an entrepreneur seeking 
                                collaborators, or simply someone wanting to add a spark to their weekends, you have 
                                a place here. Come for the buzz, stay for the bond.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Parallax Collage Grid */}
                    <div 
                        ref={imgContainerRef} 
                        className="lg:col-span-6 relative h-[500px] md:h-[600px] w-full flex items-center justify-center lg:pl-10"
                    >
                        {/* Background Card */}
                        <div className="absolute w-[240px] h-[340px] md:w-[280px] md:h-[400px] -left-2 top-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl parallax-card z-10">
                            <Image
                                src={service1}
                                alt="Buzz and Bond Community Circle"
                                fill
                                placeholder="blur"
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-orange-500 bg-black/80 px-2.5 py-1 rounded-full">Community</span>
                            </div>
                        </div>

                        {/* Foreground Center Card */}
                        <div className="absolute w-[240px] h-[340px] md:w-[280px] md:h-[400px] right-2 bottom-4 rounded-2xl overflow-hidden border border-white/15 shadow-2xl parallax-card z-20">
                            <Image
                                src={service2}
                                alt="Buzz and Bond Workshops"
                                fill
                                placeholder="blur"
                                className="object-cover scale-105 hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-orange-500 bg-black/80 px-2.5 py-1 rounded-full">Workshops</span>
                            </div>
                        </div>

                        {/* Small Floating Accent Card */}
                        <div className="absolute w-[160px] h-[220px] md:w-[190px] md:h-[260px] top-[20%] right-[-10px] rounded-xl overflow-hidden border border-white/10 shadow-2xl parallax-card z-30 hidden sm:block">
                            <Image
                                src={service3}
                                alt="Buzz and Bond Events"
                                fill
                                placeholder="blur"
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85" />
                            <div className="absolute bottom-3 left-3 z-20">
                                <span className="text-[8px] uppercase tracking-widest font-bold text-white bg-orange-500 px-2 py-0.5 rounded-full">Events</span>
                            </div>
                        </div>

                        {/* Floating visual elements */}
                        <div className="absolute -bottom-8 left-1/4 w-4 h-4 bg-orange-500 rounded-full animate-pulse z-40" />
                        <div className="absolute top-10 right-1/4 w-2.5 h-2.5 bg-white rounded-full opacity-30 z-40" />
                    </div>

                </div>
            </Container>
        </section>
    );
}
