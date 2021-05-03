import { Car } from "src/app/models/car/car.model";
import { BaseResponse } from "../base.response.model";

export interface GetOneCarResponse extends BaseResponse {
    car: Car;
}