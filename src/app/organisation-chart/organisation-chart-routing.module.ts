import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationChartComponent } from './organisation-chart.component';

const routes: Routes = [{ path: '', component: OrganisationChartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationChartRoutingModule { }
