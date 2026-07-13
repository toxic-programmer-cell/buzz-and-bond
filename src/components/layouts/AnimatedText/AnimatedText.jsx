'use client'

import { useRef } from "react";
import { useRevealText } from "@/components/animations/hooks/useRevealText";

export default function AnimatedText() {
    const containerRef = useRef(null);
    useRevealText(containerRef);

    return (
        <div
            ref={containerRef}
            className="relative min-h-[350px] h-[75vh] md:h-[90vh] bg-black overflow-hidden flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 select-none"
            style={{
                background: "radial-gradient(circle at 10% 90%, rgba(139, 92, 246, 0.12) 0%, rgba(0, 0, 0, 0) 50%), #000000"
            }}
        >
            <div className="mx-auto max-w-5xl">
                <div
                    className="space-y-4 md:space-y-2 max-w-7xl w-full mx-auto font-accent text-white"
                    style={{
                        maskImage: "linear-gradient(to right, #ffffff 40%, rgba(255, 255, 255, 0.25) 100%)",
                        WebkitMaskImage: "linear-gradient(to right, #ffffff 40%, rgba(255, 255, 255, 0.25) 100%)"
                    }}
                >
                    {/* Line 1: Staggered left */}
                    <div className="reveal-line text-left pl-[2vw] sm:pl-[4vw] text-lg sm:text-xl md:text-3xl lg:text-5xl xl:text-5xl font-light tracking-wide leading-tight">
                        Expand Your <span className="italic font-normal text-white/90"> Social Circle</span>
                    </div>

                    {/* Line 2: Staggered center-left */}
                    <div className="reveal-line text-left pl-[4vw] sm:pl-[7vw] md:pl-[8vw] text-lg sm:text-xl md:text-3xl lg:text-5xl xl:text-5xl font-light tracking-wide leading-tight">
                        Meaningful  <span className="italic font-normal text-white/90">Connections</span>  Start Here
                    </div>

                    {/* Line 3: Staggered center-right */}
                    <div className="reveal-line text-left pl-[6vw] sm:pl-[10vw] md:pl-[12vw] text-lg sm:text-xl md:text-3xl lg:text-5xl xl:text-5xl font-light tracking-wide leading-tight">
                        More Than <span className="italic font-normal text-white/90">Events,</span> It's <span className="italic font-normal text-white/90">Community</span>
                    </div>
                </div>
            </div>
            <div className="absolute w-[100px] h-[100px] bottom-10 left-40 bg-white -translate-x-1/2 rounded-full blur-[90px]"></div>
            <div className="absolute w-[80px] h-[80px] bottom-40 left-10 bg-orange-200 -translate-x-1/2 rounded-full blur-[90px]"></div>
        </div>
    );
}