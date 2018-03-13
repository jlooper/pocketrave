import {Component} from '@angular/core';
import {SoundCloudModel} from '../../../models/soundcloud.model';
import {SoundCloudService} from '../../../services/soundcloud.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LoadingIndicator} from 'nativescript-loading-indicator';
import * as frame from 'ui/frame';
import * as searchbar from 'ui/search-bar';
import * as appSettings from 'application-settings';
import * as dialogs from 'ui/dialogs';

@Component({
  moduleId: module.id,
  selector: 'sd-soundcloud',
  templateUrl: 'soundcloud.component.html'
})
export class SoundcloudComponent {

  public tracks$: BehaviorSubject<Array<SoundCloudModel>> = new BehaviorSubject([]);
  loader = new LoadingIndicator();
  constructor(
    private _router: Router,
    private soundcloud: SoundCloudService) {
  }

  public goHome(){
      this._router.navigate(['/'])
  }


  public search(e: any) {
    if (e && e.object) {

      this.loader.show({ message: 'Finding tracks...' });
      this.soundcloud.search(e.object.text)
        .subscribe((tracks: Array<SoundCloudModel>) => {
          this.tracks$.next(tracks);
          this.loader.hide();
            if (frame.topmost().android) {
              //let sb = searchbar
              //sb.dismissSoftInput();
            }
        });
    }
  }

  public clear(){
    //tbd
  }

  public selectTrack(item: any) {
    let imageUrl = appSettings.getString('finalUrl');
    //write to firebase
    var options = {
      title: 'Song Selected!',
      message: 'Do you want to complete your PocketRave by adding this song selection?',
      okButtonText: 'Yes',
      cancelButtonText: 'No'
    };
    dialogs.confirm(options).then((result: boolean) => {
      if (result === true){
          //ask if event-based
          var options = {
                title: 'One more thing!',
                message: 'Are you creating this PocketRave as part of an event, such as a conference?',
                okButtonText: 'Yes!',
                cancelButtonText: 'No'
                };
                dialogs.confirm(options).then((result: boolean) => {
                    if (result === true) {
                      let navigationExtras = {
                        queryParams: { 'image': imageUrl, 'url': item.uri, 'title': item.title }
                      }
                      this._router.navigate(['/events'], navigationExtras);
                    }
                    else {
                        //submit and congrats
                        this.soundcloud.createRave(imageUrl, item.uri, item.title, "")
                            .then(() => {
                                var options = {
                                    title: 'Success!',
                                    message: 'You\'ve successfully created a PocketRave. If it\'s approved, you can view it on the web at http://pocketrave.me',
                                    okButtonText: 'Party On!'
                                    };
                                    dialogs.confirm(options).then((result: boolean) => {
                                        this._router.navigate(['/']);
                                    });
                            })
                    }
                });

      }
    });
  }

  public help() {
    var options = {
      title: 'Add a Track',
      message: 'Pair the image you just drew with a song! Click on a song and complete the PocketRave in the window that pops up. \n\n\n View your completed PocketRaves online at http://pocketrave.me',
      cancelButtonText: 'Rock On!'
    };
    dialogs.confirm(options).then((result: boolean) => {
       //just close
    });
  }

  
  
}
