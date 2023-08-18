import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

interface StatusPoint {
  time: Date;
  status: number;
}

interface EnhancedPoint extends StatusPoint {
  duration: number;
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

  private svg!: any;

  ngOnInit(): void {
    this.createSvg();
    this.createBars(this.chartData);
  }

  private dataPrep(points:StatusPoint[], minTime:Date, maxTime:Date): EnhancedPoint[]{

    points.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    if(points[0].time.getTime() !== minTime.getTime()) {
        points.unshift({time: minTime, status: points[0].status})
    }
    if(points[points.length - 1].time.getTime() !== maxTime.getTime()) {
        points.push({time: maxTime, status: points[points.length - 1].status})
    }
    const enhancedPoints:EnhancedPoint[] = [];
    for(let i=0; i<points.length-1; i++) {
      const duration = points[i+1].time.getTime() - points[i].time.getTime();
      const enhancedPoint = {...points[i], duration};
      enhancedPoints.push(enhancedPoint);
    }
    return enhancedPoints;
  }

  private createSvg(): void {
    const svgParams = this.chartParams.svg;
    this.svg = d3.select("figure#timelineChart")
      .append("svg")
      .attr("width", svgParams.width)
      .attr("height", svgParams.height)
      .attr("style", "border: 1px solid black")
      .append("g")
      .attr("transform", "translate(" + this.chartParams.svg.margin.left+ "," + svgParams.margin.top + ")");
  }

  private createBars(data: RoomStatusData[]): void {
    const minTime = d3.min(data.flatMap((d) => d.statusPoints), (d) => new Date(d.time)) || new Date();
    const maxTime = d3.max(data.flatMap((d) => d.statusPoints), (d) => new Date(d.time)) || new Date();

    const svgParams = this.chartParams.svg;
    const chartWidth = svgParams.width - svgParams.margin.left - svgParams.margin.right;
    const chartHeight = svgParams.height - svgParams.margin.top - svgParams.margin.bottom;

    const timeRange = maxTime.getTime() - minTime.getTime();

    const preparedData = data.map((d) => ({
      roomName: d.roomName, 
      statusPoints: this.dataPrep(d.statusPoints, minTime, maxTime)
    }));

    const scaleDuration = d3.scaleLinear().domain([0, timeRange]).range([0, chartWidth]);

    const colorScale = d3
      .scaleOrdinal()
      .domain(['0', '1', '2'])
      .range(["green", "yellow", "red"]);

    // xAxis setup
    const xScale = 
      d3.scaleTime().range([0, chartWidth])
        .domain([minTime, maxTime]);
    const xAxis = d3.axisBottom(xScale);
    this.svg.append("g").attr("transform", `translate(0, ${chartHeight })`).call(xAxis);

    // yAxis setup
    const yScale = d3.scaleBand().range([0, chartHeight]);
    const yAxis = d3.axisLeft(yScale);
    yScale.domain(data.map((d) => d.roomName));
    this.svg.append("g").call(yAxis);

    const barGroup =     
      this.svg
        .selectAll(".bar-group")
        .data(preparedData)
        .enter()
            .append("g")
                .attr("class", "bar-group")
                .attr("transform", (d:RoomStatusData) => `translate(0,${(yScale(d.roomName!) || 0) + this.chartParams.row.height/2 })`)

    // create row container rectangle
    barGroup.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", chartWidth)
      .attr("height", this.chartParams.row.height)
      .attr("fill", (_:undefined,i:number)=> i%2 ? "gray": "lightgray")

    // create timeline pieces
    barGroup
      .append("g")
      .attr("class", "bar-points")
      .attr("transform", `translate(0,${(this.chartParams.row.height - this.chartParams.bar.height)/2 })`)
      .selectAll(".bar")
      .data((d:RoomStatusData) => d.statusPoints)
      .enter()
      .append("rect")
          .attr("class", "bar")
          .attr("x", (p:EnhancedPoint) => xScale(new Date(p.time))) 
          .attr("y", 0)
          .attr("width", (p:EnhancedPoint) => scaleDuration(p.duration))
          .attr("height", this.chartParams.bar.height)
          .attr("fill", (p:EnhancedPoint) => colorScale(String(p.status)))
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
