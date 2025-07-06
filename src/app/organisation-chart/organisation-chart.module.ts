import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { OrganisationChartRoutingModule } from './organisation-chart-routing.module';
import { OrganisationChartComponent } from './organisation-chart.component';
  
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { OrgchartModule } from '../orgchart/orgchart.module';
@NgModule({
  declarations: [OrganisationChartComponent],
  imports: [
    CommonModule,
    OrganisationChartRoutingModule,
    SharedModule,
    CheckboxModule,
    FormsModule,
    OrgchartModule,
  ],
})
export class OrganisationChartModule {}
