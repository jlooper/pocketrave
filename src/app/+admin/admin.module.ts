import { NgModule } from '@angular/core';
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './admin.common';
import {FirebaseUIModule} from 'firebaseui-angular';

@NgModule({
    imports: [
        ...SHARED_MODULES,
        FirebaseUIModule
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS
    ],
})
export class AdminModule { }
