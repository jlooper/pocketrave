import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'seed-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    
    showAdmin = false; 
    uid = '';
    items$: Observable<any[]>;
    admin$: Observable<any[]>;
    dbRef: AngularFireList<any>;
        
    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { 
        
        
        this.afAuth.authState.subscribe(
          (d) => (
            this.uid = d.uid
          )) 

        
  
    }
    
    ngOnInit(): void {
        this.items$ = this.db.list('/Raves', ref => ref.orderByChild('approved').equalTo(false)).snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
        this.admin$ = this.db.list('/Users', ref => ref.orderByChild('uid').equalTo(this.uid)).snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });           
    }
    approve(key: string, item) {
        console.log(item)
        this.dbRef = this.db.list('/Raves')
        this.dbRef.update(item.key,{approved : true});
    }

}
