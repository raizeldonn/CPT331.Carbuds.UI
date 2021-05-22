import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car/car.model';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectDateTimeComponent } from '../../reserve/select-date-time/select-date-time.component'

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss']
})
export class CarInfoComponent implements OnInit {
  public carUuid: string = "";
  public longitude: number | undefined;
  public latitude: number | undefined;
  public car!: Car;

  constructor( private _carService: CarService, private _toastr: ToastrService, 
    public _activeModal: NgbActiveModal, private _modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
  }

  public onReserveCarClick(){
    this._activeModal.dismiss(null);
    const modalRef = this._modalService.open(SelectDateTimeComponent, {size: 'm', backdrop: 'static'});
    modalRef.componentInstance.car = this.car;
    modalRef.componentInstance.longitude = this.longitude;
    modalRef.componentInstance.latitude = this.latitude;
  }

}
