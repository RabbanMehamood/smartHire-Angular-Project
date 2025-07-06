import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { EmployeeserviceService } from '../../employee/service/employeeservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private empService:EmployeeserviceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
        ],
      ],
    });
  }

  onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Not Authorized',
        detail: 'Login Credentials are Invalid',
      });
      this.loginForm.reset();
      return;
    }

    const success = this.loginForm.valid;
    const checkCredentials= this.loginProcess(this.loginForm.value)
    if (success && checkCredentials) {
      console.log(this.loginForm.value)
      this.messageService.add({
        severity: 'success',
        summary: 'Login Successful',
        detail: 'Successfully Logged In',
        life: 500,
      });
       setTimeout(() => {
        this.router.navigate(['/treechart']);
       }, 500);
   
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Incorrect credentials. Please try again.',
      });
    }
  }
  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }

  loginProcess(formvalue): boolean{
    
    let  usersList: any[] =[]
    this.empService.getLoginUsersList().subscribe((res) => {
      usersList = res
      console.log(usersList)
    }
    )
    if (formvalue.username === 'Admin' && formvalue.password === 'admin') {
      localStorage.setItem('username', 'Admin')
      return true
    } else {
      return false
    }
  }
}
