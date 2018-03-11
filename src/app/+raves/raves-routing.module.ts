// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// app
import { RavesRoutes } from './raves.routes';

@NgModule({
    imports: [
        RouterModule.forChild(RavesRoutes)
    ],
    exports: [RouterModule]
})
export class RavesRoutingModule { }

