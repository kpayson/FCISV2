import { Component, Input } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-apf-timeline-chart',
  templateUrl: './apf-timeline-chart.component.html',
  styleUrls: ['./apf-timeline-chart.component.scss']
})
export class ApfTimelineChartComponent {
  constructor() {}

  @Input()
  chartData: any[] = [];

  chartType = ChartType.Timeline;

  columnNames = [
    { type: 'string', id: 'ChillerName' },
    {
      type: 'string',
      id: 'ChillerNameTooltip',
      role: 'tooltip',
      p: { html: true }
    },
    { type: 'string', id: 'ChillerStatus' },
    { type: 'string', role: 'style' },
    { type: 'date', id: 'StartTime' },
    { type: 'date', id: 'EndTime' }
  ];

  options: any = {
    timeline: { showBarLabels: false, colorByRowLabel: true },
    backgroundColor: '#ebe9e6',
    tooltip: { isHtml: true },
    focusTarget: 'category'
  };

  chartReady(){
    console.log("Chart Ready");
  }
}

