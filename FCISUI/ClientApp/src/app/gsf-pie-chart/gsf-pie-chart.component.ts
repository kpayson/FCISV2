import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-gsf-pie-chart',
  templateUrl: './gsf-pie-chart.component.html',
  styleUrls: ['./gsf-pie-chart.component.scss']
})
export class GsfPieChartComponent implements OnInit {

  constructor() { }

  @Input()
  chartTitle = "GSF Chart";

  @Input()
  chartData = [
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7]
  ];


  chartType= ChartType.PieChart;
  columnNames =  ['Facility', 'GSF'];

  options={}



//   function drawPortfolioPieChart(dataUrl, parameters, chartTitle, containerId) {
//     const dataJson = JSON.stringify(parameters);
//     $.ajax({
//         type: 'POST',
//         dataType: 'json',
//         contentType: 'application/json',
//         url: dataUrl,
//         data: dataJson,
//         success:
//             function (response) {
//                 google.charts.load("current", { packages: ["corechart"] });
//                 google.charts.setOnLoadCallback(() => {
//                     const dataArray = response.d.map(x => [x.Facility, x.GSF]);
//                     const container = document.getElementById(containerId)
//                     const chart = new google.visualization.PieChart(container);

//                     const options = {
//                         title: chartTitle,
//                     };

//                     const data = new google.visualization.DataTable();
//                     data.addColumn('string', 'Facility');
//                     data.addColumn('number', 'GSF');
//                     data.addRows(dataArray);
//                     chart.draw(data);
//                 });
//             },
//         error: function (jqXHR, exception) {
//             alert(exception);
//         }
//     });
// }

  ngOnInit(): void {
    // this.chartData = google.visualization.arrayToDataTable([
    //   ['Task', 'Hours per Day'],
    //   ['Work',     11],
    //   ['Eat',      2],
    //   ['Commute',  2],
    //   ['Watch TV', 2],
    //   ['Sleep',    7]
    // ]);
  }

}
