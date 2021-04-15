import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAdminOverviewComponent } from './components/admin/car-admin-overview/car-admin-overview.component';
import { AddCarComponent } from './components/admin/add-car/add-car.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CarSearchComponent } from './components/car-search/car-search.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarInfoComponent } from './components/reserve/car-info/car-info.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AddEditParkingLocationComponent } from './components/admin/add-edit-parking-location/add-edit-parking-location.component';
import { ParkingLocationOverviewComponent } from './components/admin/parking-location-overview/parking-location-overview.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: CarAdminOverviewComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'car-info',
    component: CarInfoComponent
  },
  {
    path: 'search',
    component: CarSearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    children: [
      {
        path: 'vehicles',
        component: CarAdminOverviewComponent,
        data: {
          requiredGroups: ['carbuds-admins']
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'parkingLocations',
        component: ParkingLocationOverviewComponent,
        data: {
          requiredGroups: ['carbuds-admins']
        },
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: '', 
    redirectTo: 'login',
    pathMatch : 'full'
  },
  { path: 'cars/:car.uuid', 
    component: CarDetailsComponent 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
