import { findReservations } from "../src/findReservation.js";

describe("Given i try to find a reservation", () => {
    const existingReservations = [
        {
            id: 1,
            name: "Séjour Mai",
            startDate: new Date("2026-05-08T10:00:00Z"),
            endDate: new Date("2026-05-10T10:00:00Z")
        },
        {
            id: 2,
            name: "Séjour Juin",
            startDate: new Date("2026-06-10T10:00:00Z"),
            endDate: new Date("2026-06-12T10:00:00Z")
        }
    ];

    test("Should return an empty array if no reservation is active at the given date", () => {
        const searchDate = new Date("2026-05-20T12:00:00Z");
        const results = findReservationsByDate(searchDate, existingReservations);
        expect(results).toEqual([]);
    });

    test("Should return the reservation if the date is between start and end", () => {
        const searchDate = new Date("2026-05-09T12:00:00Z");
        const results = findReservationsByDate(searchDate, existingReservations);

        expect(results).toHaveLength(1);
        expect(results[0].id).toBe(1);
    });
});