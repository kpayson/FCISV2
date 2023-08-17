import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

interface StatusPoint {
  time: Date;
  status: number;
}

interface RoomStatusData {
  roomName: string;
  statusPoints: StatusPoint[];
}

@Component({
  selector: 'app-timeline-chart-next',
  templateUrl: './timeline-chart-next.component.html',
  styleUrls: ['./timeline-chart-next.component.css']
})
export class TimelineChartNextComponent implements OnInit {
  constructor() {}

  private svg: any;

  ngOnInit(): void {
    this.createSvg();
    this.createBars(this.chartData);
  }

  private dataPrep(points:StatusPoint[], minTime:Date, maxTime:Date) {

    points.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    if(points[0].time !== minTime) {
        points.unshift({time: minTime, status: points[0].status})
    }
    if(points[points.length - 1].time !== maxTime) {
        points.push({time: maxTime, status: points[points.length - 1].status})
    }
    const enhancedPoints = [];
    for(let i=0; i<points.length-1; i++) {
      const duration = points[i+1].time.getTime() - points[i].time.getTime();
      const enhancedPoint = {...points[i], duration};
      enhancedPoints.push(enhancedPoint);
    }
    return enhancedPoints.slice(0, -1);
  }

  private createSvg(): void {
    const svgParams = this.chartParams.svg;
    this.svg = d3.select("figure#timelineChart")
      .append("svg")
      .attr("width", svgParams.width + svgParams.margin.left + svgParams.margin.right)
      .attr("height", svgParams.height + svgParams.margin.top + svgParams.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.chartParams.svg.margin.left+ "," + svgParams.margin.top + ")");
  }

  private createBars(data: RoomStatusData[]): void {
    const minTime = d3.min(data.flatMap((d) => d.statusPoints), (d) => new Date(d.time)) || new Date();
    const maxTime = d3.max(data.flatMap((d) => d.statusPoints), (d) => new Date(d.time)) || new Date();

      // difference between minTime and maxTime in milliseconds
    const timeRange = maxTime.getTime() - minTime.getTime();

    const preparedData = data.map((d) => ({
      roomName: d.roomName, 
      statusPoints: this.dataPrep(d.statusPoints, minTime, maxTime)
    }));

    // xAxis setup
    const xScale = 
      d3.scaleTime().range([0, this.chartParams.svg.width])
        .domain(
          data.flatMap((d) => d.statusPoints).map(x=>x.time)
        );
    const xAxis = d3.axisBottom(xScale);
    this.svg.append("g").attr("transform", `translate(0,${this.chartParams.svg.height})`).call(xAxis);

    // yAxis setup
    const yScale = d3.scaleBand().range([0, this.chartParams.svg.height]);
    const yAxis = d3.axisLeft(yScale);
    yScale.domain(data.map((d) => d.roomName));
    this.svg.append("g").call(yAxis);


  }

  chartParams = {
    svg: {
      width: 800,
      height: 200,
      margin: { top: 20, right: 30, bottom: 30, left: 50 }
    },
    row: {
      height: 41,
      evenRowFillColor: '#ebe9e6',
      oddRowFillColor: '#d4d2cf',
      padding: {
        top: 8,
        right: 12,
        bottom: 8,
        left: 12
      }
    },
    bar: {
      height: 24,
      colors: {
        '0': 'green',
        '1': 'yellow',
        '2': 'red'
      },
      hoverColors: {
        '0': 'lightgreen',
        '1': 'lightyellow',
        '2': 'lightred'
      }
    }
  };

  chartData: RoomStatusData[] = [
    {
      roomName: 'Room 1',
      statusPoints: [
        { time: new Date('2021-01-01T09:00:00'), status: 0 },
        { time: new Date('2021-01-01T12:00:00'), status: 1 },
        { time: new Date('2021-01-01T15:00:00'), status: 2 }
      ]
    },
    {
      roomName: 'Room 2',
      statusPoints: [
        { time: new Date('2021-01-01T09:00:00'), status: 2 },
        { time: new Date('2021-01-01T12:00:00'), status: 1 },
        { time: new Date('2021-01-01T15:00:00'), status: 0 }
      ]
    }

  ];


}





// const minTime = d3.min(data.flatMap((d) => d.statusPoints), (d) => new Date(d.time));
// const maxTime = d3.max(data.flatMap((d) => d.statusPoints), (d) => new Date(d.time));
// const timeRange = maxTime - minTime;

// for(const room of data) {
//   dataPrep(room.statusPoints, minTime, maxTime);
// }

// const margin = { top: 20, right: 30, bottom: 30, left: 50 };
// const width = 800 - margin.left - margin.right;
// const height = 400 - margin.top - margin.bottom;

// const svg = d3
//   .select("#chart")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", `translate(${margin.left},${margin.top})`);

// const scalePercent = (x) => width * x / timeRange;
// const xScale = d3.scaleTime().range([0, width]);
// const yScale = d3.scaleBand().range([0, height]);

// const xAxis = d3.axisBottom(xScale);
// const yAxis = d3.axisLeft(yScale);

// const colorScale = d3
//   .scaleOrdinal()
//   .domain([0, 1, 2])
//   .range(["green", "yellow", "red"]);

// const rowFill0 = "#ebe9e6";
// const rowFill1 = "#d4d2cf";
// const rowHeight = 41;
// const barHeight = 24;

// xScale.domain(
//   d3.extent(data.flatMap((d) => d.statusPoints), (d) => new Date(d.time))
// );
// yScale.domain(data.map((d) => d.roomName));

// svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);
// svg.append("g").call(yAxis);



// svg
// .selectAll(".bar-group")
// .data(data)
// .enter()
//     .append("g")
//         .attr("class", "bar-group")
//         .attr("transform", (d) => `translate(0,${yScale(d.roomName) + 2 * margin.top + margin.bottom})`)
//         .append("rect")
//             .attr("x", 0)
//             .attr("y", 0)
//             .attr("width", 400)
//             .attr("height", 20)
//             .attr("fill", "green")
//             .attr("pointer-events", "all")
//             .on("mousemove", (event) => {
//                 const [x, y] = d3.pointer(event);
//                 const date = xScale.invert(x);
//                 const room = yScale.domain()[Math.floor(y / yScale.step())];

//                 const status = data.find((d) => d.roomName === room).statusPoints.find(
//                     (d) => new Date(d.time) <= date && new Date(d.time) + 1000 > date
//                 ).status;

//                 console.log(`Room: ${room}, Status: ${status}`);
//             })
//         .selectAll(".bar")
//         .data((d) => d.statusPoints)
//         .enter()
//         .append("rect")
//             .attr("class", "bar")
//             .attr("x", (p) => xScale(new Date(p.time)))  //(d) => xScale(new Date(d.time))
//             .attr("y", 0)
//             .attr("width", (p) => scalePercent(p.duration))
//             .attr("height", 20)
//             .attr("fill", (p) => colorScale(p.status))
