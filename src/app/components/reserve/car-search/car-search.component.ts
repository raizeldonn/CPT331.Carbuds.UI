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


@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.scss']
})
export class CarSearchComponent implements OnInit {
  public markers: LngLat[] = [];
  public locations: ParkingLocation[] = [];
  public cars: Car[] = [];
  public carsWithLocations: Car[] = [];
  public locationsWithCars: ParkingLocation[] = [];

  constructor(private _plService: ParkingLocationService, private _toastr: ToastrService, private _modalService: NgbModal, private _carService: CarService) { 
  }

  ngOnInit(): void {
    this.getCarList()
    this.getLocationList()
  }

  public onCarMapClick(){
    const modalRef = this._modalService.open(CarInfoComponent, {size: 'm', backdrop: 'static'});
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
    }
    else{
      this._toastr.error(locationResp.errorMessage, 'Unable to get list of Locations.');
    }
  }
// Only works if there is only one car per location
  public populateMarkers(){

    for (let car of this.cars){
      for (let loc of this.locations){
        if(car.location == loc.uuid){
          this.locationsWithCars.push(loc);
          this.carsWithLocations.push(car);
          const newMarker = new LngLat(loc.longitude, loc.latitude);
          this.markers.push(newMarker);
        }
      }
    }
  }

  public markerClicked(marker: LngLat){
    var index = 0;
    var carUuid;
    for (let mark of this.markers){
      if (mark == marker){
        carUuid = this.carsWithLocations[index].uuid;
      }
      else{
        index+=1;
      }
    }
    const modalRef = this._modalService.open(CarInfoComponent, {size: 'm', backdrop: 'static'});
    modalRef.componentInstance.carUuid = carUuid;
    modalRef.componentInstance.longitude = marker.lng;
    modalRef.componentInstance.latitude = marker.lat;
  }
}
