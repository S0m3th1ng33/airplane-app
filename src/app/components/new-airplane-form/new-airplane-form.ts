import { Component, inject, signal } from '@angular/core';;
import { FormField, form, min, minLength, required, validate } from '@angular/forms/signals';
import { AirplaneService } from '../../services/airplane-service';
import { MatButtonModule } from "@angular/material/button";
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'new-airplane-form',
  imports: [FormField, MatButtonModule, MatError],
  templateUrl: './new-airplane-form.html',
  styleUrl: './new-airplane-form.css',
})
export class NewAirplaneForm {

  airplaneService = inject(AirplaneService);

  airplaneDetails = signal<IAirplaneForm>({
    tailNumber: '',
    model: '',
    manufacturer: '',
    capacity: 0,
    maintenance_details:
    {
      maintenanceIntervalFlights: 0,
      flightsSinceLastMaintenance: 0
    }
  });

  airplaneForm = form(this.airplaneDetails, (path) => {
    required(path.tailNumber, { message: 'Tailnumber is required' });
    minLength(path.tailNumber, 7, { message: 'Must be atleast 7 character' })
    required(path.model, { message: 'Model is required' });
    required(path.manufacturer, { message: 'Manufacturer is required' });
    required(path.capacity, { message: 'Capacity is required' });
    min(path.capacity, 1, {message: 'Value must be greater than 0'})
    required(path.maintenance_details.maintenanceIntervalFlights, { message: 'This field is required' });
    min(path.maintenance_details.maintenanceIntervalFlights, 1, {message: 'Value must be greater than 0'})
    required(path.maintenance_details.flightsSinceLastMaintenance, {message: 'This field is required'})
    min(path.maintenance_details.flightsSinceLastMaintenance, 0, {message: 'Value cannot be negative'})
  });


  submitForm(event: SubmitEvent): void {
    event.preventDefault();
    console.log(this.airplaneDetails());
  }



  addAirplaneClicked() {
    this.airplaneService.addAirplane({
      id: '1',
      tailNumber: this.airplaneForm.tailNumber().value(),
      model: this.airplaneForm.model().value(),
      manufacturer: this.airplaneForm.manufacturer().value(),
      capacity: this.airplaneForm.capacity().value(),
      maintenanceIntervalFlights: this.airplaneForm.maintenance_details.maintenanceIntervalFlights().value(),
      flightsSinceLastMaintenance: this.airplaneForm.maintenance_details.flightsSinceLastMaintenance().value(),
      status: 'active'
    });
  }

}

interface IAirplaneForm {
  tailNumber: string;
  model: string;
  manufacturer: string;
  capacity: number;
  maintenance_details: {
    maintenanceIntervalFlights: number;
    flightsSinceLastMaintenance: number;
  }
}
