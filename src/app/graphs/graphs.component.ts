import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  constructor() { }

  // --- chart data ---
  private c1: typeof Highcharts;
  private c1o: Highcharts.Options;

  private c2: typeof Highcharts;
  private c2o: Highcharts.Options;

  private c3: typeof Highcharts;
  private c3o: Highcharts.Options;

  private c4: typeof Highcharts;
  private c4o: Highcharts.Options;

  ngOnInit() {
    const uf: number = 2;
    const ufus: number = 4;
    const sf: number = 6;
    const rc: number = 8;

    this.c1 = Highcharts;
    this.c1o = {
      title: { text: 'Example'},
      series: [{
        data: [{
          name: 'UNSAFE_FUNCTION',
          y: uf
        }, {
          name: 'UNSAFE_FUNCTION_USED_SAFELY',
          y: ufus
        }, {
          name: 'SAFE_FUNCTION',
          y: sf
        }, {
          name: 'RACE_CONDITION',
          y: rc
        }],
        type: 'pie'
      }]
    };

    let ufdata = [];
    for (let count: number = 0; count < 7; ++count) {
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
          y: uf
        }, {
          name: 'UNSAFE_FUNCTION_USED_SAFELY',
          y: ufus
        }, {
          name: 'SAFE_FUNCTION',
          y: sf
        }, {
          name: 'RACE_CONDITION',
          y: rc
        }],
        type: 'bar',
        dataLabels: { enabled: true },
      }]
    };
  }

}
