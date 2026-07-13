import { prisma } from "@/lib/prisma";
import { EventInput } from "@/validations/event.schema";

export class EventRepository {
    async create(data: EventInput) {

        const { gallery, ...event } = data;

        return prisma.event.create({
            data: {
                ...event,

                eventDate: new Date(event.eventDate),

                gallery: {
                    create: gallery.map((imageUrl, index) => ({
                        imageUrl,
                        sortOrder: index,
                    })),
                },
            },

            include: {
                gallery: {
                    orderBy: {
                        sortOrder: "asc",
                    },
                },
            },
        });
    }

    async findById(id: string) {
        return prisma.event.findUnique({
            where: {
                id,
            },

            include: {
                gallery: {
                    orderBy: {
                        sortOrder: 'asc'
                    }
                }
            }
        })
    }

    async findAll() {
        return prisma.event.findMany({
            include: {
                gallery: {
                    orderBy: {
                        sortOrder: "asc"
                    }
                }
            },
            orderBy: {
                eventDate: "asc"
            }
        })
    }

    async delete(id: string) {
        return prisma.event.delete({
            where: {
                id
            }
        })
    }

    async update(id: string, data: EventInput) {

        const { gallery, ...event } = data;

        return prisma.event.update({
            where: {
                id
            },
            data: {
                ...event,
                eventDate: new Date(data.eventDate),
                gallery: {
                    deleteMany: {},

                    create: gallery.map((imageUrl, index) => ({
                        imageUrl,
                        sortOrder: index,
                    })),
                },

            },
            include: {
                gallery: {
                    orderBy: {
                        sortOrder: "asc"
                    }
                }
            }
        })
    }
}

export default new EventRepository();