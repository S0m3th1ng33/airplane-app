import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AirplaneService {

  private airplanes: Array<Airplane> = [
    { id: '1', tailNumber: 'N12345', model: '737-800', manufacturer: 'Boeing', capacity: 189, status: 'active', maintenanceIntervalFlights: 100, flightsSinceLastMaintenance: 45 },
    { id: '2', tailNumber: 'N67890', model: 'A320', manufacturer: 'Airbus', capacity: 180, status: 'active', maintenanceIntervalFlights: 100, flightsSinceLastMaintenance: 92 },
    { id: '3', tailNumber: 'N11111', model: '787-9', manufacturer: 'Boeing', capacity: 296, status: 'maintenance', maintenanceIntervalFlights: 100, flightsSinceLastMaintenance: 100 },
  ];

  constructor() {

  }

  getAirplanes() {
    return this.airplanes;
  }

  getById(id: string) {
    return this.airplanes.find(airplanes => airplanes.id === id);
  }

  timeTillNextMaintenance(airplane?: Airplane): number {
    if (airplane)
    {
      return airplane.flightsSinceLastMaintenance / airplane.maintenanceIntervalFlights;
    }
    return -1;
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
  status: string,
  maintenanceIntervalFlights: number,
  flightsSinceLastMaintenance: number
}


