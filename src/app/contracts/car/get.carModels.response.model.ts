import { CarModels } from "src/app/models/car/car.models.model";
import { BaseResponse } from "../base.response.model";

export interface GetCarModelsResponse extends BaseResponse {
    supportedCars: CarModels[];
}

