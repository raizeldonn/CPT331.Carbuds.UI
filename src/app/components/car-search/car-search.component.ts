import { Component, OnInit } from '@angular/core';
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
  public mapMarkerLocation: LngLat = new LngLat(144.96723200872293, -37.81774788707633);
  public mapMarkerLocation1: LngLat = new LngLat(144.96723200872293, -37.71774788707633);
  public markers: LngLat[] = [];
  public locations: ParkingLocation[] = [];


  constructor(private _plService: ParkingLocationService, private _toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.getLocationList()
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
}
