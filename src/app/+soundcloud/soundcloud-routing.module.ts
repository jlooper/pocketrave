// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// app
import { SoundcloudRoutes } from './soundcloud.routes';

@NgModule({
    imports: [
        RouterModule.forChild(SoundcloudRoutes)
    ],
    exports: [RouterModule]
})
export class SoundcloudRoutingModule { }

