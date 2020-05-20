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
import { GraphsComponent } from './components/graphs/graphs.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from "./components/home/home.component";
import { UploadComponent } from './components/upload/upload.component';
import { ResultsComponent } from './components/results/results.component';
import { HistoricalResultsComponent } from './components/historical-results/historical-results.component';

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
