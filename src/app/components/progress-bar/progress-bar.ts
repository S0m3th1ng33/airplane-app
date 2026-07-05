import { NgClass } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { MatAnchor } from "@angular/material/button";



@Component({
  selector: 'app-progress-bar',
  imports: [NgClass, MatAnchor],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css',
})
export class ProgressBar {

  maintenanceIntervalFlights = input<number>(0);
  flightsSinceLastMaintenance = input<number>(0);
  status = input<string>("");
  addFlight = output();
  progbarCheck = computed(() => {
    return this.conditionSignal() == "dangerCondition"
  });
  visibleHeli = computed<boolean>(() => {
    return this.flightsSinceLastMaintenance() >= 100;
  })

  conditionSignal = computed(() => {
    const ratio = this.flightsSinceLastMaintenance() / this.maintenanceIntervalFlights();
   
    if (ratio >= 1) {
      return "dangerCondition";
    }
    else if (ratio >= 0.75) {
      return "badCondition";
    }
    else if (ratio >= 0.5) {
      return "okCondition";
    }
    return "goodCondition";
  });

  progress(): number {
    const ratio = this.flightsSinceLastMaintenance() / this.maintenanceIntervalFlights();
    return ratio * 100
  }

  AddFlight(): void {
    this.addFlight.emit()
  }
}


