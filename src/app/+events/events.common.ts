// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './components/events/events.component';

export const SHARED_MODULES: any[] = [
    SharedModule,
    EventsRoutingModule,
    TranslateModule.forChild(),
];

export const COMPONENT_DECLARATIONS: any[] = [
    EventsComponent
];
