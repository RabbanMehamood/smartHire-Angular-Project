import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { BalkanorgChartRoutingModule } from './balkanorg-chart-routing.module';
import { BalkanorgChartComponent } from './balkanorg-chart.component';
import { HeaderComponent } from '../shared/header/header.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BalkanorgChartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BalkanorgChartRoutingModule,
    CheckboxModule,
    FormsModule
  ],

})
export class BalkanorgChartModule { }
