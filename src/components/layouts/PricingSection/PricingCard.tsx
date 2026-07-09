"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui";

interface PricingCardProps {
    title?: string;
    price?: string;
    period?: string;
    description?: string;
    features?: string[];
    buttonText?: string;
    popular?: boolean;
    themeColor?: "green" | "purple" | "pink" | "cyan";
    asteriskNote?: boolean;
    hasPermanentLicenseToggle?: boolean;
}

const themeStyles = {
    green: {
        title: "text-[#0ae042]",
        price: "text-[#0ae042]",
        border: "border-[#0ae042]/20 hover:border-[#0ae042]/40",
        button: "border-[#0ae042] hover:bg-[#0ae042]/10 hover:shadow-[0_0_15px_rgba(10,224,66,0.3)]",
        bullet: "text-[#0ae042]",
        glow: "hover:shadow-[0_0_30px_rgba(10,224,66,0.08)]",
    },
    purple: {
        title: "text-[#8a79ff]",
        price: "text-[#8a79ff]",
        border: "border-[#8a79ff]/20 hover:border-[#8a79ff]/40",
        button: "border-[#8a79ff] hover:bg-[#8a79ff]/10 hover:shadow-[0_0_15px_rgba(138,121,255,0.3)]",
        bullet: "text-[#8a79ff]",
        glow: "hover:shadow-[0_0_30px_rgba(138,121,255,0.08)]",
    },
    pink: {
        title: "text-[#ff4a8b]",
        price: "text-[#ff4a8b]",
        border: "border-[#ff4a8b]/20 hover:border-[#ff4a8b]/40",
        button: "border-[#ff4a8b] hover:bg-[#ff4a8b]/10 hover:shadow-[0_0_15px_rgba(255,74,139,0.3)]",
        bullet: "text-[#ff4a8b]",
        glow: "hover:shadow-[0_0_30px_rgba(255,74,139,0.08)]",
    },
    cyan: {
        title: "text-[#00d2ff]",
        price: "text-[#00d2ff]",
        border: "border-[#00d2ff]/20 hover:border-[#00d2ff]/40",
        button: "border-[#00d2ff] hover:bg-[#00d2ff]/10 hover:shadow-[0_0_15px_rgba(0,210,255,0.3)]",
        bullet: "text-[#00d2ff]",
        glow: "hover:shadow-[0_0_30px_rgba(0,210,255,0.08)]",
    },
};

export default function PricingCard({
    title = "Starter Plan",
    price = "",
    // period,
    description = "Perfect to get started with our core features.",
    features = ["Feature 1", "Feature 2", "Feature 3"],
    buttonText = "Buy Now",
    popular = false,
    themeColor = "green",
    asteriskNote = false,
    hasPermanentLicenseToggle = false,
}: PricingCardProps) {
    const [isPermanent, setIsPermanent] = useState(false);

    // Toggling the permanent license updates the display price and period to mock a permanent license purchase
    const displayPrice = hasPermanentLicenseToggle && isPermanent ? "$399" : price;
    // const displayPeriod = hasPermanentLicenseToggle && isPermanent ? "/ PERMANENT" : period;

    const styles = themeStyles[themeColor];

    return (
        <div
            className={cn(
                "w-full h-full bg-[#0d0d0e] border rounded-[20px] p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 select-none overflow-hidden",
                styles.border,
                styles.glow
            )}
        >
            {/* Top colored accent highlight bar */}
            <div className={cn("absolute top-0 left-0 w-full h-[4px]",
                themeColor === "green" && "bg-[#0ae042]",
                themeColor === "purple" && "bg-[#8a79ff]",
                themeColor === "pink" && "bg-[#ff4a8b]",
                themeColor === "cyan" && "bg-[#00d2ff]"
            )} />

            {popular && (
                <div className="absolute -top-6 -right-6 w-24 h-24 flex items-center justify-center z-30 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_30s_linear_infinite] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                        <path
                            fill="url(#badge-grad)"
                            d="M 50,0 L 59,10 L 72,5 L 76,18 L 90,18 L 89,31 L 100,36 L 94,48 L 100,60 L 89,65 L 90,78 L 76,78 L 72,91 L 59,86 L 50,96 L 41,86 L 28,91 L 24,78 L 10,78 L 11,65 L 0,60 L 6,48 L 0,36 L 11,31 L 10,18 L 24,18 L 28,5 L 41,10 Z"
                        />
                        <defs>
                            <linearGradient id="badge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ff9cfc" />
                                <stop offset="50%" stopColor="#b4d4ff" />
                                <stop offset="100%" stopColor="#7befff" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="absolute text-[10px] leading-tight font-extrabold text-black text-center max-w-[65px] select-none uppercase tracking-tight">
                        Most Popular
                    </span>
                </div>
            )}

            <div>
                {/* Header */}
                <h3 className={cn("text-xl md:text-2xl font-bold mb-4 tracking-tight transition-colors duration-300", styles.title)}>
                    {title}
                </h3>

                {/* Price */}
                <div className="mb-4 select-none min-h-[60px] flex items-center">
                    {displayPrice ? (
                        <div className="flex items-baseline gap-0.5">
                            <span className={cn("text-5xl md:text-6xl font-black tracking-tight", styles.price)}>
                                {displayPrice}
                            </span>
                            {themeColor === "green" && (
                                <span className="text-[#0ae042] text-xl font-bold -translate-y-5 select-none">*</span>
                            )}
                        </div>
                    ) : (
                        <span className={cn("inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 border border-white/5", styles.price)}>
                            Pricing Varies
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mb-6 min-h-[48px]">
                    {description}
                </p>

                {/* CTA Button */}
                <div className="w-full mb-6">
                    <Button
                        className={cn(
                            "w-full justify-center text-center rounded-full border-2 font-semibold tracking-wide transition-all duration-300",
                            styles.button
                        )}
                        variant="ghost"
                        size="md"
                    >
                        {buttonText}
                    </Button>
                </div>

                {/* Extra Notes & Toggles */}
                {asteriskNote && (
                    <div className="text-xs text-neutral-500 mb-6 leading-relaxed">
                        *Free unless you need a Commercial License.{" "}
                        <a
                            href="#"
                            className="text-[#0ae042] hover:underline font-semibold transition-colors"
                            onClick={(e) => e.preventDefault()}
                        >
                            Learn More
                        </a>
                    </div>
                )}

                {hasPermanentLicenseToggle && (
                    <div
                        onClick={() => setIsPermanent(!isPermanent)}
                        className="flex items-center gap-3 mb-6 cursor-pointer group/toggle select-none"
                    >
                        <div className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200",
                            isPermanent
                                ? "border-[#00d2ff] bg-[#00d2ff]/10"
                                : "border-neutral-600 group-hover/toggle:border-neutral-400"
                        )}>
                            {isPermanent && (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#00d2ff]" />
                            )}
                        </div>
                        <span className={cn(
                            "text-sm font-medium transition-colors duration-200",
                            isPermanent ? "text-white" : "text-neutral-400 group-hover/toggle:text-neutral-300"
                        )}>
                            Permanent License
                        </span>
                    </div>
                )}

                {/* Features List */}
                <ul className="flex flex-col gap-4 mb-8">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-300">
                            <span className={cn("select-none font-bold shrink-0 mt-0.5", styles.bullet)}>
                                ✦
                            </span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* View License Footer */}
            <div className="mt-auto pt-6 border-t border-neutral-900">
                <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors duration-200 block text-left"
                >
                    View License
                </a>
            </div>
        </div>
    );
}