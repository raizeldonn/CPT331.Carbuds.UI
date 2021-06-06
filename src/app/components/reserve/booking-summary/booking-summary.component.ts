import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/models/user/bookings.model';
import { UnlockCarComponent } from '../../car/unlock-car/unlock-car.component';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
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
  public car!: Car;
  public parkingUuid!: string;
  public startTime!: string;
  public startDate!: string;
  public endTime!: string;
  public endDate!: string;
  public email!: string;
  public booking!: Booking;
  public location!: ParkingLocation;
  public bookingStatus = "unConfirmed";
  public bookingCost: number = 0;

  constructor(public _activeModal: NgbActiveModal, private _modalService: NgbModal, private _plService: ParkingLocationService, private _toastr: ToastrService, private _bkService: BookingService,
    private _authService: AuthService, private _carService: CarService) { }

  ngOnInit(): void {
    this.getLocation();
  }

  public onCancelClick() {
    this._activeModal.dismiss(null);
  }

  public onUnlockCarClick() {
    this._activeModal.dismiss(null);
    const modalRef = this._modalService.open(UnlockCarComponent, { size: 'm', backdrop: 'static' });
  }

  public async onConfirmClick() {

    try {
      const bookingId = uuidv4();

      const startDateTimeLocal = moment(`${this.startDate} ${this.startTime}`, "DD/MM/YYYY hh:mm a");
      const endDateTimeLocal = moment(`${this.endDate} ${this.endTime}`, "DD/MM/YYYY hh:mm a");

      let newBooking: Booking = {
        uuid: bookingId,
        carUuid: this.car.uuid,
        parkingUuid: this.location.uuid,
        userEmail: this._authService.idTokenProps?.email!,
        startDateTimeUtc: + startDateTimeLocal.utc().format('X'),
        endDateTimeUtc: + endDateTimeLocal.utc().format('X'),
        status: "Confirmed",
        cost: this.bookingCost,
      };

      let addBookingResponse = await this._bkService.addEditBooking(newBooking);

      if (addBookingResponse.success) {
        this._toastr.success('', 'Booking Added');
        this.bookingStatus = 'Confirmed';
      }
      else {
        this._toastr.error(addBookingResponse.errorMessage, 'Unable to add booking');
      }
    } catch (e) {
      this._toastr.error(e, 'Unable to add booking');
    }
  }

  public viewOnMapClick() {
    window.open("https://www.google.com/maps/search/?api=1&query=" + this.location.latitude + "," + this.location.longitude);
  }

  public async getLocation() {
    try {
      let getParkingLocationResponse = await this._plService.getParkingLocation(this.car.location);
      if (getParkingLocationResponse.success) {
        this.location = getParkingLocationResponse.location;
        this.calculateCost();
      }
      else {
        this._toastr.error(getParkingLocationResponse.errorMessage, 'Unable to Get Parking Location');
      }
    }
    catch (e) {
      this._toastr.error(e, 'Unable to Get parking location');
    }
  }

  private calculateCost(){
    const startDateTimeLocal = moment(`${this.startDate} ${this.startTime}`, "DD/MM/YYYY hh:mm a");
    const endDateTimeLocal = moment(`${this.endDate} ${this.endTime}`, "DD/MM/YYYY hh:mm a");

    const hireTimeMinutes =  moment.duration(endDateTimeLocal.diff(startDateTimeLocal)).as('minutes');

    if(hireTimeMinutes >= 1440){
      const days = Math.floor(hireTimeMinutes / 1440);
      const residualHours = (hireTimeMinutes % 1440) / 60;
      this.bookingCost = (this.car.priceDay * days) + (this.car.priceHour * residualHours);
    }
    else{
      const hireHours = hireTimeMinutes / 60;
      this.bookingCost = this.car.priceHour * hireHours;
    }

  }
}
