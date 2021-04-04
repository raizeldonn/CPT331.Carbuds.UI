import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car/car.model';
// import { GetListCarsResponse } from 'src/app/contracts/car/get.listCars.response.model';
import { CarSearchComponent } from '../../car-search/car-search.component';
import { CARS } from 'src/app/mock-cars';
import { NgbdButtonsCheckbox } from 'src/app/buttons-checkbox';


@Component({
  selector: 'app-car-admin-overview',
  templateUrl: './car-admin-overview.component.html',
  styleUrls: ['./car-admin-overview.component.scss']
})
// export class CarAdminOverviewComponent implements OnInit, GetListCarsResponse { 
  export class CarAdminOverviewComponent implements OnInit{ 

  cars = CARS;

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

