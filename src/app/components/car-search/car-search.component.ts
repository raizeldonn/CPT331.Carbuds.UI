import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarInfoComponent } from "../reserve/car-info/car-info.component"

@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.scss']
})
export class CarSearchComponent implements OnInit {

  constructor( private _modalService: NgbModal ) { }

  ngOnInit(): void {
  }

  public onCarMapClick(){
    const modalRef = this._modalService.open(CarInfoComponent, {size: 'm', backdrop: 'static'});
    modalRef.componentInstance.name = 'World';
    //modalRef.closed.subscribe(addedCar => {
    //  if(addedCar != null){
    //    this.cars.push(addedCar);
    //  }
    //})
  }

}
