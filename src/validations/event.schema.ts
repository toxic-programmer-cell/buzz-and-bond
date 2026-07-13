import z from 'zod'

export const EventSchema = z.object({
    title: z.string().min(3, "Title is required"),
    description: z.string().min(5),
    content: z.string().optional(),
    location: z.string().min(3),
    eventDate: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    price: z.number().min(0),
    coverImage: z.string().url(),
    seats: z.number().min(1),
    gallery: z.array(z.string()),
})

export type EventInput = z.infer<typeof EventSchema>