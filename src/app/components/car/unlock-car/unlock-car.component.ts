import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NumberLiteralType } from 'typescript';

@Component({
  selector: 'app-unlock-car',
  templateUrl: './unlock-car.component.html',
  styleUrls: ['./unlock-car.component.scss']
})
export class UnlockCarComponent implements OnInit {

  public num1: Number = Math.round(Math.random() * 10);
  public num2: Number = Math.round(Math.random() * 10);
  public num3: Number = Math.round(Math.random() * 10);
  public num4: Number = Math.round(Math.random() * 10);

  constructor( public _activeModal: NgbActiveModal ) { 
  }

  ngOnInit(): void {
  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
  }

}
