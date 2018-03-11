// angular
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
// app
import { SoundcloudRoutes } from './soundcloud.routes';

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(<any>SoundcloudRoutes),
    ],
    exports: [NativeScriptRouterModule]
})
export class SoundcloudRoutingModule { }

