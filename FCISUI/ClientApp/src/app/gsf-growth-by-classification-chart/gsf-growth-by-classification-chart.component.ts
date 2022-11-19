import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-gsf-growth-by-classification-chart',
  templateUrl: './gsf-growth-by-classification-chart.component.html',
  styleUrls: ['./gsf-growth-by-classification-chart.component.scss']
})
export class GsfGrowthByClassificationChartComponent implements OnInit {

  constructor() { }

  @Input()
  chartData = [
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7]
  ];

  chartType= ChartType.AreaChart;
  columnNames =  ['Facility', 'GSF'];
  data: any[] = []
  options:any;



  ngOnInit(): void {
    this.options = this.chartOptions([])
  }

  chartOptions(data:any[]) {
    
    const header = [['Go Live Date', 'Area CNC Rooms', 'Area ISO-8 Rooms', 'Area ISO-7 Rooms']];
    const growthDataArray =
      header.concat(data.map(x => {
          const goLiveDate = new Date(Number(x.GoLiveDate.replace(/\D+/g, '')));
          return [goLiveDate, x.CncRoomsArea, x.Iso8RoomsArea, x.Iso7RoomsArea]
      }));
    //const growthData = google.visualization.arrayToDataTable(growthDataArray);

    // const ystart = growthDataArray[1][0].getFullYear();
    // const yend = growthDataArray[growthDataArray.length - 1][0].getFullYear();
    // const ycount = yend - ystart + 1;
    const hAxisTicks:any[] = []// [...Array(ycount).keys()].map(y => new Date(y + ystart, 1, 1));

    const options = { //fullStacked
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

  // function drawAreaChart(dataUrl, containerId) {

  //   $.ajax({
  //       type: 'POST',
  //       dataType: 'json',
  //       contentType: 'application/json',
  //       url: dataUrl,
  //       data: "",
  //       success:
  //           function (response) {
  //               google.charts.load("current", { packages: ["corechart"] });
  //               google.charts.setOnLoadCallback(() => {
  //                   const header = [['Go Live Date', 'Area CNC Rooms', 'Area ISO-8 Rooms', 'Area ISO-7 Rooms']];
  //                   const growthDataArray =
  //                       header.concat(response.d.map(x => {
  //                           const goLiveDate = new Date(Number(x.GoLiveDate.replace(/\D+/g, '')));
  //                           return [goLiveDate, x.CncRoomsArea, x.Iso8RoomsArea, x.Iso7RoomsArea]
  //                       }));
  //                   const growthData = google.visualization.arrayToDataTable(growthDataArray);

  //                   const ystart = growthDataArray[1][0].getFullYear();
  //                   const yend = growthDataArray[growthDataArray.length - 1][0].getFullYear();
  //                   const ycount = yend - ystart + 1;
  //                   const hAxisTicks = [...Array(ycount).keys()].map(y => new Date(y + ystart, 1, 1));

  //                   var options = { //fullStacked
  //                       isStacked: 'absolute',
  //                       height: 300,
  //                       legend: { position: 'top', maxLines: 3 },
  //                       vAxis: {
  //                           minValue: 0
  //                       },
  //                       hAxis: {
  //                           format: 'yyyy',
  //                           ticks: hAxisTicks
  //                       }
  //                   };

  //                   const container = document.getElementById(containerId);
  //                   const chart = new google.visualization.AreaChart(container);
  //                   chart.draw(growthData, options);

  //               });
  //           },
  //       error: function (jqXHR, exception) {
  //           alert(exception);
  //       }
  //   });

        //[
        //    ["Month","Area CNC Rooms","Area ISO-8 Rooms","Area ISO-7 Rooms"],
        //    [0,1456,1475,0],
        //    [37,4576,2210,1890],
        //    [52,5318,2716,4412],
        //    [55,7608,2807,4518],
        //    [61,7608,2853,4771],
        //    [65,7679,2908,4992],
        //    [78,7679,2908,4992],
        //    [85,8359,3542,6723],
        //    [88,8965,3542,6723],
        //    [102,9937,4096,7957],
        //    [102,9937,4140,8648],
        //    [104,9937,4191,8726],
        //    [109,10049,4191,8726],
        //    [111,10534,6306,10996],
        //    [117,10692,6837,10996],
        //    [118,12818,10015,13712],
        //    [130,13258,10311,14184]
        //]

    //google.charts.load('current', { 'packages': ['corechart'] });
    //google.charts.setOnLoadCallback(() => {
    //    //var data = google.visualization.arrayToDataTable([
    //    //    ['Year', 'Sales', 'Expenses'],
    //    //    ['2013', 1000, 400],
    //    //    ['2014', 1170, 460],
    //    //    ['2015', 660, 1120],
    //    //    ['2016', 1030, 540]
    //    //]);

    //    // https://developers.google.com/chart/interactive/docs/gallery/areachart

    //    const growthData = google.visualization.arrayToDataTable([
    //        ['Year', '# ISO-7 Rooms', '# ISO-8 Rooms', '# CNC Rooms', 'Area ISO-7 Rooms', 'Area ISO-8 Rooms', 'Area CNC Rooms', '# Critical Environment Parameters'],
    //        ['JUN 2018', 12, 5, 4, 2522, 506, 742, 84],
    //        ['FEB 2014', 0, 6, 4, 0, 1475, 1456, 33],
    //        ['DEC 2023', 11, 12, 11, 2716, 3178, 2126, 136],
    //        ['AUG 2022', 8, 6, 4, 1234, 554, 972, 72],
    //        ['AUG 2022', 4, 1, 0, 691, 44, 0, 20],
    //        ['DEC 2024', 4, 2, 4, 472, 296, 440, 40],
    //        ['MAR 2023', 0, 0, 1, 0, 0, 112, 5],
    //        ['SEP 2018', 1, 2, 3, 106, 91, 2290, 6],
    //        ['MAR 2017', 12, 5, 12, 1890, 735, 3120, 116],
    //        ['MAY 2023', 19, 9, 6, 2270, 2115, 485, 136],
    //        ['AUG 2020', 0, 0, 0, 0, 0, 0, 0],
    //        ['JUL 2019', 1, 1, 1, 221, 55, 71, 12],
    //        ['MAR 2019', 2, 1, 0, 253, 46, 0, 12],
    //        ['MAR 2021', 6, 4, 7, 1731, 634, 680, 68],
    //        ['OCT 2022', 1, 1, 0, 78, 51, 0, 8],
    //        ['NOV 2023', 0, 2, 2, 0, 531, 158, 16],
    //        ['JUN 2021', 0, 0, 1, 0, 0, 606, 3]
    //    ])

    //    const options = {
    //        title: '',
    //        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
    //        vAxis: { minValue: 0 }
    //    };
    //    const container = document.getElementById(containerId);
    //    const chart = new google.visualization.AreaChart(container);
    //    chart.draw(growthData, options);
    //});

}


