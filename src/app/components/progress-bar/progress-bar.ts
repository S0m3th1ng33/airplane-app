import { NgClass } from '@angular/common';
import { Component, computed, input, OnInit } from '@angular/core';
import { MatAnchor } from "@angular/material/button";


@Component({
  selector: 'app-progress-bar',
  imports: [NgClass, MatAnchor],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css',
})
export class ProgressBar {
  AddFlight() {

  }
  value = input<number>(0)
  maintenanceIntervalFlights = input<number>(0);
  flightsSinceLastMaintenance = input<number>(0);
  status = input<string>("");

  constructor() {

  }

  progress(): number {
    return Math.min(this.flightsSinceLastMaintenance() / this.maintenanceIntervalFlights()) * 100
  }

  ProgressColor(): string {
    const value = this.flightsSinceLastMaintenance() / this.maintenanceIntervalFlights();
    if (value >= 1) {
      return "bg-red-600"
    }
    else if (value >= 0.75) {
      return "bg-orange-500"
    }
    else if (value >= 0.5) {
      return "bg-yellow-400"
    }
    return "bg-green-400";
  }
}


