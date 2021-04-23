import { ParkingLocation } from "src/app/models/parkingLocations/parkingLocation.model";
import { BaseResponse } from "../base.response.model";

export interface GetAvailableParkingLocationsResponse extends BaseResponse {
    parkingLocations: ParkingLocation[];
}