// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// app
import { CreateRoutes } from './create.routes';

@NgModule({
    imports: [
        RouterModule.forChild(CreateRoutes)
    ],
    exports: [RouterModule]
})
export class CreateRoutingModule { }

