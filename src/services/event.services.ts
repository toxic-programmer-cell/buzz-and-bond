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

    delete(id: string) {
        return repository.delete(id)
    }

    update(id: string, data: EventInput) {
        return repository.update(id, data);
    }
}