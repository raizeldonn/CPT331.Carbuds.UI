import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car/car.model';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectDateTimeComponent } from '../select-date-time/select-date-time.component'

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss']
})
export class CarInfoComponent implements OnInit {

  public car!: Car;

  constructor( private _carService: CarService, private _toastr: ToastrService, 
    public _activeModal: NgbActiveModal, private _modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCarData();
  }

  public async getCarData(){
    try {

      let getCarResponse = await this._carService.getOneCar();
      if (getCarResponse.success) {
        this.car = getCarResponse.car;
      }
      else {
        this._toastr.error(getCarResponse.errorMessage, 'Unable to Get Single Car');
      }
    } catch (e) {
      this._toastr.error(e, 'Unable to Get Single Car');
    }
  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
  }

  public onReserveCarClick(){
    this._activeModal.dismiss(null);
    const modalRef = this._modalService.open(SelectDateTimeComponent, {size: 'm', backdrop: 'static'});
    modalRef.componentInstance.name = 'World';
    //modalRef.closed.subscribe(addedCar => {
    //  if(addedCar != null){
    //    this.cars.push(addedCar);
    //  }
    //})
  }

}
