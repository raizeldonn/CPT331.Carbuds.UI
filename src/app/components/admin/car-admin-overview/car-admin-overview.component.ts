import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car/car.model';
// import { GetListCarsResponse } from 'src/app/contracts/car/get.listCars.response.model';


@Component({
  selector: 'app-car-admin-overview',
  templateUrl: './car-admin-overview.component.html',
  styleUrls: ['./car-admin-overview.component.scss']
})
// export class CarAdminOverviewComponent implements OnInit, GetListCarsResponse { 
  export class CarAdminOverviewComponent implements OnInit{ 

  public cars: Car[] = [];

  model = {
    left: false,
  };

  constructor() { }
  // cars: Car[] = [];
  // success: boolean = false;
  // errorMessage!: string;

  ngOnInit(): void {
  }

}

