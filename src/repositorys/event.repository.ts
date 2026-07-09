import { prisma } from "@/lib/prisma";
import { EventInput } from "@/validations/event.schema";

export class EventRepository {
    async create(data: EventInput) {
        return prisma.event.create({
            data: {
                ...data,
                eventDate: new Date(data.eventDate)
            }
        })
    }

    async findAll() {
        return prisma.event.findMany({
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
}