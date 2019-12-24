import {Component, Input, OnInit} from '@angular/core';


import {HttpClient} from '@angular/common/http';
import {parseString} from 'xml2js';

import * as Highcharts from 'highcharts';
import {NgxSpinnerService} from 'ngx-spinner';
import HC_more from 'highcharts/highcharts-more';

HC_more(Highcharts);

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  @Input()
  file: string;
  private data;
  private toggle = false;
  errorMessage: string = null;

  constructor(private spinner: NgxSpinnerService) {
  }

  // --- chart data ---
  c1: typeof Highcharts;
  c1o: Highcharts.Options;
  c1NotFound: string[];

  c2: typeof Highcharts;
  c2o: Highcharts.Options;

  c3: typeof Highcharts;
  c3o: Highcharts.Options;

  ngOnInit() {
    this.toggle = false;
    this.spinner.show();

    parseString(this.file, {explicitArray: false}, (error, result) => {
      this.data = result;

      const c1Data = [];
      this.c1NotFound = [];
      if (this.data.error) {
        this.errorMessage = this.data.error;
      } else {
        this.data.source.summaries.summary.forEach((summary) => {
          if (+summary.total !== 0) {
            c1Data.push({name: summary.description, y: +summary.total});
          } else {
            this.c1NotFound.push(summary.description);
          }
        });

        this.c1 = Highcharts;
        this.c1o = {
          title: {text: 'Security Vulnerability Prevalence'},
          series: [{
            data: c1Data,
            type: 'pie'
          }]
        };

        const ufData = [];
        this.data.source.summaries.summary.forEach((summary) => {
          if (summary.description === 'UNSAFE_FUNCTION' && summary.attributes.attribute) {
            summary.attributes.attribute.forEach((attribute) => {
              ufData.push({name: attribute.name, y: +attribute.total});
            });
          }
        });

        this.c3 = Highcharts;
        this.c3o = {
          title: {text: 'Density of Vulnerabilities by Function'},
          series: [{
            name: 'Coming Soon!',
            data: [{
              name: 'Coming Soon!',
              value: 100
            },
              {
                name: 'Other',
                value: 40
              },
              {
                name: 'Other',
                value: 35
              }],
            type: 'packedbubble'
          }]
        };

        this.c2 = Highcharts;
        this.c2o = {
          title: {text: 'Unsafe Functions'},
          series: [{
            data: ufData,
            type: 'pie'
          }]
        };
      }

      this.toggle = true;
      this.spinner.hide();

    });
  }
}
