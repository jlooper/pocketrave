// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// app
import { LightshowRoutes } from './lightshow.routes';

@NgModule({
    imports: [
        RouterModule.forChild(LightshowRoutes)
    ],
    exports: [RouterModule]
})
export class LightshowRoutingModule { }

