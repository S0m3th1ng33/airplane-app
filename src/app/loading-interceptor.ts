import { HttpInterceptorFn } from '@angular/common/http';
import {OverlayModule} from '@angular/cdk/overlay'
import { inject } from '@angular/core';
import { LoadingService } from './services/loading-service';
import { catchError, finalize, throwError } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loadService = inject(LoadingService)
  loadService.show();
  return next(req).pipe(finalize(() => loadService.hide()), catchError((err) => {
    return throwError(() => new Error(err))
  }))
};
