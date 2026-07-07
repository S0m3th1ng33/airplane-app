import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth-service';
import { inject } from '@angular/core';
import { delay } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  const modRequest = req.clone(
    {
      headers: req.headers.append('Authorization', `Bearer ${authService.token()}`)
    }
  )
  return next(modRequest);
};
