import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car.model';
import { CarService } from 'src/app/services/car.service';
import { AddCarComponent } from '../add-car/add-car.component';

@Component({
  selector: 'app-car-admin-overview',
  templateUrl: './car-admin-overview.component.html',
  styleUrls: ['./car-admin-overview.component.scss']
})

  export class CarAdminOverviewComponent implements OnInit{ 

  public cars: Car[] = [];

  constructor(private _carService: CarService, private _toastr: ToastrService, private _modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.getCarData();
  }

  public async getCarData(){
    try {

      let addCarResponse = await this._carService.listAllCars();
      if (addCarResponse.success) {
        this.cars = addCarResponse.cars;
      }
      else {
        this._toastr.error(addCarResponse.errorMessage, 'Unable to Get List Of Cars');
      }
    } catch (e) {
      this._toastr.error(e, 'Unable to Get List Of Cars');
    }
  }

  public onAddCarButtonClick(){
    const modalRef = this._modalService.open(AddCarComponent, {size: 'xl', backdrop: 'static'});
    modalRef.componentInstance.name = 'World';
    modalRef.closed.subscribe(addedCar => {
      if(addedCar != null){
        this.cars.push(addedCar);
      }
    })
  }

}

