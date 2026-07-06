import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private http: HttpClient) {

  }

  login(info: ILoginDetails) {
    return this.http.post<ILoginToken>('http://localhost:3000/api/auth/login', info)
      .pipe(
        map(response => {
          localStorage.setItem('token', response.token);
          return response;
        })
      )
  }

  logout() {
    localStorage.removeItem('token');
  }
}


export interface ILoginDetails {
  email: string;
  password: string;
}

export interface ILoginToken {
  token: string;
}