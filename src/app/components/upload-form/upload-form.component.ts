import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { FormBuilder, FormGroup, FormsModule } from  '@angular/forms';
import { UploadService } from '../../upload.service';
import {Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService, private spinner: NgxSpinnerService) { }

  destinationUrl = 'https://sf.nimmo.us/parse';
  // destinationUrl = 'http://localhost:8080/parse';

  form: FormGroup;
  uploadStatus: Observable<number>;

  @Output() newResponse = new EventEmitter<string>();
  fileNeeded = false;

  ngOnInit() {
    this.form = this.formBuilder.group({file: ['']});
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('file').setValue(file);
    }
  }

  onSubmit() {
    if (this.form.get('file').value !== '') {
      this.spinner.show();
      const response = this.uploadService.upload(this.form.get('file').value, this.destinationUrl);
      this.uploadStatus = response.status;
      response.file.subscribe(file => {
        this.newResponse.emit(file);
      });
    } else {
      this.fileNeeded = true;
    }
  }

}
