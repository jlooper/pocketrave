import {Injectable, Inject, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import {RaveModel} from '../models';
import firebase = require("nativescript-plugin-firebase");
import { LoadingIndicator } from 'nativescript-loading-indicator';
import * as fs from 'file-system';

declare var zonedCallback: Function;

@Injectable()
export class FirebaseService {
  
  loader = new LoadingIndicator();
  raves: BehaviorSubject<Array<RaveModel>> = new BehaviorSubject([]); 
  public _allRaves: Array<RaveModel> = [];
  private _database: any;
  events: BehaviorSubject<Array<RaveModel>> = new BehaviorSubject([]); 
  public _allEvents: Array<RaveModel> = [];
  

  constructor(
    private ngZone: NgZone,
    ) {}

  public getFilename(path: string) {
    let parts = path.split('/');
    return parts[parts.length - 1];
  }
  
  public uploadFile(localPath: string, file?: any): Promise<any>{
    let filename = this.getFilename(localPath);
    let remotePath = `${filename}`;
    return firebase.uploadFile({
      remoteFullPath: remotePath,
      localFullPath: localPath,
      onProgress: function(status) {
        //this.loader.show({ message: "Percentage complete: " + status.percentageCompleted });
      }
    });
  }

  public getDownloadUrl(remoteFilePath: string): Promise<any> {
    return firebase.getDownloadUrl({
      remoteFullPath: remoteFilePath
    })
      .then(
      function (url: string) {
        return url;
      },
      function (errorMessage: any) {
        return errorMessage;
      });
  }

  public createRave(finalUrl: string, url: string, title: string, event: string): Promise<any> {

   return firebase.push(
      '/Raves',
      {
        'image': finalUrl,
        'url': url,
        'title': title,
        'date': 0 - Date.now(),
        'event': event,
        'approved': false
      }
    );
  }  

  getRaves(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'Raves';
      
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot(snapshot.value);
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();              
  }
  
  public getEvents(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'Events';
      let listener: any;
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleEventSnapshot(snapshot.value, path);
            observer.next(results);
            console.log(JSON.stringify(results))
          });
        };

        firebase.addValueEventListener(onValueEvent, `/${path}`).then(() => {
          console.log(`firebase listener setup.`);
        });

      return () => {
        console.log('unsubscribe events');
            
      };
    }).share();
  }

  

  private handleSnapshot(data: any, path?: string) {
    //empty array, then refill
    
    this._allRaves = [];
    if (data) {
      for (let id in data) {
         let result = (<any>Object).assign({id: id}, data[id]);
            if (result.approved){
              this._allRaves.push(result)
            }
      }
      this.publishUpdates();
    }
    return this._allRaves;
  }

private handleEventSnapshot(data: any, path?: string) {
    //empty array, then refill
    this._allEvents = [];
    if (path)
      if (data) {
        for (let id in data) {
          let result = (<any>Object).assign({id: id}, data[id]);
            this._allEvents.push(result);
        }
        this.publishEventUpdates();
      }
    return this._allEvents;
  }

private publishEventUpdates() {
    this.events.next([...this._allEvents]);
  }
  

  private publishUpdates() {

    this._allRaves.sort(function(a, b){
        if(a.date < b.date) return -1;
        if(a.date > b.date) return 1;
      return 0;
    })
    this.raves.next([...this._allRaves]);
  }

  

}
