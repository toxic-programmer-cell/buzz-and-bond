import { prisma } from "@/lib/prisma";
import { GalleryInput } from "@/validations/gallery.schema";

export class GalleryRepository {

    async create(data: GalleryInput) {
        return prisma.galleryImage.create({
            data,
        });
    }

    async findAll() {
        return prisma.galleryImage.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async findById(id: string) {
        return prisma.galleryImage.findUnique({
            where: {
                id,
            },
        });
    }

    async update(id: string, data: Partial<GalleryInput>) {
        return prisma.galleryImage.update({
            where: {
                id,
            },
            data,
        });
    }

    async delete(id: string) {
        return prisma.galleryImage.delete({
            where: {
                id,
            },
        });
    }

    async findPaginated(page: number, limit: number) {

        const skip = (page - 1) * limit;

        const [gallery, total] = await prisma.$transaction([
            prisma.galleryImage.findMany({
                skip,
                take: limit,
                orderBy: {
                    createdAt: "desc",
                },
            }),

            prisma.galleryImage.count(),
        ]);

        return {
            gallery,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
}