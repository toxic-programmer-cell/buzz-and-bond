export interface GalleryImage {
    id: string;

    imageUrl: string;

    publicId: string;

    title?: string;

    description?: string;

    category:
    | "EVENTS"
    | "NETWORKING"
    | "WORKSHOP"
    | "SPEAKERS"
    | "COMMUNITY"
    | "OTHERS";

    isPublished: boolean;

    displayOrder: number;

    createdAt: string;
}