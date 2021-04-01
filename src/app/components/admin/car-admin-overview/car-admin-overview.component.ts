import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/car';
import { CARS } from 'src/app/mock-cars';

@Component({
  selector: 'app-car-admin-overview',
  templateUrl: './car-admin-overview.component.html',
  styleUrls: ['./car-admin-overview.component.scss']
})
export class CarAdminOverviewComponent implements OnInit { 

  cars = CARS;

  constructor() { }

  ngOnInit(): void {
  }

}
