import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-unlock-car',
  templateUrl: './unlock-car.component.html',
  styleUrls: ['./unlock-car.component.scss']
})
export class UnlockCarComponent implements OnInit {

  constructor( public _activeModal: NgbActiveModal ) { }

  ngOnInit(): void {
  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
  }

  public showInfo(){
    console.log("show info")
  }

}
