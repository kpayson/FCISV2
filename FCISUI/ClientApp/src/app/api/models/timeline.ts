import { Facility, Room } from ".";

export interface TimeSeriesPoint
{
    timestamp: number;
    numeric_value: number;
}

export interface LocationTimeSeriesData<T>
{
    location: T; //facility or room
    tag: string; // piPath
    points: TimeSeriesPoint[];
}

export interface FacilityTimeSeriesData
{
    facility: Facility; 
    tag: string; // piPath
    points: TimeSeriesPoint[];
}

export interface RoomTimeSeriesData
{
    room: Room; 
    tag: string; // piPath
    points: TimeSeriesPoint[];
}



export interface LocationCurrentStatus 
{
    locationName: string; //facility or room name
    attribute: 'Composite' | 'Temp' | 'Hum' | 'Airx' | 'DP';
    statusPoint: TimeSeriesPoint;
}

export interface LocationQuery
{
    locationName: string;
    tag: string;
}
