import { Booking } from "src/app/models/user/bookings.model";
import { BaseResponse } from "../base.response.model";

export interface GetOneBookingResponse extends BaseResponse {
    booking: Booking;
}