import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// remote communication
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// highcharts
import { HighchartsChartModule } from 'highcharts-angular';

// bootstrap modules
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GraphsComponent } from './graphs/graphs.component';
import { UploadFormComponent } from './upload-form/upload-form.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphsComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    ReactiveFormsModule,
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
