"use client";

import { useRef } from "react";

import LoadingText from "./LoadingText";
import useLoaderAnimation from "./useLoaderAnimation";
import "./pageLoader.css";

const messages = [
    "Initializing...",
    "Loading Communities...",
    "Preparing Experiences...",
    "Connecting People...",
    "Almost Ready..."
];

// Predefined static positions for particles to prevent SSR/hydration mismatch in Next.js
const ambientParticles = [
    { left: "15%", top: "60%", size: "3px", delay: "0s", duration: "8s" },
    { left: "75%", top: "25%", size: "4px", delay: "1.5s", duration: "11s" },
    { left: "45%", top: "75%", size: "2px", delay: "3s", duration: "7s" },
    { left: "10%", top: "35%", size: "5px", delay: "0.8s", duration: "9s" },
    { left: "85%", top: "65%", size: "3px", delay: "2.2s", duration: "10s" },
    { left: "30%", top: "20%", size: "2px", delay: "4s", duration: "6s" },
    { left: "65%", top: "80%", size: "4px", delay: "1.2s", duration: "12s" },
    { left: "55%", top: "15%", size: "3px", delay: "2.7s", duration: "8s" },
    { left: "20%", top: "85%", size: "5px", delay: "3.5s", duration: "10s" },
    { left: "70%", top: "45%", size: "2px", delay: "0.5s", duration: "7s" },
    { left: "40%", top: "30%", size: "3px", delay: "1.8s", duration: "9s" },
    { left: "80%", top: "80%", size: "2px", delay: "2.9s", duration: "8s" }
];

export default function PageLoader() {
    const textRef = useRef<HTMLParagraphElement>(null);

    useLoaderAnimation(textRef, messages);

    return (
        <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#040406] text-white">
            
            {/* Background Grid & Ambient Glows */}
            <div className="absolute inset-0 tech-grid-fade opacity-80 pointer-events-none" />
            <div className="loader-bg absolute inset-0 pointer-events-none">
                <div className="loader-bg-glow absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[160px]" />
            </div>

            {/* Cinematic Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {ambientParticles.map((particle, idx) => (
                    <div
                        key={idx}
                        className="ambient-particle"
                        style={{
                            left: particle.left,
                            top: particle.top,
                            width: particle.size,
                            height: particle.size,
                            animationDelay: particle.delay,
                            animationDuration: particle.duration
                        }}
                    />
                ))}
            </div>

            {/* Center Area (Orbits, Sonar Pulsers & Scanning Logo) */}
            <div className="relative flex h-full items-center justify-center">
                
                {/* 3D Orbiting Satellites & HUD Rings */}
                <div className="orbit-system">
                    {/* Ring 1 (Orange, Clockwise) - Dual Satellites */}
                    <div className="orbit-ring-1">
                        <div className="satellite-1-a" />
                        <div className="satellite-1-b" />
                    </div>
                    
                    {/* Ring 2 (Amber, Counter-Clockwise) - Dual Satellites */}
                    <div className="orbit-ring-2">
                        <div className="satellite-2-a" />
                        <div className="satellite-2-b" />
                    </div>
                    
                    {/* Ring 3 (White, Clockwise, Small Inner Orbit) */}
                    <div className="orbit-ring-3">
                        <div className="satellite-3" />
                    </div>
                    
                    {/* 3D Tilted Coordinates HUD */}
                    <div className="orbit-ring-hud" />
                </div>

                {/* Spinning Radar Compass (Flat in background) */}
                <div className="absolute w-[340px] h-[340px] flex items-center justify-center pointer-events-none opacity-[0.12] rotate-hud-ring">
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.5" strokeDasharray="2 6" />
                        <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1.2" strokeDasharray="10 30" />
                        <line x1="100" y1="8" x2="100" y2="192" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
                        <line x1="8" y1="100" x2="192" y2="100" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
                    </svg>
                </div>

                {/* Sonar Signal Ripples */}
                <div className="absolute flex items-center justify-center pointer-events-none">
                    <div className="sonar-ripple ripple-1" />
                    <div className="sonar-ripple ripple-2" />
                    <div className="sonar-ripple ripple-3" />
                </div>

                {/* Scanning Logo Container */}
                <div className="logo-container">
                    
                    {/* Dark Background Base Logo (representing unlit state) */}
                    <img
                        src="/Logo.png"
                        alt="Buzz & Bond"
                        className="absolute w-[100px] h-[100px] opacity-10 brightness-[0.2] select-none pointer-events-none object-contain"
                    />
                    
                    {/* Glowing Activated Logo (revealed by clip-path sweep) */}
                    <img
                        src="/Logo.png"
                        alt="Buzz & Bond"
                        className="logo-overlay w-[100px] h-[100px] select-none pointer-events-none object-contain"
                    />

                    {/* Volumetric Laser Sweep Glow */}
                    <div 
                        className="laser-glow" 
                        style={{ height: "100px", top: "calc(50% - 50px)" }} 
                    />

                    {/* Sharp Scanning Laser Beam */}
                    <div 
                        className="laser-beam" 
                        style={{ height: "100px", top: "calc(50% - 50px)" }} 
                    />
                </div>

            </div>

            {/* Bottom Status Section */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
                <LoadingText textRef={textRef} />
            </div>

        </div>
    );
}