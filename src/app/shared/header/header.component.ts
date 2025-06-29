import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router,private messageService:MessageService,private confirmationService:ConfirmationService ) {}

  logout(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to log out?',
      icon: 'pi pi-sign-out',
      accept: () => {
        localStorage.clear();
        this.messageService.add({
          key:'logoutToast',
          severity: 'success',
          summary: 'Logged Out',
          detail: 'You have been successfully logged out',
          life: 3000,
        });
        this.router.navigate(['']);
      },
      reject: () => {
        this.messageService.add({
          key:'logoutToast',
          severity: 'info',
          summary: 'Cancelled',
          detail: 'You remained logged in',
          life: 2000,
        });
      },
    });
  }
}
