import { ValidationError } from "./errors";

export function createReservation(data, existingReservations = []) {
    const { id, name, startDate, endDate } = data;

    if (!id) {
        throw new ValidationError("Reservation must have an ID");
    }

    if (!name) {
        throw new ValidationError("Reservation must have a name");
    }

    if (!startDate && !endDate) {
        throw new ValidationError("Reservation must have a start and end date");
    }

    if (!startDate) {
        throw new ValidationError("Reservation must have a start and end date");
    }

    if (!endDate) {
        throw new ValidationError("Reservation must have a start and end date");
    }

    if (endDate <= startDate) {
        throw new ValidationError("Reservation end date must be after start date");
    }

    const isOverlapping = existingReservations.some(existing => {
        return startDate < existing.endDate && endDate > existing.startDate;
    });

    if (isOverlapping) {
        throw new ValidationError("Reservation overlaps with an existing one");
    }

    return { id, name, startDate, endDate };
}