import { BehaviorSubject, Observable, Subject, catchError, combineLatest, filter, map, mergeMap, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Facility, SvgMap } from '../api/models';
import { FacilityTimelineDashboardService, TimelineChartData } from '../facility-timeline-dashboard/facility-timeline-dashboard.service';

import {AlmPiService} from '../api/alm-pi.service';
import { PiDataFilter } from '../facility-timeline-dashboard/facility-timeline-dashboard.service';
import { PiWebApiService } from '../api/pi-webapi.service';
import { TimelineChartDataPoint } from '../facility-timeline-dashboard/facility-timeline-dashboard.service';

// import {
//   FacilityTimelineDashboardService,
//   PiDataFilter,
//   TimelineChartData,
//   locationStatusLookup
// } from '../facility-timeline-dashboard.service';



@Component({
  selector: 'app-pi-webapi-demo',
  templateUrl: './pi-webapi-demo.component.html',
  styleUrls: ['./pi-webapi-demo.component.css']
})
export class PiWebapiDemoComponent implements OnInit {

  constructor(public piWebApiService:PiWebApiService, 
    public almPiService: AlmPiService) { }

  ngOnInit(): void {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() -1 );

    // this.piWebApiService.timelineData('PET_1', 'Temp',start,end,60).subscribe(x=>{
    //   console.log(x);
    // })
    
    // this.almPiService.getWebId(`\\\\ORF-COGENAF\\cGMP\\cGMP\\PET_1\\1C482-1`).subscribe(x=>{
    //   //'https://orf-cogenaf.ors.nih.gov/piwebapi/elements?path=\\\\ORF-COGENAF\\cGMP\\cGMP\\PET_1\\1C482-1'

    //   console.log(x);
    // });


    const piDataFilter$ = of({
      facility:{
        sectionName:"PET_1"
      },
      status:"Temp",
      startDate:start,
      endDate:end,
      interval:60
    })

    piDataFilter$
    .pipe(
      // filter((f) => f.facilityOrPortfolio == 'facility'),
      mergeMap((filter: any) =>

        this.piWebApiService.timelineData(
          filter.facility.sectionName,
          filter.status,
          filter.startDate,
          filter.endDate,
          filter.interval
        )
          .pipe(
            catchError((err) => {
              console.log(
                'Error from dataService.facilityRoomsTimelineDate:' +
                  JSON.stringify(err)
              );
              return of([]);
            }),
            map((data) => ({ filter, data }))
          )
      )
    )
    .subscribe((dataAndFilter) => {
      const chartDataPoints: TimelineChartDataPoint[] = [];
      //const rooms = dataAndFilter.data.map((d) => d.room);
      // const roomLookup = keyBy(rooms, (r) => r.roomNumber);
      const timestamps = (dataAndFilter.data || [])
        .filter((x) => x.points.some(Boolean))
        .map((x) => x.points[0].timestamp);
      const minTimestamp = timestamps.reduce(function (a, b) {
        return a < b ? a : b;
      },Number.MAX_VALUE);

      for (const x of dataAndFilter.data) {
        if (!x.points.some(Boolean)) {
          x.points = [
            {
              timestamp: minTimestamp,
              numeric_value: 1
            },
            {
              timestamp: dataAndFilter.filter.endDate.getTime(),
              numeric_value: 1
            }
          ];
        }

        x.points.sort((a, b) => a.timestamp - b.timestamp);
        let startTime = x.points[0].timestamp;
        for (const y of x.points) {
          if (y.timestamp < dataAndFilter.filter.startDate.getTime()) {
            console.log('error - timestamp before request time');
          }
          const point: TimelineChartDataPoint = {
            locationName: x.location.roomNumber, //.room.roomNumber,
            tag: x.tag,
            startDate: new Date(startTime),
            endDate: new Date(Math.max(y.timestamp, startTime)),
            statusColor: this.statusColor(y.numeric_value),
            chillerStatusLabel: this.chillerStatusLabel(y.numeric_value)
          };

          startTime = y.timestamp;
          chartDataPoints.push(point);
        }
      }

      const locations:any = {};
      for(const d of dataAndFilter.data) {
        locations[d.location.roomNumber] =d.location
      }

      this._timelineChartData$.next({
        points: chartDataPoints,
        locations,
        locationType: 'room'
      });
    });
  }
  
  //timelineChartData$: Observable<TimelineChartData>;

  chartLabelClick($event: any) {
    // console.log($event);
  }

  chartLabelMouseOver($event: any) {
    //this.service.setHoveredTimelineLabel($event);
  }

  chartLabelMouseOut($event: any) {
    //this.service.setHoveredTimelineLabel('');
  }

  private statusColor = (statusVal: number) => {
    switch (statusVal) {
      case 0:
        return 'green';
      case 1:
        return 'gray';
      case 2:
        return 'yellow';
      case 3:
        return 'red';
      default:
        return 'lightgray';
    }
  };

  private chillerStatusLabel = (statusVal: number) => {
    switch (statusVal) {
      case 0:
        return 'Within Spec';
      case 1:
        return 'Comm Loss';
      case 2:
        return 'Warning';
      case 3:
        return 'Alarm (out of Spec)';
      default:
        return '';
    }
  };

  private _timelineChartData$ = new BehaviorSubject<TimelineChartData>({
    points: [],
    locations: {},
    // locationCount:0,
    locationType: 'facility'
  });

  public get timelineChartData$() {
    return this._timelineChartData$ as Observable<TimelineChartData>;
  } 

  

}
