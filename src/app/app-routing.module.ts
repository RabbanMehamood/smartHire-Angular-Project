import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from './employee/employee-table/employee-table.component';
import { blockLoginGuard } from './core/adminLoginGuard';
import { loginpageguardGuard } from './core/loginpageguard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [loginpageguardGuard],
  },
  {
    path: 'admindashboard',
    loadChildren: () =>
      import('./admindashboard/admindashboard.module').then(
        (m) => m.AdmindashboardModule
      ),
    canActivate: [blockLoginGuard],
  },
  {
    path: 'employee-table',
    component: EmployeeTableComponent,
    canActivate: [blockLoginGuard],
  },
  {
    path: 'empdashboard',
    loadChildren: () =>
      import('./empdashboard/empdashboard.module').then(
        (m) => m.EmpdashboardModule
      ),
  },
  {
    path: 'orgnisationchart',
    loadChildren: () =>
      import('./balkanorg-chart/balkanorg-chart.module').then(
        (m) => m.BalkanorgChartModule
      ),
  },
  {
    path: 'treechart',
    loadChildren: () =>
      import('./organisation-chart/organisation-chart.module').then(
        (m) => m.OrganisationChartModule
      ),
  },
  { path: 'gridsterpage', loadChildren: () => import('./gridsterpage/gridsterpage.module').then(m => m.GridsterpageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
