import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as frame from 'ui/frame';
import { FirebaseService } from "../../../services";
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import * as dialogs from 'ui/dialogs';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'seed-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public raves$: Observable<any>;

    
    constructor(
        private firebaseService: FirebaseService,
        private fonticon: TNSFontIconService,
        private _router: Router
    ) {}

    ngOnInit() {
    this.raves$ = <any>this.firebaseService.getRaves();
      if (frame.topmost().ios) {
          frame.topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);
        }
    }

  public create() {
    this._router.navigate(['/create']);
  }

  public help() {
    var options = {
      title: 'How to PocketRave',
      message: 'Create a PocketRave by drawing an image on the drawing pad with your choice of color and pen width. \n\n\n Save your drawing, then choose a song track from Soundcloud on the next screen by searching for a track by name or keyword. \n\n\n  Click a track\'s name to select it for your PocketRave. \n\n\n If you are attending a conference, select the appropriate event on the next screen to view grouped PocketRaves. \n\n\n Your PocketRave will be reviewed, and if it is approved, you can view your completed PocketRaves online at http://pocketrave.me',
      cancelButtonText: 'Rock On!'
    };
    dialogs.confirm(options).then((result: boolean) => {
      if (result === true) {
       this._router.navigate(['/']);
      }
    });
  }

}
