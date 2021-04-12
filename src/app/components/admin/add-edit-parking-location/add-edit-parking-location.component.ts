import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LngLat, MapMouseEvent } from 'mapbox-gl';

@Component({
  selector: 'app-add-edit-parking-location',
  templateUrl: './add-edit-parking-location.component.html',
  styleUrls: ['./add-edit-parking-location.component.scss']
})
export class AddEditParkingLocationComponent implements OnInit {

  public mapMarkerLocation: LngLat = new LngLat(144.944192, -37.816675);

  public addParkingForm: FormGroup;

  constructor() {
    this.addParkingForm = new FormGroup({
      locationName: new FormControl('', Validators.required)
    });
  } 

  ngOnInit(): void {
    
  }

  public onMarkerClick(){
    alert('Foo')
  }

  public onMapClick(event: MapMouseEvent){
    
    let clickedLocation = event.lngLat;

    if(clickedLocation){
      console.log(clickedLocation);
      this.mapMarkerLocation = new LngLat(clickedLocation.lng, clickedLocation.lat);
    }

  }

}
