import { Component, inject, signal } from '@angular/core';
import { form, min, required, FormField } from '@angular/forms/signals';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { AuthService, ILoginDetails } from '../../services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [MatCard, MatCardContent, MatFormField, MatLabel, MatError, FormField, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  authService = inject(AuthService);
  router = inject(Router);
  snackbar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);

  loginDetails = signal<ILoginDetails>({
    email: '',
    password: ''
  });

  loginForm = form(this.loginDetails, (path) => {
    required(path.email, { message: 'Email is required' });
    required(path.password, { message: 'Password is required' });
    min(path.password, 4, { message: 'Password must be at least 4 characters long' });
  })

  signIn() {

    //Looket at jwtHelper, and in a different case return tokenNotExpired() can work
    this.authService.login(this.loginDetails()).subscribe(response => {
      if (response.isSuccess) {
        //If we wanted to access a page first without loging in, after the login we are redirected to that page
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/airplanes']);
      }
      else {
        this.snackbar.open(response.msg ?? 'Unknown error', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

}

