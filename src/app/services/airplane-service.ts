import { HttpClient, HttpEventType } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, share, Subject, tap } from 'rxjs';
import { baseAPIPATH } from '../app';

@Injectable({
  providedIn: 'root',
})
export class AirplaneService {

  private readonly http = inject(HttpClient)

  private airplanesMock = signal<Array<IAirplane>>([
    { id: '1', tailNumber: 'N12345', model: '737-800', manufacturer: 'Boeing', capacity: 189, status: 'active', maintenanceIntervalFlights: 100, flightsSinceLastMaintenance: 45 },
    { id: '2', tailNumber: 'N67890', model: 'A320', manufacturer: 'Airbus', capacity: 180, status: 'active', maintenanceIntervalFlights: 100, flightsSinceLastMaintenance: 92 },
    { id: '3', tailNumber: 'N11111', model: '787-9', manufacturer: 'Boeing', capacity: 296, status: 'maintenance', maintenanceIntervalFlights: 100, flightsSinceLastMaintenance: 100 },
  ]);

  //Ezt nem lehet újra querry-zni
  //readonly airplanes$ = this.http.get<Array<Airplane>>('/api/airplanes').pipe(share())

  private readonly airplanes = this.http.get<Array<IAirplane>>(`${baseAPIPATH}/airplanes`).pipe(share());
  private readonly airPlanesSubject = new Subject<Array<IAirplane>>();
  readonly airplanes$ = this.airPlanesSubject.asObservable();

  getAirplanes() {
    return this.airplanes.pipe(tap(planes => this.airPlanesSubject.next(planes)))
  }


  getById(id: string) {
    return this.http.get<IAirplane>(`${baseAPIPATH}/airplanes/${id}`).pipe(share());
  }

  timeTillNextMaintenance(airplane?: IAirplane): number {
    if (airplane) {
      return airplane.flightsSinceLastMaintenance / airplane.maintenanceIntervalFlights;
    }
    return -1;
  }

  latestAirplaneId = computed(() => {
    return this.airplanesMock()[this.airplanesMock().length - 1].id;
  })

  incrementFlights(id: string) {
    return this.http.post<IAirplane>(`${baseAPIPATH}/airplanes/${id}/increment-flights`, {}).pipe(updatedAirplane => {
      //We could do something with the airplane here if needed
      return updatedAirplane
    });
  }


  addAirplane(input: Partial<IAirplane>) {
    /*
    const airPlane = {
      ...input,
      id: String(Number(this.latestAirplaneId()) + 1)
    }
    This has been fixed in the Form component, now the automatic value is active

    //This should be in the backend logic, but for my own sanity i am doing the handling here
    if (airPlane.status !== 'inactive') {
      airPlane.status = airPlane.flightsSinceLastMaintenance < airPlane.maintenanceIntervalFlights ? 'active' : 'maintenance';
    }
    console.log('Adding airplane', airPlane);
    this.airplanesMock.update((asd) => [...asd, airPlane])
    */
    this.http.post(`${baseAPIPATH}/airplanes`, input, {
      reportProgress: true,
      observe: 'events'
    }).subscribe((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          console.log('Uploaded ' + event.loaded + ' so far')
          break;
        case HttpEventType.Response:
          console.log('Finished')
          break;
      }
    });
  }

  editAirplane(input: Partial<IAirplane>, id: string) {
    this.http.put<IAirplane>(`${baseAPIPATH}/airplanes/${id}`, input, {}).subscribe();
  }

  deleteAirplane(id: string) {
    this.http.delete(`${baseAPIPATH}/airplanes/${id}`).subscribe();
  }

}

export function getProperties(dataSource: Array<any>) {
  if (dataSource.length === 0) {
    return [];
  }
  return Object.keys(dataSource[0]);
}

export interface IAirplane {
  id: string,
  tailNumber: string,
  model: string,
  manufacturer: string,
  capacity: number,
  status: 'active' | 'maintenance' | 'inactive'
  maintenanceIntervalFlights: number,
  flightsSinceLastMaintenance: number
}


