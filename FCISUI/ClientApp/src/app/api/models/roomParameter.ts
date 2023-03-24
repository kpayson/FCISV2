export interface RoomParameter {
  roomId: number;
  facility: string;
  roomNumber: string;
  parameter: string;
  sensorLocation: string;
  calibrationType: string;
  calibrationPeriod: string;
  nextCalibration: string;
  siemensPointName: string;
  jciPointName: string;
  rhTargetRange: string;

  // ,[RoomId]
  // ,[Facility]
  // ,[RoomNumber]
  // ,[Parameter]
  // ,[SensorLocation]
  // ,[CalibrationType]
  // ,[CalibrationPeriod]
  // ,[NextCalibration]
  // ,[SiemensPointName]
  // ,[JCIPointName]
  // ,[RHTargetRange]
}
