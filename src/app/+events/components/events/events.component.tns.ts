import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../../services';
import {Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {SoundCloudService} from '../../../services/soundcloud.service';
import * as dialogs from 'ui/dialogs';

@Component({
  moduleId: module.id,
  selector: 'seed-events',
  templateUrl: 'events.component.html'
})
export class EventsComponent implements OnInit {
  public events$: Observable<any>;
  image: string;
  title: string;
  url: string;
  
  constructor(private _router: Router,
        private activatedRoute: ActivatedRoute,
        private firebase: FirebaseService,
        private soundcloud: SoundCloudService
  ) {}

  ngOnInit(){
    this.events$ = <any>this.firebase.getEvents();
    

    //queryparams
    this.image = this.activatedRoute.snapshot.queryParams['image'];
    this.title = this.activatedRoute.snapshot.queryParams['title'];
    this.url = this.activatedRoute.snapshot.queryParams['url'];
      
  }

  chooseEvent(id:string){
      this.soundcloud.createRave(this.image, this.url, this.title, id)
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

  
}
