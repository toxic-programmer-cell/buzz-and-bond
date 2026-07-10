import usePublicEvents from "@/hooks/usePublicEvents";
import {
    Hero,
    FeaturedEvent,
    EventGrid,
    EventFilters,
} from "./components";

export default function EventsPage() {

    const { events, loading } = usePublicEvents();

    return (
        <div className="bg-white text-neutral-900 min-h-screen pt-20">

            <Hero />

            <section className="container mx-auto px-6 py-20">

                <EventFilters />

                <FeaturedEvent />

                <EventGrid />

            </section>

        </div>
    );
}