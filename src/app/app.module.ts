import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// remote communication
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// highcharts
import { HighchartsChartModule } from 'highcharts-angular';

// bootstrap modules
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GraphsComponent } from './graphs/graphs.component';
import { UploadFormComponent } from './upload-form/upload-form.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from "./home/home.component";
import { UploadComponent } from './upload/upload.component';
import { ResultsComponent } from './results/results.component';
import { HistoricalResultsComponent } from './historical-results/historical-results.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphsComponent,
    UploadFormComponent,
    HomeComponent,
    UploadComponent,
    ResultsComponent,
    HistoricalResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
