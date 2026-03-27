import { createReservation } from "../src/reservation.js";
import { ValidationError } from "../src/errors.js";

describe("Given i try to make a reservation", () => {

    test("When the reservation does not have an ID", () => {
        const data = { name: "Client A", startDate: new Date(), endDate: new Date() };
        expect(() => createReservation(data)).toThrow(new ValidationError("Reservation must have an ID"));
    });

    test("When the reservation does not have a name", () => {
        const data = { id: 1, startDate: new Date(), endDate: new Date() };
        expect(() => createReservation(data)).toThrow(new ValidationError("Reservation must have a name"));
    });

    test("When the reservation does not have dates", () => {
        const data = { id: 1, name: "Client A" };
        expect(() => createReservation(data)).toThrow(new ValidationError("Reservation must have a start and end date"));
    });

    test("When the reservation has only startDate", () => {
        const data = { id: 1, name: "Client A" };
        expect(() => createReservation(data)).toThrow(new ValidationError("Reservation must have a start and end date"));
    });

    test("When the reservation has only endDate", () => {
        const data = { id: 1, name: "Client A" };
        expect(() => createReservation(data)).toThrow(new ValidationError("Reservation must have a start and end date"));
    });

    test("When the reservation has the endDate before the startDate", () => {
        const data = {
            id: 1,
            name: "Client A",
            startDate: new Date("2026-06-10"),
            endDate: new Date("2026-06-08")
        };
        expect(() => createReservation(data)).toThrow(new ValidationError("Reservation end date must be after start date"));
    });

    test("When a reservation start exactly when another ends", () => {
        const existing = [{
            id: 1,
            name: "Client 1",
            startDate: new Date("2026-05-10T10:00:00Z"),
            endDate: new Date("2026-05-10T12:00:00Z")
        }];

        const newRes = {
            id: 2,
            name: "Client 2",
            startDate: new Date("2026-05-10T12:00:00Z"),
            endDate: new Date("2026-05-10T14:00:00Z")
        };

        expect(() => createReservation(newRes, existing)).not.toThrow();
    });

    test("When reservation data is valid", () => {
        const validData = {
            id: 1,
            name: "Réservation Valide",
            startDate: new Date("2026-05-10T10:00:00Z"),
            endDate: new Date("2026-05-10T12:00:00Z")
        };

        const result = createReservation(validData);

        expect(result).toEqual(validData);
    });
});

describe("Given a reservation is already set", () => {
    const existingReservations = [
        {
            id: 1,
            name: "Client Existant",
            startDate: new Date("2026-05-10T10:00:00Z"),
            endDate: new Date("2026-05-10T12:00:00Z")
        }
    ];

    test("When a reservation overlaps an existing one", () => {
        const newReservation = {
            id: 2,
            name: "Client Chevauchant",
            startDate: new Date("2026-05-10T11:00:00Z"),
            endDate: new Date("2026-05-10T13:00:00Z")
        };

        expect(() => createReservation(newReservation, existingReservations))
            .toThrow(new ValidationError("Reservation overlaps with an existing one"));
    });
});