import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Checking if user is logged in
  if (authService.currentUserValue) {
    return true; // Allow access
  }

  // If user is not logged in, redirect to login page
  router.navigate(['/login']);
  return false;
};