import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { AuthService } from './services/auth-service';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatMenu, MatButton, MatMenuItem, MatMenuTrigger, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  protected readonly title = signal('airplane-app');
  authService = inject(AuthService)


}

export const baseAPIPATH = 'http://localhost:3000/api'

export interface IAirplaneForm {
  tailNumber: string;
  model: string;
  manufacturer: string;
  capacity: number;
  maintenance_details: {
    maintenanceIntervalFlights: number;
    status: 'active' | 'maintenance' | 'inactive';
  }
}