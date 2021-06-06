import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/models/car/car.model';
import { BookingSummaryComponent } from '../booking-summary/booking-summary.component'

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

  public car!: Car;
  public parkingUuid!: string;
  public longitude: number | undefined;
  public latitude: number | undefined;

  //min and max validation
  minDate: Date = new Date();
  endMinDate: Date = new Date();
  maxDate: Date = new Date(new Date().getFullYear() + 1, 11, 31)
  validDates: boolean = false;
  validStartDate: boolean = false;
  validEndDate: boolean = false;
  validStartTime: boolean = false;
  validEndTime: boolean = false;
  startDate!: string;
  endDate!: string;
  startTime: string = "";
  endTime: string = "";
  times: string[] = ["12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM",
    "02:30 AM", "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:00 PM", "11:00 PM", "11:30 PM"]


  //pre-booked dates validation
  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Sunday from being selected.
    return day !== 8;
  }


  constructor(public _activeModal: NgbActiveModal, private _modalService: NgbModal) {

  }

  ngOnInit(): void {
  }

  public onCancelClick() {
    this._activeModal.dismiss(null);
  }

  public onReserveCarClick() {
    this._activeModal.dismiss(null);
    const modalRef = this._modalService.open(BookingSummaryComponent, { size: 'm', backdrop: 'static' });
    modalRef.componentInstance.car = this.car;
    modalRef.componentInstance.startTime = this.startTime;
    modalRef.componentInstance.startDate = this.startDate;
    modalRef.componentInstance.endTime = this.endTime;
    modalRef.componentInstance.endDate = this.endDate;
  }

  startDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value?.toLocaleDateString()!;
    this.validStartDate = true;
    this.validateForm();
  }

  endDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value?.toLocaleDateString()!;
    this.validEndDate = true;
    this.validateForm();
  }

  startTimeChange() {
    this.validStartTime = true;
    this.validateForm();
  }

  endTimeChange() {
    this.validEndTime = true;
    this.validateForm();
  }

  validateForm() {
    if (this.validStartDate && this.validEndDate && this.validStartTime && this.validEndTime) {
      this.validDates = true;
    }
  }
}
