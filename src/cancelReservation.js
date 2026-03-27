import { ServiceError } from "./errors.js";

export function cancelReservation(id, existingReservations = [], now = new Date()) {
    const reservation = existingReservations.find(res => res.id === id);

    if (!reservation) {
        throw new ServiceError("Reservation not found");
    }

    const FORTY_EIGHT_HOURS_IN_MS = 48 * 60 * 60 * 1000;
    const timeDifference = reservation.startDate.getTime() - now.getTime();

    if (timeDifference < FORTY_EIGHT_HOURS_IN_MS) {
        throw new ServiceError("Cannot cancel a reservation less than 48h before the start");
    }

    return true;
}