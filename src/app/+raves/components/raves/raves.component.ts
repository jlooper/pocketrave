import { Component, Inject } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'seed-raves',
    templateUrl: './raves.component.html',
    styleUrls: ['./raves.component.scss']
})
export class RavesComponent {

  items$: Observable<any[]>;
  
  id: string;
  private sub: any;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(db: AngularFireDatabase,
        private activatedRoute: ActivatedRoute, 
        private router: Router) {
            this.isLoading$.next(true);
            this.sub = this.activatedRoute.params.subscribe((params:any) => {
                this.id = params['id'];
                console.log(this.id);
            })

            this.items$ = db.list('/Raves', ref => ref.orderByChild('date')).snapshotChanges().map(changes => {
              return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            });
            
            
    this.isLoading$.next(false);
    
  }

  filter(id: string, approved: boolean) : boolean{
     if ((this.id == id || this.id == "all") && approved){
       return false;
     }
     return true;
  }
  
}
