import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NumberLiteralType } from 'typescript';

@Component({
  selector: 'app-unlock-car',
  templateUrl: './unlock-car.component.html',
  styleUrls: ['./unlock-car.component.scss']
})
export class UnlockCarComponent implements OnInit {

  public num1: Number = Math.floor((Math.random()*9)+1);;
  public num2: Number = Math.floor((Math.random()*9)+1);;
  public num3: Number = Math.floor((Math.random()*9)+1);;
  public num4: Number = Math.floor((Math.random()*9)+1);;

  constructor( public _activeModal: NgbActiveModal ) { 
  }

  ngOnInit(): void {
  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
  }

}
