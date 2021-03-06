import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DeleteParkingLocationRequest } from '../contracts/parkingLocations/delete.parkingLocation.request.model';
import { DeleteParkingLocationResponse } from '../contracts/parkingLocations/delete.parkingLocation.response.model';
import { GetAvailableParkingLocationsResponse } from '../contracts/parkingLocations/get.availableParkingLocations.response.model';
import { GetListParkingLocationsResponse } from '../contracts/parkingLocations/get.listParkingLocationsResponse.model';
import { GetParkingLocationResponse } from '../contracts/parkingLocations/get.parkingLocation.response.model';
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

  public async deleteLocation(locationUuid: string): Promise<DeleteParkingLocationResponse>{
    let request: DeleteParkingLocationRequest = {
      locationUuid: locationUuid
    };
    const requestHeaders = {
      headers: this._authService.generateAuthHeader(), body: request
    };
    let resp = await this._http.delete<DeleteParkingLocationResponse>(`${environment.apiBaseUrl}/api/parkingLocation`, requestHeaders).toPromise();
    return resp;
  }  

  public async listAvailabelParkingLocations(): Promise<GetAvailableParkingLocationsResponse>{
    let response = await this._http.get<GetAvailableParkingLocationsResponse>( `${environment.apiBaseUrl}/api/parkingLocation/list/available`, { headers: this._authService.generateAuthHeader() }).toPromise();
    return response;
  }

  public async getParkingLocation(locationUuid: string): Promise<GetParkingLocationResponse>{
    let response = await this._http.get<GetParkingLocationResponse>( `${environment.apiBaseUrl}/api/parkingLocation/${locationUuid}`, { headers: this._authService.generateAuthHeader() }).toPromise();
    return response;
  }
}
