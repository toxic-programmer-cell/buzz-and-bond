"use client";

import { useState } from "react";
import {
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
    UserCheck,
    Download,
    Eye,
    ChevronDown
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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

function ReferencePieChart({ percentage, color, trackColor }: { percentage: number; color: string; trackColor: string }) {
    const radius = 18;
    const strokeWidth = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-16 h-16 flex items-center justify-center shrink-0 mb-4 select-none">
            <svg className="w-full h-full transform -rotate-90">
                {/* Track */}
                <circle
                    cx="32"
                    cy="32"
                    r={radius}
                    className="fill-none"
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                />
                {/* Slice */}
                <circle
                    cx="32"
                    cy="32"
                    r={radius}
                    className="fill-none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                />
            </svg>
        </div>
    );
}

export default function DashboardUI({ admin }: DashboardUIProps) {
    const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("All");

    // GSAP Card Stagger Animation
    useGSAP(() => {
        gsap.fromTo(".stats-card",
            { opacity: 0, y: 20, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
        );
        gsap.fromTo(".table-container-wrap",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" }
        );
    });

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, { y: -6, scale: 1.015, boxShadow: "0 12px 24px -10px rgba(0,0,0,0.06)", duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, { y: 0, scale: 1, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.01)", duration: 0.3, ease: "power2.out" });
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
        <div className="flex flex-col min-h-screen bg-[#F9F9F6] text-zinc-900 font-sans pb-12">

            {/* Dark Top Overview Banner - Reference Styled */}
            <div className="bg-[#18181b] rounded-b-[40px] pt-12 pb-32 px-8 select-none">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Overview
                    </h1>
                </div>
            </div>

            {/* Overlapping Metrics Grid */}
            <div className="max-w-[1400px] mx-auto w-full px-8 -mt-24">
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Metric 1 - Blue Pie Chart */}
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="stats-card bg-white rounded-[28px] p-6 flex flex-col items-center text-center shadow-xs transition-shadow duration-300 relative"
                    >
                        <ReferencePieChart percentage={15} color="#3B82F6" trackColor="#EFF6FF" />
                        <h3 className="text-2xl font-extrabold text-zinc-950 leading-tight">15%</h3>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">Unassigned</p>
                        <button className="h-8 px-4 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1E40AF] rounded-xl text-[10px] font-extrabold uppercase tracking-wider mt-4 transition-colors cursor-pointer">
                            View All
                        </button>
                    </div>

                    {/* Metric 2 - Orange Pie Chart */}
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="stats-card bg-white rounded-[28px] p-6 flex flex-col items-center text-center shadow-xs transition-shadow duration-300 relative"
                    >
                        <ReferencePieChart percentage={31} color="#F97316" trackColor="#FFF7ED" />
                        <h3 className="text-2xl font-extrabold text-zinc-950 leading-tight">31%</h3>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">In Process</p>
                        <button className="h-8 px-4 bg-[#FFF7ED] hover:bg-[#FFEDD5] text-[#C2410C] rounded-xl text-[10px] font-extrabold uppercase tracking-wider mt-4 transition-colors cursor-pointer">
                            View All
                        </button>
                    </div>

                    {/* Metric 3 - Red Pie Chart */}
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="stats-card bg-white rounded-[28px] p-6 flex flex-col items-center text-center shadow-xs transition-shadow duration-300 relative"
                    >
                        <ReferencePieChart percentage={21} color="#EF4444" trackColor="#FEF2F2" />
                        <h3 className="text-2xl font-extrabold text-zinc-950 leading-tight">21%</h3>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">Need More Info</p>
                        <button className="h-8 px-4 bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#B91C1C] rounded-xl text-[10px] font-extrabold uppercase tracking-wider mt-4 transition-colors cursor-pointer">
                            View All
                        </button>
                    </div>

                    {/* Metric 4 - Green Pie Chart */}
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="stats-card bg-white rounded-[28px] p-6 flex flex-col items-center text-center shadow-xs transition-shadow duration-300 relative"
                    >
                        <ReferencePieChart percentage={33} color="#10B981" trackColor="#ECFDF5" />
                        <h3 className="text-2xl font-extrabold text-zinc-950 leading-tight">33%</h3>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">Completed</p>
                        <button className="h-8 px-4 bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#047857] rounded-xl text-[10px] font-extrabold uppercase tracking-wider mt-4 transition-colors cursor-pointer">
                            View All
                        </button>
                    </div>
                </section>
            </div>

            {/* Inquiries / Data Table Section - Reference Styled */}
            <div className="max-w-[1400px] mx-auto w-full px-8 mt-8">
                <section className="table-container-wrap bg-white rounded-[28px] p-8 flex flex-col gap-6 shadow-xs border border-zinc-100/50">

                    {/* Table Title and Controls */}
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-zinc-100 pb-6">
                        <div>
                            <h2 className="text-xl font-bold text-zinc-950">Inquiries</h2>
                        </div>

                        {/* Reference controls row */}
                        <div className="flex flex-wrap items-center gap-3">

                            {/* Segment Status filter pill toggle */}
                            <div className="bg-zinc-100/80 rounded-xl p-1 flex items-center select-none">
                                {["All", "Confirmed", "In Progress", "Pending"].map((status) => {
                                    const isActive = statusFilter === status;
                                    return (
                                        <button
                                            key={status}
                                            onClick={() => setStatusFilter(status)}
                                            className={`h-8 px-4 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${isActive
                                                ? "bg-zinc-900 text-white shadow-2-xs"
                                                : "text-zinc-500 hover:text-zinc-900"
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Decorative Date Dropdowns */}
                            <div className="flex items-center gap-2 select-none">
                                <button className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-bold text-zinc-700 flex items-center gap-1.5 hover:bg-zinc-100/50 transition-colors">
                                    <span>2026</span>
                                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                                </button>
                                <button className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-bold text-zinc-700 flex items-center gap-1.5 hover:bg-zinc-100/50 transition-colors">
                                    <span>July</span>
                                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                                </button>
                            </div>

                            {/* Search bar */}
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search..."
                                    className="h-10 w-44 pl-9 pr-4 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200"
                                />
                            </div>

                            {/* Download Button */}
                            <button
                                title="Download Data"
                                className="bg-[#F59E0B] hover:bg-[#D97706] text-zinc-950 hover:text-white p-2.5 rounded-xl transition-all cursor-pointer h-10 w-10 flex items-center justify-center shadow-2-xs active:translate-y-[1px]"
                            >
                                <Download className="w-4.5 h-4.5" />
                            </button>
                        </div>
                    </div>

                    {/* Table View */}
                    <div className="overflow-x-auto -mx-8">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider border-b border-zinc-100">
                                    <th className="py-4 px-6 text-center w-12">
                                        <input
                                            type="checkbox"
                                            disabled
                                            className="w-4 h-4 rounded border-zinc-300 text-orange-600 focus:ring-orange-500 bg-white"
                                        />
                                    </th>
                                    <th className="py-4 px-4">Client</th>
                                    <th className="py-4 px-4">Event Type</th>
                                    <th className="py-4 px-4">Date</th>
                                    <th className="py-4 px-4">Location</th>
                                    <th className="py-4 px-4">Budget</th>
                                    <th className="py-4 px-4">Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {filteredInquiries.length > 0 ? (
                                    filteredInquiries.map((inq) => {
                                        // Replicating the highlighted yellow/gold checked row in the mockup:
                                        // We will highlight the Pending/Müller Family row (id: 3) specifically!
                                        const isHighlighted = inq.id === "3";
                                        return (
                                            <tr
                                                key={inq.id}
                                                className={`transition-colors group ${isHighlighted
                                                    ? "bg-[#FEF3C7] text-zinc-900 hover:bg-[#FEF3C7]/90 border-y border-[#FDE68A]"
                                                    : "hover:bg-zinc-50/40"
                                                    }`}
                                            >
                                                <td className="py-4 px-6 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={isHighlighted}
                                                        readOnly
                                                        className="w-4 h-4 rounded border-zinc-300 text-orange-600 focus:ring-orange-500 bg-white"
                                                    />
                                                </td>
                                                <td className="py-4 px-4 font-bold text-zinc-950 text-sm">
                                                    {inq.client}
                                                </td>
                                                <td className={`py-4 px-4 font-medium ${isHighlighted ? "text-zinc-700" : "text-zinc-600"}`}>
                                                    {inq.event}
                                                </td>
                                                <td className={`py-4 px-4 font-mono font-semibold ${isHighlighted ? "text-zinc-600" : "text-zinc-400"}`}>
                                                    {inq.date}
                                                </td>
                                                <td className={`py-4 px-4 ${isHighlighted ? "text-zinc-700" : "text-zinc-500"}`}>
                                                    {inq.location}
                                                </td>
                                                <td className="py-4 px-4 font-mono font-bold text-zinc-950">
                                                    {inq.budget}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${inq.status === "Confirmed"
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                            : inq.status === "In Progress"
                                                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                                                : "bg-amber-50 text-amber-700 border-amber-200"
                                                            }`}
                                                    >
                                                        {inq.status === "Confirmed" ? (
                                                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                                        ) : inq.status === "In Progress" ? (
                                                            <Clock className="w-3.5 h-3.5 text-blue-500" />
                                                        ) : (
                                                            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                                                        )}
                                                        {inq.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-95 group-hover:opacity-100 transition-opacity">
                                                        {inq.status !== "Confirmed" && (
                                                            <button
                                                                onClick={() => handleStatusChange(inq.id, "Confirmed")}
                                                                className="text-[11px] font-bold bg-white text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-xl border border-zinc-200 hover:border-emerald-200 transition-all cursor-pointer shadow-2-xs active:translate-y-[1px]"
                                                            >
                                                                Confirm
                                                            </button>
                                                        )}
                                                        {inq.status === "Pending" && (
                                                            <button
                                                                onClick={() => handleStatusChange(inq.id, "In Progress")}
                                                                className="text-[11px] font-bold bg-white text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-xl border border-zinc-200 hover:border-blue-200 transition-all cursor-pointer shadow-2-xs active:translate-y-[1px]"
                                                            >
                                                                Progress
                                                            </button>
                                                        )}
                                                        {inq.status !== "Pending" && (
                                                            <button
                                                                onClick={() => handleStatusChange(inq.id, "Pending")}
                                                                className="text-[11px] font-bold bg-white text-zinc-500 hover:bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-all cursor-pointer shadow-2-xs active:translate-y-[1px]"
                                                            >
                                                                Reset
                                                            </button>
                                                        )}

                                                        {/* Eye icon matching mockup */}
                                                        <button
                                                            title="View Details"
                                                            className="p-1.5 hover:bg-zinc-100/80 rounded-lg text-zinc-400 hover:text-zinc-950 transition-colors"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="py-16 text-center text-zinc-400 text-sm font-medium">
                                            No inquiries found matching your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
