import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AirplaneService {

  private airplanes = signal<Array<Airplane>>([
    { id: '1', tailNumber: 'N12345', model: '737-800', manufacturer: 'Boeing', capacity: 189, status: 'active', maintenanceIntervalFlights: 100, flightsSinceLastMaintenance: 45 },
    { id: '2', tailNumber: 'N67890', model: 'A320', manufacturer: 'Airbus', capacity: 180, status: 'active', maintenanceIntervalFlights: 100, flightsSinceLastMaintenance: 92 },
    { id: '3', tailNumber: 'N11111', model: '787-9', manufacturer: 'Boeing', capacity: 296, status: 'maintenance', maintenanceIntervalFlights: 100, flightsSinceLastMaintenance: 100 },
  ]);

  getAirplanes() {
    return this.airplanes();
  }

  getById(id: string) {
    return this.airplanes().find(airplanes => airplanes.id === id);
  }

  timeTillNextMaintenance(airplane?: Airplane): number {
    if (airplane) {
      return airplane.flightsSinceLastMaintenance / airplane.maintenanceIntervalFlights;
    }
    return -1;
  }

  latestAirplaneId = computed(() => {
    return this.airplanes()[this.airplanes().length - 1].id;
  })


  addAirplane(input: Airplane) {
    const airPlane = {
      ...input,
      id: String(Number(this.latestAirplaneId()) + 1)
    }
    /*
    This has been fixed in the Form component, now the automatic value is active

    //This should be in the backend logic, but for my own sanity i am doing the handling here
    if (airPlane.status !== 'inactive') {
      airPlane.status = airPlane.flightsSinceLastMaintenance < airPlane.maintenanceIntervalFlights ? 'active' : 'maintenance';
    }
      */
    console.log('Adding airplane', airPlane);
    this.airplanes.update((asd) => [...asd, airPlane])
  }
}

export function getProperties(dataSource: Array<any>) {
  if (dataSource.length === 0) {
    return [];
  }
  return Object.keys(dataSource[0]);
}

export interface Airplane {
  id: string,
  tailNumber: string,
  model: string,
  manufacturer: string,
  capacity: number,
  status: 'active' | 'maintenance' | 'inactive'
  maintenanceIntervalFlights: number,
  flightsSinceLastMaintenance: number
}


