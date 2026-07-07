import { HttpInterceptorFn } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay'
import { inject } from '@angular/core';
import { LoadingService } from './services/loading-service';
import { catchError, delay, finalize, throwError } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loadService = inject(LoadingService)
  loadService.show();
  return next(req).pipe(delay(Math.random() * 1000), finalize(() => loadService.hide()))
};
