import {Component, OnInit} from '@angular/core';
import { UploadService } from './upload.service';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // --- layout ---
	ngOnInit(){}
}
