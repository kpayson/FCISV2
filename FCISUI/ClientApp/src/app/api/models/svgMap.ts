export interface SvgMapPin {
  id: number;
  locationId: string;
  title: string;
  cx: number;
  cy: number;
  r: number;
  path: string;
}

export interface SvgMapArrow {
  id: number;
  locationId: string;

  arrowOutlinePoints: string;
  arrowInsidePoints: string;
}

export interface SvgMap {
  id: number;
  name: string;
  defs: string;
  backgroundSvg: string;
  viewbox: string;
  facilityId: number;
  svgMapPins: SvgMapPin[];
  svgMapArrows: SvgMapArrow[];
}

export const defaultSvgMap: SvgMap = {
  id: 0,
  backgroundSvg: '',
  name: '',
  svgMapPins: [],
  svgMapArrows: [],
  viewbox: '0 0 0 0',
  defs: '',
  facilityId: 0
};
