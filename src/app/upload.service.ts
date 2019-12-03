import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';

/**
 * referenced 
 * https://www.techiediaries.com/angular-file-upload-progress-bar/
 * https://stackoverflow.com/questions/51789871/download-file-from-http-post-request-angular-6
 */

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  constructor(private http: HttpClient) { }

  public upload(body, url: string) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post(url, body, {
      responseType: 'text',
      headers,
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress: {
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: `${progress}` };
        }
        case HttpEventType.Response: {
          return {status: 'result', message: event.body };
        }
        default: {
          return { status: 'error', message: `${event.type}` };
        }
      }
    })
    );
  }
}
