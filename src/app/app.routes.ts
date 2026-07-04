import { Routes } from '@angular/router';
import { AirplaneComponent } from './components/airplane-component/airplane-component';
import { AirplaneDetails } from './components/airplane-details/airplane-details';

export const routes: Routes = [
    {
        path: 'airplanes',
        //Eager
        component: AirplaneComponent,
        title: 'Airplanes'
    },
    {
        path: 'airplanes/:id',
        //Lazy
        loadComponent: () => AirplaneDetails,
        title: 'Airplanes details'
    }
];
