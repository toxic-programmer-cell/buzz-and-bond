"use client";

import { useRef } from "react";
import { useRevealText } from "../hooks/useRevealText";

type Props = {
    lines: string[];
};

export default function RevealText({
    lines,
}: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useRevealText(ref);

    return (
        <div
            ref={ref}
            className="
      absolute
      inset-0
      flex
      items-center
      justify-center
      z-40
      "
        >
            <div className="space-y-6 text-center px-6 max-w-5xl">
                {lines.map((line, index) => (
                    <h2
                        key={index}
                        className="
            reveal-line
            text-2xl
            sm:text-3xl
            md:text-5xl
            lg:text-6xl
            text-white
            font-light
            leading-snug
            "
                    >
                        {line}
                    </h2>
                ))}
            </div>
        </div>
    );
}