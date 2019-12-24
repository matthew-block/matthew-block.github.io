import {Component, OnInit} from '@angular/core';
import { UploadService } from './upload.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // --- layout ---
  toggle = false;
  dev = false;
  file = '';

  constructor(private uploadService: UploadService, private http: HttpClient) {
    uploadService.getFileSubject().subscribe(file => {
      if (file !== 'none') {
        this.file = file;
        this.toggle = true;
      }
    });
  }

  ngOnInit() {
  }

  loadOutput(): void {
   this.http.get('assets/output.xml', {responseType: 'text'})
      .subscribe(data => {
        this.file = data;
        this.toggle = true;
      });
  }

  loadError(): void {
    this.http.get('assets/error.xml', {responseType: 'text'})
      .subscribe(data => {
        this.file = data;
        this.toggle = true;
      });
  }
}
