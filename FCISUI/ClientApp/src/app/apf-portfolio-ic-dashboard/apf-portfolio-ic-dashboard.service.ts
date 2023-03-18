import { BehaviorSubject, Observable, combineLatest, distinctUntilChanged, filter, map, mergeMap, of, zip } from 'rxjs';
import { Facility, LocationCurrentStatus, LocationTimeSeriesData, Room, SvgMap, TimeSeriesPoint } from 'src/app/api/models';
import { keyBy, reduce } from 'lodash';

import { DataService } from 'src/app/api/data.service';
import { Injectable } from '@angular/core';

// import {RoomDisplayField} from '../room-data-table/room-data-table.component';

interface PiDataFilter {
  facility: number,
  status: string,
  startDate: Date,
  endDate: Date,
  interval: number
}

interface TimelineChartDataPoint {
  locationName: string,
  tag: string,
  // statusValue:number,
  chillerStatusLabel: string,
  statusColor: string,
  startDate: Date,
  endDate: Date,
}

export interface RoomDisplayField {
  name: string;
  value: string;
  displayType?: 'status' | 'string'
}

export interface TimelineChartData {
  points: TimelineChartDataPoint[],
  locations: { [name: string]: any }
  locationType: 'room' | 'facility'
}

export type locationStatusLookup = { [name: string]: string };


@Injectable()
export class ApfPortfolioIcDashboardService {
  constructor(private dataService: DataService) {

    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 1);

    const defaultEndDate = new Date();

    this._piDataFilter$ = new BehaviorSubject<PiDataFilter>({
      facility: 0,
      status: '',
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      interval: 10
    });

    this._svgMap$ = new BehaviorSubject<SvgMap>({ name: 'apf_facility_all', backgroundSvg: "", id: 0, svgMapPins: [], viewbox: "0 0 0 0", defs: "", facilityId: 0 });
    this._svgMapBackgroundImageUrl$ = new BehaviorSubject<string>('');
    this._currentStatusValues$ = new BehaviorSubject<locationStatusLookup>({})
    this._timelineChartData$ = new BehaviorSubject<TimelineChartData>({ points: [], locations: {}, locationType: 'facility' });
    this._selectedPin$ = new BehaviorSubject<string>('');
    this._selectedRoomInfo$ = new BehaviorSubject<RoomDisplayField[]>([]);
    this._hoveredPin$ = new BehaviorSubject<string>('');
    this._hoveredTimelineLabel$ = new BehaviorSubject<string>('');

    const selectedFacility$ =
      this._piDataFilter$.pipe(
        distinctUntilChanged((prev, curr) => prev.facility === curr.facility),
        map(f => f.facility)
      );

    // Update the SVG floor plan when the facility changes
    selectedFacility$.pipe(
      mergeMap(facility => zip(this.dataService.svgMap(facility), this.dataService.facilityCurrentStatusData(facility)))
    ).subscribe(([svgMap, currentStatusValues]) => {
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

      this._selectedPin$.next('');
    });

    // set the selected room info when a room pin on the map is selected
    // combineLatest([
    //   this._selectedPin$,
    //   this._timelineChartData$
    // ]).pipe(map(([pin,data])=>{
    //     return (data.locationType !== 'room' || !pin) ? {} :data.locations[pin]
    // })).subscribe(room => {
    //   const info = Object.keys(room).map(k=>{
    //     return{
    //       name:k,
    //       value: room[k],
    //       displayType:'string'
    //     }
    //   });
    //   this._selectedRoomInfo$.next(info);
    // });
    // combineLatest([
    //   this._selectedPin$.pipe(filter(pin => Boolean(pin))),
    //   this._piDataFilter$.pipe(filter(f => f.facility != 0))
    // ]).pipe(mergeMap(([pin,filter])=>{
    //   return this.dataService.roomStatusInfo(filter.facility,pin,filter.status)
    // }))
    this._selectedPin$.pipe(mergeMap((pin) => {
      const filter = this._piDataFilter$.value;
      if (filter.facility == 0 || !pin) {
        return of([])
      } else {
        return this.dataService.roomStatusInfo(filter.facility, pin, filter.status)
      }
    }))
      .subscribe(room => {

        const info = Object.keys(room).map(k => {
          return {
            name: k,
            value: room[k],
            displayType: 'string'
          }
        });
        this._selectedRoomInfo$.next(info);
      });


    // Prepare timeline data for All Facilities Timeline (facilityId == 0)
    this._piDataFilter$.pipe(
      filter(f => f.facility == 0),
      mergeMap(
        (filter: PiDataFilter) =>
          this.dataService.facilityAlltimelineData(filter.startDate, filter.endDate, filter.interval)
            .pipe(map(data => ({ filter, data })))
      )
    )
      .subscribe((dataAndFilter) => {
        const chartDataPoints: TimelineChartDataPoint[] = [];
        const facilities = dataAndFilter.data.map(d => d.facility);
        const facilityLookup = keyBy(facilities, f => f.facilityName)

        for (const x of dataAndFilter.data) {
          if (!x.points.some(Boolean)) {
            x.points = [
              {
                timestamp: dataAndFilter.filter.startDate.getTime(),
                numeric_value: 1
              },
              {
                timestamp: dataAndFilter.filter.endDate.getTime(),
                numeric_value: 1
              }
            ]
          }

          x.points.sort((a, b) => a.timestamp - b.timestamp);
          let startTime = x.points[0].timestamp;
          for (const y of x.points.sort((a, b) => a.timestamp - b.timestamp)) {
            if (y.timestamp < dataAndFilter.filter.startDate.getTime()) {
              console.log("error - timestamp before request time")
            }
            const point: TimelineChartDataPoint = {
              locationName: x.facility.facilityName,
              tag: x.tag,
              startDate: new Date(startTime),
              endDate: new Date(Math.max(y.timestamp, startTime)),
              statusColor: this.statusColor(y.numeric_value),
              chillerStatusLabel: this.chillerStatusLabel(y.numeric_value),
            }

            startTime = y.timestamp
            chartDataPoints.push(point);
          }
        }

        this._timelineChartData$.next({ points: chartDataPoints, locations: facilityLookup, locationType: 'facility' })
      });


    // prepare data for specific facility timeline
    this._piDataFilter$.pipe(
      filter(f => f.facility != 0),
      mergeMap(
        (filter: PiDataFilter) =>
          this.dataService.facilityRoomsTimelineDate(filter.facility, filter.status, filter.startDate, filter.endDate, filter.interval)
            .pipe(map(data => ({ filter, data })))
      )
    )
      .subscribe((dataAndFilter) => {
        const chartDataPoints: TimelineChartDataPoint[] = []
        const rooms = dataAndFilter.data.map(d => d.room);
        const roomLookup = keyBy(rooms, r => r.roomNumber)
        // roomInfo: {
        //   roomName: x.room.roomName,
        //   roomNumber: x.room.roomNumber,
        //   iso: x.room.iso,
        //   sq: x.room.sq
        // }

        // var tooltips = dataAndFilter.data[0]

        for (const x of dataAndFilter.data) {
          if (!x.points.some(Boolean)) {
            x.points = [
              {
                timestamp: dataAndFilter.filter.startDate.getTime(),
                numeric_value: 1
              },
              {
                timestamp: dataAndFilter.filter.endDate.getTime(),
                numeric_value: 1
              }
            ]
          }

          x.points.sort((a, b) => a.timestamp - b.timestamp);
          let startTime = x.points[0].timestamp;
          for (const y of x.points.sort((a, b) => a.timestamp - b.timestamp)) {
            if (y.timestamp < dataAndFilter.filter.startDate.getTime()) {
              console.log("error - timestamp before request time")
            }
            const point: TimelineChartDataPoint = {
              locationName: x.room.roomNumber,
              tag: x.tag,
              startDate: new Date(startTime),
              endDate: new Date(Math.max(y.timestamp, startTime)),
              statusColor: this.statusColor(y.numeric_value),
              chillerStatusLabel: this.chillerStatusLabel(y.numeric_value),
            }

            startTime = y.timestamp
            chartDataPoints.push(point);
          }
        }

        this._timelineChartData$.next({ points: chartDataPoints, locations: roomLookup, locationType: 'room' })
      })


  }
  private _piDataFilter$: BehaviorSubject<PiDataFilter>;
  public filterPiData(filter: PiDataFilter) {
    this._piDataFilter$.next(filter);
  }

  public get isFacilityAll$() {
    return this._piDataFilter$.pipe(map(f => {
      return Number(f.facility) === 0
    }))
  }

  private _svgMap$: BehaviorSubject<SvgMap>;
  public get svgMap$() {
    return this._svgMap$ as Observable<SvgMap>;
  }

  private _currentStatusValues$: BehaviorSubject<locationStatusLookup>;
  public get currentStatusValues$() {
    return this._currentStatusValues$ as Observable<locationStatusLookup>
  }

  private _timelineChartData$: BehaviorSubject<TimelineChartData>;
  public get timelineChartData$() {
    return this._timelineChartData$ as Observable<TimelineChartData>;
  }

  private _svgMapBackgroundImageUrl$: BehaviorSubject<string>;
  public get svgMapBackgroundImageUrl$() {
    return this._svgMapBackgroundImageUrl$ as Observable<string>;
  }

  private _selectedPin$: BehaviorSubject<string>;
  public get selectedPin$() {
    return this._selectedPin$ as Observable<string>;
  }

  private _hoveredPin$: BehaviorSubject<string>;
  public get hoveredPin$() {
    return this._hoveredPin$ as Observable<string>;
  }

  private _hoveredTimelineLabel$: BehaviorSubject<string>;
  public get hoveredTimelineLabel$() {
    return this._hoveredTimelineLabel$ as Observable<string>;
  }

  private _selectedRoomInfo$: BehaviorSubject<any>;
  public get selectedRoomInfo$() {
    return this._selectedRoomInfo$ as Observable<any>;
  }

  public setSelectedPin(pinName: string) {
    this._selectedPin$.next(pinName);
  }

  public setHoveredPin(pinName: string) {
    this._hoveredPin$.next(pinName);
  }

  public setHoveredTimelineLabel(label: string) {
    this._hoveredTimelineLabel$.next(label);
  }




  private statusColor = (statusVal: number) => {
    switch (statusVal) {
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

  private chillerStatusLabel = (statusVal: number) => {
    switch (statusVal) {
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
        return [{ name: `All ${targetIC.toLocaleUpperCase()}`, value: '0' }, ...facilityOptions];
      }

      )
    )
  }


}
