import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent implements OnInit {

  constructor( public _activeModal: NgbActiveModal, private _modalService: NgbModal ) { }

  ngOnInit(): void {
  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
    //also need to cancel the booking
    //ie remove from db
  }

  public onUnlockCarClick(){
    this._activeModal.dismiss(null);
    // give a code to unlock the car
  }

  public viewOnMapClick(){
    this._activeModal.dismiss(null);
    //roly - show the user the car location on a map 
  }

}
