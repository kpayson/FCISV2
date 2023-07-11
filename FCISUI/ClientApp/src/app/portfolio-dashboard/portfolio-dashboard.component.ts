import { BehaviorSubject, Observable, Subject, catchError, map, mergeMap, of } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import {
  TimelineChartData,
  TimelineChartDataPoint
} from '../facility-timeline-dashboard/facility-timeline-dashboard.service';
import { keyBy, reduce } from 'lodash';

import { ActivatedRoute } from '@angular/router';
import { DataService } from '../api/data.service';
import { FacilityGsf } from '../api/models';
import { PiWebApiService } from '../api/pi-webapi.service';

@Component({
  selector: 'app-portfolio-dashboard',
  templateUrl: './portfolio-dashboard.component.html',
  styleUrls: ['./portfolio-dashboard.component.css']
})
export class PortfolioDashboardComponent implements OnInit {

  growthByFacilityData$: Observable<FacilityGsf[]>;
  private _timelineChartData$: Subject<TimelineChartData> = new BehaviorSubject<TimelineChartData>({
    points: [],
    locations: {},
    locationType: 'facility'
  });
  public get timelineChartData$() {
    return this._timelineChartData$ as Observable<TimelineChartData>;
  }

  chartBaseOptions = {
    pieHole: 0.5,
    pieSliceText: 'none'
  }
  
  ccAllColors = [
    '#94762d',  // 2J
    '#b5fd19', // IIVAU
    '#fb09bf', // Pet_1
    'darkviolet', // Pet_B3
    '#00ffff', // T30
    '#c9363c'
  ];

  cceColors = ['#94762d'];
  ccPharmacyColors = ['#b5fd19'];
  ccOtherColors = ['#fb09bf'];
  nciColors = ['#00ffff'];

  chartOptions:any
  

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private piWebApiService: PiWebApiService) {
    this.growthByFacilityData$ = this.activatedRoute.params.pipe(
      mergeMap(p => this.dataService.gsfByFacility(p.portfolioId)),
      map((d: any) => d.map((x: any) => [x.facility, x.gsf]))
    )

    this.activatedRoute.params.subscribe(p=>{
      const portfolioId = p['portfolioId'].toLowerCase();
      const colors = portfolioId === 'cc' ?
        [
          '#94762d',  // 2J
          'orange', // ??
          '#b5fd19', // IIVAU,
          '#fb09bf', // Pet_1
          'darkviolet', // Pet_B3
        ] : portfolioId === 'cce' ? ['#94762d'] :
        portfolioId === 'ccpharmacy' ? ['#b5fd19'] :
        portfolioId === 'ccother' ? ['#fb09bf','darkviolet'] :
        portfolioId === 'nci' ? [
          'lightblue', 
          '#00ffff', 
          'deepskyblue',
          'blue',
          ] :
        [];

        this.chartOptions = {...this.chartBaseOptions, colors}
    })

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);


    this.activatedRoute.params.pipe(
      mergeMap((p: any) =>
        //this.dataService
        this.piWebApiService
          .facilityAlltimelineData(
            p.portfolioId,
            twoDaysAgo,
            new Date(),
            30
          )

          .pipe(
            catchError((err) => {
              console.log(
                'Error from dataService.facilityAlltimelineData:' +
                JSON.stringify(err)
              );
              return of([]);
            })
          )
      )
    )
      .subscribe((data) => {
        const chartDataPoints: TimelineChartDataPoint[] = [];
        const facilities = data.map((d) => d.facility);
        const facilityLookup = keyBy(facilities, (f) => f.facilityName);
        const timestamps = (data || [])
          .filter((x) => x.points.some(Boolean))
          .map((x) => x.points[0].timestamp);
        const minTimestamp = timestamps.reduce(function (a, b) {
          return a < b ? a : b;
        }, Number.MAX_VALUE);

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 2);

        for (const x of data) {
          if (!x.points.some(Boolean)) {
            x.points = [
              {
                timestamp: minTimestamp,
                numeric_value: 1
              },
              {
                timestamp: endDate.getTime(),
                numeric_value: 1
              }
            ];
          }

          x.points.sort((a, b) => a.timestamp - b.timestamp);
          let startTime = x.points[0].timestamp;
          for (const y of x.points.sort((a, b) => a.timestamp - b.timestamp)) {
            if (y.timestamp < startDate.getTime()) {
              console.log('error - timestamp before request time');
            }
            const point: TimelineChartDataPoint = {
              locationName: x.facility.facilityName,
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

        this._timelineChartData$.next({
          points: chartDataPoints,
          locations: facilityLookup,
          locationType: 'facility'
        });
      });





  }
  ngOnInit(): void {

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
        return 'Alarm (our of Spec)';
      default:
        return '';
    }
  };
}
