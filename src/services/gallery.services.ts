import { deleteImage } from "@/lib/cloudinary-delete";
import { GalleryRepository } from "@/repositorys/gallery.repository";
import { GalleryInput } from "@/validations/gallery.schema";

const repository = new GalleryRepository();

export class GalleryService {

    create(data: GalleryInput) {
        return repository.create(data);
    }

    findAll() {
        return repository.findAll();
    }

    findById(id: string) {
        return repository.findById(id);
    }

    update(id: string, data: Partial<GalleryInput>) {
        return repository.update(id, data);
    }

    findPaginated(page: number, limit: number) {
        return repository.findPaginated(page, limit);
    }

    async delete(id: string) {
        const image = await repository.findById(id);

        if (!image) {
            throw new Error("Image not found");
        }

        await deleteImage(image.publicId);

        return repository.delete(id);
    }
}