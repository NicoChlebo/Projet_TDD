export function findReservations(searchDate, existingReservations = []) {
    return existingReservations.filter(res => {
        return searchDate >= res.startDate && searchDate <= res.endDate;
    });
}