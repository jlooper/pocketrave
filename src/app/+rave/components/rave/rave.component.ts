import { Component, OnDestroy  } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {DomSanitizer} from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';

@Component({
    moduleId: module.id,
    selector: 'seed-view',
    templateUrl: './rave.component.html',
    styleUrls: ['./rave.component.scss']
})
export class RaveComponent implements OnDestroy {

    itemsRef: AngularFireList<any>;
    item: Observable<any[]>;
  
    id: any;
    url: any;
    image: any;
    private sub: any;

  constructor(db: AngularFireDatabase,
      private activatedRoute: ActivatedRoute, 
      private router: Router,
      private domSanitizer: DomSanitizer
      ) {
          this.sub = this.activatedRoute.params.subscribe((params:any) => {
            this.id = params['id'];
            this.itemsRef = db.list('/Raves/'+this.id);
            this.itemsRef.snapshotChanges(['child_added'])
              .subscribe(actions => {
                actions.forEach(action => {
                  //console.log(action.type, action.key, action.payload.val());
                  if (action.key === 'url'){
                    this.url = this.domSanitizer.bypassSecurityTrustResourceUrl('https://w.soundcloud.com/player/?url='+action.payload.val()+'&amp;color=000000&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false');
                    console.log(this.url)
                  }
                  if (action.key === 'image'){
                    this.image = action.payload.val();
                    console.log(this.image)
                  }
                  
                });
              });         
        });

        
      }

      ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe();
      }

    }