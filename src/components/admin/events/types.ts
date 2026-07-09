export interface Event {
    id: string;
    title: string;
    slug: string;
    description: string;
    location: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    coverImage: string;
    price: number;
    seats: number;
    status: "DRAFT" | "PUBLISHED";
}