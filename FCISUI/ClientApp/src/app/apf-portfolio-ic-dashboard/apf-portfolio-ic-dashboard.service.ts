import { BehaviorSubject, Observable, distinctUntilChanged, filter, map, mergeMap, of, zip } from 'rxjs';
import { LocationCurrentStatus, LocationTimeSeriesData, SvgMap, TimeSeriesPoint } from 'src/app/api/models';

import { DataService } from 'src/app/api/data.service';
import { Injectable } from '@angular/core';
import { reduce } from 'lodash';

interface PiDataFilter {
  facility:number,
  status:string,
  startDate:Date,
  endDate:Date,
  interval:number
}

interface ChartDataPoint {
  locationName:string,
  tag:string,
  // statusValue:number,
  chillerStatusLabel:string,
  statusColor:string,
  startDate:Date,
  endDate:Date,
  roomInfo?:any
}

export type locationStatusLookup = { [name: string]: string };


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
    });

    this._svgMap$ = new BehaviorSubject<SvgMap>({name:'apf_facility_all', backgroundSvg:"", id:0, svgMapPins:[],viewbox:"0 0 0 0", defs:"", facilityId:0 });
    this._svgMapBackgroundImageUrl$ = new BehaviorSubject<string>('');
    
    this._piDataFilter$.pipe(
      distinctUntilChanged((prev,curr)=>prev.facility === curr.facility),
      mergeMap(filter=>zip(this.dataService.svgMap(filter.facility),this.dataService.facilityCurrentStatusData(filter.facility)))
    ).subscribe(([svgMap,currentStatusValues])=>{
        this._svgMap$.next(svgMap);
        this._svgMapBackgroundImageUrl$.next(
          `/assets/images/floor-plans/${svgMap.name}_Background.png`
          // this.dataService.svgMapBackgroundUrl(svgMap.facilityId)
          );

        const valueLookup = reduce(
          currentStatusValues,
          (acc, { locationName, statusPoint }) => ({ ...acc, [locationName]: this.statusColor(statusPoint.numeric_value) }),
          {}
        )

        this._currentStatusValues$.next(valueLookup);
    })

    this._currentStatusValues$ = new BehaviorSubject<locationStatusLookup>({})

    this._timeline$ = new BehaviorSubject<ChartDataPoint[]>([]);
   
    this._piDataFilter$.pipe(mergeMap(
      (filter:PiDataFilter)=>zip(
        of(filter),
        this.dataService.timelineData(filter.facility, filter.status, filter.startDate, filter.endDate, filter.interval))))
      .subscribe((dataAndFilter:[filter:PiDataFilter,data:LocationTimeSeriesData[]])=>{
        const chartData:ChartDataPoint[] = []
         
        for(const x of dataAndFilter[1]) {
          if(! x.points.some(Boolean)) { continue; }
          x.points.sort((a,b)=>a.timestamp - b.timestamp);
          let startTime = x.points[0].timestamp;
          let status = x.points[0].numeric_value;
          for(const y of x.points.sort((a,b)=>a.timestamp - b.timestamp)){
            if(y.timestamp < dataAndFilter[0].startDate.getTime()) {
              console.log("error - timestamp before request time")
            }
            const point:ChartDataPoint = {
              locationName:x.locationName,
              tag:x.tag,
              startDate:new Date(startTime),
              endDate:new Date(Math.max(y.timestamp,startTime)),
              statusColor: this.statusColor(y.numeric_value),
              chillerStatusLabel: this.chillerStatusLabel(y.numeric_value),

              roomInfo: {
                // roomName:y.roomName || '',
                // iso:y.iso || '',
                // sq:y.sq || ''
              }
            }

            startTime = y.timestamp
            chartData.push(point);
          }

          // for(const y of x.points) {
          //   if(y.numeric_value !== status) {
          //     const point:ChartDataPoint = {
          //       locationName:x.locationName,
          //       tag:x.tag,
          //       startTime:startTime,
          //       endTime:y.timestamp,
          //       statusValue:y.numeric_value,
          //       roomInfo: {
          //         // roomName:y.roomName || '',
          //         // iso:y.iso || '',
          //         // sq:y.sq || ''
          //       }
          //     }
          //     startTime = y.timestamp
          //     chartData.push(point);
          //   }
          // }
          // const p = x.points[x.points.length -1];
          // const point:ChartDataPoint = {
          //   locationName:x.locationName,
          //   tag:x.tag,
          //   startTime:startTime,
          //   endTime:p.timestamp,
          //   statusValue:p.numeric_value,
          //   roomInfo: {
          //     // roomName:y.roomName || '',
          //     // iso:y.iso || '',
          //     // sq:y.sq || ''
          //   }
          // }
          //chartData.push(point);


          // for(const y of x.points.sort((a,b)=>a.timestamp - b.timestamp)){
          //   const point:ChartDataPoint = {
          //     locationName:x.locationName,
          //     tag:x.tag,
          //     startTime:startTime,
          //     endTime:y.timestamp,
          //     statusValue:y.numeric_value,
          //     roomInfo: {
          //       // roomName:y.roomName || '',
          //       // iso:y.iso || '',
          //       // sq:y.sq || ''
          //     }
          //   }
          //   if(point.startTime > point.endTime) {
          //     console.log('error');
          //   }
          //   startTime = y.timestamp
          //   chartData.push(point);
          // }
        }
        
        this._timeline$.next(chartData)
      })
  }
  private _piDataFilter$: BehaviorSubject<PiDataFilter>;
  public filterPiData(filter:PiDataFilter){
    this._piDataFilter$.next(filter);
  }

  private _svgMap$: BehaviorSubject<SvgMap>;
  public get svgMap$() {
    return this._svgMap$ as Observable<SvgMap>;
  }

  private _currentStatusValues$: BehaviorSubject<locationStatusLookup>;
  public get currentStatusValues$() {
    return this._currentStatusValues$ as Observable<locationStatusLookup>
  }

  private _timeline$: BehaviorSubject<ChartDataPoint[]>;
  public get timeline$() {
    return this._timeline$ as Observable<ChartDataPoint[]>;
  }

  private _svgMapBackgroundImageUrl$: BehaviorSubject<string>;
  public get svgMapBackgroundImageUrl$() {
    return this._svgMapBackgroundImageUrl$ as Observable<string>;
  }

  private statusColor = (statusVal:number) => {
    switch(statusVal){
      case 0:
        return "green";
      case 1: 
        return "gray";
      case 2:
         return "yellow";
      case 3:
          return "red";
      default:
        return "lightgray";
    }
  }

  private chillerStatusLabel = (statusVal:number) => {
    switch(statusVal){
      case 0:
        return "Within Spec";
      case 1: 
        return "Comm Loss";
      case 2:
         return "Warning";
      case 3:
          return "Alarm (our of Spec)";
      default:
          return "";
    }
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
      map((facs: any[]) => {
        const facilityOptions = 
          facs
          .filter((fac: any) => {
            return (fac.facilityIc || "").toLowerCase() === targetIC
          })
          .map((fac: any) => {
            const option = { name: fac.facilityName, value: fac.facilityId };
            return option;
          })
          return [{name:`All ${targetIC.toLocaleUpperCase()}`, value:'0'},...facilityOptions];
      }

      )
    )
  }

}
