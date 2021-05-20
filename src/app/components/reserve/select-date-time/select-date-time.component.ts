import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingSummaryComponent} from '../booking-summary/booking-summary.component'

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-select-date-time',
  templateUrl: './select-date-time.component.html',
  styleUrls: ['./select-date-time.component.scss']
})

export class SelectDateTimeComponent implements OnInit {

  public carUuid!: string;
  public parkingUuid!: string;
  public longitude: number | undefined;
  public latitude: number | undefined;

  //min and max validation
  minDate:Date = new Date();
  endMinDate:Date = new Date();
  maxDate: Date = new Date(new Date().getFullYear() + 1, 11, 31)
  validDates: boolean = false;
  validStartDate: boolean = false;
  validEndDate: boolean = false;
  validStartTime: boolean = false;
  validEndTime: boolean = false;
  startDate!: string;
  endDate!: string;
  startTime!: string;
  endTime!: string;
  times: string[] = ["12:00 AM","12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM",
"2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
"10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
"5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:00 PM" , "11:00 PM", "11:30 PM"]

  
  //pre-booked dates validation
  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Sunday from being selected.
    return day !== 0;
  }


  constructor( public _activeModal: NgbActiveModal, private _modalService: NgbModal ) {
   }
  ngOnInit(): void {
  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
  }

  public onReserveCarClick(){
    this._activeModal.dismiss(null);
    const modalRef = this._modalService.open(BookingSummaryComponent, {size: 'm', backdrop: 'static'});
    modalRef.componentInstance.carUuid = this.carUuid;
    modalRef.componentInstance.startTime = this.startTime;
    modalRef.componentInstance.startDate = this.startDate;
    modalRef.componentInstance.endTime = this.endTime;
    modalRef.componentInstance.endDate = this.endDate;
  }
  startDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value?.toLocaleDateString()!;
    this.validStartDate = true;
    console.log(event.value?.toLocaleDateString());
    this.validateForm();
  }

  endDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value?.toLocaleDateString()!;
    this.validEndDate = true;
    console.log(event.value?.toLocaleDateString());
    this.validateForm();
  }

  startTimeChange() {
    console.log(this.startTime);
    this.validStartTime = true;
    this.validateForm();
  }

  endTimeChange() {
    console.log(this.endTime);
    this.validEndTime = true;
    this.validateForm();
  }

  validateForm(){
    if(this.validStartDate && this.validEndDate && this.validStartTime && this.validEndTime){
      this.validDates = true;
    }
  }
}
