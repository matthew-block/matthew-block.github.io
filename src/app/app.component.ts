import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // --- layout ---
  toggle = false;
  file = '';

  constructor(private uploadService: UploadService) {    
    uploadService.getUploadedFiles().subscribe(file => {
      this.toggle = true;
      this.file = file;
    });
  }

  ngOnInit() {
  }
}