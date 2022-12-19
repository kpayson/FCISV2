import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Facility, SvgMap, LocationTimeSeriesData, LocationCurrentStatus, FacilityGsf, ICGsf, GsfGrowth } from './models'


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

  facilities() {
    return this.get<Facility[]>(`Facilities`);
  }

  gsfByFacility() {
    return this.get<FacilityGsf[]>(`GsfChart/GsfByFacility`);
  }

  gsfByIC() {
    return this.get<ICGsf[]>(`GsfChart/GsfByIC`);
  }

  gsfGrowthByClassification() {
    return this.get<GsfGrowth[]>(`GsfChart/GsfGrowthByClassification`);
  }

  svgMap(facId:number) {
    return this.get<SvgMap>(`SvgMap/${facId}`)
  }

  timelineData(facilityId:number, attr:string, startDate:Date, endDate: Date, interval:number) {
    if(facilityId == 0) {
      return this.post<LocationTimeSeriesData[]>(`Timeline/AllFacilityTimelineData`, {
        startDate,
        endDate,
        interval
      }); 
    }

    return this.post<LocationTimeSeriesData[]>(`Timeline/FacilityTimelineData`, {
      facilityId,
      attr,
      startDate,
      endDate,
      interval
    });
  }

  facilityCurrentStatusData(facilityId:number) {
    if(facilityId == 0) {
      return this.post<LocationCurrentStatus[]>(`Timeline/AllFacilityCurrentData`, {facilityId});
    }
    return this.post<LocationCurrentStatus[]>(`Timeline/FacilityCurrentData`, {facilityId})
  }
}
