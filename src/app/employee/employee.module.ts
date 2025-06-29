import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button'; 
import { SearchSortPipePipe } from '../shared/pipes/search-sort-pipe.pipe';
import { ToastModule } from 'primeng/toast';

import { EmployeeserviceService } from './service/employeeservice.service';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [EmployeeTableComponent],
  imports: [
    InputTextModule,
    DialogModule,
    ToastModule,
    CommonModule,
    IconFieldModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    HttpClientModule,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
    TableModule,
    FormsModule,
    SharedModule,
    ButtonModule,
    ConfirmDialogModule,
    ConfirmPopupModule
  ],
  exports: [EmployeeTableComponent],
  providers:[EmployeeserviceService,MessageService,ConfirmationService]
})
export class EmployeeModule {}
