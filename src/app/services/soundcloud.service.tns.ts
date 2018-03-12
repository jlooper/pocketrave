import {Injectable} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {FirebaseService} from '../services/firebase.service';
import {SoundCloudModel} from '../models/soundcloud.model';


@Injectable()
export class SoundCloudService {
  private requestURL: string;

  constructor(
    private firebase: FirebaseService,
    private http: HttpClient) {
      this.requestURL = `http://api.soundcloud.com/tracks?client_id=2c9246f94f06d25e2e728935dfd79f8f&q=[q]`;
    }

  public search(q: string): Observable<any> {
    let soundcloudUrl = this.requestURL.replace('[q]', encodeURI(q));
    return this.http.get(soundcloudUrl)
      .map(
          res => {
            let tracks = res;
            return tracks || [];
            },
            err => {
              alert("Sorry, there was a problem fetching tracks. Please try again!");
            }
          );
	}

  public createRave(finalUrl:string, url: string, title: string, event: string) {
   return this.firebase.createRave(finalUrl,url,title,event);
  }

  private handleError(error: Response) {
      return Observable.throw(error);
  }


}
