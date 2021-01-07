import { Component, EventEmitter, OnInit, Output } from "@angular/core";

import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { UploadService } from "../../upload.service";
import { Observable } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { ThrowStmt } from "@angular/compiler";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"],
})
export class UploadComponent implements OnInit {
  @Output() newResponse = new EventEmitter<string>();
  fileNeeded = false;

  dev: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private spinner: NgxSpinnerService
  ) {
    if (environment.production) {
      this.dev = true;
    } else {
      this.dev = false;
    }
  }

  //   destinationUrl = "http://localhost:8080/";
  //   destinationUrl = "http://18.219.29.236:8080/";
  destinationUrl = "https://api.stoutcodeanalyzer.com/";

  form: FormGroup;
  uploadStatus: Observable<number>;

  ngOnInit() {
    this.form = this.formBuilder.group({
      file: [""],
      url: [""],
      username: [""],
      password: [""],
    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0] !== undefined) {
      const file = event.target.files[0];
      this.form.get("file").setValue(file);
    }

    if (event.target.form !== undefined) {
      this.form.get("url").setValue(event.target.form[0].value);

      this.form.get("username").setValue(event.target.form[1].value);

      this.form.get("password").setValue(event.target.form[2].value);
    } 

  }
 
  onSubmitUpload() {
    if (this.form.get("file").value !== undefined) {
      this.spinner.show();
      const response = this.uploadService.uploadFile(
        this.form.get("file").value,
        this.destinationUrl
      );
      this.uploadStatus = response.status;
      response.file.subscribe((file) => {
        this.newResponse.emit(file);
      });
    } else {
      this.fileNeeded = true;
    }
  }

  onSubmitLink() {
	let sendUrl = this.destinationUrl;
	console.log(sendUrl)
    if (
      this.form.get("url").value !== null &&
      this.form.get("url").value !== ""
    ) {
      this.spinner.show();

      const response = this.uploadService.uploadLink(
        this.form.get("url").value,
        this.form.get("username").value,
        this.form.get("password").value,
        sendUrl
      );
      this.uploadStatus = response.status;
      response.file.subscribe((file) => {
        this.newResponse.emit(file);
      });
    }
  }
}
