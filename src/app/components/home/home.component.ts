import {Component, OnInit} from '@angular/core';
import { UploadService } from '../../upload.service';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // --- layout ---
  toggle = false;
  dev = false;
  file = '';

  constructor(private uploadService: UploadService, private http: HttpClient, private spinner: NgxSpinnerService) {
  }

  newResponse(response: string) {
    this.file = response;
    this.toggle = true;
    this.spinner.hide();
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

  download() {
    const blob = new Blob([this.file], {type : 'text/xml'});
    saveAs(blob, 'test.xml');
  }
}
