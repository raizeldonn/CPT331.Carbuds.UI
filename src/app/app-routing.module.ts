import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAdminOverviewComponent } from './components/admin/car-admin-overview/car-admin-overview.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CarSearchComponent } from './components/car-search/car-search.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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
