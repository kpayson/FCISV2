export interface FacilityGsf {
  facility: string;
  gsf: number;
}

export interface GsfGrowth {
  iso7RoomsCount: number;
  iso8RoomsCount: number;
  cncRoomsCount: number;
  iso7RoomsArea: number;
  iso8RoomsArea: number;
  cncRoomsArea: number;
  criticalEnvironmentParametersCount: number;
  goLiveDate: Date;
}

export interface ICGsf {
  ic: string;
  gsf: number;
}
