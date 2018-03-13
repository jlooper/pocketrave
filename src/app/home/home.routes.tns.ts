import { Routes } from '@angular/router';
// app
import { HomeComponent } from './components/home/home.component';

export const HomeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'create',
        loadChildren: './app/+create/create.module#CreateModule'
    },
    {
        path: 'soundcloud',
        loadChildren: './app/+soundcloud/soundcloud.module#SoundcloudModule'
    },
    {
        path: 'events',
        loadChildren: './app/+events/events.module#EventsModule'
    }
];
