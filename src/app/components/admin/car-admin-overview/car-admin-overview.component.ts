import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car.model';
import { CarService } from 'src/app/services/car.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AddCarComponent } from '../add-car/add-car.component';

@Component({
  selector: 'app-car-admin-overview',
  templateUrl: './car-admin-overview.component.html',
  styleUrls: ['./car-admin-overview.component.scss']
})

  export class CarAdminOverviewComponent implements OnInit{ 

  public cars: Car[] = [];

  constructor(private _carService: CarService, private _toastr: ToastrService, private _modalService: NgbModal, private _utils: UtilityService) {

  }

  ngOnInit(): void {
    this.getCarData();
  }

  public async getCarData(){
    try {

      let addCarResponse = await this._carService.listAllCars();
      if (addCarResponse.success) {
        this.cars = addCarResponse.cars.sort(this._utils.dynamicSort('make'));
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
    modalRef.closed.subscribe(addedCar => {
      if(addedCar != null){
        this.cars.push(addedCar);
        this.cars = this.cars.sort(this._utils.dynamicSort('make'));
      }
    })
  }

  public onEditCarClick(car: Car){
    const modalRef = this._modalService.open(AddCarComponent, {size: 'xl', backdrop: 'static'});
    modalRef.componentInstance.carRecord = car;

    modalRef.closed.subscribe(addedCar => {
      if(addedCar != null){
        const reFilter = this.cars.filter(c => c.uuid != addedCar.uuid);
        reFilter.push(addedCar);
        this.cars = reFilter.sort(this._utils.dynamicSort('make'));
      }
    })
  }

  public async onDeleteCarClick(car: Car){
    const confirmation = window.confirm(`Are you sure you want to delete the ${car.year} ${car.make} ${car.model}?`);

    if(confirmation){
      const deleteresp = await this._carService.deleteCar(car.uuid);
      if(deleteresp.success){
        this._toastr.success('','Car deleted');
        this.getCarData();
      }
    }
  }

}

