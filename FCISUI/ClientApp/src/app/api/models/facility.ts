export interface Facility {
  facilityId: number;
  facilityName: string;
  facilityAbbrName?: string;
  facilityIc?: string;
  facilitySection?: string;
  facilityBuilding?: string;
  facilityLocation?: string;
  description?: string;
  comments: string;
  sortOrder?: number;
  piPath?: string;
  attribute?: string;
  circleid?: string;
  isActive?: boolean;
  facilityRepName?: string;
  facilityFullName?: string;
}
