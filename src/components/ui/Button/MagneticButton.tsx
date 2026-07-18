"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utils/cn";
import {
    buttonSizes,
    buttonVariants,
} from "@/config/button";

type MagneticButtonProps =
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: keyof typeof buttonVariants;
        size?: keyof typeof buttonSizes;
        strength?: number;
        labelStrength?: number;
        mode?: "true" | "false" | "auto";
        hasWiggle?: boolean;
    };

export default function MagneticButton({
    children,
    className,
    variant = "primary",
    size = "md",
    strength = 0.24,
    labelStrength = 0.24,
    mode = "auto",
    hasWiggle = false,
    onClick,
    ...props
}: MagneticButtonProps) {
    const zoneRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const isHovered = useRef(false);

    useGSAP(
        () => {
            const zone = zoneRef.current;
            const btn = btnRef.current;
            const label = labelRef.current;
            if (!zone || !btn || !label) return;

            const overwrite = mode === "true" ? true : mode === "false" ? false : "auto";
            const isFalse = mode === "false";
            const duration = isFalse ? 1.5 : 0.4;

            let wiggleTween: gsap.core.Tween | null = null;

            if (hasWiggle) {
                // Register custom wiggle ease if not already registered
                if (!gsap.parseEase("wiggle-custom")) {
                    gsap.registerEase("wiggle-custom", (progress: number) => {
                        // 8 oscillations decaying to 0
                        return Math.sin(progress * 8 * Math.PI * 2) * (1 - progress);
                    });
                }

                wiggleTween = gsap.to(btn, {
                    rotation: 12,
                    duration: 1.5,
                    repeat: -1,
                    ease: "wiggle-custom",
                });
            }

            const onMouseMove = (e: MouseEvent) => {
                if (props.disabled) return;
                isHovered.current = true;

                if (wiggleTween) {
                    wiggleTween.pause();
                }

                const rect = zone.getBoundingClientRect();
                const mapX = gsap.utils.mapRange(
                    rect.left,
                    rect.right,
                    -rect.width / 2,
                    rect.width / 2,
                    e.clientX
                );
                const mapY = gsap.utils.mapRange(
                    rect.top,
                    rect.bottom,
                    -rect.height / 2,
                    rect.height / 2,
                    e.clientY
                );

                gsap.to(btn, {
                    x: mapX * strength,
                    y: mapY * strength,
                    duration: duration,
                    ease: "power2.out",
                    overwrite: overwrite,
                });

                gsap.to(label, {
                    x: mapX * labelStrength,
                    y: mapY * labelStrength,
                    duration: duration,
                    ease: "power2.out",
                    overwrite: true,
                });
            };

            const onMouseLeave = () => {
                isHovered.current = false;

                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    duration: 0.4,
                    ease: "elastic.out(1, 0.4)",
                    overwrite: true,
                    onComplete: () => {
                        if (wiggleTween && wiggleTween.isActive() && !props.disabled) {
                            wiggleTween.restart();
                        }
                    },
                });

                gsap.to(label, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.4)",
                    overwrite: true,
                });
            };

            zone.addEventListener("mousemove", onMouseMove);
            zone.addEventListener("mouseleave", onMouseLeave);

            return () => {
                zone.removeEventListener("mousemove", onMouseMove);
                zone.removeEventListener("mouseleave", onMouseLeave);
                if (wiggleTween) {
                    wiggleTween.kill();
                }
            };
        },
        { scope: zoneRef, dependencies: [strength, labelStrength, mode, hasWiggle, props.disabled] }
    );

    return (
        <div
            ref={zoneRef}
            onClick={(e) => {
                if (props.disabled) return;
                onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
            }}
            className={cn(
                "w-[300px] h-[100px] rounded-full  flex items-center justify-center select-none transition-transform duration-100",
                props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer active:scale-[0.98]"
            )}
        >
            <button
                ref={btnRef}
                {...props}
                className={cn(
                    "group relative inline-flex items-center justify-center overflow-hidden rounded-lg font-medium transition-colors duration-300 pointer-events-none cursor-pointer",
                    buttonVariants[variant],
                    buttonSizes[size],
                    className
                )}
            >
                {/* Text / Children wrapped in label class and ref */}
                <span ref={labelRef} className="label relative z-10 inline-block">
                    {children}
                </span>
            </button>
        </div>
    );
}
