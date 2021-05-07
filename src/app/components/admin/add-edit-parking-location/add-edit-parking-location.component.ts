import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LngLat, MapMouseEvent } from 'mapbox-gl';
import { ToastrService } from 'ngx-toastr';
import { ParkingLocation } from 'src/app/models/parkingLocations/parkingLocation.model';
import { ParkingLocationService } from 'src/app/services/parking-location.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-edit-parking-location',
  templateUrl: './add-edit-parking-location.component.html',
  styleUrls: ['./add-edit-parking-location.component.scss']
})
export class AddEditParkingLocationComponent implements OnInit {

  public mapMarkerLocation: LngLat = new LngLat(144.96723200872293, -37.81774788707633);
  public mapCenter: LngLat = new LngLat(144.96723200872293, -37.81774788707633);
  public addParkingForm: FormGroup;
  public parkingRecord?: ParkingLocation;

  constructor(private _parkingLocationService: ParkingLocationService, private _toastr: ToastrService, public _activeModal: NgbActiveModal) {
    this.addParkingForm = new FormGroup({
      locationName: new FormControl('', Validators.required)
    });    
  } 

  ngOnInit(): void {
    if(this.parkingRecord != undefined){
      this.addParkingForm.setValue({
        locationName: this.parkingRecord.friendlyName
      });

      this.mapMarkerLocation = new LngLat(this.parkingRecord.longitude, this.parkingRecord.latitude);
      this.mapCenter = new LngLat(this.parkingRecord.longitude, this.parkingRecord.latitude);
    }
  } 

  public onMapClick(event: MapMouseEvent){
    let clickedLocation = event.lngLat;
    if(clickedLocation){
      this.mapMarkerLocation = new LngLat(clickedLocation.lng, clickedLocation.lat);
    }
  }

  public async onSubmitParkingLocationForm(){
    if(this.addParkingForm.valid){
      
      let saveUuid = this.parkingRecord != undefined ? this.parkingRecord.uuid : uuidv4();
      
      let locationToAdd: ParkingLocation = {
        uuid: saveUuid,
        friendlyName: this.addParkingForm.value['locationName'],
        latitude: this.mapMarkerLocation.lat,
        longitude: this.mapMarkerLocation.lng
      }

      console.log(locationToAdd);
      let resp = await this._parkingLocationService.addEditLocation(locationToAdd);
      if(resp.success){
        this._toastr.success('','Parking Location Saved');
        this._activeModal.close(locationToAdd);
      }
      else{
        this._toastr.error(resp.errorMessage, 'Error Saving Parking Location');
      }
    }
  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
  }

}
