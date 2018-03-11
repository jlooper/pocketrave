import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'seed-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    events: AngularFireList<any>;
    events$: Observable<any[]>;
    
    constructor(private db: AngularFireDatabase, private router: Router) {
    }

    ngOnInit(){
        this.events = this.db.list('/Events');
        this.events$ = this.events.snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
    }
    
    selectEvent(event){
        this.router.navigate(['/raves', event.target.value])
    }
    

}
