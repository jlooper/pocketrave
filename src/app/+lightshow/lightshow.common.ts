// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { LightshowRoutingModule } from './lightshow-routing.module';
import { LightshowComponent } from './components/lightshow/lightshow.component';

export const SHARED_MODULES: any[] = [
    SharedModule,
    LightshowRoutingModule,
    TranslateModule.forChild(),
];

export const COMPONENT_DECLARATIONS: any[] = [
    LightshowComponent
];
