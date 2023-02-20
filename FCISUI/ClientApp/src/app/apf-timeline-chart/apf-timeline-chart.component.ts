import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ChartType } from 'angular-google-charts';

declare const bootstrap: any;

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


roomLabelTooltipDP(name:string) {
  const tooltipHtml = `
    <div align="left" class="label-tooltip"> 
      <table>
       <tr><th> Name: ${name} </th></tr>
       </table>
    </div>
  `;
  return tooltipHtml;
}

  roomLabelTooltip(room:any) {
    const tooltipHtml = `
      <div align="left" class="label-tooltip"> 
        <table>
         <tr><th> Room: ${room.RoomName} </th></tr>
         <tr><td><b> Room #: ${room.RoomNumber} </b></td></tr>
         <tr><td><b> Class: ${room.ISO} </b></td></tr>
         <tr><td><b> GSF: ${room.GSF} </b></td></tr>
         </table>
      </div>
    `;
    return tooltipHtml;
  }


  chartReady() {
    console.log("Chart Ready");
    const chartLabels = document.querySelectorAll('app-apf-timeline-chart text[text-anchor="end"]');
    const me = this;
    chartLabels.forEach((label) => {

      label.setAttribute('style', `cursor: pointer; text-decoration: underline;`);

      // (label as any).tooltip({
      //   location: 'right',
      //   title: label.innerHTML
      // })
      label.setAttribute('data-locationId', label.innerHTML);
      const tooltip = new bootstrap.Tooltip(label, {
        placement:'right',
        title: label.innerHTML
      });

      console.log(this.chartData);
      // label.setAttribute('data-toggle', 'tooltip');
      // label.setAttribute('data-placement', 'right');
      // label.setAttribute('title', 'Hello ' + label.innerHTML);

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

      // document.querySelectorAll()
      // data-toggle="tooltip" data-placement="right" title="Tooltip on right"

    });
  }

  handleLabelMouseOver(locationId: string) {
    const label = document.querySelector('text[data-locationId="' + locationId + '"]');
    if(label) {
      label.setAttribute('fiil', 'red');

      // tooltip.show();
    }

    this.chartLabelMouseOver.emit(locationId);
  }

  handleLabelMouseOut(locationId: string) {
    document.querySelector('text[data-locationId="' + locationId + '"]')?.setAttribute('fill', 'black');
    this.chartLabelMouseOut.emit(locationId)
  }


}


