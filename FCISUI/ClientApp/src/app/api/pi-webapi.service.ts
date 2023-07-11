import {
  FacilityTimeSeriesData,
  LocationCurrentStatus,
  LocationTimeSeriesData,
  Room,
  RoomTimeSeriesData,
} from './models';
import { Observable, map, of } from 'rxjs'

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PiWebApiService {
  constructor(private http: HttpClient) { }

  private HEADERS: Object = { withCredentials: true, accept: 'text/json' };

  private get<T>(url: string) {
    return this.http.get<T>(`${environment.piWebApi}/${url}`, this.HEADERS);
  }

  private post<T>(url: string, body: any) {
    return this.http.post<T>(`${environment.piWebApi}/${url}`, body, this.HEADERS);
  }

  timelineDataComposite(
    facility: string,
    startDate: Date,
    endDate: Date,
    interval: number) {
    const postBody = {
      "GetFacilityId": {
        "Method": "GET",
        "Resource": `${environment.piWebApi}/elements?path=\\\\ORF-COGENAF\\cGMP\\cGMP\\${facility}`
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

      "GetTimeline": {
        "Method": "GET",
        "ParentIds": ["GetRooms"],
        "RequestTemplate": {
          "Resource": `${environment.piWebApi}/streamsets/{0}/interpolated?startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}&interval=${interval}m&nameFilter=Status`
        },
        "Parameters": [
          "$.GetRooms.Content.Items[*].WebId"
        ]

      }
    }
    const roomTimelines = this.post<any>(
      `batch`, postBody
    ).pipe(map(x => {
      const roomData = x.GetTimeline.Content.Items.map((d: any) => {
        const data = d.Content.Items[0];
        const roomNumber = data.Path.split('|')[0].split('\\').slice(-1)[0];
        const room = { roomNumber, roomName: '', sq: 0 }  // TODO
        return { location: room, tag: data.Path, points: data.Items.map((itm: any) => ({ timestamp: new Date(itm.Timestamp), numeric_value: itm.Value })) };
      });
      return roomData;
    }));

    return roomTimelines as Observable<LocationTimeSeriesData<Room>[]>;
  }

  timelineDataDp(
    facility: string,
    startDate: Date,
    endDate: Date,
    interval: number
  ): Observable<LocationTimeSeriesData<Room>[]> {

    const postBody = {
      "GetFacilityId": {
        "Method": "GET",
        "Resource": `${environment.piWebApi}/elements?path=\\\\ORF-COGENAF\\cGMP\\cGMP\\${facility}`
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

      "GetDPRooms": {
        "Method": "GET",
        "ParentIds": ["GetRooms"],
        "RequestTemplate": {
          "Resource": `${environment.piWebApi}/elements/{0}/elements`
        },
        "Parameters": [
          "$.GetRooms.Content.Items[*].WebId"
        ]
      },

      "GetDPRoomsDP": {
        "Method": "GET",
        "ParentIds": ["GetDPRooms"],
        "RequestTemplate": {
          "Resource": "https://orf-cogenaf.ors.nih.gov/piwebapi/elements/{0}/attributes?nameFilter=DP"
        },
        "Parameters": [
          "$.GetDPRooms.Content.Items[*].Content.Items[*].WebId"
        ]
      },

      "GetTimeline": {
        "Method": "GET",
        "ParentIds": ["GetDPRoomsDP"],
        "RequestTemplate": {
          "Resource": `${environment.piWebApi}/streamsets/{0}/interpolated?startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}&interval=${interval}m&nameFilter=Status`
        },
        "Parameters": [
          "$.GetDPRoomsDP.Content.Items[*].Content.Items[0].WebId"
        ]

      }

    }

    const roomTimelines = this.post<any>(
      `batch`, postBody
    ).pipe(map(x => {
      const roomData = [];
      const roomNumbers: { [roomNumber: string]: boolean } = {}
      for (const itm of x.GetTimeline.Content.Items) {
        const data = itm.Content.Items[0];
        const roomNumber = data.Path.split('|')[0].split('\\').slice(-1)[0];
        if (!roomNumbers[roomNumber]) {
          roomNumbers[roomNumber] = true;
          const room = { roomNumber, roomName: '', sq: 0 }  // TODO
          roomData.push({
            location: room,
            tag: data.Path,
            points: data.Items.map((itm: any) => ({ timestamp: new Date(itm.Timestamp), numeric_value: itm.Value }))
          });
        }
      }
      return roomData;
      // const roomData = x.GetTimeline.Content.Items.map((d:any)=>{ 
      //   const data = d.Content.Items[0]; 
      //   const roomNumber = data.Path.split('|')[0].split('\\').slice(-1)[0]; 
      //   const room = { roomNumber, roomName:'', sq:0 }  // TODO
      //   return {location:room, tag:data.Path, points:data.Items.map((itm:any)=>({timestamp:new Date(itm.Timestamp),numeric_value:itm.Value}))};});
      // return roomData;
    }));

    return roomTimelines as Observable<LocationTimeSeriesData<Room>[]>;
  }

  timelineDataNonDp(
    facility: string,
    attr: string,
    startDate: Date,
    endDate: Date,
    interval: number
  ): Observable<LocationTimeSeriesData<Room>[]> {

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

        "ParentIds": ["GetRooms"],

        "RequestTemplate": {
          "Resource": `${environment.piWebApi}/attributes?path=\\\\${environment.piServer}\\cGMP\\cGMP\\${facility}\\{0}|${attr}`
        },

        "Parameters": [
          "$.GetRooms.Content.Items[*].Name"
        ]
      },
      "GetTimeline": {
        "Method": "GET",
        "ParentIds": ["GetStatus"],
        "RequestTemplate": {
          "Resource": `${environment.piWebApi}/streamsets/{0}/interpolated?startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}&interval=${interval}m&nameFilter=Status`
        },
        "Parameters": [
          "$.GetStatus.Content.Items[*].Content.WebId"
        ]

      }
    };

    const roomTimelines = this.post<any>(
      `batch`, postBody
    ).pipe(map(x => {
      const roomData = x.GetTimeline.Content.Items.map((d: any) => {
        const data = d.Content.Items[0];
        const roomNumber = data.Path.split('|')[0].split('\\').slice(-1)[0];
        const room = { roomNumber, roomName: '', sq: 0 }  // TODO
        return { location: room, tag: data.Path, points: data.Items.map((itm: any) => ({ timestamp: new Date(itm.Timestamp), numeric_value: itm.Value })) };
      });
      return roomData;
    }));

    return roomTimelines as Observable<LocationTimeSeriesData<Room>[]>;
  }

  timelineData(
    facility: string,
    attr: string,
    startDate: Date,
    endDate: Date,
    interval: number
  ): Observable<LocationTimeSeriesData<Room>[]> {
    const attrLower = attr.toLowerCase();
    return attrLower === 'dp' ?
      this.timelineDataDp(facility, startDate, endDate, interval) :
      attrLower === 'sum all' ?
        this.timelineDataComposite(facility, startDate, endDate, interval) :
        this.timelineDataNonDp(facility, attr, startDate, endDate, interval);
  }

  facilityAlltimelineData(
    portfolioId: string,
    startDate: Date,
    endDate: Date,
    interval: number
  ):Observable<FacilityTimeSeriesData[]> {

    const postBody = {
      "cgmp": {
        "Method": "GET",
        "Resource": "https://orf-cogenaf.ors.nih.gov/piwebapi/elements?path=\\\\ORF-COGENAF\\cGMP\\cGMP"
      },
      "facilities": {
        "Method": "GET",
        "Resource":"https://orf-cogenaf.ors.nih.gov/piwebapi/elements/{0}/elements",
        "ParentIds":["cgmp"],
        "Parameters":["$.cgmp.Content.WebId"]
      },
    
      "timelines": {
        "Method": "GET",
        "ParentIds": ["facilities"],
    
        "RequestTemplate": {
          "Resource":"https://orf-cogenaf.ors.nih.gov/piwebapi/streamsets/{0}/interpolated?startTime=*-2d&endTime=*&interval=60m&nameFilter=facility_status_check"
        },
        "Parameters":["$.facilities.Content.Items[*].WebId"]
      }
    };

    const portfolioFacilities:{[portfolioId:string]:string[]} = {
      CC: ['PET_1','PET_3','2J','E_TER','DLM_SL','IIVAU'],
      CCE: ['2J','E_TER'],
      CCPharmacy: ['IIVAU','P_IVAU'],
      CCOther: ['PET_1','PET_3','DLM_SL'],
      NCI:['VVF','HPP','T30','Tr1','Tr2'],
      NIAID:[]
    }


    const timelines = this.post<any>(
      `batch`, postBody
    ).pipe(map(x => {
      const outerItems = x.timelines.Content.Items as any[];
      const facilityChecks = outerItems.filter(y=>y.Content.Items.some(Boolean)).map((y:any)=>y.Content.Items[0]);
      const timeSeriesData = facilityChecks.map((y:any)=>{
        try {
          const path = y.Path;   //'\\\\ORF-COGENAF\\cGMP\\cGMP\\2J|Facility_Status_Check'
          const i = path.indexOf('|');
          const elementPath = path.substring(0, i);
          const facilityName = elementPath.split('\\').slice(-1)[0];
          const points = (y.Items || []).map((z:any)=>{
            return {
              numeric_value:z.Value,
              timestamp:new Date(z.Timestamp).valueOf()
            }
          })
          return {
            facility: {
              facilityName
            },
            points,
            tag:elementPath
          }
        }
        catch(e){
          console.log(e);
          return {} as FacilityTimeSeriesData;
        }

      });
      const chosenFacilities = portfolioFacilities[portfolioId];
      const facilityTimeSeriesData = timeSeriesData.filter(y=>chosenFacilities.some(z=>z === y.facility.facilityName))
      return facilityTimeSeriesData as FacilityTimeSeriesData[];
    }));


    return timelines;
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

  private extractStatus(item: any): LocationCurrentStatus {
    //const item = outItem.Content.Items[0];
    const path = item.Path;
    const valueObj = item.Value;
    const i = path.indexOf('|');
    const elementPath = path.substring(0, i);
    const attrPath = path.substring(i + 1);
    const room = elementPath.split('\\').slice(-1)[0];
    const statusName = attrPath.split('|')[0];
    const value = valueObj.Value;
    const timestamp = new Date(valueObj.Timestamp).valueOf();
    const attribute = statusName == 'Status' ? 'Composite' : statusName; // as ('Composite' | 'Temp' | 'Hum' | 'Airx' | 'DP')
    return {
      locationName: room,
      attribute: attribute,
      statusPoint: {
        timestamp,
        numeric_value: value
      }
    };
  }

  facilityCurrentStatusData(facility: string) {
    const postBody = {

      "GetFacilityId": {
        "Method": "GET",
        "Resource": `${environment.piWebApi}/elements?path=\\\\ORF-COGENAF\\cGMP\\cGMP\\${facility}`
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

      "GetCompositeStatus": {
        "Method": "GET",

        "ParentIds": ["GetRooms"],

        "RequestTemplate": {
          "Resource": `${environment.piWebApi}/streamsets/{0}/value?nameFilter=Status`
        },

        "Parameters": [
          "$.GetRooms.Content.Items[*].WebId"
        ]
      },

      "GetDPRooms": {
        "Method": "GET",
        "ParentIds": ["GetRooms"],
        "RequestTemplate": {
          "Resource": "https://orf-cogenaf.ors.nih.gov/piwebapi/elements/{0}/elements"
        },
        "Parameters": [
          "$.GetRooms.Content.Items[*].WebId"
        ]
      },

      "GetDPRoomsDP": {
        "Method": "GET",
        "ParentIds": ["GetDPRooms"],
        "RequestTemplate": {
          "Resource": "https://orf-cogenaf.ors.nih.gov/piwebapi/elements/{0}/attributes?nameFilter=DP"
        },
        "Parameters": [
          "$.GetDPRooms.Content.Items[*].Content.Items[*].WebId"
        ]
      },

      "GetDPStatus": {
        "Method": "GET",

        "ParentIds": ["GetDPRoomsDP"],

        "RequestTemplate": {
          "Resource": "https://orf-cogenaf.ors.nih.gov/piwebapi/streamsets/{0}/value?nameFilter=Status"
        },

        "Parameters": [
          "$.GetDPRoomsDP.Content.Items[*].Content.Items[*].WebId"
        ]
      }

    }

    const currentStatuses = this.post<any>(
      `batch`, postBody
    ).pipe(map(x => {

      const outerCompositeItems = x.GetCompositeStatus.Content.Items;
      const innerCompositeItems = outerCompositeItems.map((item: any) => this.extractStatus(item.Content.Items[0]));

      const outerDpItems = x.GetDPStatus.Content.Items || [];
      const innerDpItems = outerDpItems.map((item: any) => this.extractStatus(item.Content.Items[0]));
      // const outerAttributeItems = x.GetAttributeStatus.Content.Items;
      // const innerAttributeItems = outerAttributeItems.filter((y:any)=>Boolean((y.Content.Items || []).length)).map(this.extractStatus); 

      const allItems = innerCompositeItems.concat(innerDpItems);
      return allItems;

    }));

    return currentStatuses;
  }

  roomCurrentAttributeDataDP(facility: string, room: string, dpRoom: string) {
    const postBody =
    {
      "GetRoomDP": {
        "Method": "GET",
        "Resource": `${environment.piWebApi}/attributes?path=\\\\ORF-COGENAF\\cGMP\\cGMP\\${facility}\\${room}\\${dpRoom}|DP`
      },

      "GetDPStatus": {
        "Method": "GET",
        "Resource": `${environment.piWebApi}/streamsets/{0}/value?nameFilter=Status`,
        "ParentIds": [
          "GetRoomDP"
        ],
        "Parameters": [
          "$.GetRoomDP.Content.WebId"
        ]
      }
    }

    const currentStatus = this.post<any>(
      `batch`, postBody
    ).pipe(map(x => {
      const item = x.GetDPStatus.Content.Items[0];
      const status = this.extractStatus(item);
      return status;
    }));

    return currentStatus;
  }

  roomCurrentAttributeData(facility: string, roomFormattedName: string): Observable<LocationCurrentStatus[]> {

    if(roomFormattedName.toLowerCase().indexOf('_dp')> 0){
      return of([{
          locationName: roomFormattedName,
          attribute: 'DP',
          statusPoint: {
            timestamp:0,
            numeric_value: 0
          }
      }]);
    }
    
    const postBody = {
      "GetRoomId": {
        "Method": "GET",
        "Resource": `${environment.piWebApi}/elements?path=\\\\ORF-COGENAF\\cGMP\\cGMP\\${facility}\\${roomFormattedName}`
      },

      "GetCompositeStatus": {
        "Method": "GET",

        "ParentIds": ["GetRoomId"],

        "Resource": `${environment.piWebApi}/streamsets/{0}/value?nameFilter=Status`,

        "Parameters": [
          "$.GetRoomId.Content.WebId"
        ]
      },

      "GetAttributes": {
        "Method": "GET",

        "ParentIds": ["GetRoomId"],


        "Resource": `${environment.piWebApi}/elements/{0}/attributes`,

        "Parameters": [
          "$.GetRoomId.Content.WebId"
        ]
      },

      "GetAttributeStatus": {
        "Method": "GET",
        "ParentIds": ["GetAttributes"],
        "RequestTemplate": {
          "Resource": `${environment.piWebApi}/streamsets/{0}/value?nameFilter=Status`
        },
        "Parameters": [
          "$.GetAttributes.Content.Items[*].WebId"
        ]
      }

    }

    const currentStatuses = this.post<any>(
      `batch`, postBody
    ).pipe(map(x => {

      const outerCompositeItems = x.GetCompositeStatus.Content.Items;
      const innerCompositeItems = outerCompositeItems.map(this.extractStatus);

      const outerAttributeItems = x.GetAttributeStatus.Content.Items;
      const innerAttributeItems =
        outerAttributeItems
          .filter((y: any) => Boolean((y.Content.Items || []).length))
          .map((item: any) => this.extractStatus(item.Content.Items[0]));

      const allItems = innerCompositeItems.concat(innerAttributeItems);
      return allItems;

    }));

    return currentStatuses;
  }

  apfLimits(): Observable<any[]> {
    //return this.get<any[]>(`Timeline/ApfLimits`);
    return this.get<any>('tables/F1BlL8A_6d2dm0SBrg5RJa_Z7Q01xA01cuhkmah-3rqOPBcgT1JGLUNPR0VOQUZcQ0dNUFxUQUJMRVNbQVBGX0xJTUlUU10/data')
      .pipe(map(x => x.Rows));
  }


}
