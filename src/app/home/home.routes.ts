import { Routes } from '@angular/router';
// app
import { HomeComponent } from './components/home/home.component';

export const HomeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        loadChildren: 'app/+about/about.module#AboutModule'
    },
    {
        path: 'raves/:id',
        loadChildren: 'app/+raves/raves.module#RavesModule'
    },
    {
        path: 'rave/:id',
        loadChildren: 'app/+rave/rave.module#RaveModule'
    },
    {
        path: 'lightshow',
        loadChildren: 'app/+lightshow/lightshow.module#LightshowModule'
    },
];
