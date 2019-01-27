import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable()
export class UploadFileService {
 
  constructor(private http: HttpClient) { }
 
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
 
    formdata.append('file', file);
 
    const req = new HttpRequest('POST', '/printbox/preupload', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }

  sendPreferences(pref: string, actualPref: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
 
    formdata.append('prefs', pref);
    formdata.append('actualPref', actualPref);
 
    const req = new HttpRequest('POST', '/printbox/postupload', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }
 
}