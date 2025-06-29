import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpdashboardRoutingModule } from './empdashboard-routing.module';
import { EmpdashboardComponent } from './empdashboard.component';
import { SharedModule } from '../shared/shared.module';
import { TreeModule } from 'primeng/tree';
import { Button, ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmpdashboardComponent],
  imports: [
    CommonModule,
    EmpdashboardRoutingModule,
    SharedModule,
    TreeModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [EmpdashboardComponent],
})
export class EmpdashboardModule {}
