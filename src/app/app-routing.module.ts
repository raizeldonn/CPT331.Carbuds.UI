import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAdminOverviewComponent } from './components/admin/car-admin-overview/car-admin-overview.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CarSearchComponent } from './components/car-search/car-search.component';
import { ProfileComponent } from './components/user/profile/profile.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

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
    path: 'admin',
    children: [
      {
        path: 'vehicles',
        component: CarAdminOverviewComponent,
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
