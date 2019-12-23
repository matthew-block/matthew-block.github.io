import { Component, OnInit } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { parseString } from 'xml2js';

import * as Highcharts from 'highcharts';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  private data;
  private toggle = false;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
  }

  // --- chart data ---
  c1: typeof Highcharts;
  c1o: Highcharts.Options;

  c2: typeof Highcharts;
  c2o: Highcharts.Options;

  c3: typeof Highcharts;
  c3o: Highcharts.Options;

  c4: typeof Highcharts;
  c4o: Highcharts.Options;

  ngOnInit() {
    this.toggle = false;
    this.spinner.show();
    this.http.get('assets/test.xml', {responseType: 'text'})
      .subscribe(data => {
        parseString(data, { explicitArray: false }, (error, result) => {
          this.data = result;

          const c1Data = [];
          const notFound = [];

          this.data.source.summaries.summary.forEach((summary) => {
            if (+summary.total !== 0) {
              c1Data.push({name: summary.description, y: +summary.total});
            } else {
              notFound.push(summary.description);
            }
          });

          console.log(notFound);
          console.log(c1Data);
          console.log(this.data);


          this.c1 = Highcharts;
          this.c1o = {
            title: { text: 'Example'},
            series: [{
              data: [{
                name: 'UNSAFE_FUNCTION',
                y: 5
              }, {
                name: 'UNSAFE_FUNCTION_USED_SAFELY',
                y: 5
              }, {
                name: 'SAFE_FUNCTION',
                y: 5
              }, {
                name: 'RACE_CONDITION',
                y: 5
              }],
              type: 'pie'
            }]
          };

          const ufdata = [];
          for (let count = 0; count < 7; ++count) {
            ufdata.push({
              name: 'ex',
              y: +4});
          }

          this.c2 = Highcharts;
          this.c2o = {
            title: { text: 'Example'},
            series: [{
              name: 'Unsafe Functions',
              data: ufdata,
              type: 'column'
            }]
          };

          this.c4 = Highcharts;
          this.c4o = {
            title: { text: 'Example'},
            series: [{
              data: ufdata,
              type: 'pie'
            }]
          };

          this.c3 = Highcharts;
          this.c3o = {
            title: { text: 'Example'},
            series: [{
              name: 'Vulnerabilities',
              data: [{
                name: 'UNSAFE_FUNCTION',
                y: 5
              }, {
                name: 'UNSAFE_FUNCTION_USED_SAFELY',
                y: 5
              }, {
                name: 'SAFE_FUNCTION',
                y: 5
              }, {
                name: 'RACE_CONDITION',
                y: 5
              }],
              type: 'bar',
              dataLabels: { enabled: true },
            }]
          };

          this.toggle = true;
          this.spinner.hide();

        });
      });
  }

}
