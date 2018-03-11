// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { RaveRoutingModule } from './rave-routing.module';
import { RaveComponent } from './components/rave/rave.component';

export const SHARED_MODULES: any[] = [
    SharedModule,
    RaveRoutingModule,
    TranslateModule.forChild(),
];

export const COMPONENT_DECLARATIONS: any[] = [
    RaveComponent
];
