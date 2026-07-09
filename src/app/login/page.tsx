"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import heroBg from "@/assets/images/HeroBackgroundTheme.jpg";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Refs for animations
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const emailGroupRef = useRef<HTMLDivElement>(null);
    const passwordGroupRef = useRef<HTMLDivElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Slide down logo and title
            tl.fromTo(
                logoRef.current,
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 }
            );

            tl.fromTo(
                cardRef.current,
                { y: 40, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, duration: 0.8 },
                "-=0.6"
            );

            tl.fromTo(
                [titleRef.current, subtitleRef.current],
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
                "-=0.4"
            );

            tl.fromTo(
                [emailGroupRef.current, passwordGroupRef.current],
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
                "-=0.3"
            );

            tl.fromTo(
                submitBtnRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5 },
                "-=0.2"
            );
        },
        { scope: containerRef }
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Invalid credentials. Please try again.");
            }

            // Successfully logged in -> animate out before redirecting
            gsap.to(cardRef.current, {
                y: -30,
                opacity: 0,
                scale: 0.95,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    router.push("/dashboard");
                    router.refresh();
                },
            });
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
            setIsLoading(false);

            // Shake card on error
            gsap.fromTo(
                cardRef.current,
                { x: -10 },
                { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" }
            );
        }
    };

    return (
        <main
            ref={containerRef}
            className="min-h-screen relative flex flex-col items-center justify-center bg-black overflow-hidden px-4 py-12"
        >
            {/* Background & Overlay */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src={heroBg}
                    alt="Hero Background"
                    fill
                    priority
                    placeholder="blur"
                    className="object-cover object-center opacity-45 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 z-10" />
            </div>

            {/* Brand/Logo Area */}
            <div ref={logoRef} className="z-20 mb-8 flex flex-col items-center">
                <h2 className="text-white font-accent italic text-3xl md:text-4xl tracking-wide select-none">
                    Times Event
                </h2>
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-orange-500 to-transparent mt-2" />
            </div>

            {/* Glassmorphic Login Card */}
            <div
                ref={cardRef}
                className="z-20 w-full max-w-[440px] rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col"
            >
                <div className="mb-8">
                    <h1
                        ref={titleRef}
                        className="text-white font-sans text-2xl md:text-3xl font-semibold tracking-tight"
                    >
                        Welcome Back
                    </h1>
                    <p
                        ref={subtitleRef}
                        className="text-neutral-400 text-sm mt-1.5"
                    >
                        Sign in to manage Times Event administration.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2.5">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div ref={emailGroupRef} className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-xs font-semibold uppercase tracking-wider text-neutral-300"
                        >
                            Email Address
                        </label>
                        <div className="relative group/input">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within/input:text-orange-500 transition-colors duration-300">
                                <Mail className="w-4 h-4" />
                            </span>
                            <input
                                id="email"
                                type="email"
                                required
                                disabled={isLoading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-12 pl-11 pr-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all duration-300 disabled:opacity-50 text-sm font-sans"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div ref={passwordGroupRef} className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-xs font-semibold uppercase tracking-wider text-neutral-300"
                        >
                            Password
                        </label>
                        <div className="relative group/input">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within/input:text-orange-500 transition-colors duration-300">
                                <Lock className="w-4 h-4" />
                            </span>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                disabled={isLoading}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-12 pl-11 pr-12 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all duration-300 disabled:opacity-50 text-sm font-sans"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 focus:outline-none transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        ref={submitBtnRef}
                        type="submit"
                        disabled={isLoading}
                        className="relative w-full h-12 bg-white hover:bg-orange-500 text-black hover:text-white font-semibold rounded-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center overflow-hidden active:scale-[0.98]"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
            </div>

            {/* Footer Notice */}
            <div className="z-20 mt-8 text-xs text-neutral-500 select-none">
                Authorized Personnel Only &copy; {new Date().getFullYear()} Times Event.
            </div>
        </main>
    );
}