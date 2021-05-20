
export interface Booking
{
    uuid: string;
    carUuid: string;
    parkingUuid: string;
    userEmail: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    status: string;
    cost: number;
}