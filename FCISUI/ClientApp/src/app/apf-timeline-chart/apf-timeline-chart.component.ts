import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-apf-timeline-chart',
  templateUrl: './apf-timeline-chart.component.html',
  styleUrls: ['./apf-timeline-chart.component.scss']
})
export class ApfTimelineChartComponent {
  constructor() { }

  @Input()
  chartData: any[] = [];

  private _highlightedLabel: string = '';
  @Input()
  get highlightedLabel() {
    return this._highlightedLabel;
  }
  set highlightedLabel(v: string) {
    this._highlightedLabel = v;
    document.querySelectorAll('text[data-locationId]')?.forEach(elem => { elem.setAttribute('fill', 'black') });
    document.querySelector('text[data-locationId="' + v + '"]')?.setAttribute('fill', 'red');
  }

  @Output()
  chartLabelClick = new EventEmitter<any>()

  @Output()
  chartLabelMouseOver = new EventEmitter<any>();

  @Output()
  chartLabelMouseOut = new EventEmitter<any>();

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

  chartReady() {
    console.log("Chart Ready");
    const chartLabels = document.querySelectorAll('app-apf-timeline-chart text[text-anchor="end"]');
    const me = this;
    chartLabels.forEach((label) => {

      label.setAttribute('style', `cursor: pointer; text-decoration: underline;`);
      label.setAttribute('data-locationId', label.innerHTML);

      label.addEventListener('click', function (sender) {
        const text = (sender.currentTarget as Element).innerHTML
        me.chartLabelClick.emit(text);
      });
      label.addEventListener('mouseover', function (sender) {
        const text = (sender.currentTarget as Element).innerHTML
        me.handleLabelMouseOver(text);
      });
      label.addEventListener('mouseout', function (sender) {
        const text = (sender.currentTarget as Element).innerHTML
        me.handleLabelMouseOut(text);
      });

    });
  }

  handleLabelMouseOver(locationId: string) {
    document.querySelector('text[data-locationId="' + locationId + '"]')?.setAttribute('fill', 'red');
    this.chartLabelMouseOver.emit(locationId);
  }

  handleLabelMouseOut(locationId: string) {
    document.querySelector('text[data-locationId="' + locationId + '"]')?.setAttribute('fill', 'black');
    this.chartLabelMouseOut.emit(locationId)
  }


}


