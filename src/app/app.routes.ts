import { Routes } from '@angular/router';
import { AirplaneComponent } from './components/airplane-component/airplane-component';
import { AirplaneDetails } from './components/airplane-details/airplane-details';
import { NewAirplaneForm } from './components/new-airplane-form/new-airplane-form';
import { Login } from './components/login/login';

export const routes: Routes = [
    {
        path: 'airplanes',
        //Eager
        component: AirplaneComponent,
        title: 'Airplanes'
    },
    {
        path: 'airplanes/new',
        loadComponent: () => NewAirplaneForm,
        title: 'New Airplane Form'
    },
    {
        path: 'login',
        loadComponent: () => Login,
        title: 'Login Page'
    },
    {
        path: 'airplanes/:id',
        //Lazy
        loadComponent: () => AirplaneDetails,
        title: 'Airplanes details'
    }
];
