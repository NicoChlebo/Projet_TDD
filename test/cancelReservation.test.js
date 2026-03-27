import { cancelReservation } from "../src/cancelReservation.js";
import { ServiceError } from "../src/errors.js";

describe("Given i try to cancel a reservation", () => {
    const existingReservations = [
        {
            id: 1,
            name: "Client 1",
            startDate: new Date("2026-06-10T14:00:00Z"),
            endDate: new Date("2026-06-12T14:00:00Z")
        }
    ];

    test("When the reservation ID does not exist", () => {
        const unknownId = 999;
        const now = new Date("2026-06-01T10:00:00Z");

        expect(() => cancelReservation(unknownId, existingReservations, now))
            .toThrow(new ServiceError("Reservation not found"));
    });

    test("When the cancellation is requested less than 48h before start", () => {
        const now = new Date("2026-06-09T14:00:00Z");
        const existingReservations = [
            {
                id: 1,
                name: "Client 1",
                startDate: new Date("2026-06-10T14:00:00Z"),
                endDate: new Date("2026-06-12T14:00:00Z")
            }
        ];

        expect(() => cancelReservation(1, existingReservations, now))
            .toThrow(new ServiceError("Cannot cancel a reservation less than 48h before the start"));
    });

    test("When the cancellation requested is more than 48h before start", () => {
        const now = new Date("2026-06-01T10:00:00Z");
        const existingReservations = [
            {
                id: 1,
                name: "Client 1",
                startDate: new Date("2026-06-10T14:00:00Z"),
                endDate: new Date("2026-06-12T14:00:00Z")
            }
        ];

        const result = cancelReservation(1, existingReservations, now);
        expect(result).toBe(true);
    });
});