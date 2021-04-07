import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-parking-location',
  templateUrl: './add-edit-parking-location.component.html',
  styleUrls: ['./add-edit-parking-location.component.scss']
})
export class AddEditParkingLocationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public onMarkerClick(){
    alert('Foo')
  }

}
