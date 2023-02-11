
export interface SvgMapPin {
    id: number;
    locationId: string;
    title: string;
    cx: number;
    cy: number;
    r: number;
    path: string;
}

export interface SvgMap {
    id: number;
    name: string;
    defs: string;
    backgroundSvg: string;
    viewbox: string;
    facilityId: number;
    svgMapPins: SvgMapPin[]
}

export const defaultSvgMap: SvgMap = {
    id:0, backgroundSvg:"",name:"",svgMapPins:[],viewbox:"0 0 0 0", defs:"", facilityId:0
};