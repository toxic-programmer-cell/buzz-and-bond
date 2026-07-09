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
    const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("All");

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
        <div className="flex flex-col gap-6 text-zinc-900 font-sans">
            {/* Stats Metrics Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Metric 1 */}
                <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Events Managed</span>
                        <div className="p-2 rounded-lg bg-orange-50 text-orange-600 border border-orange-100">
                            <Calendar className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-2xl font-bold text-zinc-900">142</h3>
                        <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">+12%</span> since last month
                        </p>
                    </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Active Bookings</span>
                        <div className="p-2 rounded-lg bg-orange-50 text-orange-600 border border-orange-100">
                            <Activity className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-2xl font-bold text-zinc-900">18</h3>
                        <p className="text-xs text-zinc-500 mt-1">
                            5 scheduled for this week
                        </p>
                    </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Team Members</span>
                        <div className="p-2 rounded-lg bg-orange-50 text-orange-600 border border-orange-100">
                            <Users className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-2xl font-bold text-zinc-900">24</h3>
                        <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5 text-zinc-400" />
                            All active on fields
                        </p>
                    </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Estimated Revenue</span>
                        <div className="p-2 rounded-lg bg-orange-50 text-orange-600 border border-orange-100">
                            <TrendingUp className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-2xl font-bold text-zinc-900">₹12,45,000</h3>
                        <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                            <span className="text-emerald-600 font-semibold">+8.4%</span> vs. target Q3
                        </p>
                    </div>
                </div>
            </section>

            {/* Inquiries / Data Table Section */}
            <section className="bg-white border border-zinc-200 rounded-xl p-5 md:p-6 flex flex-col gap-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
                    <div>
                        <h2 className="text-base font-bold text-zinc-900">Recent Event Inquiries</h2>
                        <p className="text-xs text-zinc-500 mt-0.5">Manage and track client bookings and inquiries from Ranchi.</p>
                    </div>
                    <button className="flex items-center gap-1.5 h-9 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto shadow-sm">
                        <Plus className="w-4 h-4" />
                        <span>Create Project</span>
                    </button>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search client, event or location..."
                            className="w-full h-9 pl-10 pr-4 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
                        />
                    </div>
                    {/* Filter buttons */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mr-2 flex items-center gap-1.5 shrink-0">
                            <Filter className="w-3.5 h-3.5" />
                            <span>Filter:</span>
                        </div>
                        {["All", "Confirmed", "In Progress", "Pending"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`h-8 px-3.5 rounded-lg text-xs font-semibold border transition-colors shrink-0 cursor-pointer ${
                                    statusFilter === status
                                        ? "bg-orange-50 text-orange-700 border-orange-200"
                                        : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900"
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table View */}
                <div className="overflow-x-auto -mx-5 md:-mx-6">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-zinc-200 text-zinc-400 text-[10px] font-bold uppercase tracking-wider bg-zinc-50/50">
                                <th className="py-3 px-5 md:px-6">Client</th>
                                <th className="py-3 px-4">Event Type</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Location</th>
                                <th className="py-3 px-4">Budget</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-5 md:px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {filteredInquiries.length > 0 ? (
                                filteredInquiries.map((inq) => (
                                    <tr key={inq.id} className="hover:bg-zinc-50/30 transition-colors">
                                        <td className="py-3.5 px-5 md:px-6 font-semibold text-zinc-900">
                                            {inq.client}
                                        </td>
                                        <td className="py-3.5 px-4 text-zinc-600">{inq.event}</td>
                                        <td className="py-3.5 px-4 text-zinc-500 font-mono text-xs">{inq.date}</td>
                                        <td className="py-3.5 px-4 text-zinc-500">{inq.location}</td>
                                        <td className="py-3.5 px-4 text-zinc-900 font-mono text-xs font-semibold">{inq.budget}</td>
                                        <td className="py-3.5 px-4">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
                                                    inq.status === "Confirmed"
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                        : inq.status === "In Progress"
                                                        ? "bg-blue-50 text-blue-700 border-blue-200"
                                                        : "bg-amber-50 text-amber-700 border-amber-200"
                                                }`}
                                            >
                                                {inq.status === "Confirmed" ? (
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                ) : inq.status === "In Progress" ? (
                                                    <Clock className="w-3.5 h-3.5" />
                                                ) : (
                                                    <AlertCircle className="w-3.5 h-3.5" />
                                                )}
                                                {inq.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-5 md:px-6 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                {inq.status !== "Confirmed" && (
                                                    <button
                                                        onClick={() => handleStatusChange(inq.id, "Confirmed")}
                                                        className="text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white px-2.5 py-1 rounded border border-emerald-200 hover:border-emerald-600 transition-colors cursor-pointer"
                                                    >
                                                        Confirm
                                                    </button>
                                                )}
                                                {inq.status === "Pending" && (
                                                    <button
                                                        onClick={() => handleStatusChange(inq.id, "In Progress")}
                                                        className="text-[11px] font-semibold bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white px-2.5 py-1 rounded border border-blue-200 hover:border-blue-600 transition-colors cursor-pointer"
                                                    >
                                                        Progress
                                                    </button>
                                                )}
                                                {inq.status !== "Pending" && (
                                                    <button
                                                        onClick={() => handleStatusChange(inq.id, "Pending")}
                                                        className="text-[11px] font-semibold bg-zinc-50 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 px-2.5 py-1 rounded border border-zinc-200 transition-colors cursor-pointer"
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
                                    <td colSpan={7} className="py-12 text-center text-zinc-400">
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
