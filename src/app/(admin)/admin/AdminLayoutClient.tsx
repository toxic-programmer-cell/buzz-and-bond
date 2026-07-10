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
    Shield
} from "lucide-react";
import Logo from "@/components/layouts/Header/Logo";

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
            name: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Events",
            href: "/admin/event",
            icon: Calendar,
        },
        {
            name: "Gallery",
            href: "/admin/gallery",
            icon: Calendar,
        },
    ];

    return (
        <div className="min-h-screen bg-zinc-50/50 text-zinc-950 flex font-sans">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 text-zinc-400 border-r border-zinc-200 shrink-0 sticky top-0 h-screen shadow-xs">
                {/* Logo Area */}
                <div className="h-16 px-6 border-b border-zinc-200 flex items-center justify-between">
                    <span className="font-accent text-xl italic font-bold tracking-tight text-black flex items-center gap-1.5">
                        <Logo width={100} height={40} />
                        <span className="text-[10px] uppercase font-sans tracking-widest bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded font-normal not-italic">
                            Admin
                        </span>
                    </span>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 h-11 rounded-lg text-sm font-medium transition-colors duration-150 ${isActive
                                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                                    }`}
                            >
                                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-orange-400" : "text-zinc-400"}`} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer - Sign Out */}
                <div className="p-4 border-t border-zinc-200">
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-3 px-4 h-11 rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-950/20 transition-all duration-150 disabled:opacity-50 cursor-pointer"
                    >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span>{isLoggingOut ? "Signing Out..." : "Sign Out"}</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-sm md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Mobile */}
            <aside
                className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-zinc-950 text-zinc-400 border-r border-zinc-800 flex flex-col transition-transform duration-300 md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo Area */}
                <div className="h-16 px-6 border-b border-zinc-800 flex items-center justify-between">
                    <span className="font-accent text-xl italic font-bold tracking-tight text-white flex items-center gap-1.5">
                        Times Event
                        <span className="text-[10px] uppercase font-sans tracking-widest bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded font-normal not-italic">
                            Admin
                        </span>
                    </span>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-zinc-400 hover:text-white cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 h-11 rounded-lg text-sm font-medium transition-colors duration-150 ${isActive
                                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                                    }`}
                            >
                                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-orange-400" : "text-zinc-400"}`} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer - Sign Out */}
                <div className="p-4 border-t border-zinc-800">
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-3 px-4 h-11 rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-950/20 transition-all duration-150 disabled:opacity-50 cursor-pointer"
                    >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span>{isLoggingOut ? "Signing Out..." : "Sign Out"}</span>
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                {/* Header */}
                <header className="h-16 bg-white border-b border-zinc-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden p-2 -ml-2 text-zinc-500 hover:text-zinc-800 cursor-pointer"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="text-xs text-zinc-400 font-medium hidden md:flex items-center gap-1.5 select-none">
                            <span>Admin</span>
                            <span className="text-zinc-300">/</span>
                            <span className="text-zinc-800 font-semibold capitalize">
                                {pathname === "/admin/dashboard" ? "Dashboard" : pathname.split("/").pop()}
                            </span>
                        </div>
                    </div>

                    {/* Profile Dropdown Trigger */}
                    <div className="relative">
                        <button
                            ref={profileBtnRef}
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-2 h-9 px-3 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors duration-150 text-zinc-700 hover:text-zinc-900 cursor-pointer select-none"
                        >
                            <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                {admin.name.charAt(0)}
                            </div>
                            <span className="text-xs font-semibold hidden sm:inline max-w-[120px] truncate">{admin.name}</span>
                            <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-150 ${profileOpen ? "rotate-180" : ""}`} />
                        </button>

                        {/* Profile Dropdown */}
                        {profileOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-0 mt-2 w-64 bg-white border border-zinc-200 rounded-lg shadow-lg overflow-hidden z-50 origin-top-right"
                            >
                                <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Signed In As</p>
                                    <p className="text-sm font-semibold text-zinc-900 mt-1 truncate">{admin.name}</p>
                                    <p className="text-xs text-zinc-500 truncate mt-0.5">{admin.email}</p>
                                </div>
                                <div className="p-2">
                                    <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-500">
                                        <Shield className="w-3.5 h-3.5 text-zinc-400" />
                                        <span>Role: <strong className="text-zinc-950 font-semibold">{admin.role}</strong></span>
                                    </div>
                                </div>
                                <div className="p-2 border-t border-zinc-100 bg-zinc-50/50">
                                    <button
                                        onClick={handleLogout}
                                        disabled={isLoggingOut}
                                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                                    >
                                        <LogOut className="w-3.5 h-3.5 text-zinc-400" />
                                        <span>{isLoggingOut ? "Signing Out..." : "Sign Out"}</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
