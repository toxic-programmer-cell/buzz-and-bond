"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utils/cn";
import {
    buttonSizes,
    buttonVariants,
} from "@/config/button";

type ButtonProps =
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: keyof typeof buttonVariants;
        size?: keyof typeof buttonSizes;
    };

export default function Button({
    children,
    className,
    variant = "primary",
    size = "md",
    ...props
}: ButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const flairRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const button = buttonRef.current;
            const flair = flairRef.current;
            if (!button || !flair) return;

            const xSet = gsap.quickSetter(flair, "xPercent");
            const ySet = gsap.quickSetter(flair, "yPercent");

            const getXY = (e: MouseEvent) => {
                const { left, top, width, height } = button.getBoundingClientRect();

                const xTransformer = gsap.utils.pipe(
                    gsap.utils.mapRange(0, width, 0, 100),
                    gsap.utils.clamp(0, 100)
                );

                const yTransformer = gsap.utils.pipe(
                    gsap.utils.mapRange(0, height, 0, 100),
                    gsap.utils.clamp(0, 100)
                );

                return {
                    x: xTransformer(e.clientX - left),
                    y: yTransformer(e.clientY - top),
                };
            };

            const onMouseEnter = (e: MouseEvent) => {
                const { x, y } = getXY(e);

                xSet(x);
                ySet(y);

                gsap.to(flair, {
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out",
                });
            };

            const onMouseLeave = (e: MouseEvent) => {
                const { x, y } = getXY(e);

                gsap.killTweensOf(flair);

                gsap.to(flair, {
                    xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
                    yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
                    scale: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
            };

            const onMouseMove = (e: MouseEvent) => {
                const { x, y } = getXY(e);

                gsap.to(flair, {
                    xPercent: x,
                    yPercent: y,
                    duration: 0.4,
                    ease: "power2",
                });
            };

            button.addEventListener("mouseenter", onMouseEnter);
            button.addEventListener("mouseleave", onMouseLeave);
            button.addEventListener("mousemove", onMouseMove);

            return () => {
                button.removeEventListener("mouseenter", onMouseEnter);
                button.removeEventListener("mouseleave", onMouseLeave);
                button.removeEventListener("mousemove", onMouseMove);
            };
        },
        { scope: buttonRef }
    );

    return (
        <button
            ref={buttonRef}
            {...props}
            className={cn(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-lg cursor-pointer font-medium transition-all duration-300",
                buttonVariants[variant],
                buttonSizes[size],
                className
            )}
        >
            {/* Animated Background (GSAP Flair) */}
            <span
                ref={flairRef}
                className="absolute inset-0 pointer-events-none scale-0"
            >
                <span className="absolute w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
            </span>

            {/* Text */}
            <span
                className="
        relative
        z-10
        transition-colors
        duration-300
        group-hover:text-black
      "
            >
                {children}
            </span>
        </button>
    );
}
