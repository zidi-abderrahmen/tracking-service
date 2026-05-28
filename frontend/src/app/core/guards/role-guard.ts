import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth/auth';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true; 
  }

  if (authService.isLoggedIn()) {
    const userRole = authService.getRole();
    const expectedRole = route.data['expectedRole'];

    if (userRole === expectedRole) {
      return true;
    }
    
    router.navigate(['/login']);
    return false;
  }

  router.navigate(['/login']);
  return false;
};