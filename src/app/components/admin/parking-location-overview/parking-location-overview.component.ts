import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ParkingLocation } from 'src/app/models/parkingLocations/parkingLocation.model';
import { ParkingLocationService } from 'src/app/services/parking-location.service';
import { AddEditParkingLocationComponent } from '../add-edit-parking-location/add-edit-parking-location.component';

@Component({
  selector: 'app-parking-location-overview',
  templateUrl: './parking-location-overview.component.html',
  styleUrls: ['./parking-location-overview.component.scss']
})
export class ParkingLocationOverviewComponent implements OnInit {
  
  public locations: ParkingLocation[] = [];

  constructor(private _plService: ParkingLocationService, private _toastr: ToastrService, private _modalService: NgbModal) {
    this.getLocationList();
  }

  ngOnInit(): void {

  }

  public async getLocationList(){
    const locationResp = await this._plService.listAllLocations();

    if(locationResp.success){
      this.locations = locationResp.parkingLocations;
    }
    else{
      this._toastr.error(locationResp.errorMessage, 'Unable to get list of Locations.');
    }
  }

  public onAddParkingLocationClick(){

    const modalRef = this._modalService.open(AddEditParkingLocationComponent, {size: 'xl', backdrop: 'static'});
    //modalRef.componentInstance.name = 'World';
    modalRef.closed.subscribe(addedLoc => {
      if(addedLoc != null){
        this.locations.push(addedLoc);
      }
    })
  }

}
