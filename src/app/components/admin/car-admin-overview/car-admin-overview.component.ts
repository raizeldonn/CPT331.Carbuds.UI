import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-admin-overview',
  templateUrl: './car-admin-overview.component.html',
  styleUrls: ['./car-admin-overview.component.scss']
})

  export class CarAdminOverviewComponent implements OnInit{ 

  public cars: Car[] = [];

  constructor(private _carService: CarService, private _toastr: ToastrService) {

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

}

