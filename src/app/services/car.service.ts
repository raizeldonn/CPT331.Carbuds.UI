import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Car } from '../models/car/car.model';
import {PostAddUpdateCarRequest} from '../contracts/car/post.addUpdateCar.request.model';
import {PostAddUpdateCarResponse} from '../contracts/car/post.addUpdateCar.response.model';
import { environment } from 'src/environments/environment';
import { GetListCarsResponse } from '../contracts/car/get.listCars.response.model';
import { AuthService } from './auth.service';


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
    
}