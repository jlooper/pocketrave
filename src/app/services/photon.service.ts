import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class PhotonService {
    private requestURl: string;
    private accessToken: string;

    constructor(private http: HttpClient) {
        //device id
        this.requestURl = 'https://api.particle.io/v1/devices/3a0031001047353138383138/startRave/';
        //access token
        this.accessToken = '822a6a1265e7948ba1cfd7931eb4f63af04a1bf5';
    }

    public startLightShow(mode: string) {

        let params = 'command=' + mode + '&access_token=' + this.accessToken;

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/x-www-form-urlencoded'
            })
          };
         return this.http.post(this.requestURl, params, httpOptions)
            .subscribe(
                res => {
                  console.log(res);
                },
                err => {
                  console.log("Error occured");
                }
              );
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }


}
