"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
    LogOut,
    Calendar,
    Users,
    Activity,
    TrendingUp,
    Search,
    Filter,
    CheckCircle,
    Clock,
    AlertCircle,
    Plus,
    SlidersHorizontal,
    ChevronRight,
    UserCheck
} from "lucide-react";

interface DashboardUIProps {
    admin: {
        name: string;
        email: string;
        role: string;
    };
}

interface Inquiry {
    id: string;
    client: string;
    event: string;
    date: string;
    status: "Confirmed" | "In Progress" | "Pending";
    budget: string;
    location: string;
}

const INITIAL_INQUIRIES: Inquiry[] = [
    {
        id: "1",
        client: "Bosch Ranchi",
        event: "Corporate Product Launch",
        date: "2026-07-24",
        status: "Confirmed",
        budget: "₹1,50,000",
        location: "Radisson Blu, Ranchi"
    },
    {
        id: "2",
        client: "Allianz Office",
        event: "Annual Summer Gala Dinner",
        date: "2026-08-12",
        status: "In Progress",
        budget: "₹3,20,000",
        location: "Khelgaon Banquet, Ranchi"
    },
    {
        id: "3",
        client: "Müller Family",
        event: "Private Wedding Anniversary",
        date: "2026-09-02",
        status: "Pending",
        budget: "₹1,80,000",
        location: "Gymkhana Club, Ranchi"
    },
    {
        id: "4",
        client: "Tata Steel CSR",
        event: "Charity Foundation Concert",
        date: "2026-10-15",
        status: "Confirmed",
        budget: "₹5,00,000",
        location: "Auditorium Morabadi, Ranchi"
    },
    {
        id: "5",
        client: "Lal & Partners",
        event: "Corporate Seminar & Networking",
        date: "2026-11-05",
        status: "Pending",
        budget: "₹95,000",
        location: "Hotel BNR Chanakya, Ranchi"
    }
];

export default function DashboardUI({ admin }: DashboardUIProps) {
    const router = useRouter();
    const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Refs for animations
    const dashboardRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const statsGridRef = useRef<HTMLDivElement>(null);
    const contentAreaRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                headerRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 }
            );

            if (statsGridRef.current) {
                const cards = statsGridRef.current.children;
                tl.fromTo(
                    cards,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
                    "-=0.4"
                );
            }

            tl.fromTo(
                contentAreaRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 },
                "-=0.3"
            );
        },
        { scope: dashboardRef }
    );

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (res.ok) {
                gsap.to(dashboardRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.4,
                    ease: "power2.inOut",
                    onComplete: () => {
                        router.push("/login");
                        router.refresh();
                    }
                });
            } else {
                setIsLoggingOut(false);
            }
        } catch (error) {
            console.error("Logout failed", error);
            setIsLoggingOut(false);
        }
    };

    const handleStatusChange = (id: string, newStatus: Inquiry["status"]) => {
        setInquiries(prev =>
            prev.map(inq => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
    };

    const filteredInquiries = inquiries.filter(inq => {
        const matchesSearch =
            inq.client.toLowerCase().includes(search.toLowerCase()) ||
            inq.event.toLowerCase().includes(search.toLowerCase()) ||
            inq.location.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "All" || inq.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div ref={dashboardRef} className="min-h-screen bg-black text-white px-4 md:px-8 py-8 lg:py-12 flex flex-col gap-8 font-sans">
            {/* Top Navigation & Profile Bar */}
            <header ref={headerRef} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight font-accent italic text-white flex items-center gap-2">
                        Times Event <span className="text-xs uppercase font-sans tracking-widest bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-normal not-italic">Admin</span>
                    </h1>
                    <p className="text-sm text-neutral-400 mt-1">
                        Welcome back, <span className="text-white font-medium">{admin.name}</span> ({admin.email})
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-2.5 h-11 px-5 border border-white/[0.08] hover:border-red-500/30 hover:bg-red-500/5 text-neutral-300 hover:text-red-400 rounded-lg text-sm transition-all duration-300 cursor-pointer disabled:opacity-50"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>{isLoggingOut ? "Signing Out..." : "Sign Out"}</span>
                    </button>
                </div>
            </header>

            {/* Stats Metrics Grid */}
            <section ref={statsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Metric 1 */}
                <div className="bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/30 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between group">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Events Managed</span>
                        <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                            <Calendar className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-bold font-sans">142</h3>
                        <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                            <span className="text-green-500 font-medium">+12%</span> since last month
                        </p>
                    </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/30 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between group">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Active Bookings</span>
                        <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                            <Activity className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-bold font-sans">18</h3>
                        <p className="text-xs text-neutral-500 mt-1">
                            5 scheduled for this week
                        </p>
                    </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/30 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between group">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Team Members</span>
                        <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-bold font-sans">24</h3>
                        <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5 text-orange-500" />
                            All active on fields
                        </p>
                    </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/30 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between group">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Estimated Revenue</span>
                        <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-bold font-sans">₹12,45,000</h3>
                        <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                            <span className="text-green-500 font-medium">+8.4%</span> vs. target Q3
                        </p>
                    </div>
                </div>
            </section>

            {/* Inquiries / Data Table Section */}
            <section ref={contentAreaRef} className="bg-white/[0.01] border border-white/[0.08] rounded-xl p-6 md:p-8 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                    <div>
                        <h2 className="text-lg font-bold">Recent Event Inquiries</h2>
                        <p className="text-xs text-neutral-400 mt-0.5">Manage and track client bookings and inquiries from Ranchi.</p>
                    </div>
                    {/* Add Event Button Placeholder */}
                    <button className="flex items-center gap-1.5 h-10 px-4 bg-white text-black hover:bg-orange-500 hover:text-white rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer self-start md:self-auto">
                        <Plus className="w-4 h-4" />
                        <span>Create Project</span>
                    </button>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search client, event or location..."
                            className="w-full h-10 pl-10 pr-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all duration-300"
                        />
                    </div>
                    {/* Filter buttons */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                        <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mr-2 flex items-center gap-1.5 shrink-0">
                            <Filter className="w-3.5 h-3.5" />
                            <span>Filter:</span>
                        </div>
                        {["All", "Confirmed", "In Progress", "Pending"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`h-8 px-3.5 rounded-lg text-xs font-medium border transition-all duration-300 shrink-0 cursor-pointer ${
                                    statusFilter === status
                                        ? "bg-white text-black border-white"
                                        : "bg-transparent text-neutral-400 border-white/[0.08] hover:text-white hover:border-white/30"
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table View */}
                <div className="overflow-x-auto -mx-6 md:-mx-8">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-white/[0.06] text-neutral-400 text-xs font-semibold uppercase tracking-wider">
                                <th className="py-4 px-6 md:px-8">Client</th>
                                <th className="py-4 px-4">Event Type</th>
                                <th className="py-4 px-4">Date</th>
                                <th className="py-4 px-4">Location</th>
                                <th className="py-4 px-4">Budget</th>
                                <th className="py-4 px-4">Status</th>
                                <th className="py-4 px-6 md:px-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {filteredInquiries.length > 0 ? (
                                filteredInquiries.map((inq) => (
                                    <tr key={inq.id} className="hover:bg-white/[0.01] transition-all group">
                                        <td className="py-4 px-6 md:px-8 font-medium text-white">
                                            {inq.client}
                                        </td>
                                        <td className="py-4 px-4 text-neutral-300">{inq.event}</td>
                                        <td className="py-4 px-4 text-neutral-400 font-mono text-xs">{inq.date}</td>
                                        <td className="py-4 px-4 text-neutral-400">{inq.location}</td>
                                        <td className="py-4 px-4 text-neutral-300 font-mono text-xs">{inq.budget}</td>
                                        <td className="py-4 px-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    inq.status === "Confirmed"
                                                        ? "bg-green-500/10 text-green-400"
                                                        : inq.status === "In Progress"
                                                        ? "bg-blue-500/10 text-blue-400"
                                                        : "bg-yellow-500/10 text-yellow-400"
                                                }`}
                                            >
                                                {inq.status === "Confirmed" ? (
                                                    <CheckCircle className="w-3 h-3" />
                                                ) : inq.status === "In Progress" ? (
                                                    <Clock className="w-3 h-3" />
                                                ) : (
                                                    <AlertCircle className="w-3 h-3" />
                                                )}
                                                {inq.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 md:px-8 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                {inq.status !== "Confirmed" && (
                                                    <button
                                                        onClick={() => handleStatusChange(inq.id, "Confirmed")}
                                                        className="text-xs bg-green-500/10 hover:bg-green-500 hover:text-black text-green-400 px-2 py-1 rounded transition cursor-pointer"
                                                    >
                                                        Confirm
                                                    </button>
                                                )}
                                                {inq.status === "Pending" && (
                                                    <button
                                                        onClick={() => handleStatusChange(inq.id, "In Progress")}
                                                        className="text-xs bg-blue-500/10 hover:bg-blue-500 hover:text-black text-blue-400 px-2 py-1 rounded transition cursor-pointer"
                                                    >
                                                        Progress
                                                    </button>
                                                )}
                                                {inq.status !== "Pending" && (
                                                    <button
                                                        onClick={() => handleStatusChange(inq.id, "Pending")}
                                                        className="text-xs bg-yellow-500/10 hover:bg-yellow-500 hover:text-black text-yellow-400 px-2 py-1 rounded transition cursor-pointer"
                                                    >
                                                        Reset
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-neutral-500">
                                        No inquiries found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
