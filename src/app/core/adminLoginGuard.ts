import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
export const blockLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = localStorage.getItem('username');
  
  if (role === 'Admin') {
    
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
