// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// app
import { AdminRoutes } from './admin.routes';

@NgModule({
    imports: [
        RouterModule.forChild(AdminRoutes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }

