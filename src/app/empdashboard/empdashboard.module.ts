import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpdashboardRoutingModule } from './empdashboard-routing.module';
import { EmpdashboardComponent } from './empdashboard.component';
import { SharedModule } from '../shared/shared.module';
import { TreeModule } from 'primeng/tree';
import { Button, ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    EmpdashboardComponent
  ],
  imports: [
    CommonModule,
    EmpdashboardRoutingModule,
    SharedModule,
    TreeModule,
    ButtonModule
  ],
 
})
export class EmpdashboardModule { }
