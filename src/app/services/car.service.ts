import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Car } from '../models/car/car.model';
import {PostAddUpdateCarRequest} from '../contracts/car/post.addUpdateCar.request.model';
import {PostAddUpdateCarResponse} from '../contracts/car/post.addUpdateCar.response.model';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })

export class CarService {

    public car?: Car;

    constructor(private _http: HttpClient){}

    public createCar( make: string, model: string, year: number, transmission: string,
        kilometers: number, body: string, location: string, doors: number,
        seats: number, priceHour: number, priceDay: number, imageId: string, isActive: boolean){
        this.car = {
            uuid: "eca23f2a-f7e6-47d2-b570-171d93b5e0b5",
            make: make,
            model: model,
            year: year,
            transmission: transmission,
            kilometers: kilometers,
            body: body,
            location: location,
            doors: doors,
            seats: seats,
            priceHour: priceHour,
            priceDay: priceDay,
            imageId: imageId,
            isActive: isActive
        };

        return this.car;

    }

    public async addCar(car: Car): Promise<PostAddUpdateCarResponse>{
    
        let request: PostAddUpdateCarRequest = {
          car: car
        }
    
        let response = await this._http.post<PostAddUpdateCarResponse>(`${environment.apiBaseUrl}/api/cars`, request).toPromise();    
        return response;
      }
    
}