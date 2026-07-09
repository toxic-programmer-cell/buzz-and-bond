"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
    User,
    Mail,
    Phone,
    MessageSquare,
    ChevronDown,
    Check,
    Loader2,
    Send,
    MapPin,
    // Instagram, 
    // Linkedin, 
    // Twitter, 
    // Facebook,
    Sparkles
} from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ContactFormValues {
    fullName: string;
    email: string;
    phone: string;
    interest: string;
    message: string;
}

const INTEREST_OPTIONS = [
    "Community Circle",
    "Workshop",
    "Theme Parties",
    "College and Cafe Collaboration"
];

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset,
        trigger
    } = useForm<ContactFormValues>({
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            interest: "",
            message: ""
        }
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    // Refs for animation
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const formCardRef = useRef<HTMLDivElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);

    // Watch values to manage floating label heights
    const fullNameVal = watch("fullName");
    const emailVal = watch("email");
    const phoneVal = watch("phone");
    const interestVal = watch("interest");
    const messageVal = watch("message");

    // Close custom dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 1. Mouse-following ambient orange glow
    useGSAP(() => {
        const container = containerRef.current;
        const glow = glowRef.current;
        if (!container || !glow) return;

        const xTo = gsap.quickTo(glow, "xPercent", { duration: 1.2, ease: "power3.out" });
        const yTo = gsap.quickTo(glow, "yPercent", { duration: 1.2, ease: "power3.out" });

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            // Calculate mouse position relative to container, mapped from -50 to 50
            const x = ((e.clientX - rect.left) / rect.width) * 100 - 50;
            const y = ((e.clientY - rect.top) / rect.height) * 100 - 50;
            xTo(x);
            yTo(y);
        };

        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, { scope: containerRef });

    // 2. Scroll-triggered reveal animations
    useGSAP(() => {
        const leftItems = leftColRef.current?.querySelectorAll(".animate-fade-up");
        const card = formCardRef.current;

        if (leftItems && leftItems.length > 0) {
            gsap.fromTo(leftItems,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }

        if (card) {
            gsap.fromTo(card,
                { opacity: 0, y: 60, scale: 0.98 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }
    }, { scope: sectionRef });

    // 3. Custom select list animation (open/close)
    useGSAP(() => {
        const menu = dropdownMenuRef.current;
        if (!menu) return;

        if (isDropdownOpen) {
            gsap.killTweensOf(menu);
            gsap.killTweensOf(".dropdown-item");

            gsap.fromTo(menu,
                { height: 0, opacity: 0, scale: 0.95 },
                { height: "auto", opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }
            );

            gsap.fromTo(".dropdown-item",
                { opacity: 0, y: -10 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.05,
                    duration: 0.25,
                    ease: "power2.out",
                    delay: 0.08
                }
            );
        } else {
            gsap.killTweensOf(menu);
            gsap.to(menu, {
                height: 0,
                opacity: 0,
                scale: 0.95,
                duration: 0.25,
                ease: "power3.in"
            });
        }
    }, { dependencies: [isDropdownOpen], scope: dropdownRef });

    // Submit handler
    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        // Simulate premium network request delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);

        // GSAP transition to Success slide
        const card = formCardRef.current;
        if (card) {
            gsap.to(card, {
                opacity: 0,
                y: -20,
                scale: 0.95,
                duration: 0.4,
                ease: "power3.in",
                onComplete: () => {
                    setIsSuccess(true);
                    gsap.fromTo(card,
                        { opacity: 0, y: 20, scale: 0.95 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
                    );
                }
            });
        } else {
            setIsSuccess(true);
        }
    };

    const resetForm = () => {
        const card = formCardRef.current;
        if (card) {
            gsap.to(card, {
                opacity: 0,
                y: 20,
                scale: 0.95,
                duration: 0.4,
                ease: "power3.in",
                onComplete: () => {
                    reset();
                    setIsSuccess(false);
                    setIsDropdownOpen(false);
                    gsap.fromTo(card,
                        { opacity: 0, y: -20, scale: 0.95 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
                    );
                }
            });
        } else {
            reset();
            setIsSuccess(false);
            setIsDropdownOpen(false);
        }
    };

    // Inline helpers to check active input styling state
    const isNameActive = focusedField === "fullName" || !!fullNameVal;
    const isEmailActive = focusedField === "email" || !!emailVal;
    const isPhoneActive = focusedField === "phone" || !!phoneVal;
    const isInterestActive = focusedField === "interest" || !!interestVal;
    const isMessageActive = focusedField === "message" || !!messageVal;

    return (
        <section
            ref={sectionRef}
            className="w-full bg-[#070708] py-20 md:py-32 relative overflow-hidden select-none"
        >
            {/* Grid Pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

            {/* Glow Spotlight Background */}
            <div className="absolute bottom-0 left-0 right-0 h-[600px] bg-[radial-gradient(circle_at_50%_100%,rgba(249,115,22,0.08),transparent_60%)] pointer-events-none z-0" />

            <div
                ref={containerRef}
                className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            >
                {/* Reactive pointer tracker blob */}
                <div
                    ref={glowRef}
                    className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(249,115,22,0.08)_0%,transparent_70%)] blur-[80px] rounded-full pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 hidden md:block"
                />

                {/* Left Column: Brand Info */}
                <div
                    ref={leftColRef}
                    className="lg:col-span-5 flex flex-col space-y-8 lg:sticky lg:top-32"
                >
                    <div className="animate-fade-up">
                        <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-orange-500 uppercase flex items-center gap-2">
                            <Sparkles className="w-4 h-4" /> Get in Touch
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight animate-fade-up">
                        Let's co-create <span className="text-orange-500 font-accent italic font-normal">unforgettable</span> experiences.
                    </h2>

                    <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-lg animate-fade-up">
                        Whether you want to lead an active workshop, coordinate high-energy theme parties, collaborate on cafe/college events, or join our community circles, we're ready to spark something amazing with you.
                    </p>

                    {/* Interactive contact details */}
                    <div className="flex flex-col space-y-6 pt-4 animate-fade-up">
                        <a
                            href="mailto:contact@buzzandbond.com"
                            className="group flex items-center space-x-4 text-neutral-300 hover:text-orange-500 transition-colors duration-300"
                        >
                            <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orange-500/10 group-hover:border-orange-500/30 border border-white/5 transition-all duration-300">
                                <Mail className="w-4.5 h-4.5 text-neutral-400 group-hover:text-orange-500 transition-colors" />
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Email Us</p>
                                <p className="text-sm font-medium">contact@buzzandbond.com</p>
                            </div>
                        </a>

                        <a
                            href="tel:+919131062189"
                            className="group flex items-center space-x-4 text-neutral-300 hover:text-orange-500 transition-colors duration-300"
                        >
                            <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orange-500/10 group-hover:border-orange-500/30 border border-white/5 transition-all duration-300">
                                <Phone className="w-4.5 h-4.5 text-neutral-400 group-hover:text-orange-500 transition-colors" />
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Call Us</p>
                                <p className="text-sm font-medium">+91 9131062189</p>
                            </div>
                        </a>

                        <div className="flex items-center space-x-4 text-neutral-300">
                            <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                                <MapPin className="w-4.5 h-4.5 text-neutral-400" />
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Location</p>
                                <p className="text-sm font-medium">Ratu Road, Ranchi, Jharkhand</p>
                            </div>
                        </div>
                    </div>

                    {/* Social links */}
                    {/* <div className="flex items-center space-x-4 pt-6 animate-fade-up">
                        <a 
                            href="#" 
                            onClick={(e) => e.preventDefault()}
                            className="w-10 h-10 rounded-full border border-white/5 bg-white/3 flex items-center justify-center text-neutral-400 hover:text-orange-500 hover:border-orange-500/30 hover:scale-110 transition-all duration-300"
                        >
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a 
                            href="#" 
                            onClick={(e) => e.preventDefault()}
                            className="w-10 h-10 rounded-full border border-white/5 bg-white/3 flex items-center justify-center text-neutral-400 hover:text-orange-500 hover:border-orange-500/30 hover:scale-110 transition-all duration-300"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a 
                            href="#" 
                            onClick={(e) => e.preventDefault()}
                            className="w-10 h-10 rounded-full border border-white/5 bg-white/3 flex items-center justify-center text-neutral-400 hover:text-orange-500 hover:border-orange-500/30 hover:scale-110 transition-all duration-300"
                        >
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a 
                            href="#" 
                            onClick={(e) => e.preventDefault()}
                            className="w-10 h-10 rounded-full border border-white/5 bg-white/3 flex items-center justify-center text-neutral-400 hover:text-orange-500 hover:border-orange-500/30 hover:scale-110 transition-all duration-300"
                        >
                            <Facebook className="w-4 h-4" />
                        </a>
                    </div> */}
                </div>

                {/* Right Column: Contact Card Container */}
                <div className="lg:col-span-7 z-10 w-full">
                    <div
                        ref={formCardRef}
                        className="w-full bg-[#0a0a0b]/60 backdrop-blur-xl border border-white/5 shadow-2xl rounded-3xl p-8 md:p-12 transition-all duration-500 hover:border-white/10 hover:shadow-[0_0_50px_rgba(249,115,22,0.04)]"
                    >
                        {isSuccess ? (
                            /* Success State Slide */
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center mb-8 relative border border-orange-500/20">
                                    <div className="absolute inset-0 bg-orange-500/5 rounded-full animate-ping" />
                                    <Check className="w-12 h-12 text-orange-500" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Connection Formed!
                                </h3>
                                <p className="text-neutral-400 max-w-md mb-10 leading-relaxed text-sm md:text-base">
                                    Your details have sparked. We will review your collaboration interests and reach out to you within 24 hours to craft something unforgettable together.
                                </p>
                                <button
                                    onClick={resetForm}
                                    className="relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold border border-white/15 hover:border-orange-500 text-white text-sm h-12 px-8 hover:bg-orange-500 hover:text-black transition-all duration-300 cursor-pointer active:scale-95"
                                >
                                    Bond Again
                                </button>
                            </div>
                        ) : (
                            /* Form Interactive Inputs */
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-8"
                                noValidate
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                                    Tell us about your plans
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Name Input */}
                                    <div className="relative group">
                                        <div className="absolute left-1 bottom-3.5 z-10 pointer-events-none">
                                            <User className={`w-4 h-4 transition-colors duration-300 ${isNameActive ? "text-orange-500" : "text-neutral-500"}`} />
                                        </div>
                                        <input
                                            id="fullName"
                                            type="text"
                                            {...register("fullName", {
                                                required: "Full name is required",
                                                minLength: { value: 2, message: "Name must be at least 2 characters" }
                                            })}
                                            onFocus={() => setFocusedField("fullName")}
                                            onBlur={() => setFocusedField(null)}
                                            className="peer block w-full bg-transparent border-b border-white/10 py-3.5 pl-7 pr-1 text-white placeholder-transparent focus:outline-none focus:border-orange-500 transition-colors"
                                        />
                                        <label
                                            htmlFor="fullName"
                                            className={`absolute left-7 top-3.5 text-neutral-400 text-sm transition-all duration-300 pointer-events-none origin-left ${isNameActive ? "-translate-y-7 -translate-x-6 scale-80 text-orange-500" : "translate-y-0 scale-100"
                                                }`}
                                        >
                                            Full Name
                                        </label>
                                        {/* Animated underline */}
                                        <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-orange-500 origin-center transition-transform duration-500 ${focusedField === "fullName" ? "scale-x-100" : "scale-x-0"}`} />

                                        {/* Field Errors */}
                                        {errors.fullName && (
                                            <span className="text-xs text-red-500 mt-1 block animate-slide-down">
                                                {errors.fullName.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Email Input */}
                                    <div className="relative group">
                                        <div className="absolute left-1 bottom-3.5 z-10 pointer-events-none">
                                            <Mail className={`w-4 h-4 transition-colors duration-300 ${isEmailActive ? "text-orange-500" : "text-neutral-500"}`} />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            {...register("email", {
                                                required: "Email address is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address format"
                                                }
                                            })}
                                            onFocus={() => setFocusedField("email")}
                                            onBlur={() => setFocusedField(null)}
                                            className="peer block w-full bg-transparent border-b border-white/10 py-3.5 pl-7 pr-1 text-white placeholder-transparent focus:outline-none focus:border-orange-500 transition-colors"
                                        />
                                        <label
                                            htmlFor="email"
                                            className={`absolute left-7 top-3.5 text-neutral-400 text-sm transition-all duration-300 pointer-events-none origin-left ${isEmailActive ? "-translate-y-7 -translate-x-6 scale-80 text-orange-500" : "translate-y-0 scale-100"
                                                }`}
                                        >
                                            Email Address
                                        </label>
                                        {/* Animated underline */}
                                        <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-orange-500 origin-center transition-transform duration-500 ${focusedField === "email" ? "scale-x-100" : "scale-x-0"}`} />

                                        {/* Field Errors */}
                                        {errors.email && (
                                            <span className="text-xs text-red-500 mt-1 block animate-slide-down">
                                                {errors.email.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Phone Input */}
                                    <div className="relative group">
                                        <div className="absolute left-1 bottom-3.5 z-10 pointer-events-none">
                                            <Phone className={`w-4 h-4 transition-colors duration-300 ${isPhoneActive ? "text-orange-500" : "text-neutral-500"}`} />
                                        </div>
                                        <input
                                            id="phone"
                                            type="tel"
                                            {...register("phone", {
                                                required: "Phone number is required",
                                                pattern: {
                                                    value: /^\+?[0-9]{10,15}$/,
                                                    message: "Please enter a valid phone number (min 10 digits)"
                                                }
                                            })}
                                            onFocus={() => setFocusedField("phone")}
                                            onBlur={() => setFocusedField(null)}
                                            className="peer block w-full bg-transparent border-b border-white/10 py-3.5 pl-7 pr-1 text-white placeholder-transparent focus:outline-none focus:border-orange-500 transition-colors"
                                        />
                                        <label
                                            htmlFor="phone"
                                            className={`absolute left-7 top-3.5 text-neutral-400 text-sm transition-all duration-300 pointer-events-none origin-left ${isPhoneActive ? "-translate-y-7 -translate-x-6 scale-80 text-orange-500" : "translate-y-0 scale-100"
                                                }`}
                                        >
                                            Phone Number
                                        </label>
                                        {/* Animated underline */}
                                        <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-orange-500 origin-center transition-transform duration-500 ${focusedField === "phone" ? "scale-x-100" : "scale-x-0"}`} />

                                        {/* Field Errors */}
                                        {errors.phone && (
                                            <span className="text-xs text-red-500 mt-1 block animate-slide-down">
                                                {errors.phone.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Custom Dropdown Select */}
                                    <div
                                        ref={dropdownRef}
                                        className="relative"
                                    >
                                        <label
                                            className={`absolute left-1 text-sm transition-all duration-300 pointer-events-none origin-left ${isInterestActive ? "-translate-y-7 scale-80 text-orange-500" : "translate-y-3.5 text-neutral-400"
                                                }`}
                                        >
                                            Collaboration Area
                                        </label>

                                        <button
                                            id="interest-select"
                                            type="button"
                                            onClick={() => {
                                                setIsDropdownOpen(!isDropdownOpen);
                                                setFocusedField(isDropdownOpen ? null : "interest");
                                            }}
                                            onBlur={() => setFocusedField(null)}
                                            className={`w-full bg-transparent border-b border-white/10 py-3.5 px-1 text-left flex justify-between items-center focus:outline-none focus:border-orange-500 transition-colors cursor-pointer ${interestVal ? "text-white" : "text-transparent"
                                                }`}
                                        >
                                            <span>{interestVal || "Placeholder"}</span>
                                            <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                                        </button>

                                        {/* Visual selected overlay text when dropdown is closed but field has value */}
                                        {interestVal && (
                                            <span className="absolute left-1 top-3.5 text-white text-sm pointer-events-none">
                                                {interestVal}
                                            </span>
                                        )}

                                        {/* Animated underline */}
                                        <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-orange-500 origin-center transition-transform duration-500 ${isDropdownOpen || focusedField === "interest" ? "scale-x-100" : "scale-x-0"}`} />

                                        {/* Dropdown Menu Options */}
                                        <div
                                            ref={dropdownMenuRef}
                                            className="absolute top-full left-0 w-full mt-2 bg-[#0d0d0f] border border-white/5 rounded-2xl overflow-hidden shadow-2xl z-50 h-0 opacity-0"
                                        >
                                            <div className="p-1.5 space-y-1">
                                                {INTEREST_OPTIONS.map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        onClick={() => {
                                                            setValue("interest", option, { shouldValidate: true });
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className={`dropdown-item w-full text-left py-3 px-4 rounded-xl flex items-center justify-between text-sm transition-all duration-200 cursor-pointer ${interestVal === option
                                                            ? "bg-orange-500 text-black font-semibold"
                                                            : "text-neutral-400 hover:bg-white/5 hover:text-white"
                                                            }`}
                                                    >
                                                        <span>{option}</span>
                                                        {interestVal === option && <Check className="w-4.5 h-4.5" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Hidden register field for form submission */}
                                        <input
                                            type="hidden"
                                            {...register("interest", { required: "Please select a collaboration area" })}
                                        />

                                        {/* Field Errors */}
                                        {errors.interest && (
                                            <span className="text-xs text-red-500 mt-1 block animate-slide-down">
                                                {errors.interest.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Message Input */}
                                <div className="relative group">
                                    <div className="absolute left-1 top-3.5 z-10 pointer-events-none">
                                        <MessageSquare className={`w-4 h-4 transition-colors duration-300 ${isMessageActive ? "text-orange-500" : "text-neutral-500"}`} />
                                    </div>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        {...register("message", {
                                            required: "Message is required",
                                            minLength: { value: 10, message: "Message must be at least 10 characters" }
                                        })}
                                        onFocus={() => setFocusedField("message")}
                                        onBlur={() => setFocusedField(null)}
                                        className="peer block w-full bg-transparent border-b border-white/10 py-3.5 pl-7 pr-1 text-white placeholder-transparent focus:outline-none focus:border-orange-500 transition-colors resize-none overflow-y-auto"
                                    />
                                    <label
                                        htmlFor="message"
                                        className={`absolute left-7 top-3.5 text-neutral-400 text-sm transition-all duration-300 pointer-events-none origin-left ${isMessageActive ? "-translate-y-7 -translate-x-6 scale-80 text-orange-500" : "translate-y-0 scale-100"
                                            }`}
                                    >
                                        Your Message
                                    </label>
                                    {/* Animated underline */}
                                    <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-orange-500 origin-center transition-transform duration-500 ${focusedField === "message" ? "scale-x-100" : "scale-x-0"}`} />

                                    {/* Field Errors */}
                                    {errors.message && (
                                        <span className="text-xs text-red-500 mt-1 block animate-slide-down">
                                            {errors.message.message}
                                        </span>
                                    )}
                                </div>

                                {/* Custom Submit Button */}
                                <div className="pt-4 flex justify-end">
                                    <button
                                        id="submit-btn"
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative h-14 px-10 rounded-full font-semibold bg-orange-500 text-black overflow-hidden flex items-center justify-center gap-3 transition-transform active:scale-97 cursor-pointer hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
                                    >
                                        {/* Sliding background hover flair */}
                                        <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Connecting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 duration-300" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}