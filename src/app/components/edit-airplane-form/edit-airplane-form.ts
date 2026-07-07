import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';;
import { FormField, form, min, minLength, required, validate } from '@angular/forms/signals';
import { AirplaneService, IAirplane } from '../../services/airplane-service';
import { MatButtonModule } from "@angular/material/button";
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IAirplaneForm } from '../../app';

@Component({
  selector: 'app-edit-airplane-form',
  imports: [FormField, MatButtonModule, MatError, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './edit-airplane-form.html',
  styleUrl: './edit-airplane-form.css',
})
export class EditAirplaneForm implements OnInit {

  airplaneService = inject(AirplaneService);
  route = inject(ActivatedRoute)
  router = inject(Router);
  private readonly id = String(this.route.snapshot.paramMap.get('id'));

  airplaneDetails = signal<IAirplaneForm>({
    tailNumber: '',
    model: '',
    manufacturer: '',
    capacity: 0,
    maintenance_details:
    {
      maintenanceIntervalFlights: 0,
      status: 'active'
    }
  });

  ngOnInit(): void {
    const airplane = this.airplaneService.getById(this.id).subscribe((airplane) => {
      this.airplaneDetails.set(
        {
          tailNumber: airplane.tailNumber,
          model: airplane.model,
          manufacturer: airplane.manufacturer,
          capacity: airplane.capacity,
          maintenance_details: {
            maintenanceIntervalFlights: airplane.maintenanceIntervalFlights,
            status: airplane.status
          }
        }
      )
    });
  }

  airplaneForm = form(this.airplaneDetails, (path) => {
    minLength(path.tailNumber, 7, { message: 'Must be atleast 7 character' })
    min(path.capacity, 1, { message: 'Value must be greater than 0' })
    min(path.maintenance_details.maintenanceIntervalFlights, 1, { message: 'Value must be greater than 0' })
  });


  submitForm(event: SubmitEvent): void {
    event.preventDefault();
    console.log(this.airplaneDetails());
  }

  editAirplaneClicked() {
    this.airplaneService.editAirplane({
      tailNumber: this.airplaneForm.tailNumber().value(),
      model: this.airplaneForm.model().value(),
      manufacturer: this.airplaneForm.manufacturer().value(),
      capacity: this.airplaneForm.capacity().value(),
      maintenanceIntervalFlights: this.airplaneForm.maintenance_details.maintenanceIntervalFlights().value(),
      status: this.airplaneForm.maintenance_details.status().value()
    }, this.id).subscribe(() => {
      this.router.navigate(['/airplanes'])
    });
  }

}
