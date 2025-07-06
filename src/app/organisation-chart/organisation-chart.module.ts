import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { OrganisationChartRoutingModule } from './organisation-chart-routing.module';
import { OrganisationChartComponent } from './organisation-chart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrgchartModule } from '../orgchart/orgchart.module';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrganisationChartComponent],
  imports: [
    CommonModule,
    OrganisationChartRoutingModule,
    SharedModule,
    CheckboxModule,
    FormsModule,
    OrgchartModule,
    ReactiveFormsModule
  ],
  exports: [OrganisationChartComponent],
})
export class OrganisationChartModule {}
