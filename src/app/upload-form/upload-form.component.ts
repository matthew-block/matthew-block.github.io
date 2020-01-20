import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { FormBuilder, FormGroup, FormsModule } from  '@angular/forms';
import { UploadService } from  '../upload.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }

  destinationUrl = 'http://3.136.231.105:8080/parse';
  // destinationUrl = 'http://localhost:8080/parse';

  form: FormGroup;
  uploadStatus: Observable<number>;

  @Output() newResponse = new EventEmitter<string>();


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
    const response = this.uploadService.upload(this.form.get('file').value, this.destinationUrl);
    this.uploadStatus = response.status;
    response.file.subscribe(file => {
      this.newResponse.emit(file);
    });
  }

}
