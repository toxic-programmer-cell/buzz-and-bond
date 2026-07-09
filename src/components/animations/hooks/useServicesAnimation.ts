"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AnimationRefs {
    sectionRef: RefObject<HTMLDivElement | null>;
    headerRef: RefObject<HTMLDivElement | null>;
    leftCardRef: RefObject<HTMLDivElement | null>;
    centerCardRef: RefObject<HTMLDivElement | null>;
    rightCardRef: RefObject<HTMLDivElement | null>;
}

export function useServicesAnimation({
    sectionRef,
    headerRef,
    leftCardRef,
    centerCardRef,
    rightCardRef,
}: AnimationRefs) {
    useGSAP(
        () => {
            if (
                !sectionRef.current ||
                !headerRef.current ||
                !leftCardRef.current ||
                !centerCardRef.current ||
                !rightCardRef.current
            ) {
                return;
            }

            const mm = gsap.matchMedia();

            // Desktop layout (1024px and up): exact original translations and rotations
            mm.add("(min-width: 1024px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 40%",
                        end: "+=900",
                        scrub: true,
                    },
                });

                // 1. The section heading group (label + heading) moves upward about 120px while fading slightly.
                tl.fromTo(
                    headerRef.current,
                    {
                        opacity: 0,
                    },
                    {
                        y: -120,
                        opacity: 1,
                        ease: "power3.out",
                        duration: 1.5,
                    },
                    0
                );

                // 2. The left card moves downward about 120px.
                // 6. Left card scales from 1 to 0.95.
                // 7. Left: rotate -3deg
                tl.fromTo(
                    leftCardRef.current,
                    {
                        opacity: 0,
                        rotate: 0,
                    },
                    {
                        y: 120,
                        scale: 0.95,
                        rotate: -3,
                        opacity: 1,
                        ease: "power3.out",
                        duration: 1.5,
                    },
                    0.5
                );

                // 3. The right card moves downward about 120px.
                // 6. Right card scales from 1 to 0.95.
                // 7. Right: rotate 3deg
                tl.fromTo(
                    rightCardRef.current,
                    {
                        opacity: 0,
                        rotate: 0,
                    },
                    {
                        y: 120,
                        scale: 0.95,
                        rotate: 3,
                        opacity: 1,
                        ease: "power3.out",
                        duration: 1.5,
                    },
                    0.5
                );

                // 4. The center card moves upward about 100px.
                // 5. Center card scales from 1 to 1.06.
                // 7. Center: rotation 0deg
                tl.fromTo(
                    centerCardRef.current,
                    {
                        opacity: 0,
                        rotate: 0,
                    },
                    {
                        y: -100,
                        scale: 1.06,
                        rotate: 0,
                        opacity: 1,
                        ease: "power3.out",
                        duration: 1.5,
                    },
                    0.5
                );
            });

            // Mobile and Tablet layouts (under 1024px): fade & scale only to prevent card overlap
            mm.add("(max-width: 1023px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 65%",
                        end: "+=500",
                        scrub: true,
                    },
                });

                tl.fromTo(
                    headerRef.current,
                    {
                        opacity: 0,
                    },
                    {
                        y: -30,
                        opacity: 1,
                        ease: "power3.out",
                        duration: 1.5,
                    },
                    0
                );

                tl.fromTo(
                    leftCardRef.current,
                    {
                        opacity: 0,
                    },
                    {
                        scale: 0.95,
                        opacity: 1,
                        ease: "power3.out",
                        duration: 1.5,
                    },
                    0.5
                );

                tl.fromTo(
                    rightCardRef.current,
                    {
                        opacity: 0,
                    },
                    {
                        scale: 0.95,
                        opacity: 1,
                        ease: "power3.out",
                        duration: 1.5,
                    },
                    0.5
                );

                tl.fromTo(
                    centerCardRef.current,
                    {
                        opacity: 0,
                    },
                    {
                        scale: 1.02,
                        opacity: 1,
                        ease: "power3.out",
                        duration: 1.5,
                    },
                    0.5
                );
            });

            return () => {
                mm.revert();
            };
        },
        { scope: sectionRef }
    );
}
