import { ValidationError } from "./errors";

export function createReservation(data) {
    const { id, name, startDate, endDate } = data;

    if (!id) {
        throw new ValidationError("ID is required");
    }

    if (!name) {
        throw new ValidationError("Name is required");
    }

    if (!startDate && !endDate) {
        throw new ValidationError("Start and end dates are required");
    }

    if (!startDate) {
        throw new ValidationError("Start and end dates are required");
    }

    if (!endDate) {
        throw new ValidationError("Start and end dates are required");
    }

    if (endDate <= startDate) {
        throw new ValidationError("End date must be after start date");
    }

    return { id, name, startDate, endDate };
}