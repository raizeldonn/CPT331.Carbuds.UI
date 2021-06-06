import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAdminOverviewComponent } from './components/admin/car-admin-overview/car-admin-overview.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AddCarComponent } from './components/admin/add-car/add-car.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CarSearchComponent } from './components/reserve/car-search/car-search.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { CarDetailsComponent } from './components/car/car-details/car-details.component';
import { CarInfoComponent } from './components/car/car-info/car-info.component';
import { ViewBookingsComponent } from './components/reserve/view-bookings/view-bookings.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { ParkingLocationOverviewComponent } from './components/admin/parking-location-overview/parking-location-overview.component';
import { AddEditParkingLocationComponent } from './components/admin/add-edit-parking-location/add-edit-parking-location.component';
import { VerifyAccountComponent } from './components/auth/verify-account/verify-account.component';
import { UserAdminOverviewComponent } from './components/admin/user-admin-overview/user-admin-overview.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verifyAccount',
    component: VerifyAccountComponent
  },
  {
    path: 'admin',
    component: CarAdminOverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'car-info',
    component: CarInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: CarSearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    children: [
      {
        path: 'view-bookings',
        component: ViewBookingsComponent,
        data: {
          requiredGroups: ['carbuds-users']
        },
        canActivate: [AuthGuard]
      }
    ]
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
      },
      {
        path: 'users',
        component: UserAdminOverviewComponent,
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
