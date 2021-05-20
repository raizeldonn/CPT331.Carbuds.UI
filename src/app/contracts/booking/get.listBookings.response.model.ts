import { Booking } from "src/app/models/user/bookings.model";
import { BaseResponse } from "../base.response.model";

export interface GetListBookingsResponse extends BaseResponse {
    bookings: Booking[];
}

