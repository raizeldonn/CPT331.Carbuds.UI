import { Injectable } from '@angular/core';
import { Car } from '../models/car/car.model';


@Injectable({
    providedIn: 'root'
  })

export class CarService {

    public car?: Car;

    public addCar( make: string, model: string, year: number, imageId: string){
        this.car = {
            uuid: "RANDOM GENERATED UUID",
            make: make,
            model: model,
            year: year,
            imageId: imageId
        };

    }
    
}