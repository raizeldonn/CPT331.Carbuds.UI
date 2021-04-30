import { Component, OnInit } from '@angular/core';
import bookings from 'src/app/bookings.json';

@Component({
  selector: 'app-past-bookings',
  templateUrl: './past-bookings.component.html',
  styleUrls: ['./past-bookings.component.scss']
})
export class PastBookingsComponent implements OnInit {
  
  // for mock data only- remove-------
  public bookingList:{taken:string, returned:string, location:string, car:string, cost:string}[] = bookings;
  //----------------------------------
     constructor() { }

  ngOnInit(): void {
  }

}
