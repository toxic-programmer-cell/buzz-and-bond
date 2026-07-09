"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";
import { cn } from "@/utils/cn";

const testimonials = [
    {
        name: "Aman Sen",
        role: "Board Gaming Club Member",
        avatar: "AS",
        content: "Buzz & Bond has completely changed my weekends in Ranchi. The gaming community is super welcoming, and I've met so many great friends here!",
        rating: 5,
        themeColor: "gray"
    },
    {
        name: "Shreya Ghoshal",
        role: "Book Lovers Circle",
        avatar: "SG",
        content: "The monthly reads and discussions are incredibly engaging. Sharing ideas over a warm cup of coffee with fellow Ranchi bookworms is my favorite routine.",
        rating: 5,
        themeColor: "gray"
    },
    {
        name: "Rohan Gupta",
        role: "Music Circle Acoustic Host",
        avatar: "RG",
        content: "Hosting jam sessions here has been a dream. The vibe is electric, and the talent in this city finally has a dynamic space to gather and collaborate.",
        rating: 5,
        themeColor: "gray"
    },
    {
        name: "Kriti Roy",
        role: "Regular Meetup Attendee",
        avatar: "KR",
        content: "I moved to Ranchi for work and didn't know anyone. Thanks to their weekend experiences, I found my crowd in no time. Highly recommend joining!",
        rating: 5,
        themeColor: "gray"
    },
    {
        name: "Vikram Malhotra",
        role: "Art & Craft Enthusiast",
        avatar: "VM",
        content: "The sketching workshop was so well organized. The host was helpful, the materials were premium, and the community energy was inspiring.",
        rating: 4,
        themeColor: "gray"
    },
    {
        name: "Neha Sharma",
        role: "Theme Party Attendee",
        avatar: "NS",
        content: "Their retro-themed social party was insane! The decor, the crowd, and the interactive games made it easily the best social night in Ranchi.",
        rating: 5,
        themeColor: "gray"
    }
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
    const themeColors = {
        green: {
            border: "border-green-500/20 hover:border-green-500/40",
            glow: "hover:shadow-[0_0_20px_rgba(10,224,66,0.06)]",
            text: "text-green-400",
            avatar: "from-green-500 to-emerald-600",
            bar: "bg-[#0ae042]",
        },
        purple: {
            border: "border-purple-500/20 hover:border-purple-500/40",
            glow: "hover:shadow-[0_0_20px_rgba(138,121,255,0.06)]",
            text: "text-purple-400",
            avatar: "from-purple-500 to-indigo-600",
            bar: "bg-[#8a79ff]",
        },
        pink: {
            border: "border-pink-500/20 hover:border-pink-500/40",
            glow: "hover:shadow-[0_0_20px_rgba(255,74,139,0.06)]",
            text: "text-pink-400",
            avatar: "from-pink-500 to-rose-600",
            bar: "bg-[#ff4a8b]",
        },
        cyan: {
            border: "border-cyan-500/20 hover:border-cyan-500/40",
            glow: "hover:shadow-[0_0_20px_rgba(0,210,255,0.06)]",
            text: "text-cyan-400",
            avatar: "from-cyan-500 to-blue-600",
            bar: "bg-[#00d2ff]",
        },
        gray: {
            border: "border-gray-500/20 hover:border-gray-500/40",
            glow: "hover:shadow-[0_0_20px_rgba(128,128,128,0.06)]",
            text: "text-gray-400",
            avatar: "from-gray-500 to-gray-600",
            bar: "bg-[#808080]",
        }
    };

    const colors = themeColors[testimonial.themeColor as keyof typeof themeColors] || themeColors.green;

    return (
        <div
            className={cn(
                "flex-shrink-0 w-[290px] sm:w-[340px] md:w-[380px] bg-[#0d0d0e] border rounded-2xl p-6 md:p-8 flex flex-col justify-between relative transition-all duration-300 hover:scale-[1.02] select-none overflow-hidden whitespace-normal",
                colors.border,
                colors.glow
            )}
        >
            {/* Top Accent Highlight Bar */}
            <div className={cn("absolute top-0 left-0 w-full h-[3px]", colors.bar)} />

            <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={cn(
                                "w-4 h-4",
                                i < testimonial.rating
                                    ? "text-amber-500 fill-amber-500"
                                    : "text-neutral-700"
                            )}
                        />
                    ))}
                </div>

                {/* Review Content */}
                <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                </p>
            </div>

            {/* Profile Footer */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm bg-gradient-to-tr shrink-0 select-none", colors.avatar)}>
                    {testimonial.avatar}
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm md:text-base">
                        {testimonial.name}
                    </h4>
                    <p className={cn("text-xs font-semibold uppercase tracking-wider", colors.text)}>
                        {testimonial.role}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Testimonial() {
    const containerRef = useRef<HTMLDivElement>(null);
    const track1Ref = useRef<HTMLDivElement>(null);
    const track2Ref = useRef<HTMLDivElement>(null);
    const tween1 = useRef<gsap.core.Tween | null>(null);
    const tween2 = useRef<gsap.core.Tween | null>(null);

    useGSAP(
        () => {
            const track1 = track1Ref.current;
            const track2 = track2Ref.current;
            if (!track1 || !track2) return;

            // Infinite scrolling animation
            tween1.current = gsap.to(track1, {
                xPercent: -50,
                ease: "none",
                repeat: -1,
                duration: 25,
            });

            // Slide second track in opposite direction
            tween2.current = gsap.to(track2, {
                xPercent: 0,
                startAt: { xPercent: -50 },
                ease: "none",
                repeat: -1,
                duration: 25,
            });
        },
        { scope: containerRef }
    );

    const handleMouseEnterTrack1 = () => tween1.current?.pause();
    const handleMouseLeaveTrack1 = () => tween1.current?.play();

    const handleMouseEnterTrack2 = () => tween2.current?.pause();
    const handleMouseLeaveTrack2 = () => tween2.current?.play();

    return (
        <section className="text-white max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 overflow-hidden relative">
            <div className="flex flex-col mb-16 select-none items-center text-center">
                <span className="font-accent italic text-orange-600 text-sm md:text-2xl font-bold tracking-[0.25em] mb-2">
                    Testimonials
                </span>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                    What people say
                </h2>
            </div>

            {/* Marquee Wrapper Container */}
            <div ref={containerRef} className="flex flex-col gap-6 relative w-full overflow-hidden py-4">

                {/* Edge Vignette Fades */}
                <div className="absolute left-0 top-0 h-full w-[60px] sm:w-[120px] md:w-[180px] bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 h-full w-[60px] sm:w-[120px] md:w-[180px] bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

                {/* Upper Track (Moving Left) */}
                <div className="w-full overflow-hidden flex">
                    <div
                        ref={track1Ref}
                        className="flex gap-6 whitespace-nowrap cursor-grab active:cursor-grabbing"
                        onMouseEnter={handleMouseEnterTrack1}
                        onMouseLeave={handleMouseLeaveTrack1}
                    >
                        {/* Render duplicates of testimonials so loop is seamless */}
                        {[...testimonials, ...testimonials].map((item, idx) => (
                            <TestimonialCard key={`track1-${idx}`} testimonial={item} />
                        ))}
                    </div>
                </div>

                {/* Lower Track (Moving Right) */}
                <div className="w-full overflow-hidden flex">
                    <div
                        ref={track2Ref}
                        className="flex gap-6 whitespace-nowrap cursor-grab active:cursor-grabbing"
                        onMouseEnter={handleMouseEnterTrack2}
                        onMouseLeave={handleMouseLeaveTrack2}
                    >
                        {/* Render duplicates of testimonials reversed so tracks look unique */}
                        {[...testimonials, ...testimonials].reverse().map((item, idx) => (
                            <TestimonialCard key={`track2-${idx}`} testimonial={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}