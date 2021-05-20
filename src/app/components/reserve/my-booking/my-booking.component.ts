import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/models/user/bookings.model';
import { BookingService } from 'src/app/services/booking.service';
import { UnlockCarComponent} from 'src/app/components/car/unlock-car/unlock-car.component'
import { Car } from 'src/app/models/car/car.model';
import { CarService } from 'src/app/services/car.service';
import { ParkingLocation } from 'src/app/models/parkingLocations/parkingLocation.model';
import { ParkingLocationService } from 'src/app/services/parking-location.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent implements OnInit {

  public booking!: Booking;
  public car!: Car;
  public location!: ParkingLocation;

  public bookingId!: string;

  constructor(public _activeModal: NgbActiveModal, private _modalService: NgbModal, private _bkService: BookingService, private _toastr: ToastrService,
     private _carService: CarService, private _locService: ParkingLocationService) { }

  ngOnInit(): void {
    this.getBookingInfo()
  }

  public async getBookingInfo(){
    const bookingResp = await this._bkService.getBookingById(this.bookingId);
    if(bookingResp.success){
      this.booking = bookingResp.booking;
      const carResp = await this._carService.getCarByCarId(this.booking.carUuid);
      const locationResp = await this._locService.getParkingLocation(this.booking.parkingUuid);
      if(carResp.success){
        this.car = carResp.car;
      }
      else{
        this._toastr.error(bookingResp.errorMessage, 'Unable to get car.');
      }
      if(locationResp.success){
        this.location = locationResp.location;
      }
      else{
        this._toastr.error(bookingResp.errorMessage, 'Unable to get parking location.');
      }
    }
    else{
      this._toastr.error(bookingResp.errorMessage, 'Unable to get booking.');
    }
  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
    //also need to cancel the booking
    //ie remove from db
  }

  public onUnlockCarClick(){
    this.updateBooking();
    this._activeModal.dismiss(null);
    const modalRef = this._modalService.open(UnlockCarComponent, {size: 'm', backdrop: 'static'});
  }

  public onReturnCarClick(){
  }

  public viewOnMapClick(){
    window.open("https://www.google.com/maps/search/?api=1&query=" + this.location.latitude + "," + this.location.longitude);
  }

  public updateBooking(){
    //update booking status
  }

}
