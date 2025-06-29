import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeserviceService } from '../employee/service/employeeservice.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';



interface Role {
  name: string;
}
function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!control.value) {
      return null;
    }
    const isValid = emailRegex.test(control.value);
    return isValid ? null : { customEmail: true };
  };
}

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss',
})
export class AdmindashboardComponent implements OnInit  {
  employeeForm: FormGroup;
  users = [];
  avgSalary: number;
  bonusValue:number;
  emailChange: string;
  departments = new Map();
  departmentList: [string, number][] = [];
  selectedRole  : string ='';
  selectedDepartment: string = '';
  submitted: boolean = false;
  roles: Role[]=[
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
  departmentsArray=[
    { "name": "Engineering" },
    { "name": "Marketing" },
    { "name": "HR" },
    { "name": "Finance" },
    { "name": "Sales" },
    { "name": "Design" },
  ];
 

  // chart Properties
  data: any;
  options: any;

  getRole(event) {
  this.selectedRole = event.value.name
  }

  constructor(private empService: EmployeeserviceService,private router: Router,private fb: FormBuilder,private messageService:MessageService) {}
 

  ngOnInit(): void {
    this.empService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res;
        let totalSalary = res.reduce((total, user) => {
          return total + user.salary + (user.bonus || 0);
        }, 0);
        this.avgSalary = totalSalary / this.users.length;

        res.forEach((item) => {
          if (this.departments.has(item.department)) {
            this.departments.set(
              item.department,
              this.departments.get(item.department) + 1
            );
          } else {
            this.departments.set(item.department, 1);
          }
        });
        console.log(this.departments);
        this.departmentList = Array.from(this.departments.entries());
        this.renderChart(res);

      },
    });    
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['',  [Validators.required, Validators.email, customEmailValidator()]],
      department: [null, Validators.required],
      role: [null, Validators.required],
      salary: [null, [Validators.required, Validators.min(0)]],
      bonus : [null],
      joinedDate: ['', Validators.required]
    });
  }

  navigate() {
    this.router.navigate(['/employee-table'])
  }

//chart render methods
  renderChart(salaryData: any) {
    const documentStyle = getComputedStyle(document.documentElement);
    const dept_avgSal = this.avgSalariesDeptWise(salaryData);
    this.data = {
      labels: [...dept_avgSal.keys()],
      datasets: [
        {
          label: 'Average Salary Department Wise In (Dollars)$',
          backgroundColor: documentStyle.getPropertyValue('--teal-600'),
          borderColor: documentStyle.getPropertyValue('--teal-600'),
          data: [...dept_avgSal.values()],
        },
      ],
    };
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: ' #000000',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: ' #000000',
            font: {
              weight: 600,
            },
          },
        },
        y: {
          ticks: {
            color: ' #000000',
          },
        },
      },
    };
  }

  avgSalariesDeptWise(users) {
    let departments = [
      ...new Set(
        users.map((item) => {
          return item.department;
        })
      ),
    ];
    let avgMap = new Map();
    for (let dept of departments) {
      let count = 0;
      let sal = 0;
      users.forEach((user) => {
        if (user.department === dept) {
          sal = sal + user.salary;
          count++;
        }
      });
      avgMap.set(dept, (sal / count).toFixed(2));
    }
    return avgMap;
  }

  ///add employee modal methods and properties

  visible: boolean = true;
  employeeName: string;
    showDialog() {
      this.visible = true;
      this.selectedRole=''
      this.employeeForm.reset();
  }
  
  

  addEmployee(): void {
    this.submitted = true;
    if (this.employeeForm.valid) {
      const newEmployee = {
        ...this.employeeForm.value,
        id:this.users.length+1, 
        department: this.employeeForm.value.department.name,
        role: this.employeeForm.value.role.name             
      };
      this.empService.addEmp(newEmployee, { observe: Response }).subscribe({
        next: (response: HttpResponse<any>) => {
          console.log('status code:', response.status)
          if (response.status === 201 || response.status === 200) {
            this.messageService.add({
              key: "addEmployeeToast",
              severity: 'success',
              summary: 'Employee Added',
              detail: 'The employee was added successfully.',
              sticky: true
            });
      this.employeeForm.reset();
          }
        },
        error: (err) => {
          console.error('Error Status:', err.status);
          this.messageService.add({
            key: "addEmployeeToast",
            severity: 'error',
            summary: 'Add Failed',
            detail: `Failed to add employee. Status: ${err.status}`,
          });
      this.employeeForm.reset();
        }
      })
      this.visible = false;
      
    } else {
      this.employeeForm.markAsTouched();
      this.employeeForm.reset();
    }
  }
}
