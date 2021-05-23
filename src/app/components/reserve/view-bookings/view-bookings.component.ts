import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/user/bookings.model';
import { BookingService } from 'src/app/services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { UnlockCarComponent } from '../../car/unlock-car/unlock-car.component';
import { MyBookingComponent } from '../../reserve/my-booking/my-booking.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.scss']
})
export class ViewBookingsComponent implements OnInit {
  
  public clientBookings: Booking[] = [];
  public currentBookings: Booking[] = [];
  public upcomingBookings: Booking[] = [];
  public pastBookings: Booking[] = [];

     constructor(private _bkService: BookingService, private _toastr: ToastrService,  private _modalService: NgbModal, private _authService: AuthService) { }

  ngOnInit(): void {
    this.getClientBooking()
  }

  public async getClientBooking(){
   const locationResp = await this._bkService.getUserBookings(this._authService.idTokenProps?  this._authService.idTokenProps?.email : '');
   //const locationResp = await this._bkService.listAllBookings();
    if(locationResp.success){
      this.clientBookings = locationResp.bookings;
      this.sortBookings();
    }
    else{
      this._toastr.error(locationResp.errorMessage, 'Unable to get user bookings.');
    }
  }

  public sortBookings(){
    for(let booking of this.clientBookings){
      console.log(booking.status);
      if(booking.status == "active"){
        this.currentBookings.push(booking);
      }
      else if(booking.status == "upcoming"){
        this.upcomingBookings.push(booking);
      }
      else if(booking.status == "complete"){
        this.pastBookings.push(booking);
      }
    }
  }

  public onUnlockCarClick(){
    const modalRef = this._modalService.open(UnlockCarComponent, {size: 'm', backdrop: 'static'});
  }

  onViewDetialilsClick(Uuid: string){
    const modalRef = this._modalService.open(MyBookingComponent, {size: 'm', backdrop: 'static'});
    modalRef.componentInstance.bookingId = Uuid;
  }
}
