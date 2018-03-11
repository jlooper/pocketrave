// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { RavesRoutingModule } from './raves-routing.module';
import { RavesComponent } from './components/raves/raves.component';

export const SHARED_MODULES: any[] = [
    SharedModule,
    RavesRoutingModule,
    TranslateModule.forChild(),
];

export const COMPONENT_DECLARATIONS: any[] = [
    RavesComponent
];
