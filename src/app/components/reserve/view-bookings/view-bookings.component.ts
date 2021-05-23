import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/user/bookings.model';
import { BookingService } from 'src/app/services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { UnlockCarComponent } from '../../car/unlock-car/unlock-car.component';
import { MyBookingComponent } from '../../reserve/my-booking/my-booking.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import moment from 'moment';
import { ReturnCarComponent } from '../../car/return-car/return-car.component';

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
    this.clientBookings = [];
    this.currentBookings = [];
    this.upcomingBookings = [];
    this.pastBookings = [];
   
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

    const nowUtc = + moment().utc().format('X');

    for(let booking of this.clientBookings){
      
      if(booking.status == 'Completed'){
        this.pastBookings.push(booking);
        continue;
      }

      if(booking.status == 'In Progress'){
        this.currentBookings.push(booking);
        continue;
      }

      if(nowUtc >= booking.startDateTimeUtc && nowUtc <= booking.endDateTimeUtc){
        this.currentBookings.push(booking);
        continue;
      }

      if(nowUtc < booking.endDateTimeUtc && nowUtc < booking.startDateTimeUtc){
        this.upcomingBookings.push(booking);
        continue;
      }

      if(nowUtc > booking.endDateTimeUtc && nowUtc > booking.startDateTimeUtc){
        this.pastBookings.push(booking);
        continue;
      }
      
    }
  }

  public onUnlockCarClick(booking: Booking){
    const updateBooking = booking;
    updateBooking.status = 'In Progress';

    const modalRef = this._modalService.open(UnlockCarComponent, {size: 'm', backdrop: 'static'});
    this._bkService.addEditBooking(booking);
    modalRef.dismissed.subscribe(d => {
      this.getClientBooking();
    });
  }

  onViewDetialilsClick(Uuid: string){
    const booking = this.clientBookings.find(b => b.uuid == Uuid);
    const modalRef = this._modalService.open(MyBookingComponent, {size: 'm', backdrop: 'static'});
    modalRef.componentInstance.booking = booking;
  }

  public onReturnCarClick(booking: Booking){
    const modalRef = this._modalService.open(ReturnCarComponent, {size: 'm', backdrop: 'static'});
    modalRef.componentInstance.booking = booking;
    modalRef.dismissed.subscribe(d => {
      this.getClientBooking();
    });
  }

  public utcEpochToLocalString(epoch: number):string{
    return moment.utc(epoch, 'X').local().format('DD MMM YYYY hh:mm A');
  }
}
