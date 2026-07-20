import { deleteImage, extractPublicId } from "@/lib/cloudinary-delete";
import { EventRepository } from "@/repositorys/event.repository";
import { EventInput } from "@/validations/event.schema";

const repository = new EventRepository()

export class EventServices {
    create(data: EventInput) {
        return repository.create(data)
    }

    findAll() {
        return repository.findAll()
    }

    async delete(id: string) {
        const event = await repository.findById(id);
        if (event) {
            // Delete cover image from Cloudinary
            if (event.coverImage) {
                const coverPublicId = extractPublicId(event.coverImage);
                if (coverPublicId) {
                    try {
                        await deleteImage(coverPublicId);
                    } catch (error) {
                        console.error(`Failed to delete cover image ${coverPublicId} from Cloudinary:`, error);
                    }
                }
            }

            // Delete gallery images from Cloudinary
            if (event.gallery && event.gallery.length > 0) {
                for (const item of event.gallery) {
                    if (item.imageUrl) {
                        const galleryPublicId = extractPublicId(item.imageUrl);
                        if (galleryPublicId) {
                            try {
                                await deleteImage(galleryPublicId);
                            } catch (error) {
                                console.error(`Failed to delete gallery image ${galleryPublicId} from Cloudinary:`, error);
                            }
                        }
                    }
                }
            }
        }
        return repository.delete(id);
    }

    update(id: string, data: EventInput) {
        return repository.update(id, data);
    }

    findById(id: string) {
        return repository.findById(id);
    }
}