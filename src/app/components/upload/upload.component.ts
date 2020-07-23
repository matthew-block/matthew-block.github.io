import { Component, EventEmitter, OnInit, Output } from "@angular/core";

import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { UploadService } from "../../upload.service";
import { Observable } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"],
})
export class UploadComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private spinner: NgxSpinnerService
  ) {}

  //destinationUrl = 'https://sf.nimmo.us/parse';
  destinationUrl = "http://localhost:8080/";
  //   destinationUrl = "http://69.55.55.224:8080/";

  form: FormGroup;
  uploadStatus: Observable<number>;

  @Output() newResponse = new EventEmitter<string>();
  fileNeeded = false;

  ngOnInit() {
    this.form = this.formBuilder.group({
      file: [""],
      url: [""],
      username: [""],
      password: [""],
    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0] > 0) {
      const file = event.target.files[0];
      this.form.get("file").setValue(file);
	}
	

	if(event.target.form){
		this.form.get('url').setValue((event.target.form[0].value));
		this.form.get('username').setValue((event.target.form[1].value));
		this.form.get('password').setValue((event.target.form[2].value));
	}

  }

  onSubmitUpload() {

    if (this.form.get("file").value !== "") {
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
    if (this.form.get("url").value !== null && this.form.get("url").value !== "") {
	  this.spinner.show();

      const response = this.uploadService.uploadLink(
        this.form.get("url").value,
        this.form.get("username").value,
        this.form.get("password").value,
        this.destinationUrl
      );
      console.log(this.form.get("url").value);
      this.uploadStatus = response.status;
      response.file.subscribe((file) => {
        this.newResponse.emit(file);
      });
    }
  }
}
