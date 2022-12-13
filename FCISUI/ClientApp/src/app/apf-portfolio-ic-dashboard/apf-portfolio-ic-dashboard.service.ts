import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, BehaviorSubject, zip, of } from 'rxjs';
import { TimelineDataPoint, LocationData, DataService } from 'src/app/data.service';

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
  statusValue:number,
  startTime:number,
  endTime:number,
  roomInfo?:any
}

interface CriticalParameterFilter {
  facility:number, 
  status:string, 
  startDate:Date, 
  endDate:Date, 
  interval:number
}

// const row = 
// [
//   {
//     v: x.RoomName,
//     p: {
//         link: `https://orfd-cogen.ors.nih.gov/data-quality/plotcgmp?path=${x.Tag}`  // This will need to be the correct concantonated link: dataValues[i].Tag + ...
//     }
//   },
//   tooltipText,
//   x.ChillerStatus,
//   statusColor(x.ChillerStatus),
//   new Date(x.StartTime),
//   new Date(x.EndTime)
// ];

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

    this._timeline$ = new BehaviorSubject<ChartDataPoint[]>([]);
    
    this._piDataFilter$.pipe(mergeMap(
      (filter:CriticalParameterFilter)=>zip(
        of(filter),
        this.dataService.timelineData(filter.facility, filter.status, filter.startDate, filter.endDate, filter.interval))))
      .subscribe((dataAndFilter:[filter:CriticalParameterFilter,data:LocationData[]])=>{
        const chartData:ChartDataPoint[] = []
         
        for(const x of dataAndFilter[1]) {
          if(! x.points.some(Boolean)) { continue; }
          x.points.sort((a,b)=>a.timestamp - b.timestamp);
          let startTime = x.points[0].timestamp;
          let status = x.points[0].numeric_value;
          for(const y of x.points.sort((a,b)=>a.timestamp - b.timestamp)){
            const point:ChartDataPoint = {
              locationName:x.locationName,
              tag:x.tag,
              startTime:startTime,
              endTime:Math.max(y.timestamp,startTime),
              statusValue:y.numeric_value,
              roomInfo: {
                // roomName:y.roomName || '',
                // iso:y.iso || '',
                // sq:y.sq || ''
              }
            }
            if(point.startTime > point.endTime) {
              console.log('error');
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

  private _timeline$: BehaviorSubject<ChartDataPoint[]>;

  public get timeline$() {
    return this._timeline$ as Observable<ChartDataPoint[]>;
  }

  private locationDataToChartRow(point:TimelineDataPoint, roomNumber:string, roomName:string, iso:string, sq:string) {

    // const statusColor = (chillerStatus:string) => {
    //   if (chillerStatus == 'Within Spec') { return 'green'; }
    //   if (chillerStatus == 'Comm Loss') { return 'gray'; }
    //   if (chillerStatus == 'Warning') { return 'yellow'; }
    //   if (chillerStatus == 'Alarm (Out of Spec)') { return 'red'; }
    //   return 'white'; 
    // }



    const tooltipText = "";
    //createCustomHTMLContentTable(locationData.locationName, x.RoomName, x.ISO, x.SQ)
      
      const row:any = 
        [
          // {
          //   v: roomName,
          //   p: {
          //       link: `https://orfd-cogen.ors.nih.gov/data-quality/plotcgmp?path=${tag}`  // This will need to be the correct concantonated link: dataValues[i].Tag + ...
          //   }
          // },
          // tooltipText,
          // chillerStatusLabel(chillerStatus),
          // statusColor(chillerStatus),
          // new Date(startTime),
          // new Date(endTime)
        ];
      return row;
      
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
