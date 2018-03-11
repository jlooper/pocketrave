import { Component } from '@angular/core';
import {PhotonService} from '../../../services/photon.service';

@Component({
    moduleId: module.id,
    selector: 'seed-lightshow',
    templateUrl: './lightshow.component.html',
    styleUrls: ['./lightshow.component.scss']
})
export class LightshowComponent {

    constructor(private photonservice: PhotonService) {
    }
    public startLightShow(mode: string) {
      this.photonservice.startLightShow(mode);
    }

}
