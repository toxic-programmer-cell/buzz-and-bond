"use client";

import { Button, Heading, Text } from "@/components/ui";
import ContactButton from "../Header/ContactButton";

export default function HeroContent() {
    return (
        <div
            className="
      relative
      z-30
      flex
      min-h-full
      items-end
      pb-10
      md:pb-10
      "
        >
            <div className="max-w-4xl">
                <p className="font-accent text-[clamp(1.25rem,2.5vw,2.25rem)] leading-[1.3] text-white/95 font-normal tracking-wide">
                    Buzz and Bond is ranchi's <span>first dynamic community Platform</span> , <span>Where fun activities, unique events, and vibrant experiences bring people together.</span>
                </p>
                <div className="mt-10 flex gap-6">
                    <Button
                        variant="primary"
                        size="md"
                        className="rounded-full"
                    >
                        Join the community
                    </Button>
                </div>

            </div>
        </div>
    );
}