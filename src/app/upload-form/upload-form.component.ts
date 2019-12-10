import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from  '@angular/forms';
import { UploadService } from  '../upload.service';


@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }

  destinationUrl: string = 'http://18.220.134.135/returnTestResults';
  // TODO MB fix cors on backend
  proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  form: FormGroup;
  error: { status: string, message };
  uploadResponse: { status: string, message };

  ngOnInit() {
    this.form = this.formBuilder.group({
      file: ['']
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('file').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('file').value);

    this.uploadService.upload(formData, this.proxyUrl + this.destinationUrl).subscribe(
      (res) => {
        if (res.status === 'progress') {
          this.uploadResponse = res;
        }
       },
      (err) => {
        this.error = err;
      }
    );
  }

}
