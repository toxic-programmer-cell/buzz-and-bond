"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUp, Mail } from "lucide-react";
import { Button } from "@/components/ui";
import Image from "next/image";
import Logo from "../Header/Logo";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
    const footerRef = useRef<HTMLDivElement>(null);
    const brandName = "BUZZ & BOND";

    useGSAP(
        () => {
            const footer = footerRef.current;
            if (!footer) return;

            // Fade in and slide up footer elements in sequence
            gsap.fromTo(
                footer.querySelectorAll(".footer-item"),
                { opacity: 0, y: 30, },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footer,
                        start: "top 92%",
                    },
                },
            );

            // Stagger letter spring wave for the giant brand watermark text
            gsap.fromTo(
                footer.querySelectorAll(".brand-char"),
                { yPercent: 100, opacity: 0 },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.04,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: footer.querySelector(".brand-text"),
                        start: "top 95%",
                    },
                }
            );
        },
        { scope: footerRef }
    );

    const handleCharMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
        gsap.to(e.currentTarget, {
            y: -20,
            scaleY: 1.15,
            color: "#f97316", // orange-500
            duration: 0.25,
            ease: "power2.out",
        });
    };

    const handleCharMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
        gsap.to(e.currentTarget, {
            y: 0,
            scaleY: 1.0,
            color: "#18181b", // neutral-900
            duration: 0.5,
            ease: "bounce.out",
        });
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer
            ref={footerRef}
            className="w-full bg-black border-t border-white/5 relative overflow-hidden select-none"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/5">

                    {/* Column 1: Newsletter & About */}
                    <div className="footer-item lg:col-span-2 flex flex-col justify-start items-start">
                        <span className="text-orange-500 font-accent italic text-xl font-bold tracking-wider mb-3">
                            {/* Buzz & Bond */}
                            <Logo width={300} height={70} className="w-[200px] md:w-[300px] h-auto object-contain" />
                        </span>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-[340px]">
                            Buzz and Bond is Ranchi’s first dynamic community platform, where fun activities, unique events, and vibrant experiences bring people together. Join us to explore, socialize, and make every moment unforgettable.
                        </p>

                        {/* Newsletter Input */}
                        {/* <div className="w-full max-w-[320px] flex items-center bg-[#0d0d0e] border border-white/10 rounded-full py-1.5 pl-4 pr-1.5 focus-within:border-orange-500/50 transition-colors duration-300">
                            <Mail className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
                            <input
                                type="email"
                                placeholder="Subscribe to updates"
                                className="bg-transparent border-none outline-none text-white text-xs placeholder-neutral-600 w-full"
                            />
                            <button className="bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs px-4 py-2 rounded-full transition-colors duration-300">
                                Send
                            </button>
                        </div> */}
                    </div>

                    {/* Column 2: Communities */}
                    <div className="footer-item flex flex-col justify-start items-start">
                        <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-6">
                            Quick Links
                        </h4>
                        <ul className="flex flex-col gap-4 text-sm text-neutral-400">
                            <li><Link href="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
                            <li><Link href="/About" className="hover:text-orange-500 transition-colors">About</Link></li>
                            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-orange-500 transition-colors">Blog</a></li>
                            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-orange-500 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Links */}
                    <div className="footer-item flex flex-col justify-start items-start">
                        <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-6">
                            Services
                        </h4>
                        <ul className="flex flex-col gap-4 text-sm text-neutral-400">
                            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-orange-500 transition-colors">Community Circles</a></li>
                            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-orange-500 transition-colors">Workshops</a></li>
                            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-orange-500 transition-colors">Theme Parties</a></li>
                            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-orange-500 transition-colors">Cafe Collaborations</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Social Connect */}
                    <div className="footer-item flex flex-col justify-start items-start">
                        <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-6">
                            Connect
                        </h4>
                        <div className="flex gap-4 text-neutral-400 mb-6">
                            <a href="#" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full border border-white/5 bg-neutral-950 flex items-center justify-center hover:border-orange-500/50 hover:text-orange-500 transition-all duration-300">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                </svg>
                            </a>
                            <a href="#" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full border border-white/5 bg-neutral-950 flex items-center justify-center hover:border-orange-500/50 hover:text-orange-500 transition-all duration-300">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                </svg>
                            </a>
                            <a href="#" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full border border-white/5 bg-neutral-950 flex items-center justify-center hover:border-orange-500/50 hover:text-orange-500 transition-all duration-300">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect width="4" height="12" x="2" y="9" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                            <a href="#" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full border border-white/5 bg-neutral-950 flex items-center justify-center hover:border-orange-500/50 hover:text-orange-500 transition-all duration-300">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                        </div>
                        <div className="flex flex-col gap-2 mt-2 text-xs text-neutral-400">
                            <a href="tel:+919131062189" className="hover:text-orange-500 transition-colors">
                                +91 9131062189
                            </a>
                            <a href="mailto:contact@buzzandbond.com" className="hover:text-orange-500 transition-colors">
                                contact@buzzandbond.com
                            </a>
                            <span className="text-neutral-500 leading-relaxed mt-1">
                                Ratu Road, Ranchi,<br />
                                Jharkhand, India.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Subfooter (Copyright & Scroll to top) */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-10 text-xs text-neutral-500">
                    <span className="mb-4 sm:mb-0">
                        &copy;  2025 Buzz and Bond. All rights reserved. | DigiDir
                    </span>

                    {/* Scroll to Top Trigger */}
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-neutral-400 hover:text-orange-500 transition-colors duration-300"
                    >
                        <span>Back to top</span>
                        <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-orange-500/50 transition-colors duration-300">
                            <ArrowUp className="w-4 h-4" />
                        </div>
                    </button>
                </div>

                {/* Giant Brand Name Watermark with spring letter hover animations */}
                <div className="brand-text text-[8vw] md:text-[10vw] font-black uppercase tracking-tighter text-zinc-900 leading-none select-none text-center mt-12 mb-0 overflow-hidden flex justify-center">
                    {brandName.split("").map((char, i) => (
                        <span
                            key={i}
                            className="inline-block brand-char origin-bottom cursor-default transition-all duration-200"
                            onMouseEnter={handleCharMouseEnter}
                            onMouseLeave={handleCharMouseLeave}
                            style={{ minWidth: char === " " ? "4vw" : "auto" }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            </div>
        </footer>
    );
}