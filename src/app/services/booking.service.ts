import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Booking } from '../models/user/bookings.model';
import { PostAddUpdateBookingRequest } from '../contracts/booking/post.addUpdateBooking.request.model';
import { PostAddUpdateBookingResponse } from '../contracts/booking/post.addUpdateBooking.response.model';
import { environment } from 'src/environments/environment';
import { GetListBookingsResponse } from '../contracts/booking/get.listBookings.response.model';
import { AuthService } from './auth.service';
import { GetOneBookingResponse } from '../contracts/booking/get.oneBooking.response.model';
import { DeleteBookingResponse } from '../contracts/booking/delete.booking.response.model';
import { DeleteBookingRequest } from '../contracts/booking/delete.booking.request.model';


@Injectable({
    providedIn: 'root'
  })

export class BookingService {

    constructor(private _http: HttpClient, private _authService: AuthService){}

    public async addEditBooking(record: Booking): Promise<PostAddUpdateBookingResponse>{
      let request: PostAddUpdateBookingRequest = {
        booking: record
      }
      let response = await this._http.post<PostAddUpdateBookingResponse>(`${environment.apiBaseUrl}/api/booking`, request, { headers: this._authService.generateAuthHeader() }).toPromise();    
      return response;
    }

    public async listAllBookings(): Promise<GetListBookingsResponse>{
      let response = await this._http.get<GetListBookingsResponse>( `${environment.apiBaseUrl}/api/booking/list`, { headers: this._authService.generateAuthHeader() }).toPromise();
      return response;
    }

    public async getBookingById(Uuid: string): Promise<GetOneBookingResponse>{
      let response = await this._http.get<GetOneBookingResponse>( `${environment.apiBaseUrl}/api/booking/getbyid${Uuid}`, { headers: this._authService.generateAuthHeader() }).toPromise();
      return response;
    }

    public async getUserBookings(userEmail: string): Promise<GetListBookingsResponse>{
      let response = await this._http.get<GetListBookingsResponse>( `${environment.apiBaseUrl}/api/booking/clientbookings${userEmail}`, { headers: this._authService.generateAuthHeader() }).toPromise();
      return response;
    }

    public async deleteBooking(bookingUuid: string): Promise<DeleteBookingResponse>{
      let request: DeleteBookingRequest = {
        bookingUuid: bookingUuid
      };
      const requestHeaders = {
        headers: this._authService.generateAuthHeader(), body: request
      };
      let resp = await this._http.delete<DeleteBookingResponse>(`${environment.apiBaseUrl}/api/booking`, requestHeaders).toPromise();
      return resp;
    }
}