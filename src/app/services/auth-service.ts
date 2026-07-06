import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private readonly http = inject(HttpClient)
  private readonly sessionInfo = signal<SessionInfo | undefined>(undefined)
  token = computed(() => this.sessionInfo()?.token)
  user = computed(() => this.sessionInfo()?.user)
  //compurted(() => !!this.sessionInfo()) works aswell (By: Traxi)
  isLoggedIn = computed(() => this.sessionInfo() ? true : false)
  router = inject(Router);


  login(info: ILoginDetails): Observable<{ isSuccess: boolean, msg?: string }> {
    return this.http.post<SessionInfo>('http://localhost:3000/api/auth/login', info)
      .pipe(
        switchMap(response => {
          if (response?.token) {
            this.sessionInfo.set(response)
          }
          return of({ isSuccess: true })
        }), catchError((error) => {
          return of({ isSuccess: false, msg: error.error.error })
        })
      )
  }

  logout() {
    this.sessionInfo.set(undefined)
    this.router.navigate(['/login'])
  }
}


export interface ILoginDetails {
  email: string;
  password: string;
}


export interface SessionInfo {
  token: string
  user: {
    name: string,
    id: string,
    email: string
  }
}