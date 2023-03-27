import {
  Facility,
  FacilityGsf,
  FacilityTimeSeriesData,
  GsfGrowth,
  ICGsf,
  LocationCurrentStatus,
  LocationTimeSeriesData,
  Room,
  RoomTimeSeriesData,
  SvgMap,
  SvgMapPin
} from './models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  facilitiesByIC(ic: string) {
    return this.get<Facility[]>(`Facilities/ic/${ic}`);
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

  svgMap(facId: number, marker: string = 'pin') {
    return this.get<SvgMap>(`SvgMap/${facId}?marker=${marker}`);
  }

  svgMapBackgroundUrl(facId: number) {
    return `${environment.apiRootUrl}/SvgMap/backgroundImage/${facId}`;
  }

  roomParameterInfo(facilityId: number) {
    return this.get<Room[]>(`SvgMap/RoomParameterInfo/facility/${facilityId}`);
  }

  timelineData(
    facilityId: number,
    attr: string,
    startDate: Date,
    endDate: Date,
    interval: number
  ) {
    if (facilityId == 0) {
      return this.post<LocationTimeSeriesData<Facility>[]>(
        `Timeline/AllFacilityTimelineData`,
        {
          startDate,
          endDate,
          interval
        }
      );
    }

    return this.post<LocationTimeSeriesData<Room>[]>(
      `Timeline/FacilityTimelineData`,
      {
        facilityId,
        attr,
        startDate,
        endDate,
        interval
      }
    );
  }

  facilityAlltimelineData(
    ic: string,
    startDate: Date,
    endDate: Date,
    interval: number
  ) {
    return this.post<FacilityTimeSeriesData[]>(
      `Timeline/AllFacilityTimelineData`,
      {
        ic,
        startDate,
        endDate,
        interval
      }
    );
  }

  facilityRoomsTimelineDate(
    facilityId: number,
    attr: string,
    startDate: Date,
    endDate: Date,
    interval: number
  ) {
    return this.post<RoomTimeSeriesData[]>(`Timeline/FacilityTimelineData`, {
      facilityId,
      attr,
      startDate,
      endDate,
      interval
    });
  }

  facilityCurrentStatusData(facilityId: number) {
    if (facilityId == 0) {
      return this.get<LocationCurrentStatus[]>(
        `Timeline/AllFacilityCurrentData`
      );
    }
    return this.get<LocationCurrentStatus[]>(
      `Timeline/FacilityCurrentData/${facilityId}`
    );
  }

  apfLimits() {
    return this.get<any[]>(`Timeline/ApfLimits`);
  }
}
