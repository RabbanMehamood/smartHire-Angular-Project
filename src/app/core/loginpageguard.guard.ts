import { CanActivateFn, Router } from '@angular/router';
import { inject, Inject } from '@angular/core';

export const loginpageguardGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)

  const role = localStorage.getItem('username');
  
  if (role === 'Admin') {
    router.navigate(['/admindashboard']);
    return false;
  } else {
    return true;
  }
};
