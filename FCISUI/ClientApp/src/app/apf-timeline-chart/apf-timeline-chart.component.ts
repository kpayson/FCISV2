import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ChartType } from 'angular-google-charts';
import { TimelineChartData } from '../facility-timeline-dashboard/facility-timeline-dashboard.service';

declare const bootstrap: any;

@Component({
  selector: 'app-apf-timeline-chart',
  templateUrl: './apf-timeline-chart.component.html',
  styleUrls: ['./apf-timeline-chart.component.scss']
})
export class ApfTimelineChartComponent {
  constructor() {}

  timelineData: any[] = [];
  //locationLookup: { [key: string]: any } = {};

  private _timelineChartData: TimelineChartData = {
    points: [],
    locations: {},

    locationType: 'facility'
  };
  @Input()
  get chartData(): TimelineChartData {
    return this._timelineChartData;
  }
  set chartData(v) {
    this._timelineChartData = v;

    // set a padding value to cover the height of title and axis values
    const paddingHeight = 50;
    // set the height to be covered by the rows
    const rowHeight = Object.keys(v.locations).length * 42; //data.getNumberOfRows() * 15;
    // set the total chart height
    const chartHeight = Math.min(rowHeight + paddingHeight, 375);

    this.options = {
      timeline: { showBarLabels: false, colorByRowLabel: true },
      backgroundColor: '#ebe9e6',
      tooltip: { isHtml: true },
      focusTarget: 'category',
      height: chartHeight
    };

    // body > div > app-home > div > app-apf-portfolio-ic-dashboard > div > div > div > div.col-md-9 > div:nth-child(2) > div > div.timeline-chart-container > app-apf-timeline-chart > google-chart > div > div:nth-child(1) > div > div:nth-child(2)

    this.timelineData = this.chartData.points.map((x: any) => {
      return [
        {
          v: x.locationName,
          p: {
            link: `https://orfd-cogen.ors.nih.gov/data-quality/plotcgmp?path=${x.tag}`
          }
        },
        '',
        x.chillerStatusLabel,
        x.statusColor,
        x.startDate,
        x.endDate
      ];
    });

    //this.locationLookup = this.chartData.locations;
  }

  private _highlightedLabel: string = '';
  @Input()
  get highlightedLabel() {
    return this._highlightedLabel;
  }
  set highlightedLabel(v: string) {
    this._highlightedLabel = v;
    document.querySelectorAll('text[data-locationId]')?.forEach((elem) => {
      elem.setAttribute('fill', 'black');
    });
    document
      .querySelector('text[data-locationId="' + v + '"]')
      ?.setAttribute('fill', 'red');

    this.scrollIntoView(v);
  }
  
  @Input()
  isLoading:boolean = false;

  @Output()
  chartLabelClick = new EventEmitter<any>();

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
    focusTarget: 'category',
    height: '600px'
  };

  roomLabelTooltipDP(name: string) {
    const tooltipHtml = `
    <div align="left" class="label-tooltip"> 
      <table>
       <tr><th> Name: ${name} </th></tr>
       </table>
    </div>
  `;
    return tooltipHtml;
  }

  roomLabelTooltip(room: any) {
    const toolTipParts = [];
    if (room.roomName) {
      toolTipParts.push(`${room.roomName}`);
    }
    if (room.roomNumber) {
      toolTipParts.push(`${room.roomNumber}`);
    }
    if (room.iso) {
      toolTipParts.push(`Class: ${room.iso}`);
    }
    if (room.sq) {
      toolTipParts.push(`GSF: ${room.sq}`);
    }
    const tooltipHtml = `
    <div class="label-tooltip">
      ${toolTipParts.join('<br>')}
    </div>`;

    // Room: ${room.roomName} <br>
    // Room #: ${room.roomNumber} <br>
    // Class: ${room.iso} <br>
    // GSF: ${room.sq}
    // const tooltipHtml = `
    //   <div align="left" class="label-tooltip">
    //     <table>
    //      <tr><td> Room: ${room.roomName} </td></tr>
    //      <tr><td><b> Room #: ${room.roomNumber} </b></td></tr>
    //      <tr><td><b> Class: ${room.iso} </b></td></tr>
    //      <tr><td><b> GSF: ${room.sq} </b></td></tr>
    //      </table>
    //   </div>
    // `;
    return tooltipHtml;
  }

  chartReady() {
    console.log('Chart Ready');
    const chartLabels = document.querySelectorAll(
      'app-apf-timeline-chart text[text-anchor="end"]'
    );
    const me = this;
    chartLabels.forEach((label) => {
      label.setAttribute(
        'style',
        `cursor: pointer; text-decoration: underline;`
      );

      const locationName = label.innerHTML;
      if (this.chartData.locationType === 'room') {
        const roomData = this.chartData.locations[locationName];
        if (roomData) {
          const roomTooltip = this.roomLabelTooltip(roomData);
          const tooltip = new bootstrap.Tooltip(label, {
            placement: 'right',
            html: true,
            title: roomTooltip
          });
        } else {
          const tooltip = new bootstrap.Tooltip(label, {
            placement: 'right',
            title: locationName
          });
        }
      } else {
        const tooltip = new bootstrap.Tooltip(label, {
          placement: 'right',
          title: locationName
        });
      }

      label.setAttribute('data-locationId', label.innerHTML);

      // console.log(this.chartData);
      // label.setAttribute('data-toggle', 'tooltip');
      // label.setAttribute('data-placement', 'right');
      // label.setAttribute('title', 'Hello ' + label.innerHTML);

      label.addEventListener('click', function (sender) {
        const text = (sender.currentTarget as Element).innerHTML;
        me.chartLabelClick.emit(text);
      });
      label.addEventListener('mouseover', function (sender) {
        const text = (sender.currentTarget as Element).innerHTML;
        me.handleLabelMouseOver(text);
      });
      label.addEventListener('mouseout', function (sender) {
        const text = (sender.currentTarget as Element).innerHTML;
        me.handleLabelMouseOut(text);
      });

      

      // document.querySelectorAll()
      // data-toggle="tooltip" data-placement="right" title="Tooltip on right"
    });
  }

  scrollIntoView(locationId: string) {
    document.querySelector(`google-chart [data-locationId="${locationId}"]`)?.scrollIntoView();
  }

  handleLabelMouseOver(locationId: string) {
    const label = document.querySelector(
      'text[data-locationId="' + locationId + '"]'
    );
    if (label) {
      label.setAttribute('fill', 'red');

      // tooltip.show();
    }

    this.chartLabelMouseOver.emit(locationId);
  }

  handleLabelMouseOut(locationId: string) {
    document
      .querySelector('text[data-locationId="' + locationId + '"]')
      ?.setAttribute('fill', 'black');
    this.chartLabelMouseOut.emit(locationId);
  }
}
