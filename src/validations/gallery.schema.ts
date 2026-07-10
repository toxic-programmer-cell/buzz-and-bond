import { z } from "zod";

export const GallerySchema = z.object({
    imageUrl: z.string().url(),

    publicId: z.string(),

    title: z.string().optional(),

    description: z.string().optional(),

    category: z.enum([
        "EVENTS",
        "NETWORKING",
        "WORKSHOP",
        "SPEAKERS",
        "COMMUNITY",
        "OTHERS",
    ]),

    isPublished: z.boolean().default(true),
});

export type GalleryInput = z.infer<typeof GallerySchema>;