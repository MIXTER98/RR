import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const autenticado = 
  localStorage.getItem('autenticado');

  if(autenticado === 'true'){
    return true;
  }

  router.navigate(['/login']);

  return false;
};
