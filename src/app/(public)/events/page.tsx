"use client";

import { useState } from "react";
import { Container } from "@/components/ui";
import usePublicEvents from "@/hooks/usePublicEvents";
import {
    Hero,
    EventGrid,
    EmptyState,
} from "./components";

export default function EventsPage() {
    const { events, loading } = usePublicEvents();
    const [searchQuery, setSearchQuery] = useState("");
    const [priceFilter, setPriceFilter] = useState("all");

    // console.log(events)

    // Filter events
    const filteredEvents = events.filter((event) => {
        const matchesSearch =
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesPrice = true;
        if (priceFilter === "free") {
            matchesPrice = event.price === 0;
        } else if (priceFilter === "paid") {
            matchesPrice = event.price > 0;
        }

        return matchesSearch && matchesPrice;
    });

    const hasMatches = filteredEvents.length > 0;

    return (
        <div className="bg-black text-white min-h-screen pt-20 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none select-none z-0" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none select-none z-0" />

            <div className="relative z-10">
                {/* Hero with search and filters integrated */}
                <Hero
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    priceFilter={priceFilter}
                    setPriceFilter={setPriceFilter}
                />

                {/* Content Section using design system Container */}
                <Container className="py-14 sm:py-16">
                    {loading ? (
                        <div className="space-y-12">
                            <EventGrid loading={true} />
                        </div>
                    ) : !hasMatches ? (
                        <EmptyState
                            onReset={() => {
                                setSearchQuery("");
                                setPriceFilter("all");
                            }}
                        />
                    ) : (
                        <div className="space-y-12">
                            <EventGrid events={filteredEvents} />
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
}