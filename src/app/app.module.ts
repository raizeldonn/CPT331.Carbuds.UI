import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/auth/login/login.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { CarSearchComponent } from './components/car-search/car-search.component';
import { CarAdminOverviewComponent } from './components/admin/car-admin-overview/car-admin-overview.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { AddCarComponent } from './components/admin/add-car/add-car.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    CarSearchComponent,
    CarAdminOverviewComponent,
    RegisterComponent,
    CarDetailsComponent,
    AddCarComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-full-width'
    }),
    NgxMapboxGLModule.withConfig({
      accessToken: 'sk.eyJ1IjoiYmlncm9seSIsImEiOiJja243ZWdpMWowbmQ5MnVqbmJraTJhY3lxIn0.YUa8t7wvt-8gZZTPvxUX7g', 
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
