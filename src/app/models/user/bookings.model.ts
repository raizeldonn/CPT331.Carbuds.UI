export interface Booking {
    uuid: string;
    carUuid: string;
    parkingUuid: string;
    userEmail: string;
    startDateTimeUtc: number;
    endDateTimeUtc: number;
    status: string;
    cost: number;
}