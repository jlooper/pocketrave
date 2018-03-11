// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { SoundcloudRoutingModule } from './soundcloud-routing.module';
import { SoundcloudComponent } from './components/soundcloud/soundcloud.component';

export const SHARED_MODULES: any[] = [
    SharedModule,
    SoundcloudRoutingModule,
    TranslateModule.forChild(),
];

export const COMPONENT_DECLARATIONS: any[] = [
    SoundcloudComponent
];
