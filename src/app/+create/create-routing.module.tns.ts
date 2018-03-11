// angular
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
// app
import { CreateRoutes } from './create.routes';

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(<any>CreateRoutes),
    ],
    exports: [NativeScriptRouterModule]
})
export class CreateRoutingModule { }

