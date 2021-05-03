import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarInfoComponent } from "../reserve/car-info/car-info.component"
import * as mapboxgl from 'mapbox-gl';
import { LngLat } from 'mapbox-gl';
import { ToastrService } from 'ngx-toastr';
import { ParkingLocation } from 'src/app/models/parkingLocations/parkingLocation.model';
import { ParkingLocationService } from 'src/app/services/parking-location.service';

@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.scss']
})
export class CarSearchComponent implements OnInit {
  public markers: LngLat[] = [];
  public locations: ParkingLocation[] = [];

  constructor(private _plService: ParkingLocationService, private _toastr: ToastrService, private _modalService: NgbModal) { 
  }

  ngOnInit(): void {
    this.getLocationList()
  }

  public onCarMapClick(){
    const modalRef = this._modalService.open(CarInfoComponent, {size: 'm', backdrop: 'static'});
    modalRef.componentInstance.name = 'World';
    //modalRef.closed.subscribe(addedCar => {
    //  if(addedCar != null){
    //    this.cars.push(addedCar);
    //  }
    //})
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
  public populateMarkers(){
    for (let loc of this.locations){
      const newMarker = new LngLat(loc.longitude, loc.latitude);
      this.markers.push(newMarker);
    }
  }
  public markerClicked(mark: LngLat){
    console.log(mark);
  }
}
