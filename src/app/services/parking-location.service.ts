import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetListParkingLocationsResponse } from '../contracts/parkingLocations/get.listParkingLocationsResponse.model';
import { PostAddUpdateParkingLocationRequest } from '../contracts/parkingLocations/post.addUpdateParkingLocation.request';
import { PostAddUpdateParkingLocationResponse } from '../contracts/parkingLocations/post.addUpdateParkingLocation.response.model';
import { ParkingLocation } from '../models/parkingLocations/parkingLocation.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingLocationService {

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  public async addEditLocation(record: ParkingLocation): Promise<PostAddUpdateParkingLocationResponse>{

    let request: PostAddUpdateParkingLocationRequest = {
      parking: record
    }

    let response = await this._http.post<PostAddUpdateParkingLocationResponse>(`${environment.apiBaseUrl}/api/parkingLocation`, request, { headers: this._authService.generateAuthHeader() }).toPromise();    
    return response;
  }

  public async listAllLocations(): Promise<GetListParkingLocationsResponse>{
    let response = await this._http.get<GetListParkingLocationsResponse>( `${environment.apiBaseUrl}/api/parkingLocation/list`, { headers: this._authService.generateAuthHeader() }).toPromise();
    return response;
  }
}
