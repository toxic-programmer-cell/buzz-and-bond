import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import AboutStory from "@/components/sections/AboutStory";
import AboutStats from "@/components/sections/AboutStats";
import AnimatedGallery from "@/components/sections/AnimatedGallery";
import { Button, Container } from "@/components/ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "About | Buzz & Bond",
    description: "Discover Ranchi's first dynamic community experience platform. Learn about our story, mission, metrics, and explore our event captures gallery.",
};

export default function AboutPage() {
    return (
        <div className="bg-black min-h-screen text-white w-full">
            {/* 1. Hero Section */}
            <AboutHero />

            {/* 2. Story Section */}
            <AboutStory />

            {/* 3. Stats Section */}
            <AboutStats />

            {/* 4. Animated Gallery Section */}
            <AnimatedGallery />

            {/* 5. Bottom Call To Action (CTA) */}
            <section className="relative py-24 md:py-36 bg-[#070707] border-t border-white/5 overflow-hidden text-center">
                {/* Visual decorations */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(249,115,22,0.15),transparent_60%)] pointer-events-none" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

                <Container className="relative z-10">
                    <span className="text-orange-500 font-accent italic text-lg md:text-xl block mb-3">
                        Join The Bond
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6 max-w-4xl mx-auto leading-none">
                        Ready to experience <br className="hidden sm:inline" />
                        Ranchi like never before?
                    </h2>
                    <p className="text-neutral-400 text-sm md:text-base font-light max-w-xl mx-auto mb-10 leading-relaxed">
                        Don&apos;t just read about our experiences—be a part of them.
                        Join our community circles, check out upcoming events, and find your vibe.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/events">
                            <Button variant="primary" className="rounded-full px-8 py-6 flex items-center gap-2 group text-sm font-semibold">
                                Browse Upcoming Events
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>

                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <button className="px-8 py-3.5 bg-transparent border border-white/10 text-neutral-300 hover:text-white rounded-full hover:border-white/30 text-sm font-semibold transition-all">
                                Follow Us On Instagram
                            </button>
                        </a>
                    </div>
                </Container>
            </section>
        </div>
    );
}