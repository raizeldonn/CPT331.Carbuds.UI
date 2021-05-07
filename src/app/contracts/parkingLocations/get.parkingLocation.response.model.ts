import { ParkingLocation } from "src/app/models/parkingLocations/parkingLocation.model";
import { BaseResponse } from "../base.response.model";

export interface GetParkingLocationResponse extends BaseResponse {
    location: ParkingLocation;
}