import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface TimelineData {
  roomName: string;
  roomNumber: string;
  sq: string;
  iso: string;
  chillerStatus: string;
  color: string;
  tag: string;
  startTime: number;
  endTime: number;
}

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

  chlTimelineData(
    startDate: Date,
    endDate: Date,
    facid: number,
    atr: string,
    interval: number
  ) {
    return this.post<TimelineData[]>('ApfTimeline', {
      startDate,
      endDate,
      facid,
      atr,
      interval
    });
  }
}
