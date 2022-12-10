import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// export interface TimelineData {
//   roomName: string;
//   roomNumber: string;
//   sq: string;
//   iso: string;
//   chillerStatus: number;
//   color: string;
//   tag: string;
//   startTime: number;
//   endTime: number;
// }

export type TimelineDataPoint = { timestamp:number, numeric_value:number, rooomData?:any };
export type LocationData = { locationName: string, tag: string, points:TimelineDataPoint[] };



@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  private get<T>(url: string) {
    return this.http.get<T>(`${environment.apiRootUrl}/${url}`);
  }

  private post<T>(url: string, body: any) {
    return this.http.post<T>(`${environment.apiRootUrl}/${url}`, body);
  }

  gsfByFacility() {
    return this.get<any[]>(`GsfChart/GsfByFacility`);
  }

  gsfByIC() {
    return this.get<any[]>(`GsfChart/GsfByIC`);
  }

  gsfGrowthByClassification() {
    return this.get<any[]>(`GsfChart/GsfGrowthByClassification`);
  }

  facilities() {
    return this.get<any[]>(`Facilities`);
  }

  timelineData(facilityId:number, attr:string, startDate:Date, endDate: Date, interval:number) {
    if(facilityId == 0) {
      return this.post<LocationData[]>(`Timeline/AllFacilityTimelineData`, {
        startDate,
        endDate,
        interval
      }); 
    }

    return this.post<LocationData[]>(`Timeline/FacilityTimelineData`, {
      facilityId,
      attr,
      startDate,
      endDate,
      interval
    });
  }


}
