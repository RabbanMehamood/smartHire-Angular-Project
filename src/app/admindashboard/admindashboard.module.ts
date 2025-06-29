import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
import { AdmindashboardComponent } from './admindashboard.component';
import { HeaderComponent } from './header/header.component';
import { ButtonModule } from 'primeng/button';
import { CurrencyPipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown'
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { EmployeeserviceService } from '../employee/service/employeeservice.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [AdmindashboardComponent, HeaderComponent],
  imports: [
    CommonModule,
   ConfirmDialogModule,
       ConfirmPopupModule,
    ToastModule,
    AdmindashboardRoutingModule,
    ButtonModule,
    CurrencyPipe,
    FormsModule,
    ChartModule,
    IconFieldModule,
    TagModule,
    IconFieldModule,
    AutoCompleteModule,
    InputIconModule,
    HttpClientModule,
    InputTextModule,
    MultiSelectModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule
  ],
  exports: [HeaderComponent],
  providers:[EmployeeserviceService,MessageService,ConfirmationService]
})
export class AdmindashboardModule {}
