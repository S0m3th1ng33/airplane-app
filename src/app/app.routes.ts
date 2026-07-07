import { Routes } from '@angular/router';
import { AirplaneComponent } from './components/airplane-component/airplane-component';
import { AirplaneDetails } from './components/airplane-details/airplane-details';
import { NewAirplaneForm } from './components/new-airplane-form/new-airplane-form';
import { Login } from './components/login/login';
import { authGuard } from './auth-guard';
import { EditAirplaneForm } from './components/edit-airplane-form/edit-airplane-form';

export const routes: Routes = [
    {
        path: 'airplanes',
        //Eager
        component: AirplaneComponent,
        title: 'Airplanes',
        canActivate: [authGuard]
    },
    {
        path: 'airplanes/edit/:id',
        loadComponent: () => EditAirplaneForm,
        title: 'New Airplane Form',
        canActivate: [authGuard]
    },
    {
        path: 'airplanes/new',
        loadComponent: () => NewAirplaneForm,
        title: 'New Airplane Form',
        canActivate: [authGuard]
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
        title: 'Airplanes details',
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
