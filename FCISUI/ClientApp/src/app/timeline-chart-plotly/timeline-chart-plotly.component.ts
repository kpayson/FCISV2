
import { Component} from '@angular/core'; //, ViewChild, ElementRef
// , AfterViewInit 
// import * as Plotly from 'plotly.js-dist-min';

@Component({
  selector: 'app-timeline-chart-plotly',
  templateUrl: './timeline-chart-plotly.component.html',
  styleUrls: ['./timeline-chart-plotly.component.css']
})
export class TimelineChartPlotlyComponent {
//implements AfterViewInit {
  // @ViewChild('chart') chart!: ElementRef;

  constructor() { }

//   public graph = {
//     data: [
//         { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
//         { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
//     ],
//     layout: {width: 320, height: 240, title: 'A Fancy Plot'}
// };

  //data:any;
  //layout

  //ngAfterViewInit() {
    rooms = [
      {
        name: 'Room 1',
        data: [
          {timestamp: '2022-01-01', status: 1},
          {timestamp: '2022-02-01', status: 2},
          {timestamp: '2022-03-01', status: 3}
        ]
      },
      {
        name: 'Room 2',
        data: [
          {timestamp: '2022-01-01', status: 3},
          {timestamp: '2022-02-01', status: 1},
          {timestamp: '2022-03-01', status: 2}
        ]
      },
      {
        name: 'Room 3',
        data: [
          {timestamp: '2022-01-01', status: 2},
          {timestamp: '2022-02-01', status: 3},
          {timestamp: '2022-03-01', status: 1}
        ]
      }
    ];

    //graph = {};

    data = this.rooms.map(room => ({
      x: room.data.map(d => d.timestamp),
      y: [room.name],
      type: 'bar',
      orientation: 'h',
      marker: {
        color: room.data.map(d => {
          if (d.status === 1) {
            return 'green';
          } else if (d.status === 2) {
            return 'yellow';
          } else if (d.status === 3) {
            return 'red';
          } else {
            throw "unknown status";
          }
        })
      }
    }));

    maintenanceWindow = {
      x: ['2022-02-01', '2022-03-01'],  // Start and end timestamps of the maintenance window
      y: [0, 5],  // Rooms for which the maintenance window is applicable
      type: 'rect',
      xref: 'x',
      yref: 'paper',
      fillcolor: 'rgba(218, 112, 214, 0.9)',  // Light purple color with 30% opacity
      opacity: 0.9,  // Opacity of the rectangle
      line: {
        width: 0
      }
    };

    layout = {
      xaxis: {
        type: 'date'
      },
      yaxis: {
        showticklabels: true,
        tickfont: {
          family: 'Arial',
          size: 12,
          color: 'black'
        }
      },
      margin: {
        l: 150,
        r: 50,
        t: 50,
        b: 50
      },
      shapes: [this.maintenanceWindow]  // Add the maintenance window shape to the layout
    };

  //}
}

