import { Component, OnInit } from '@angular/core';
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

  public carUuid: string = "";
  public longitude: number | undefined;
  public latitude: number | undefined;

  //min and max validation
  minDate:Date = new Date();
  maxDate: Date = new Date(new Date().getFullYear() + 1, 11, 31)
  
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
  }
}
