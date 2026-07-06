import { Component, inject, signal } from '@angular/core';
import { form, min, required, FormField } from '@angular/forms/signals';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { AuthService, ILoginDetails } from '../../services/auth-service';
import { Router } from '@angular/router';
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
    this.authService.login(this.loginDetails()).subscribe(response => {
      if (response) {
        this.router.navigate(['/airplanes']);
      }
      else {
        this.snackbar.open('Invalid email or password', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

}

