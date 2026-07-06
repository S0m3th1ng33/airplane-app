import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AirplaneService, getProperties } from '../../services/airplane-service';
import { TailNumberPipe } from '../../tail-number-pipe';
import { RouterLink } from "@angular/router";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { defer, finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-airplane',
  imports: [MatTableModule, TailNumberPipe, RouterLink, MatProgressBarModule, NgClass, MatButtonModule, AsyncPipe],
  templateUrl: './airplane-component.html',
  styleUrl: './airplane-component.css',
})
export class AirplaneComponent implements OnInit {

  destroyRef = inject(DestroyRef)
  getProperties = getProperties;
  airplaneService = inject(AirplaneService);
  //  displayedColumns: (keyof Airplane)[] = [ 'id', 'tailNumber', 'model', 'manufacturer', 'capacity', 'main']
  private isLoading = signal<boolean>(false);
  airplanes$ = defer(() => {
    console.log("We are loading")
    this.isLoading.set(true)
    return this.airplaneService.airplanes$.pipe(
      tap(() => {
        console.log("Loading done")
        this.isLoading.set(false)
      }),
      finalize(() => {
        console.log("Unsubbing")
        this.isLoading.set(false)
      }),
      takeUntilDestroyed(this.destroyRef)
    )
  })

  ngOnInit()
  {
    this.airplaneService.getAirplanes().subscribe();
  }

}
