import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeserviceService } from '../../employee/service/employeeservice.service';
import { Table } from 'primeng/table';
import { ConfirmationService, SortEvent } from 'primeng/api';
import { Employee } from './employee';
import { SearchSortPipePipe } from '../../shared/pipes/search-sort-pipe.pipe';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Toast } from 'primeng/toast';



@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss',
})
export class EmployeeTableComponent implements OnInit {

  employeesObject: Employee[];
  initialValue: Employee[];
  loading: boolean = true;
  searchValue: string | undefined;
  today: string;
  //edit properties
  showEditDialog = false;
selectedEmployee: any = {};
roles = [
  { "name": "Employee" },
  { "name": "Executive" },
  { "name": "Analyst" },
  { "name": "Manager" },
  { "name": "Senior Engineer" },
  { "name": "Sales Lead" },
  { "name": "Engineer" },
  { "name": "Recruiter" },
  { "name": "Content Creator" },
  { "name": "QA Engineer" },
  { "name": "Sales Associate" },
  { "name": "Accountant" },
  { "name": "Intern" },
  { "name": "Brand Manager" },
  { "name": "Architect" },
  { "name": "HR Manager" },
  { "name": "Sales Executive" },
  { "name": "UX Designer" },
  { "name": "DevOps Engineer" }
];

departments = [
  { name: 'Engineering' },
  { name: 'HR' },
  { name: 'Finance' },
  { name: 'Marketing' },
  { name: 'Sales' }
];

  constructor(private empService: EmployeeserviceService, private router:Router,private messageService:MessageService, private confirmationService:ConfirmationService) {}

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
    this.empService.getUsers().subscribe({
      next: (res: any) => {
        this.loading = false;
        this.employeesObject = res;
        this.initialValue = [...res]
        console.log(res);
      },
    });
  }
  pipeSort(event) {
    this.searchValue = event.target.value
    console.log(this.searchValue);
  }
  backtodashboard() {
    this.router.navigate(['/admindashboard'])
  }

  onEditClick(employee: any) {
    this.selectedEmployee = {
      ...employee,
      role: this.roles.find(role => role.name === employee.role),
      department: this.departments.find(dept => dept.name === employee.department)
    };
    this.showEditDialog = true;
  }
  
  onEditSubmit(form: NgForm) {
    if (form.valid) {
      const updatedEmployee = {
        ...this.selectedEmployee,
        role: this.selectedEmployee.role.name,
        department: this.selectedEmployee.department.name
      };
  
      this.empService.updateEmp(updatedEmployee).subscribe({
        next: () => {
          this.messageService.add({
            key: 'editToast',
            severity: 'success',
            summary: 'Employee Updated',
            detail: 'The employee was updated successfully.'
          });
          this.empService.updateEmp(updatedEmployee).subscribe({
            next: (res: any) => {
              this.loading = false;
              this.empService.getUsers().subscribe({
                next: (res: any) => {
                  this.loading = false;
                  this.employeesObject = res;
                  this.initialValue = [...res]
                  console.log(res);
                },
              })
            },
          })
          // const index = this.employeesObject.findIndex(e => e.id === updatedEmployee.id);
          // if (index !== -1) this.employeesObject[index] = updatedEmployee;
  
          form.resetForm();
          this.showEditDialog = false;
        },
        error: (err) => {
          this.messageService.add({
            key: 'editToast',
            severity: 'error',
            summary: 'Update Failed',
            detail: `Error ${err.status}: Could not update employee`
          });
        }
      });
    }
  }

  deleteUser(event:Event, userId) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.empService.deleteEmp(userId).subscribe({
          next: (res) => {
            console.log(res)
            this.empService.getUsers().subscribe({
              next: (res: any) => {
                this.loading = false;
                this.employeesObject = res;
                this.initialValue = [...res]
                console.log(res);
              },
            })
          },
        });
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    })
  }
}
