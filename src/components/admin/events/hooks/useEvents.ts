"use client"

import { useEffect, useState } from "react"
import { Event } from "../types"

export default function useEvents() {

    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)

    const fetchEvents = async () => {
        try {
            const res = await fetch('/api/event');
            const data = await res.json()
            setEvents(data)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return { events, loading, fetchEvents }
}