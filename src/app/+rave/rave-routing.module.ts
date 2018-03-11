// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// app
import { RaveRoutes } from './rave.routes';

@NgModule({
    imports: [
        RouterModule.forChild(RaveRoutes)
    ],
    exports: [RouterModule]
})
export class RaveRoutingModule { }

