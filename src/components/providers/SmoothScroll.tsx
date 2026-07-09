"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        // Sync ScrollTrigger with Lenis scroll events
        lenis.on("scroll", ScrollTrigger.update);

        // Tell GSAP ticker to use Lenis requestAnimationFrame loop
        const updatePhysics = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(updatePhysics);

        // Disable lag smoothing in GSAP to prevent synchronization sync shifts
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(updatePhysics);
        };
    }, []);

    return <>{children}</>;
}
