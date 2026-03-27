import { ServiceError } from "./errors.js";

export function cancelReservation(id, existingReservations = [], now = new Date()) {
    const reservation = existingReservations.find(res => res.id === id);

    if (!reservation) {
        throw new ServiceError("Reservation not found");
    }

    return true;
}