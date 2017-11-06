import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
 
 
@Injectable()
export class VideoService {
    // TODO update path to json file
    private _videoUrl = 'assets/API/';
 
    constructor(private _http: HttpClient) { }
 
    getVideos(url:string): Observable<any[]> {
        return this._http.get<any[]>(this._videoUrl+url)
            .do(data => ('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
 
    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}