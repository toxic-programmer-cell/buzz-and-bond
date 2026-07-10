"use client";

import { useEffect, useState } from "react";
import { Event } from "@/components/admin/events/types";

export default function usePublicEvents() {

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {

        try {

            const response = await fetch("/api/event/public");

            if (!response.ok) {
                throw new Error("Failed to fetch events");
            }

            const data = await response.json();
            console.log(data)

            setEvents(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return {
        events,
        loading,
        fetchEvents,
    };
}