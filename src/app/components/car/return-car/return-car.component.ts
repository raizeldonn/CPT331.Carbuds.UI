import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/models/user/bookings.model';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-return-car',
  templateUrl: './return-car.component.html',
  styleUrls: ['./return-car.component.scss']
})
export class ReturnCarComponent implements OnInit {

  public num1: Number = Math.floor((Math.random()*9)+1);;
  public num2: Number = Math.floor((Math.random()*9)+1);;
  public num3: Number = Math.floor((Math.random()*9)+1);;
  public num4: Number = Math.floor((Math.random()*9)+1);;

  public booking!: Booking;

  constructor(public _activeModal: NgbActiveModal, private _toastr: ToastrService, private _modalService: NgbModal, private _bookingService: BookingService) { }

  ngOnInit(): void {

  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
  }

  public async onConfirmVehicleReturnClicked(){
    const bookingUpdated = this.booking;
    bookingUpdated.status = 'Completed';
    const updateBookingResp = await this._bookingService.addEditBooking(this.booking);
    if(updateBookingResp.success){
      this.booking = bookingUpdated;  
      this._activeModal.dismiss();
      this._toastr.success('Thankyou. Vehicle has been Returned');
    }
    else{
      this._toastr.error(updateBookingResp.errorMessage, 'Unable to Complete this Booking');
    }
  }
  

}
