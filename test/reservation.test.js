import { createReservation } from "../src/reservation.js";
import { ValidationError } from "../src/errors.js";

describe("Given i try to make a reservation", () => {

    test("When the reservation does not have an ID", () => {
        const data = { name: "Client A", startDate: new Date(), endDate: new Date() };
        expect(() => createReservation(data)).toThrow(new ValidationError("ID is required"));
    });

    test("When the reservation does not have a name", () => {
        const data = { id: 1, startDate: new Date(), endDate: new Date() };
        expect(() => createReservation(data)).toThrow(new ValidationError("Name is required"));
    });

    test("When the reservation does not have dates", () => {
        const data = { id: 1, name: "Client A" };
        expect(() => createReservation(data)).toThrow(new ValidationError("Start and end dates are required"));
    });

    test("When the reservation has only startDate", () => {
        const data = { id: 1, name: "Client A" };
        expect(() => createReservation(data)).toThrow(new ValidationError("Start and end dates are required"));
    });

    test("When the reservation has only endDate", () => {
        const data = { id: 1, name: "Client A" };
        expect(() => createReservation(data)).toThrow(new ValidationError("Start and end dates are required"));
    });

    test("When the reservation has the endDate before the startDate", () => {
        const data = {
            id: 1,
            name: "Client A",
            startDate: new Date("2026-06-10"),
            endDate: new Date("2026-06-08")
        };
        expect(() => createReservation(data)).toThrow(new ValidationError("End date must be after start date"));
    });
});