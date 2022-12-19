export interface TimeSeriesPoint
{
    timestamp: number;
    numeric_value: number;
}

export interface LocationTimeSeriesData
{
    locationName: string //facility or room name
    tag: string; // piPath
    points: TimeSeriesPoint[];
}

export interface LocationCurrentStatus 
{
    locationName: string; //facility or room name
    statusPoint: TimeSeriesPoint;
}

export interface LocationQuery
{
    locationName: string;
    tag: string;
}