import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-gsf-growth-by-classification-chart',
  templateUrl: './gsf-growth-by-classification-chart.component.html',
  styleUrls: ['./gsf-growth-by-classification-chart.component.scss']
})
export class GsfGrowthByClassificationChartComponent implements OnInit {

  constructor() { }

  private _chartData:any[] =[];

  @Input()
  get chartData():any[] {
    return this._chartData;
  }
  set chartData(v:any[]) {
    if(v.some(Boolean)) {
      this._chartData = v;
      this.options = this.chartOptions(this._chartData)
    }
  }

  chartType= ChartType.AreaChart;
  columnNames =  ['Go Live Date', 'Area CNC Rooms', 'Area ISO-8 Rooms', 'Area ISO-7 Rooms'];
  data: any[] = []
  options:any;


  ngOnInit(): void {
  }

  chartOptions(data:any[]) {
    
    const ystart = new Date(data[0][0]).getFullYear();
    const yend = new Date(data[data.length - 1][0]).getFullYear();
    const ycount = yend - ystart + 1;
    const hAxisTicks:any[] =  [...Array(ycount).keys()].map(y => new Date(y + ystart, 1, 1));

    const options = { // fullStacked
      isStacked: 'absolute',
      height: 300,
      legend: { position: 'top', maxLines: 3 },
      vAxis: {
          minValue: 0
      },
      hAxis: {
          format: 'yyyy',
          ticks: hAxisTicks
      }
    };
    return options;
  }


}


