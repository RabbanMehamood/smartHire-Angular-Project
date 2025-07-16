import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterComponent, GridsterItemComponent, GridsterModule } from 'angular-gridster2';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';



import { GridsterpageRoutingModule } from './gridsterpage-routing.module';
import { GridsterpageComponent } from './gridsterpage.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GridsterpageComponent],
  imports: [
    CommonModule,
    GridsterComponent,
    GridsterItemComponent,
    GridsterpageRoutingModule,
    GridsterModule,
    SharedModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ChartModule,
    DialogModule,
    
  ],
})
export class GridsterpageModule {}
