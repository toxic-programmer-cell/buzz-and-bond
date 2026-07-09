"use client";

import { useRef } from "react";
import { useHeroMarquee } from "./hooks/useHeroMarquee";

const MARQUEE_TEXT = "LET'S MAKE MEMORIES! - ";

export default function HeroMarquee() {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useHeroMarquee(marqueeRef);

    return (
        <div
            className="
        absolute
        left-0
        top-1/2
        -translate-y-1/2
        z-20
        w-full
        overflow-hidden
        pointer-events-none
        select-none
      "
        >
            <div
                ref={marqueeRef}
                className="flex w-max whitespace-nowrap"
            >
                {[...Array(12)].map((_, index) => (
                    <h1
                        key={index}
                        className="
              mr-10
              text-[clamp(4rem,10vw,11rem)]
              font-bold
              uppercase
              leading-none
              tracking-tight
              text-white
            "
                    >
                        {MARQUEE_TEXT}
                    </h1>
                ))}
            </div>
        </div>
    );
}