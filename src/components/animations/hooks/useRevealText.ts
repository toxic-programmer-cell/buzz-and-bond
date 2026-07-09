"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useRevealText(
    ref: RefObject<HTMLDivElement | null>
) {
    useGSAP(() => {
        if (!ref.current) return;

        const lines = ref.current.querySelectorAll(".reveal-line");

        gsap.fromTo(
            lines,
            {
                opacity: 0,
                x: 0, // Start 100px to the right
            },
            {
                opacity: 1,
                x: 100,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                    // markers: true, // Enable while debugging
                },
            }
        );
    }, { scope: ref });
}