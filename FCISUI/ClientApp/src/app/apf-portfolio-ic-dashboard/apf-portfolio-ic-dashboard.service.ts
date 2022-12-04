import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { TimelineDataPoint, DataService } from 'src/app/data.service';

interface PiDataFilter {
  facility:number,
  status:string,
  startDate:Date,
  endDate:Date,
  interval:number
}

@Injectable()
export class ApfPortfolioIcDashboardService {
  constructor(private dataService: DataService) {

    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 1);

    const defaultEndDate = new Date();

    this._piDataFilter$ = new BehaviorSubject<PiDataFilter>({
      facility:0,
      status:'',
      startDate:defaultStartDate,
      endDate:defaultEndDate,
      interval:10
    })

    // this._facilityFilter$ = new BehaviorSubject<number>(0);
    // this._statusFilter$ = new BehaviorSubject<string>("");
    // this._startDateFilter$ = new BehaviorSubject<Date>(defaultStartDate);
    // this._endDateFilter$ = new BehaviorSubject<Date>(defaultEndDate);
    // this._intervalFilter$ = new BehaviorSubject<number>(10);
    this._timeline$ = new BehaviorSubject<TimelineDataPoint[]>([]);

    // const filters = [this._facilityFilter$, this._statusFilter$, this._startDateFilter$, this._endDateFilter$, this._intervalFilter$]
    // combineLatest(this._facilityFilter$, this._statusFilter$, this._startDateFilter$, this._endDateFilter$, this._intervalFilter$)
    //   .pipe(mergeMap(([facility,status,startDate,endDate,interval])=>this.dataService.chlTimelineData(startDate, endDate, facility, status, interval)))

    //   .subscribe((timelineData) => {
    //     this._timeline$.next(timelineData)
    //   })

    this._piDataFilter$.pipe(mergeMap(
      (filter)=>this.dataService.chlTimelineData(filter.startDate,filter.endDate,filter.facility,filter.status,filter.interval)))
      .subscribe((data)=>{
        this._timeline$.next(data)
      })
  }
  private _piDataFilter$: BehaviorSubject<PiDataFilter>;

  public filterPiData(filter:PiDataFilter){
    this._piDataFilter$.next(filter);
  }

  // private _facilityFilter$: BehaviorSubject<number>;
  // private _statusFilter$: BehaviorSubject<string>;
  // private _startDateFilter$: BehaviorSubject<Date>;
  // private _endDateFilter$: BehaviorSubject<Date>;
  // private _intervalFilter$: BehaviorSubject<number>;
  private _timeline$: BehaviorSubject<TimelineDataPoint[]>;

  // public filterByFacility(facility: number) {
  //   this._facilityFilter$.next(facility)
  // }

  // public filterByStatus(status: string) {
  //   this._statusFilter$.next(status)
  // }

  // public filterByStartDate(startDate: Date) {
  //   this._startDateFilter$.next(startDate)
  // }

  // public filterByEndtDate(endDate: Date) {
  //   this._endDateFilter$.next(endDate)
  // }

  // public filterByInterval(interval: number) {
  //   this._intervalFilter$.next(interval);
  // }


  public get timeline$() {
    return this._timeline$ as Observable<TimelineDataPoint[]>;
  }


  public gsfGrowthByClassification$ = this.dataService
    .gsfGrowthByClassification()
    .pipe(
      map((d: any) =>
        d.map((x: any) => {
          const goLiveDate = new Date(x.goLiveDate);
          return [
            goLiveDate,
            x.cncRoomsArea + x.iso8RoomsArea + x.iso7RoomsArea,
            x.criticalEnvironmentParametersCount
          ];
        })
      )
    );

  public facilityFilterOptions(ic: string): Observable<{ name: string, value: string }[]> {
    const targetIC = ic.toLowerCase()
    return this.dataService.facilities().pipe(
      map((facs: any[]) =>
        facs
          .filter((fac: any) => {
            return (fac.facilityIc || "").toLowerCase() === targetIC
          })
          .map((fac: any) => {
             const option = { name: fac.facilityName, value: fac.facilityId };
             return option;
          })
      )
    )
  }


  // private chlDataTransformForChart = (row: any) => {
  //   const statusColor = (status: string) => {
  //     switch (status) {
  //       case 'Within Spec':
  //         return 'green';
  //       case 'Comm Loss':
  //         return 'gray';
  //       case 'Warning':
  //         return 'yellow';
  //       case 'Alarm (Out of Spec)':
  //         return 'red';
  //       default:
  //         return 'white';
  //     }
  //   };

  //   const createCustomHTMLContentTableDP = (name: string) => {
  //     return (
  //       '<div align="left" style="max-width: 300px; padding:5px 5px 5px 5px;">' +
  //       '<table>' +
  //       '<tr><th>' +
  //       'Name: ' +
  //       name +
  //       '</th></tr>' +
  //       '</table>' +
  //       '</div>'
  //     );
  //   };

  //   const createCustomHTMLContentTable = (
  //     roomName: string,
  //     roomNumber: string,
  //     className: string,
  //     gsf: string
  //   ) => {
  //     return (
  //       '<div align="left" style="max-width: 300px; padding:5px 5px 5px 5px;">' +
  //       '<table>' +
  //       '<tr><th>' +
  //       'Room: ' +
  //       roomName +
  //       '</th></tr>' +
  //       '<tr><td><b>' +
  //       'Room #: ' +
  //       roomNumber +
  //       '</b></td>' +
  //       '</tr>' +
  //       '<tr><td><b>' +
  //       'Class: ' +
  //       className +
  //       '</b></td>' +
  //       '</tr>' +
  //       '<tr><td><b>' +
  //       'GSF: ' +
  //       gsf +
  //       '</b></td>' +
  //       '</tr>' +
  //       '</table>' +
  //       '</div>'
  //     );
  //   };

  //   const tooltipText = (data: any) => {
  //     return data.statusAttr === 'DP'
  //       ? createCustomHTMLContentTableDP(data.roomNumber)
  //       : createCustomHTMLContentTable(
  //           data.roomName,
  //           data.roomNumber,
  //           data.class,
  //           data.gsf
  //         );
  //   };

  //   return [
  //     row.roomName,
  //     tooltipText(row),
  //     row.chillerStatus,
  //     statusColor(row.chillerStatus),
  //     row.startTime,
  //     row.endTime
  //   ];
  // };

  // chlTimeline = (
  //   startDate: Date,
  //   endDate: Date,
  //   facid: any,
  //   atr: any,
  //   interval: any
  // ) => {
  //   return this.dataService
  //     .chlTimelineData(startDate, endDate, facid, atr, interval)
  //     .pipe(map((d) => d.map(this.chlDataTransformForChart)));
  //   // return of(
  //   // [
  //   //   [ 'Washington', '','','', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
  //   //   [ 'Adams',      '','','', new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
  //   //   [ 'Jefferson',  '','','', new Date(1801, 2, 4),  new Date(1809, 2, 4) ]
  //   // ]);
  // };
}
