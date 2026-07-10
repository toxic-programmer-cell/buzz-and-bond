"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ContactButton from "./ContactButton";
import MenuButton from "./MenuButton";
import Link from "next/link";

export default function HeaderActions() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // 1. Entrance animation for the navigation links
            gsap.fromTo(
                "li",
                {
                    opacity: 0,
                    y: -15,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    delay: 0.2,
                }
            );

            // 2. Magnetic hover animation for each navigation link
            const items = gsap.utils.toArray<HTMLElement>("li");
            items.forEach((item) => {
                const link = item.querySelector(".nav-link");
                if (!link) return;

                const onMouseMove = (e: MouseEvent) => {
                    const rect = item.getBoundingClientRect();
                    const itemCenterX = rect.left + rect.width / 2;
                    const itemCenterY = rect.top + rect.height / 2;

                    // Calculate offset from cursor to element center
                    const dx = e.clientX - itemCenterX;
                    const dy = e.clientY - itemCenterY;

                    // Pull link text toward cursor slightly (max 10px deflection)
                    gsap.to(link, {
                        x: dx * 0.35,
                        y: dy * 0.35,
                        duration: 0.1,
                        ease: "power2.out",
                    });
                };

                const onMouseLeave = () => {
                    // Elastic snap back to origin
                    gsap.to(link, {
                        x: 0,
                        y: 0,
                        duration: 0.6,
                        ease: "elastic.out(1, 0.4)",
                    });
                };

                item.addEventListener("mousemove", onMouseMove);
                item.addEventListener("mouseleave", onMouseLeave);

                // Cleanup listeners on unmount
                return () => {
                    item.removeEventListener("mousemove", onMouseMove);
                    item.removeEventListener("mouseleave", onMouseLeave);
                };
            });
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="flex items-center gap-8">
            <nav className="hidden md:block">
                <ul className="flex items-center gap-8 font-medium">
                    <li className="relative py-2 group cursor-pointer">
                        <Link href="/">
                            <span className="nav-link inline-block">Home</span>
                        </Link>
                    </li>
                    <li className="relative py-2 group cursor-pointer">
                        <span className="nav-link inline-block">About</span>
                    </li>
                    <li className="relative py-2 group cursor-pointer">
                        <Link href="/events">
                            <span className="nav-link inline-block">Events</span>
                        </Link>
                    </li>
                    <li className="relative py-2 group cursor-pointer">
                        <Link href="/login">
                            <span className="nav-link inline-block">Admin</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="hidden lg:block">
                <ContactButton />
            </div>
            <div className="lg:hidden">
                <MenuButton />
            </div>
        </div>
    );
}

