import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarInfoComponent } from "src/app/components/car/car-info/car-info.component"
import * as mapboxgl from 'mapbox-gl';
import { LngLat } from 'mapbox-gl';
import { ToastrService } from 'ngx-toastr';
import { ParkingLocation } from 'src/app/models/parkingLocations/parkingLocation.model';
import { ParkingLocationService } from 'src/app/services/parking-location.service';
import { Car } from 'src/app/models/car/car.model';
import { CarService } from 'src/app/services/car.service';
import { CarMapMarker } from 'src/app/models/car/carMapMarker.model';


@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.scss']
})
export class CarSearchComponent implements OnInit {
  public markers: CarMapMarker[] = [];
  public locations: ParkingLocation[] = [];
  public cars: Car[] = [];

  constructor(private _plService: ParkingLocationService, private _toastr: ToastrService, private _modalService: NgbModal, private _carService: CarService) { 
  }

  ngOnInit(): void {
    this.beginInit();    
  }

  public onCarMapClick(){
    const modalRef = this._modalService.open(CarInfoComponent, {size: 'm', backdrop: 'static'});
  }

  private async beginInit(){
    this.getCarList();
  }

  public async getLocationList(){
    const locationResp = await this._plService.listAllLocations();

    if(locationResp.success){
      this.locations = locationResp.parkingLocations;
      this.populateMarkers();
    }
    else{
      this._toastr.error(locationResp.errorMessage, 'Unable to get list of Locations.');
    }
  }

  public async getCarList(){
    const locationResp = await this._carService.listAllCars();

    if(locationResp.success){
      this.cars = locationResp.cars;
      this.getLocationList();
    }
    else{
      this._toastr.error(locationResp.errorMessage, 'Unable to get list of Locations.');
    }
  }
// Only works if there is only one car per location
  public populateMarkers(){

    for (let car of this.cars){
      const carLocation = this.locations.find(l => l.uuid == car.location);
      if(carLocation){
        const newLoc: CarMapMarker = {
          mapLocation : new LngLat(carLocation.longitude, carLocation.latitude),
          carUuid : car.uuid
        }
        this.markers.push(newLoc);
      }
    }
  }

  public markerClicked(marker: CarMapMarker){
    const selectedCar = this.cars.find(c => c.uuid = marker.carUuid);
    const modalRef = this._modalService.open(CarInfoComponent, {size: 'm', backdrop: 'static'});
    modalRef.componentInstance.car = selectedCar;
    modalRef.componentInstance.longitude = marker.mapLocation.lng;
    modalRef.componentInstance.latitude = marker.mapLocation.lat;
  }
}
