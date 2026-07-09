"use client";

import { useRef } from "react";

import { cn } from "@/utils/cn";
import { Container } from "@/components/ui";

import Logo from "./Logo";
import HeaderActions from "./HeaderActions";
import { HeaderProps } from "./types";

import { useHeaderAnimation } from "./hooks/useHeaderAnimation";

export default function Header({
    className,
}: HeaderProps) {
    const headerRef = useRef<HTMLElement>(null);

    useHeaderAnimation(headerRef);

    return (
        <header
            ref={headerRef}
            className={cn(
                "fixed",
                "top-0",
                "left-0",
                "right-0",
                "z-50",
                "py-8",
                className
            )}
        >
            <Container>
                <div className="flex items-center justify-between">
                    <Logo width={170} height={40} className="w-[130px] md:w-[170px] h-auto object-contain" />

                    <HeaderActions />
                </div>
            </Container>
        </header>
    );
}