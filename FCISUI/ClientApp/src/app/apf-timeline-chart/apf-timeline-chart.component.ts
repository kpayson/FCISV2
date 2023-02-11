import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output()
  chartLabelClick = new EventEmitter<any>()

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
    const chartLabels = document.querySelectorAll('app-apf-timeline-chart text[text-anchor="end"]');
    const me = this;
    chartLabels.forEach((label)=>{
      label.setAttribute('style','cursor: pointer; text-decoration: underline');
      label.addEventListener('click', function (sender) { // add event to row labels when clicked to open URL
        console.log(sender); 
        const text = (sender.currentTarget as Element).innerHTML
        me.chartLabelClick.emit(text);
      });

    });
  }
      
    
    //pinCurrent.setAttribute('style', 'cursor: pointer; text-decoration: underline;'); // add cursor event to pin
    //label.setAttribute('style', 'cursor: pointer; text-decoration: underline;'); // add cursor event to row label
  }


