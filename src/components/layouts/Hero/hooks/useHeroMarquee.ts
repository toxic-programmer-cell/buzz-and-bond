"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useHeroMarquee(
    ref: RefObject<HTMLDivElement | null>
) {
    useGSAP(() => {
        if (!ref.current) return;

        const tween = gsap.to(ref.current, {
            xPercent: -50,
            ease: "none",
            duration: 50,
            repeat: -1,
        });

        ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate(self) {
                gsap.to(tween, {
                    timeScale: self.direction === 1 ? 1 : -1,
                    duration: 0.3,
                    overwrite: true,
                });
            },
        });

        return () => {
            tween.kill();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);
}