"use client";

import { useRef } from "react";
import Section from "@/components/sections/Section";
import PricingCard from "./PricingCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PricingStructure() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cards = containerRef.current?.querySelectorAll(".pricing-card-wrapper");
            if (!cards || cards.length === 0) return;

            gsap.fromTo(
                cards,
                {
                    opacity: 0,
                    x: 80,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%", // animation starts when top of container hits 85% of viewport height
                        toggleActions: "play none none none",
                    },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <Section className="text-white pricing-main max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div className="flex flex-col mb-12 select-none items-center">
                <span className="font-accent italic text-orange-600 text-sm md:text-2xl font-bold tracking-[0.25em] text-neutral-500 mb-2">
                    Pricing Plans
                </span>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                    Pricing Structure
                </h2>
            </div>

            <div ref={containerRef} className="w-full flex flex-col gap-8">
                {/* Top Row: 3 Core Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full items-stretch">
                    <div className="pricing-card-wrapper h-full">
                        <PricingCard
                            title="Per Session Price"
                            price="₹249"
                            period="/session"
                            description="Perfect for trying out a single session in any of our communities."
                            buttonText="Join Buzz&Bond"
                            themeColor="green"
                            asteriskNote
                            features={[
                                "Access to any one community",
                                "Board Gaming Club",
                                "Book Lovers Circle",
                                "Music Circle",
                            ]}
                        />
                    </div>
                    <div className="pricing-card-wrapper h-full">
                        <PricingCard
                            title="Monthly Pass"
                            price="₹ 599"
                            period="/ Month"
                            description="Attend up to 3 sessions in the same community within a single month."
                            buttonText="Join Buzz&Bond Plus"
                            themeColor="purple"
                            features={[
                                "Up to 3 live community sessions every month",
                                "Stay connected in your favorite community",
                                "Learn and network with community members"
                            ]}
                        />
                    </div>
                    <div className="pricing-card-wrapper h-full">
                        <PricingCard
                            title="All Access Pass"
                            price="₹ 1099"
                            period="/ YEAR"
                            description="Attend any 5 sessions across all Buzz & Bond communities in a month."
                            buttonText="Join Buzz&Bond Premium"
                            themeColor="pink"
                            popular
                            features={[
                                "Attend up to 5 sessions per month across all communities",
                                "Access the entire Buzz & Bond network",
                                "Enjoy maximum flexibility across different clubs"
                            ]}
                        />
                    </div>
                </div>

                {/* Bottom Row: 2 Centered Special Events / Custom Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-center gap-8 w-full items-stretch">
                    <div className="pricing-card-wrapper w-full lg:max-w-[calc(33.33%-16px)] h-full">
                        <PricingCard
                            title="Theme Parties / Special Events"
                            description="Theme-based or collaboration events will be announced separately."
                            buttonText="Join Buzz&Bond"
                            themeColor="cyan"
                            features={[
                                "Prices for theme-based or collaboration events will be announced separately and updated on our website and social media handles before each event."
                            ]}
                        />
                    </div>
                    <div className="pricing-card-wrapper w-full lg:max-w-[calc(33.33%-16px)] h-full">
                        <PricingCard
                            title="Workshops"
                            buttonText="Contact Us"
                            themeColor="cyan"
                            features={[
                                "Whenever workshops are announced, ticket prices and slot details will be shared in advance. All workshop registrations will be advance payment only, and prices will be updated at that time on our website and social media handles."
                            ]}
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}