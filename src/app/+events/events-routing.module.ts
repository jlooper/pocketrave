// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// app
import { EventsRoutes } from './events.routes';

@NgModule({
    imports: [
        RouterModule.forChild(EventsRoutes)
    ],
    exports: [RouterModule]
})
export class EventsRoutingModule { }

