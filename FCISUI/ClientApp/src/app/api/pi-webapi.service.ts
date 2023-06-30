import {
    Attachment,
    AttachmentGroup,
    ContactUsMessage,
    ErrorLog,
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
import {map} from 'rxjs'

@Injectable({
    providedIn: 'root'
  })
  export class PiWebApiService {
    constructor(private http: HttpClient) {}
  
    private HEADERS: Object = {withCredentials: true};
    
    private get<T>(url: string) {
      return this.http.get<T>(`${environment.piWebApi}/${url}`, this.HEADERS);
    }
  
    private post<T>(url: string, body: any) {
      return this.http.post<T>(`${environment.piWebApi}/${url}`, body, this.HEADERS);
    }


    timelineData(
      facility: string,
      attr: string,
      startDate: Date,
      endDate: Date,
      interval: number
    ) {

      const postBody = {
        "GetFacilityId": {
          "Method": "GET",
          "Resource": `${environment.piWebApi}/elements?path=\\\\${environment.piServer}\\cGMP\\cGMP\\${facility}`
        },
        "GetRooms": {
          "Method": "GET",
          "Resource": `${environment.piWebApi}/elements/{0}/elements`,
      
          "ParentIds": [
                       "GetFacilityId"
              ],
          "Parameters": [
                       "$.GetFacilityId.Content.WebId"
              ]
        },
        "GetStatus": {
          "Method": "GET",
      
          "ParentIds":["GetRooms"],
          
          "RequestTemplate":{
            "Resource": `${environment.piWebApi}/attributes?path=\\\\${environment.piServer}\\cGMP\\cGMP\\PET_1\\{0}|${attr}`
            },
          
          "Parameters":[
            "$.GetRooms.Content.Items[*].Name"
            ]
        },
        "GetTimeline": {
          "Method":"GET",
          "ParentIds":["GetStatus"],
          "RequestTemplate": {
            "Resource": `${environment.piWebApi}/streamsets/{0}/interpolated?startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}&interval=${interval}m&nameFilter=Status`
          },
              "Parameters":[
            "$.GetStatus.Content.Items[*].Content.WebId"
            ]
      
        }      };
      
      const roomTimelines = this.post<any>(
        `batch`,postBody
      ).pipe(map(x=>{
        const roomData = x.GetTimeline.Content.Items.map((d:any)=>{ 
          const data = d.Content.Items[0]; 
          const room = data.Path.split('|')[0].split('\\').slice(-1)[0]; 
          return {room,items:data.Items.map((itm:any)=>({timeStamp:itm.Timestamp,value:itm.Value}))};});
        return roomData;
      }));

      return roomTimelines;
    }
  
    facilityAlltimelineData(
      portfolioId: string,
      startDate: Date,
      endDate: Date,
      interval: number
    ) {
      return this.post<FacilityTimeSeriesData[]>(
        `Timeline/AllFacilityTimelineData`,
        {
          portfolioId,
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
        `Timeline/FacilityCurrentCompositeData/${facilityId}`
      );
    }
  
    roomCurrentAttributeData(facilityId: number, roomFormattedName: string) {
      return this.get<LocationCurrentStatus[]>(
        `Timeline/RoomCurrentAttributeData/facility/${facilityId}/room/${roomFormattedName}`
      );
    }
  
    apfLimits() {
      return this.get<any[]>(`Timeline/ApfLimits`);
    }
  

  }
  