import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/auth/login/login.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { CarSearchComponent } from './components/reserve/car-search/car-search.component';
import { CarAdminOverviewComponent } from './components/admin/car-admin-overview/car-admin-overview.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { NgbdButtonsCheckbox } from './buttons-checkbox';
import { CarDetailsComponent } from './components/car/car-details/car-details.component';
import { AddCarComponent } from './components/admin/add-car/add-car.component';
import { ViewBookingsComponent } from './components/reserve/view-bookings/view-bookings.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { AddEditParkingLocationComponent } from './components/admin/add-edit-parking-location/add-edit-parking-location.component';
import { ParkingLocationOverviewComponent } from './components/admin/parking-location-overview/parking-location-overview.component';
import { CarInfoComponent } from './components/car/car-info/car-info.component';
import { SelectDateTimeComponent } from './components/reserve/select-date-time/select-date-time.component';
import { MyBookingComponent } from './components/reserve/my-booking/my-booking.component';
import { BookingSummaryComponent } from './components/reserve/booking-summary/booking-summary.component';
import { UnlockCarComponent } from './components/car/unlock-car/unlock-car.component';
import { ReturnCarComponent } from './components/car/return-car/return-car.component';
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';
import { VerifyAccountComponent } from './components/auth/verify-account/verify-account.component';
import { UserAdminOverviewComponent } from './components/admin/user-admin-overview/user-admin-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    CarSearchComponent,
    CarAdminOverviewComponent,
    RegisterComponent,
    ProfileComponent,
    NgbdButtonsCheckbox,
    CarDetailsComponent,
    AddCarComponent,
    ViewBookingsComponent,
    AddEditParkingLocationComponent,
    ParkingLocationOverviewComponent,
    CarInfoComponent,
    SelectDateTimeComponent,
    MyBookingComponent,
    UnlockCarComponent,
    BookingSummaryComponent,
    ReturnCarComponent,
    EditProfileComponent,
    VerifyAccountComponent,
    UserAdminOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-full-width'
    }),
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiYmlncm9seSIsImEiOiJja243ZWVpZHcwbjl2Mm5sMHUwZnhkb256In0.L41CKQQqIZc2jTfuZDo4Og', 
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
