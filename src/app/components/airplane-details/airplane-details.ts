import { map } from 'rxjs/internal/operators/map';
import { Component, inject, OnInit } from '@angular/core';
import { IAirplane, AirplaneService, getProperties } from '../../services/airplane-service';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgClass } from '@angular/common';
import { TailNumberPipe } from "../../tail-number-pipe";
import { ProgressBar } from "../progress-bar/progress-bar";
import { Subject } from 'rxjs/internal/Subject';
import { tap } from 'rxjs/internal/operators/tap';




@Component({
  selector: 'app-airplane-details',
  imports: [MatCardModule, MatButtonModule, NgClass, TailNumberPipe, ProgressBar, AsyncPipe],
  templateUrl: './airplane-details.html',
  styleUrl: './airplane-details.css',

})
export class AirplaneDetails implements OnInit {
  getProperties = getProperties;
  route = inject(ActivatedRoute)
  airplaneService = inject(AirplaneService);
  cardTCSS = "mx-auto flex rounded-xl max-w-md my-10"

  private airplane = new Subject<IAirplane>();
  readonly airplane$ = this.airplane.asObservable();
  private readonly id = String(this.route.snapshot.paramMap.get('id'));
  progress = this.airplane$.pipe(
    map(airplane =>
      this.airplaneService.timeTillNextMaintenance(airplane)))

  ngOnInit() {
    this.airplaneService.getById(this.id).pipe(tap(airplane => this.airplane.next(airplane))).subscribe();
  }

  IncreaseFlights() {
    this.airplaneService.incrementFlights(this.id).pipe(tap(airplane => this.airplane.next(airplane))).subscribe();
  }
}
