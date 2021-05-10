import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/models/user/bookings.model';
import { BookingService } from 'src/app/services/booking.service';
import { UnlockCarComponent} from '../unlock-car/unlock-car.component'

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent implements OnInit {

  public booking!: Booking;
  public bookingId!: string;

  constructor(public _activeModal: NgbActiveModal, private _modalService: NgbModal, private _bkService: BookingService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBooking()
  }

  public async getBooking(){
    const locationResp = await this._bkService.getBookingById(this.bookingId);
    if(locationResp.success){
      this.booking = locationResp.booking;
    }
    else{
      this._toastr.error(locationResp.errorMessage, 'Unable to get booking.');
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
    window.open("https://www.google.com/maps/search/?api=1&query=" + this.booking.latitude + "," + this.booking.longitude);
  }

  public updateBooking(){
    //update booking status
  }

}
