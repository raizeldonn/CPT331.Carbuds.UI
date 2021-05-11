import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/models/user/bookings.model';
import { UnlockCarComponent} from '../unlock-car/unlock-car.component';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/services/booking.service';
import { AuthService } from 'src/app/services/auth.service';
import { Car } from 'src/app/models/car/car.model';
import { CarService } from 'src/app/services/car.service';
import { ParkingLocationService } from 'src/app/services/parking-location.service';
import { ParkingLocation } from 'src/app/models/parkingLocations/parkingLocation.model';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss']
})
export class BookingSummaryComponent implements OnInit {
  public carUuid!: string;
  public email!: string;
  public booking!: Booking;
  public car!: Car;
  public location!: ParkingLocation;
  public bookingStatus = "unConfirmed";

  constructor(public _activeModal: NgbActiveModal, private _modalService: NgbModal, private _plService: ParkingLocationService, private _toastr: ToastrService, private _bkService: BookingService,
     private _authService: AuthService, private _carService: CarService) { }

  ngOnInit(): void {
    this.getInfo()
  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
    //also need to cancel the booking
    //ie remove from db
  }

  public onUnlockCarClick(){
    this._activeModal.dismiss(null);
    const modalRef = this._modalService.open(UnlockCarComponent, {size: 'm', backdrop: 'static'});
  }

 public async onConfirmClick()
 {

  try {
    const bookingId = uuidv4();

    let newBooking: Booking = {
      uuid: bookingId,
      userEmail: this._authService.idTokenProps?.email!,
      pickUpLocationDesc: this.location?.friendlyName!,
      startDate: "test",
      startTime: "test",
      endDate: "test",
      endTime: "test",
      status: "upcoming",
      cost: 123,
      carPlate: "popogu",// TODO add numberplate to car
      carDesc: this.car?.make + " " + this.car?.model,
      latitude: this.location.latitude,
      longitude: this.location.longitude,
    };

    let addBookingResponse = await this._bkService.addEditBooking(newBooking);

    if (addBookingResponse.success) {
      this._toastr.success('','Booking Added');
      this.bookingStatus = "confirmed";
    }
    else {
      this._toastr.error(addBookingResponse.errorMessage, 'Unable to add booking');
    }
  } catch (e) {
    this._toastr.error(e, 'Unable to add booking');
  }
}

  public viewOnMapClick(){
    window.open("https://www.google.com/maps/search/?api=1&query=" + this.location.latitude + "," + this.location.longitude);
  }

  public getInfo(){
    this.getCar();
  }

  public async getCar(){
    try {        
      let getCarResponse = await this._carService.getCarByCarId(this.carUuid);
      if (getCarResponse.success) {
        this.car = getCarResponse.car;
        this.getLocation();
      }
      else {
        this._toastr.error(getCarResponse.errorMessage, 'Unable to Get Car by parking ID');
      }
    }
   catch (e) {
    this._toastr.error(e, 'Unable to Get Single Car');
  }
}

public async getLocation(){
  try {        
    let getParkingLocationResponse = await this._plService.getParkingLocation(this.car.location);
    if (getParkingLocationResponse.success) {
      this.location = getParkingLocationResponse.location;
    }
    else {
      this._toastr.error(getParkingLocationResponse.errorMessage, 'Unable to Get Parking Location');
    }
  }
 catch (e) {
  this._toastr.error(e, 'Unable to Get parking location');
}
}
}
