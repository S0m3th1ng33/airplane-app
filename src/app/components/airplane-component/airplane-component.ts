import { booleanAttribute, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AirplaneService, getProperties } from '../../services/airplane-service';
import { TailNumberPipe } from '../../tail-number-pipe';
import { RouterLink } from "@angular/router";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { defer, finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '../dialog/dialog';

@Component({
  selector: 'app-airplane',
  imports: [MatTableModule, TailNumberPipe, RouterLink, MatProgressBarModule, NgClass, AsyncPipe, MatIconModule, MatButtonModule],
  templateUrl: './airplane-component.html',
  styleUrl: './airplane-component.css',
})
export class AirplaneComponent implements OnInit {

  destroyRef = inject(DestroyRef)
  getProperties = getProperties;
  airplaneService = inject(AirplaneService);
  readonly dialog = inject(MatDialog)

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

  ngOnInit() {
    this.airplaneService.getAirplanes().subscribe();
  }

  deleteAirplane(id: string) {
    this.dialog.open(Dialog, {
      disableClose: true,
      autoFocus: true,
    })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((confirm: boolean) => {
        if (confirm) {
          console.log(confirm + "Delete confirmed if id: " + id)
          this.airplaneService.deleteAirplane(id);
        }
        else {
          console.log(confirm + "delete deny")
        }
      })
  }

}
