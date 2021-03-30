import { Car } from "src/app/models/car/car.model";
import { BaseResponse } from "../base.response.model";

export interface GetListCarsResponse extends BaseResponse {
    cars: Car[];
}