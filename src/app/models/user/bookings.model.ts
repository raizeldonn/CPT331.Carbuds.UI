
export interface Booking
{
    uuid: string;
    userEmail: string;
    pickUpLocationDesc: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    status: string;
    cost: number;
    carPlate: string;
    carDesc: string; 
    latitude: number;
    longitude: number;
}