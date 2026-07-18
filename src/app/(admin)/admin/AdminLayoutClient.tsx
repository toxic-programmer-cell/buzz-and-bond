"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Calendar,
    LogOut,
    Menu,
    X,
    ChevronDown,
    Shield,
    Bell,
    Image as ImageIcon,
    Plus
} from "lucide-react";
import Logo from "@/components/layouts/Header/Logo";
import gsap from "gsap";

interface AdminLayoutClientProps {
    children: React.ReactNode;
    admin: {
        name: string;
        email: string;
        role: string;
    };
}

export default function AdminLayoutClient({ children, admin }: AdminLayoutClientProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const profileBtnRef = useRef<HTMLButtonElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                profileBtnRef.current &&
                !profileBtnRef.current.contains(event.target as Node)
            ) {
                setProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // GSAP Page Transition
    useEffect(() => {
        const tweet = gsap.fromTo(
            ".page-content-wrap",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "all" }
        );

        return () => { tweet.kill() }
    }, [pathname]);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (res.ok) {
                router.push("/login");
                router.refresh();
            } else {
                setIsLoggingOut(false);
            }
        } catch (error) {
            console.error("Logout failed", error);
            setIsLoggingOut(false);
        }
    };

    const navItems = [
        {
            name: "Overview",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Events",
            href: "/admin/event",
            icon: Calendar,
            badge: 5
        },
        {
            name: "Gallery",
            href: "/admin/gallery",
            icon: ImageIcon,
            badge: 12
        },
    ];

    return (
        <div className="min-h-screen bg-[#F9F9FB] text-zinc-900 flex font-sans antialiased">

            {/* Sidebar Desktop - Reference Styled */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-zinc-200/50 shrink-0 sticky top-0 h-screen z-20 overflow-hidden transition-all duration-300">
                {/* Logo Area */}
                <div className="h-20 px-6 flex items-center justify-between bg-white border-b border-zinc-100">
                    <span className="font-accent text-xl italic font-bold tracking-tight text-black flex items-center gap-2">
                        <Logo width={90} height={36} />
                        <span className="text-[9px] uppercase font-sans tracking-widest bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded-full font-bold select-none">
                            Admin
                        </span>
                    </span>
                </div>

                {/* Reference Styled Floating Amber Action Button */}
                <div className="px-4 py-6 border-b border-zinc-100">
                    <Link
                        href="/admin/event"
                        className="flex items-center justify-center gap-2 h-12 w-full bg-[#18181b] hover:bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-100 hover:text-white font-bold rounded-2xl shadow-sm hover:shadow transition-all duration-200 text-xs"
                    >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>Upload Event</span>
                    </Link>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-4 py-4 space-y-1.5 bg-white overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center justify-between px-4 h-11 rounded-2xl text-xs font-bold transition-all duration-200 ${isActive
                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm"
                                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-zinc-400"}`} />
                                    <span>{item.name}</span>
                                </div>
                                {item.badge && (
                                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${isActive ? "bg-white/20 text-white" : "bg-orange-50 text-orange-600 border border-orange-100/50"}`}>
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Reference Styled Bottom User profile card block */}
                <div className="bg-zinc-950 text-white p-5 rounded-t-[28px] border-t border-zinc-800/10 flex flex-col gap-4 select-none relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white uppercase shadow-sm shrink-0 border border-white/20">
                                {admin.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-white truncate leading-tight">{admin.name}</p>
                                <p className="text-[10px] text-zinc-400 truncate mt-0.5 leading-none">Admin</p>
                            </div>
                        </div>
                        <button
                            ref={profileBtnRef}
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="p-1 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
                        >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
                        </button>
                    </div>

                    {/* Quick profile actions */}
                    {profileOpen && (
                        <div
                            ref={dropdownRef}
                            className="absolute bottom-16 left-4 right-4 bg-white text-zinc-900 border border-zinc-100 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
                        >
                            <div className="p-3 bg-zinc-50 border-b border-zinc-100 text-xs">
                                <p className="font-bold text-zinc-950 truncate">{admin.name}</p>
                                <p className="text-[10px] text-zinc-500 truncate mt-0.5">{admin.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>{isLoggingOut ? "Signing Out..." : "Sign Out"}</span>
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-zinc-950/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Mobile */}
            <aside
                className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-zinc-200/50 flex flex-col transition-transform duration-300 rounded-r-[24px] md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="h-16 px-6 border-b border-zinc-100 flex items-center justify-between">
                    <span className="font-accent text-xl italic font-bold tracking-tight text-black flex items-center gap-2">
                        Times Event
                        <span className="text-[9px] uppercase font-sans tracking-widest bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded-full font-bold">
                            Admin
                        </span>
                    </span>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 h-11 rounded-2xl text-xs font-bold transition-all duration-200 ${isActive
                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50"
                                    }`}
                            >
                                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-zinc-400"}`} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="bg-zinc-950 text-white p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white uppercase">
                        {admin.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate leading-tight">{admin.name}</p>
                        <p className="text-[10px] text-zinc-400 truncate mt-0.5 leading-none">{admin.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="p-2 text-zinc-400 hover:text-white rounded-xl transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                {/* Header for screens without sidebar link titles */}
                <header className="h-16 md:hidden bg-white/80 backdrop-blur-md border-b border-zinc-200/50 px-4 flex items-center justify-between sticky top-0 z-30 shadow-2-xs">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 -ml-2 text-zinc-500 hover:text-zinc-900 rounded-xl cursor-pointer"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="text-sm font-bold text-zinc-950 capitalize">
                            {pathname === "/admin/dashboard" ? "Dashboard" : pathname.split("/").pop()}
                        </h1>
                    </div>
                </header>

                {/* Main Content Pane - Spacing managed by children */}
                <main className="flex-1 overflow-y-auto page-content-wrap">
                    {children}
                </main>
            </div>
        </div>
    );
}
