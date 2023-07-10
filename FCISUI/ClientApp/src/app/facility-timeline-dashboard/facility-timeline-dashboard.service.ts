import {
    BehaviorSubject,
    Observable,
    Subject,
    combineLatest,
    distinctUntilChanged,
    filter,
    map,
    mergeMap,
    of,
    zip
} from 'rxjs';
import {
    LocationCurrentStatus,
    Room,
    SvgMap,
} from 'src/app/api/models';
import { keyBy, reduce } from 'lodash';

import { DataService } from 'src/app/api/data.service';
import { Injectable } from '@angular/core';
import { PiWebApiService } from '../api/pi-webapi.service';
import { catchError } from 'rxjs/operators';

export interface PiDataFilter {
    facility: { repName?: string; sectionName: string; value: number };
    //portfolioId: string;
    //facilityOrPortfolio: 'facility' | 'portfolio'
    status: string;
    startDate: Date;
    endDate: Date;
    interval: number;
  }
  
  export interface TimelineChartDataPoint {
    locationName: string;
    tag: string;
    // statusValue:number,
    chillerStatusLabel: string;
    statusColor: string;
    startDate: Date;
    endDate: Date;
  }
  
  export interface RoomDisplayField {
    name: string;
    value: string;
    displayType?: string;
  }
  
  export interface TimelineChartData {
    points: TimelineChartDataPoint[];
    locations: { [name: string]: any };
    // locationCount: number;
    locationType: 'room' | 'facility';
  }
  
  export interface StatusPoint {
    timeStamp: number;
    numeric_value: number;
  }
  
  export type locationStatusLookup = { [name: string]: string };
  export type roomInfoLookup = { [name: string]: string };
  export type apfLimitsLookup = { [facRoomKey: string]: any };
  
  @Injectable()
  export class FacilityTimelineDashboardService {
    constructor(private dataService: DataService, private piWebApiService:PiWebApiService) {
      const defaultStartDate = new Date();
      defaultStartDate.setDate(defaultStartDate.getDate() - 1);
  
      const defaultEndDate = new Date();
  
      this._piDataFilter$ = new Subject<PiDataFilter>()
      // new BehaviorSubject<PiDataFilter>({
      //   facility: { repName: '', sectionName: '', value: 0 },
      //   portfolioId: '',
      //   facilityOrPortfolio: 'facility',
      //   status: '',
      //   startDate: defaultStartDate,
      //   endDate: defaultEndDate,
      //   interval: 10
      // });
  
      this._ic$ = new BehaviorSubject<string>('');
      this._facilityFilterOptions$ = new BehaviorSubject<
        { repName: string; sectionName: string; value: string }[]
      >([]);
      this._svgMap$ = new BehaviorSubject<SvgMap>({
        name: 'apf_facility_all',
        backgroundSvg: '',
        id: 0,
        svgMapPins: [],
        svgMapArrows: [],
        viewbox: '0 0 0 0',
        defs: '',
        facilityId: 0
      });
      this._svgMapBackgroundImageUrl$ = new BehaviorSubject<string>('');
      this._currentStatusValues$ = new BehaviorSubject<LocationCurrentStatus[]>(
        []
      );
      this._parameterValues$ = new BehaviorSubject<Room[]>([]);
      this._timelineChartData$ = new BehaviorSubject<TimelineChartData>({
        points: [],
        locations: {},
        //locationCount:0,
        locationType: 'facility'
      });
      this._selectedPin$ = new BehaviorSubject<string>('');
      this._selectedRoomInfo$ = new BehaviorSubject<roomInfoLookup>({});
      this._hoveredPin$ = new BehaviorSubject<string>('');
      this._hoveredTimelineLabel$ = new BehaviorSubject<string>('');
      this._apfLimits$ = new BehaviorSubject<apfLimitsLookup>({});
      this._pinStates = new BehaviorSubject<locationStatusLookup>({});
  
      // Set the list of Facilities when the IC changes
      // this._ic$
      //   .pipe(
      //     filter(Boolean),
      //     mergeMap((ic: string) => {
      //       return this.dataService.facilitiesByIC(ic).pipe(
      //         map((facs) => {
      //           const facilityOptions = facs.map((fac: any) => {
      //             const option = {
      //               repName: fac.facilityRepName,
      //               sectionName: fac.facilitySection,
      //               value: fac.facilityId
      //             };
      //             return option;
      //           });
      //           const all = [
      //             {
      //               repName: `All ${ic.toLocaleUpperCase()}`,
      //               sectionName: '',
      //               value: '0'
      //             },
      //             ...facilityOptions
      //           ];
      //           return all;
      //         })
      //       );
      //     })
      //   )
      //   .subscribe((facOptions) => {
      //     this._facilityFilterOptions$.next(facOptions);
      //   });
  
      // Setup APF Limits from PI for all facilities
      //this.dataService.apfLimits().subscribe((limits: any[]) => {
      this.piWebApiService.apfLimits().subscribe((limits: any[]) => {

        const limitsLookup:{[key:string]:string} = {};

        try {
          for(let limit of limits) {
            if(limit.Conn_Room) {
              const name1 = limit.Conn_Room ? `${limit.Room}_${limit.Conn_Room}_DP` : limit.Room;
              const name2 = limit.Conn_Room ? `${limit.Conn_Room}_${limit.Room}_DP` : limit.Room;
              limitsLookup[`${limit.Facility.toLowerCase()}|${name1.toLowerCase()}`] = limit;
              limitsLookup[`${limit.Facility.toLowerCase()}|${name2.toLowerCase()}`] = limit;
            }
            else {
              limitsLookup[`${limit.Facility.toLowerCase()}|${limit.Room.toLowerCase()}`] = limit
            }
          }
        }
        catch(e){
          console.log(e)
        }


        // const limitsLookup = reduce(limits, (acc, limit) => {
          
        //   if(limit.Conn_Room) {
        //     const name1 = limit.Conn_Room ? `${limit.Room}_${limit.Conn_Room}_DP` : limit.Room;
        //     const name2 = limit.Conn_Room ? `${limit.Conn_Room}_${limit.Room}_DP` : limit.Room;
        //     // hard to know room/conn_room order so add lookup for both directions
        //     return{...acc,
        //       [`${limit.Facility.toLowerCase()}|${name1.toLowerCase()}`]: limit,
        //       [`${limit.Facility.toLowerCase()}|${name2.toLowerCase()}`]: limit,
        //     }
        //   } else {       
        //     return{...acc,
        //       [`${limit.Facility.toLowerCase()}|${limit.Room.toLowerCase()}`]: limit,
        //     }
        //   }
  
        // }
      //);
  
        this._apfLimits$.next(limitsLookup);
      });
  
      // create an observable of the facility selected in the fillter control
      const selectedFacility$ = this._piDataFilter$.pipe(
        distinctUntilChanged(
          (prev, curr) => prev.facility.value === curr.facility.value
        ),
        map((f) => f.facility)
      );
      
      // create an observable of the marker type to use with the map - 'pin' or 'arrow'
      const svgMapMarker$ = this._piDataFilter$.pipe(
        map((f) => (f.status.toLowerCase() === 'dp' ? 'arrow' : 'pin')),
        distinctUntilChanged()
      );
  
      // Update the floor plan, current status values for rooms, and parameter values for rooms when the facility changes
      selectedFacility$
        .pipe(
          filter(facility=>Boolean(facility?.value)),
          mergeMap((facility) =>
            zip(
              of(facility.value),
              // of([] as any),
              //this.dataService.facilityCurrentStatusData(facility.value), // status for each room and attribute in facility
              this.piWebApiService.facilityCurrentStatusData(facility.sectionName),
              this.dataService.roomParameterInfo(facility.value) // parameter info from database for each room and attribute in facility
            )
          )
        )
        .subscribe(([facilityId, currentStatusValues, parameterValues]) => {
          const backGroundImageUrl = `assets/images/orig-floor-plans/FID${facilityId}_FloorPlan.jpg`;
            // facilityId == 0
            //   ? 'assets/images/floor-plans/apf_facility_all_background.png'
            //   : `assets/images/orig-floor-plans/FID${facilityId}_FloorPlan.jpg`;
          this._svgMapBackgroundImageUrl$.next(backGroundImageUrl);
  
          this._currentStatusValues$.next(currentStatusValues);
  
          const compositeStatusValues = currentStatusValues.filter(
            (x:any) => x.attribute === 'Composite' || x.locationName.endsWith('_DP')
          );
          const pinStatusLookup = reduce(
            compositeStatusValues,
            (acc, x) => ({
              ...acc,
              [x.locationName]: this.statusColor(x.statusPoint.numeric_value)
            }),
            {}
          );
          this._pinStates.next(pinStatusLookup);
  
          this._parameterValues$.next(parameterValues);
  
          this._selectedPin$.next('');
          this._selectedRoomInfo$.next({});
        });
  
      // Get the pins or arrows for the Svg Floor plan if the facility changes or attriibute changes between not dp and dp
      combineLatest([selectedFacility$, svgMapMarker$])
        .pipe(
          mergeMap(([facility, marker]) => {
            return this.dataService.svgMap(facility.value, marker);
          })
        )
        .subscribe((svgMap) => {
          this._svgMap$.next(svgMap);
        });
  
      // when a map pin is selected, prepare room info display data using the apf limits query, current status values, and the room parameters
      const roomCurrentAttributeData$ = 
        combineLatest([selectedFacility$, this._selectedPin$])
          .pipe(
            filter(([facility,pin])=>Boolean(pin)),
            mergeMap(([facility,pin])=>zip(
              of(facility),
              of(pin),
              //this.dataService.roomCurrentAttributeData(facility.value,pin)))
              this.piWebApiService.roomCurrentAttributeData(facility.sectionName,pin)))
          )
      // this._selectedPin$.pipe(
      //   filter(Boolean),
      //   mergeMap((pin:string)=>zip(
      //     of(pin),
      //     this.dataService.roomCurrentAttributeData(this._piDataFilter$.value.facility.value,pin)
      //   ))
      // )
      roomCurrentAttributeData$
      .subscribe(([facility,pin,roomStatusValues]) => {
        // const facility =
        //   this._piDataFilter$.value.facility.sectionName.toLowerCase();
        const sectionName = facility.sectionName.toLowerCase();
        const key = `${sectionName}|${pin.toLowerCase()}`; // pin = room number
        const apfLimits = this._apfLimits$.value[key];
        const isDP = pin.indexOf('DP') > -1;
        const room = isDP ? 
          this._parameterValues$.value.find(
            (r) => (r.formattedName.toLowerCase() === pin.toLowerCase())
          ) : 
          this._parameterValues$.value.find(
            (r) => (r.roomNumber.toLowerCase() === pin.toLowerCase())
          );
  
        const info = {
          ...apfLimits,
          gsf: room?.sq,
          roomParameters: room?.roomParameters,
          roomStatusValues,
          compositeStatus: roomStatusValues.find(
            (x) => x.attribute === 'Composite'
          )?.statusPoint,
          tempStatus: roomStatusValues.find((x) => x.attribute === 'Temp')
            ?.statusPoint,
          rhStatus: roomStatusValues.find((x) => x.attribute === 'Hum')
            ?.statusPoint,
          achStatus: roomStatusValues.find((x) => x.attribute === 'Airx')
            ?.statusPoint,
          dpStatus: roomStatusValues.find((x) => x.attribute === 'DP')
            ?.statusPoint
        };
  
        this._selectedRoomInfo$.next(info);
      });
  

      // prepare data for specific facility timeline
      this._piDataFilter$
        .pipe(
          // filter((f) => f.facilityOrPortfolio == 'facility'),
          mergeMap((filter: PiDataFilter) =>
            // this.dataService
            //   .facilityRoomsTimelineDate(
            //     filter.facility.value,
            //     filter.status,
            //     filter.startDate,
            //     filter.endDate,
            //     filter.interval
            //   )
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
          const rooms = dataAndFilter.data.map((d) => d.location);
          const roomLookup = keyBy(rooms, (r) => r.roomNumber);
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
                locationName: x.location.roomNumber,
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
          for(let d of dataAndFilter.data) {
            locations[d.location.roomNumber] =d.location
          }

          this._timelineChartData$.next({
            points: chartDataPoints,
            locations: roomLookup,
            //locationCount:dataAndFilter.data.length,
            locationType: 'room'
          });
        });
    } // end contstructor
  
    private _ic$: Subject<string>;
    public setIC(ic: string) {
      this._ic$.next(ic);
    }
  
    private _piDataFilter$: Subject<PiDataFilter>;
    public filterPiData(filter: PiDataFilter) {
      this._piDataFilter$.next(filter);
    }
    public get piDataFilter$() {
      return this._piDataFilter$ as Observable<PiDataFilter>;
    }
  
    public get isFacilityAll$() {
      return this._piDataFilter$.pipe(
        map((f) => {
          return Number(f.facility) === 0;
        })
      );
    }
  
    private _svgMap$: Subject<SvgMap>;
    public get svgMap$() {
      return this._svgMap$ as Observable<SvgMap>;
    }
  
    private _currentStatusValues$: BehaviorSubject<LocationCurrentStatus[]>;
    private _pinStates: BehaviorSubject<locationStatusLookup>;
  
    public get pinStates$() {
      return this._pinStates as Observable<locationStatusLookup>;
    }
  
    private _parameterValues$: BehaviorSubject<Room[]>;
    public get parameterValues$() {
      return this._parameterValues$ as Observable<Room[]>;
    }
  
    private _timelineChartData$: Subject<TimelineChartData>;
    public get timelineChartData$() {
      return this._timelineChartData$ as Observable<TimelineChartData>;
    }
  
    private _svgMapBackgroundImageUrl$: Subject<string>;
    public get svgMapBackgroundImageUrl$() {
      return this._svgMapBackgroundImageUrl$ as Observable<string>;
    }
  
    private _selectedPin$: Subject<string>;
    public get selectedPin$() {
      return this._selectedPin$ as Observable<string>;
    }
  
    private _hoveredPin$: Subject<string>;
    public get hoveredPin$() {
      return this._hoveredPin$ as Observable<string>;
    }
  
    private _hoveredTimelineLabel$: Subject<string>;
    public get hoveredTimelineLabel$() {
      return this._hoveredTimelineLabel$ as Observable<string>;
    }
  
    private _selectedRoomInfo$: Subject<roomInfoLookup>;
    public get selectedRoomInfo$() {
      return this._selectedRoomInfo$ as Observable<roomInfoLookup>;
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
  
    private _apfLimits$: BehaviorSubject<apfLimitsLookup>;
    public get apfLimits$() {
      return this._apfLimits$ as Observable<apfLimitsLookup>;
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
  
    private _facilityFilterOptions$: BehaviorSubject<
      { repName: string; sectionName: string; value: string }[]
    >;
    public get facilityFilterOptions$() {
      return this._facilityFilterOptions$ as Observable<
        { repName: string; sectionName: string; value: string }[]
      >;
    }
  }
  