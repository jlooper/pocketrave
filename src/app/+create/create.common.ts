// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './components/create/create.component';

export const SHARED_MODULES: any[] = [
    SharedModule,
    CreateRoutingModule,
    TranslateModule.forChild(),
];

export const COMPONENT_DECLARATIONS: any[] = [
    CreateComponent
];
