import {Injectable} from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

/**
 * referenced
 * https://www.techiediaries.com/angular-file-upload-progress-bar/
 * https://stackoverflow.com/questions/51789871/download-file-from-http-post-request-angular-6
 */

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  constructor(private http: HttpClient) {}

  public uploadFile(file: File, url): {status: Observable<number>, file: Observable<any>} {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

	// create a http-post request and pass the form
	url = url + 'upload'
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    // create a new progress-subject for every file
    const progress = new Subject<number>();
    const response = new Subject<any>();

    // send the http-request and subscribe for progress-updates
    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {

        // calculate the progress percentage
        const percentDone = Math.round(100 * event.loaded / event.total);

        // pass the percentage into the progress-stream
        progress.next(percentDone);
      } else if (event instanceof HttpResponse) {

        // Close the progress-stream if we get an answer form the API
        progress.complete();
        response.next(event.body);
        response.complete();
      }
    }, (error) => {
      progress.complete();
      response.next('<?xml version=\"1.0\"?><error>The server responded with an error.</error>');
      response.complete();
      });

    // return the map of progress.observables
    return {status: progress.asObservable(), file: response.asObservable()};
  }

  public uploadLink(link: string, username: string, password: string, url): {status: Observable<number>, file: Observable<any>} {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append('url', link);
    formData.append('username', username);
    formData.append('password', password);

	// create a http-post request and pass the form
	url = url + "link"
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    // create a new progress-subject for every file
	const response = new Subject<any>();
	const progress = new Subject<number>();

    // send the http-request and subscribe for progress-updates
    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {

        // calculate the progress percentage
      } else if (event instanceof HttpResponse) {

        // Close the progress-stream if we get an answer form the API
        response.next(event.body);
        response.complete();
      }
    }, (error) => {
      response.next('<?xml version=\"1.0\"?><error>The server responded with an error.</error>');
      response.complete();
      });

    // return the map of progress.observables
    return {status: progress.asObservable(), file: response.asObservable()};
  }



}
