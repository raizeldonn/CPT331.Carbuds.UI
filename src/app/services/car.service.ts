import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Car } from '../models/car/car.model';
import {PostAddUpdateCarRequest} from '../contracts/car/post.addUpdateCar.request.model';
import {PostAddUpdateCarResponse} from '../contracts/car/post.addUpdateCar.response.model';
import { environment } from 'src/environments/environment';
import { GetListCarsResponse } from '../contracts/car/get.listCars.response.model';
import { AuthService } from './auth.service';
import { GetOneCarResponse } from '../contracts/car/get.oneCar.response.model';
import { DeleteCarResponse } from '../contracts/car/delete.car.response.model';
import { DeleteCarRequest } from '../contracts/car/delete.car.request.model';
import { GetCarModelsResponse } from '../contracts/car/get.carModels.response.model'


@Injectable({
    providedIn: 'root'
  })

export class CarService {

    constructor(private _http: HttpClient, private _authService: AuthService){}

    public async addEditCar(record: Car): Promise<PostAddUpdateCarResponse>{

      let request: PostAddUpdateCarRequest = {
        car: record
      }
  
      let response = await this._http.post<PostAddUpdateCarResponse>(`${environment.apiBaseUrl}/api/cars`, request, { headers: this._authService.generateAuthHeader() }).toPromise();    
      return response;
    }

    public async listAllCars(): Promise<GetListCarsResponse>{
      let response = await this._http.get<GetListCarsResponse>( `${environment.apiBaseUrl}/api/cars/list`, { headers: this._authService.generateAuthHeader() }).toPromise();
      return response;
    }

    public async getCarByCarId(carUuid: string): Promise<GetOneCarResponse>{
      let response = await this._http.get<GetOneCarResponse>( `${environment.apiBaseUrl}/api/cars/getByCarId${carUuid}`, { headers: this._authService.generateAuthHeader() }).toPromise();
      return response;
    }

    public async deleteCar(carUuid: string): Promise<DeleteCarResponse>{
      let request: DeleteCarRequest = {
        carUuid: carUuid
      };
      const requestHeaders = {
        headers: this._authService.generateAuthHeader(), body: request
      };
      let resp = await this._http.delete<DeleteCarResponse>(`${environment.apiBaseUrl}/api/cars`, requestHeaders).toPromise();
      return resp;
    }

    public async getSupportedCars(): Promise<GetCarModelsResponse>{
      let response = await this._http.get<GetCarModelsResponse>( `${environment.apiBaseUrl}/api/cars/supportedcars`, { headers: this._authService.generateAuthHeader() }).toPromise();
      return response;
    }
}