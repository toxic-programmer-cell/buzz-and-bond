"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function useLoaderAnimation(
    textRef: RefObject<HTMLParagraphElement | null>,
    messages: string[]
) {
    useGSAP(() => {

        //--------------------------------------
        // Initial States
        //--------------------------------------

        gsap.set(".orbit-system", {
            opacity: 0,
            scale: 0.8,
        });

        gsap.set(".logo-container", {
            opacity: 0,
            scale: 0.85,
        });

        //--------------------------------------
        // Master Timeline
        //--------------------------------------

        const tl = gsap.timeline({
            defaults: {
                ease: "power3.out",
            },
        });

        // Background Fade
        tl.from(".loader-bg", {
            opacity: 0,
            duration: 0.8,
        });

        // Orbit System Entrance
        tl.to(".orbit-system", {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.2)",
        }, "-=0.4");

        // Logo Container Entrance
        tl.to(".logo-container", {
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: "power2.out",
        }, "-=0.8");

        //--------------------------------------
        // Idle Animations (Floating Effects)
        //--------------------------------------

        gsap.to(".logo-container", {
            y: -6,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        gsap.to(".orbit-system", {
            y: -6,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        gsap.to(".loader-bg-glow", {
            scale: 1.08,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        //--------------------------------------
        // Loading Text Loop (GSAP Timeline)
        //--------------------------------------

        const textTimeline = gsap.timeline({ repeat: -1 });

        messages.forEach((_, idx) => {
            const nextIdx = (idx + 1) % messages.length;
            textTimeline.to(textRef.current, {
                opacity: 0,
                y: -12,
                filter: "blur(6px)",
                duration: 0.25,
                delay: 1.4,
                onComplete: () => {
                    if (textRef.current) {
                        textRef.current.textContent = messages[nextIdx];
                    }
                }
            }).fromTo(textRef.current,
                { opacity: 0, y: 12, filter: "blur(6px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35 }
            );
        });

        //--------------------------------------
        // Cleanup on Unmount
        //--------------------------------------

        return () => {
            textTimeline.kill();
            tl.kill();
            gsap.killTweensOf(".logo-container");
            gsap.killTweensOf(".orbit-system");
            gsap.killTweensOf(".loader-bg-glow");
            if (textRef.current) {
                gsap.killTweensOf(textRef.current);
            }
        };

    });
}