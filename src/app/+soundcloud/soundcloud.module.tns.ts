import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './soundcloud.common';
//fonts
import {TNSFontIconModule, TNSFontIconService, TNSFontIconPipe, TNSFontIconPurePipe} from 'nativescript-ngx-fonticon';

@NgModule({
    imports: [
        ...SHARED_MODULES,
        TNSFontIconModule.forRoot({
            'fa': 'fonts/font-awesome.css'
          })
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SoundcloudModule { }
