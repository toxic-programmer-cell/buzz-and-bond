import Image from "next/image";
import { Container, Section } from "@/components/ui";
import HeroMarquee from "./HeroMarquee";
import HeroContent from "./HeroContent";
import heroBg from "@/assets/images/HeroBackgroundTheme.jpg";

export default function Hero() {
    return (
        <Section
            size="hero"
            className="relative overflow-hidden bg-black h-[120vh]"
        >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src={heroBg}
                    alt="Hero Background"
                    fill
                    priority
                    placeholder="blur"
                    className="object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-black/65 z-10" />
            </div>

            <div className="w-full h-screen md:h-[120vh] absolute top-0 z-30 pointer-events-none">
                <div className="flex items-center w-full h-screen text-center justify-center">
                    <p className="text-orange-500 italic font-accent text-2xl md:text-4xl max-w-3xl">Experience Ranchi Together</p>
                </div>
            </div>

            {/* Marquee */}
            <HeroMarquee />

            {/* Main Content */}
            <Container className="relative z-30 h-[120vh] ">
                <HeroContent />
            </Container>
            <div className="h-7 w-full absolute bottom-0 bg-black z-30 blur-xs"></div>
        </Section>
    );
}