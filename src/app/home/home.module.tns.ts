import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';
// app
import { HomeComponent } from './components/home/home.component';
import { SHARED_MODULES } from './home.common';
//fonts
import {TNSFontIconModule, TNSFontIconService, TNSFontIconPipe, TNSFontIconPurePipe} from 'nativescript-ngx-fonticon';

@NgModule({
    imports: [
        ...SHARED_MODULES,
        TNSFontIconModule.forRoot({
            'fa': 'fonts/font-awesome.css'
          })
    ],
    declarations: [HomeComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule {

    constructor( @Optional() @SkipSelf() parentModule: HomeModule) {
        if (parentModule) {
            throw new Error('HomeModule already loaded; Import in root module only.');
        }
    }
}