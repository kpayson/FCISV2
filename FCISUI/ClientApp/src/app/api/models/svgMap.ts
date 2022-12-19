
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
    backgroundSvg: string;
    viewbox: string;
    svgMapPins: SvgMapPin[]
}