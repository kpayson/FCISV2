import { RoomParameter } from './roomParameter';

export interface Room {
  roomId: number;
  facilityId: number;
  facility: string;
  roomNumber: string;
  roomName: string;
  sq: number;
  iso: string;
  roomParameters?: RoomParameter[];
}
