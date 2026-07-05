import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AirplaneService, getProperties } from '../../services/airplane-service';
import { TailNumberPipe } from '../../tail-number-pipe';
import { RouterLink } from "@angular/router";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgClass } from '@angular/common';
import { MatAnchor, MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-airplane',
  imports: [MatTableModule, TailNumberPipe, RouterLink, MatProgressBarModule, NgClass, MatAnchor, MatButtonModule],
  templateUrl: './airplane-component.html',
  styleUrl: './airplane-component.css',
})
export class AirplaneComponent {
  getProperties = getProperties;
  airplaneService = inject(AirplaneService);
  //  displayedColumns: (keyof Airplane)[] = [ 'id', 'tailNumber', 'model', 'manufacturer', 'capacity', 'main']
}
