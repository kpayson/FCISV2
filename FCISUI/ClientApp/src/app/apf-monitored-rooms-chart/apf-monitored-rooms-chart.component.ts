import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-apf-monitored-rooms-chart',
  templateUrl: './apf-monitored-rooms-chart.component.html',
  styleUrls: ['./apf-monitored-rooms-chart.component.scss']
})
export class ApfMonitoredRoomsChartComponent implements OnInit {

  constructor() { }


  private _chartData: any[] = [];

  @Input()
  get chartData(): any[] {
    return this._chartData;
  }
  set chartData(v: any[]) {
    if (v.some(Boolean)) {
      this._chartData = v;
      this.options = this.chartOptions(this._chartData)
    }
  }

  chartType = ChartType.AreaChart;
  columnNames = ['Go Live Date', 'Area', 'Critical Environmental Parameters'];
  data: any[] = []
  options: any;


  ngOnInit(): void {
  }

  chartOptions(data: any[]) {

    const ystart = new Date(data[0][0]).getFullYear();
    const yend = new Date(data[data.length - 1][0]).getFullYear();
    const ycount = yend - ystart + 1;
    const hAxisTicks: any[] = [...Array(ycount).keys()].map(y => new Date(y + ystart, 1, 1));

    const options = { //fullStacked
      isStacked: 'absolute',
      height: 300,
      legend: { position: 'top', maxLines: 3 },
      seriesType: 'area',
      series: { 1: { type: 'line' } },
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


  // google.charts.load("current", { packages: ["corechart"] });
  // google.charts.setOnLoadCallback(() => {
  //     const header = [['Go Live Date', 'Area', 'Critical Environmental Parameters']];
  //     const growthDataArray =
  //         header.concat(response.d.map(x => {
  //             const goLiveDate = new Date(Number(x.GoLiveDate.replace(/\D+/g, '')));
  //             return [goLiveDate, x.CncRoomsArea + x.Iso8RoomsArea + x.Iso7RoomsArea, x.CriticalEnvironmentParametersCount]
  //         }));
  //     const growthData = google.visualization.arrayToDataTable(growthDataArray);

  //     const ystart = growthDataArray[1][0].getFullYear();
  //     const yend = growthDataArray[growthDataArray.length - 1][0].getFullYear();
  //     const ycount = yend - ystart + 1;
  //     const hAxisTicks = [...Array(ycount).keys()].map(y => new Date(y + ystart, 1, 1));

  //     const options = { //fullStacked
  //         isStacked: 'absolute',
  //         height: 300,
  //         legend: { position: 'top', maxLines: 3 },
  //         seriesType: 'area',
  //         series: { 1: { type: 'line' } },
  //         vAxis: {
  //             minValue: 0
  //         },
  //         hAxis: {
  //             format: 'yyyy',
  //             ticks: hAxisTicks
  //         }
  //     };

  //     const container = document.getElementById(containerId);
  //     const chart = new google.visualization.ComboChart(container);
  //     chart.draw(growthData, options);

  //});


}
