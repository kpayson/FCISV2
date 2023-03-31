import { RoomParameter } from './roomParameter';

export interface Room {
  roomId: number;
  facilityId: number;
  facility: string;
  roomNumber: string;
  connectingRoom: string;
  roomName: string;
  sq: number;
  formattedName: string;
  isActive: boolean;
  roomParameters?: RoomParameter[];
}


