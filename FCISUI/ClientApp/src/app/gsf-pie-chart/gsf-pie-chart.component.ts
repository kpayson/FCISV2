import { Component, Input } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-gsf-pie-chart',
  templateUrl: './gsf-pie-chart.component.html',
  styleUrls: ['./gsf-pie-chart.component.scss']
})
export class GsfPieChartComponent {
  constructor() {}

  @Input()
  chartData: any[] = [];

  chartType = ChartType.PieChart;
  columnNames = ['Facility', 'GSF'];
}
