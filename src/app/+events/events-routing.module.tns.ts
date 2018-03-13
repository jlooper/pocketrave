// angular
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
// app
import { EventsRoutes } from './events.routes';

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(<any>EventsRoutes),
    ],
    exports: [NativeScriptRouterModule]
})
export class EventsRoutingModule { }

