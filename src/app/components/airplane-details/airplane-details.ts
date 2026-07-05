import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Airplane, AirplaneService, getProperties } from '../../services/airplane-service';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';
import { TailNumberPipe } from "../../tail-number-pipe";
import { ProgressBar } from "../progress-bar/progress-bar";



@Component({
  selector: 'app-airplane-details',
  imports: [MatCardModule, MatButtonModule, NgClass, TailNumberPipe, ProgressBar],
  templateUrl: './airplane-details.html',
  styleUrl: './airplane-details.css',

})
export class AirplaneDetails implements OnInit {
  getProperties = getProperties;
  route = inject(ActivatedRoute)
  airplaneService = inject(AirplaneService);

  cardTCSS = "mx-auto flex rounded-xl max-w-md my-10"

  progress = computed(() => this.airplaneService.timeTillNextMaintenance(this.airplane()) * 100)

  airplane = signal<Airplane | undefined>(undefined);

  ngOnInit() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.airplane.set(this.airplaneService.getById(id));
  }

  IncreaseFlights() {
    this.airplane?.update((value) => { 
      value!.flightsSinceLastMaintenance++
      console.log(value!.flightsSinceLastMaintenance)
      if (value!.flightsSinceLastMaintenance >= 100)
      {
        value!.status = "maintenance";
        console.log(value!.status);
      }
      return value;
     });
  }
}
