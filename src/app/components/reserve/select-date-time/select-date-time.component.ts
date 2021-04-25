import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  //min and max validation
  minDate:Date = new Date();
  maxDate: Date = new Date(new Date().getFullYear() + 1, 11, 31)
  
  //pre-booked dates validation
  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Sunday from being selected.
    return day !== 0;
  }


  constructor( public _activeModal: NgbActiveModal ) {

    
   }

  ngOnInit(): void {
  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
  }

}
