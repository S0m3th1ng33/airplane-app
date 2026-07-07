import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if (!authService.isLoggedIn()) {
    // We get the state.url snapshot of the page the user tried to access
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  }
  return authService.isLoggedIn();
};
