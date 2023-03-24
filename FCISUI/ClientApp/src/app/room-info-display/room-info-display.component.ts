import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RoomDisplayField } from '../apf-portfolio-ic-dashboard/apf-portfolio-ic-dashboard.service';

@Component({
  selector: 'app-room-info-display',
  template: `
    <div style="display:flex">
      <div style="width:50%; padding:0px 20px">
        <app-room-data-table
          [displayFields]="leftTableFields"
        ></app-room-data-table>
      </div>
      <div style="width:50%; padding:0px 20px;">
        <app-room-data-table
          [displayFields]="rightTableFields"
        ></app-room-data-table>
      </div>
    </div>
  `,
  styleUrls: ['./room-info-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomInfoDisplayComponent {
  private _roomInfo$: Subject<{ [FileSystemFileHandle: string]: string }>;
  private _attribute$: Subject<string>;

  leftTableFields: RoomDisplayField[] = [];
  rightTableFields: RoomDisplayField[] = [];

  @Input()
  set roomInfo(v: { [field: string]: string }) {
    this._roomInfo$.next(v);
  }

  @Input()
  set attribute(v: string) {
    this._attribute$.next(v);
  }

  constructor() {
    this._roomInfo$ = new BehaviorSubject<{ [field: string]: string }>({});
    this._attribute$ = new BehaviorSubject<string>('');

    combineLatest([this._roomInfo$, this._attribute$]).subscribe(
      ([roomInfo, attribute]) => {
        const attr = attribute.toLowerCase();
        const fields =
          attr === 'composite' || attr === 'sum all'
            ? this.compositeFields(roomInfo)
            : attr === 'temp'
            ? this.tempFields(roomInfo)
            : attr === 'hum'
            ? this.rhFields(roomInfo)
            : attr === 'airx'
            ? this.achFields(roomInfo)
            : attr === 'dp'
            ? this.dpFields(roomInfo)
            : [];

        const mid = fields.length / 2 + (fields.length % 2);
        this.leftTableFields = fields.slice(0, mid);
        this.rightTableFields = fields.slice(mid);
      }
    );
  }

  // compositeStatus: statusValues[`${pin}|Composite`],
  // tempStatus: statusValues[`${pin}|Temp`],
  // rhStatus: statusValues[`${pin}|Hum`],
  // dpStatus: statusValues[`${pin}|DP`]

  private compositeFields(roomInfo: { [name: string]: any }) {
    const status = roomInfo['compositeStatus'];
    return [
      { name: 'Room #', value: roomInfo['Room'] },
      { name: 'Room Name', value: roomInfo['Description'] },
      { name: 'Timestamp', value: new Date(status.timeStamp).toLocaleString() },
      { name: 'Classification', value: `ISO-${roomInfo['ISO']}` },
      { name: 'GSF', value: roomInfo['gsf'] },
      {
        name: 'Composite Status',
        value: status.numeric_value,
        displayType: 'status'
      },
      {
        name: 'Temp Status',
        value: roomInfo['tempStatus']?.numeric_value,
        displayType: 'status'
      },
      {
        name: 'DP Status',
        value: roomInfo['dpStatus']?.numeric_value,
        displayType: 'status'
      },
      {
        name: 'RH Status',
        value: roomInfo['rhStatus']?.numeric_value,
        displayType: 'status'
      },
      {
        name: 'ACH Status',
        value: roomInfo['achStatus']?.numeric_value,
        displayType: 'status'
      }
    ];
  }

  private tempFields(roomInfo: { [name: string]: any }) {
    const parameters =
      roomInfo['roomParameters'].find((p: any) => p.parameter === 'Temp') || {};
    const status = roomInfo['tempStatus'];

    return [
      { name: 'Room #', value: roomInfo['Room'] },
      { name: 'Room Name', value: roomInfo['Description'] },
      { name: 'Classification', value: `ISO-${roomInfo['ISO']}` },
      { name: 'GSF', value: roomInfo['gsf'] },
      {
        name: 'Room Status',
        value: status.numeric_value,
        displayType: 'status'
      },
      { name: 'Timestamp', value: new Date(status.timeStamp).toLocaleString() },
      { name: 'High Alarm Limit', value: roomInfo['HiHi'] || '' },
      { name: 'High Alarm Delay', value: roomInfo['AlmHiDelay'] || '' },
      { name: 'Target', value: roomInfo['Target'] || '' },
      { name: 'Low Alarm Limit', value: roomInfo['HiHi'] || '' },
      { name: 'Low Alarm Delay', value: roomInfo['AlmLoDelay'] || '' },
      { name: 'BAS (SQL)', value: parameters.HTTE10 || 'n/a' },
      { name: 'BAS (PI)', value: parameters.siemansPointName },
      { name: 'Sensor Type', value: parameters.sensorType },
      { name: 'Sensor Location', value: parameters.sensorLocation },
      { name: 'Calibration Type', value: parameters.calibrationType },
      { name: 'Calibration Period', value: parameters.calibrationPeriod },
      { name: 'Next Calibration', value: parameters.nextCalibration }
    ];
  }

  private dpFields(roomInfo: { [name: string]: any }) {
    const parameters =
      roomInfo['roomParameters'].find((p: any) => p.parameter === 'DP') || {};
    const status = roomInfo['dpStatus'];
    return [
      { name: 'Room to Room #', value: roomInfo['Room'] },
      { name: 'Room Name', value: roomInfo['Description'] },
      {
        name: 'Room Status',
        value: status.numeric_value,
        displayType: 'status'
      },
      { name: 'Timestamp', value: new Date(status.timeStamp).toLocaleString() },
      { name: 'High Alarm Limit', value: roomInfo['HiHi'] || '' },
      { name: 'High Alarm Delay', value: roomInfo['AlmHiDelay'] || '' },
      { name: 'Target', value: roomInfo['Target'] || '' },
      { name: 'Low Alarm Limit', value: roomInfo['HiHi'] || '' },
      { name: 'Low Alarm Delay', value: roomInfo['AlmLoDelay'] || '' },
      { name: 'BAS (SQL)', value: parameters.HTTE10 || 'n/a' },
      { name: 'BAS (PI)', value: parameters.siemansPointName },
      { name: 'Sensor Type', value: parameters.sensorType },
      { name: 'Sensor Location', value: parameters.sensorLocation },
      { name: 'Calibration Type', value: parameters.calibrationType },
      { name: 'Calibration Period', value: parameters.calibrationPeriod },
      { name: 'Next Calibration', value: parameters.nextCalibration }
    ];
  }

  private rhFields(roomInfo: { [name: string]: any }) {
    const parameters =
      roomInfo['roomParameters'].find((p: any) => p.parameter === 'Hum') || {};
    const status = roomInfo['rhStatus'];
    return [
      { name: 'Room #', value: roomInfo['Room'] },
      { name: 'Room Name', value: roomInfo['Description'] },
      { name: 'Classification', value: `ISO-${roomInfo['ISO']}` },
      { name: 'GSF', value: roomInfo['gsf'] },
      {
        name: 'Room Status',
        value: status.numeric_value,
        displayType: 'status'
      },
      { name: 'Timestamp', value: new Date(status.timeStamp).toLocaleString() },
      { name: 'High Alarm Limit', value: roomInfo['HiHi'] || '' },
      { name: 'High Alarm Delay', value: roomInfo['AlmHiDelay'] || '' },
      { name: 'RH Target Range', value: roomInfo['Target'] || '' },
      { name: 'Low Alarm Limit', value: roomInfo['HiHi'] || '' },
      { name: 'Low Alarm Delay', value: roomInfo['AlmLoDelay'] || '' },
      { name: 'BAS (SQL)', value: parameters.HTTE10 || 'n/a' },
      { name: 'BAS (PI)', value: parameters.siemansPointName },
      { name: 'Sensor Type', value: parameters.sensorType },
      { name: 'Sensor Location', value: parameters.sensorLocation },
      { name: 'Calibration Type', value: parameters.calibrationType },
      { name: 'Calibration Period', value: parameters.calibrationPeriod },
      { name: 'Next Calibration', value: parameters.nextCalibration }
    ];
  }

  private achFields(roomInfo: { [name: string]: any }) {
    const parameters =
      roomInfo['roomParameters'].find((p: any) => p.parameter === 'Airx') || {};
    const status = roomInfo['achStatus'];
    return [
      { name: 'Room #', value: roomInfo['Room'] },
      { name: 'Room Name', value: roomInfo['Description'] },
      { name: 'Classification', value: `ISO-${roomInfo['ISO']}` },
      { name: 'GSF', value: roomInfo['gsf'] },
      { name: 'Current Value', value: '' },
      {
        name: 'Room Status',
        value: status.numeric_value,
        displayType: 'status'
      },
      { name: 'Timestamp', value: new Date(status.timeStamp).toLocaleString() },
      { name: 'High Alarm Limit', value: roomInfo['HiHi'] || '' },
      { name: 'High Alarm Delay', value: roomInfo['AlmHiDelay'] || '' },
      { name: 'Target', value: roomInfo['Target'] || '' },
      { name: 'Low Alarm Limit', value: roomInfo['HiHi'] || '' },
      { name: 'Low Alarm Delay', value: roomInfo['AlmLoDelay'] || '' },
      { name: 'BAS (SQL)', value: parameters.HTTE10 || 'n/a' },
      { name: 'BAS (PI)', value: parameters.siemansPointName }
    ];
  }
}

// ACH Fields
// Room #:	2N307C
// Room Name:	Tissue Culture
// Classification:	ISO-7
// GSF:	214
// Current Value:	43.17
// Room Status:	Within Spec
// Timestamp:	3/18/2023 7:55:44 PM
// High Alarm Limit:	100
// High Alarm Delay:	1800 (sec)
// Target:	40
// Low Alarm Limit:	30
// Low Alarm Delay:	1800 (sec)
// BAS (SQL):	n/a
// BAS (PI):	BMU.10.J.GMP.RM2N307C.AIRX

// "Facility": "2J",
// "ISO": 7,
// "Room": "2N307G",
// "Conn_Room": null,
// "Parameter": "Temp",
// "LoLo": 59,
// "LoWarn": null,
// "HiHi": 68,
// "HiWarn": null,
// "Alarmable": 1,
// "AlmRange": "Both",
// "Description": "Small Tissue Culture",
// "Target": "66",
// "GraphType": 0,
// "GraphLo": 45,
// "GraphHi": 90,
// "AlmHiDelay": 1800,
// "WarnHiDelay": 300,
// "AlmLoDelay": 1800,
// "WarnLoDelay": 300,
// "Comments": null,
// "SiemensName": "BMU.10.J.GMP.RM2N307G.RMTEMP",
// "JCIName": "N/A"

// Temp Fields
// Room #:	2N307G
// Room Name:	Small Tissue Culture
// Classification:	ISO-7
// GSF:	169
// Current Value:	66.49 °F
// Room Status:	Within Spec
// Timestamp:	3/18/2023 7:47:05 PM
// High Alarm Limit:	68 °F
// High Alarm Delay:	1800 (sec)
// Target:	66 °F
// Low Alarm Limit:	59 °F
// Low Alarm Delay:	1800 (sec)
// BAS (SQL):	HTTE-10
// BAS (PI):	BMU.10.J.GMP.RM2N307G.RMTEMP
// Sensor Type:	Duct
// Sensor Location:	2N325MR
// Calibration Type:	Single Point
// Calibration Period:	Annual
// Next Calibration:	31-Aug-22

// Sample Output from https://orfd-cogen.ors.nih.gov/pi-api/table-values?path=\\ORF-COGENAF\cGMP\APF_Limits
// {
//   "Facility": "2J",
//   "ISO": 7,
//   "Room": "2N307G",
//   "Conn_Room": null,
//   "Parameter": "Airx",
//   "LoLo": 30,
//   "LoWarn": null,
//   "HiHi": 100,
//   "HiWarn": null,
//   "Alarmable": 1,
//   "AlmRange": "Both",
//   "Description": "Small Tissue Culture",
//   "Target": "40",
//   "GraphType": 0,
//   "GraphLo": 0,
//   "GraphHi": 75,
//   "AlmHiDelay": 1800,
//   "WarnHiDelay": 300,
//   "AlmLoDelay": 1800,
//   "WarnLoDelay": 300,
//   "Comments": null,
//   "SiemensName": "BMU.10.J.GMP.RM2N307G.AIRX",
//   "JCIName": "N/A"
// },

//Composite Fields
// Room #:	2N3071
// Room Name:	Airlock #1
// Timestamp:	3/18/2023 7:53:37 PM
// Classification:	CNC
// GSF:	195
// Composite Status:	Within Spec
// Temp Status:	Within Spec
// DP Status:	Within Spec
// RH Status:	Within Spec
// ACH Status:	n/a

// Temp Fields
// Room #:	2N307G
// Room Name:	Small Tissue Culture
// Classification:	ISO-7
// GSF:	169
// Current Value:	66.49 °F
// Room Status:	Within Spec
// Timestamp:	3/18/2023 7:47:05 PM
// High Alarm Limit:	68 °F
// High Alarm Delay:	1800 (sec)
// Target:	66 °F
// Low Alarm Limit:	59 °F
// Low Alarm Delay:	1800 (sec)
// BAS (SQL):	HTTE-10
// BAS (PI):	BMU.10.J.GMP.RM2N307G.RMTEMP
// Sensor Type:	Duct
// Sensor Location:	2N325MR
// Calibration Type:	Single Point
// Calibration Period:	Annual
// Next Calibration:	31-Aug-22

//DP Fields
// Room to Room #:	2N3072_2N3071_DP
// Current Value:	0.04 psi
// Room Status:	Within Spec
// Timestamp:	3/18/2023 7:52:34 PM
// High Alarm Limit:	0.1 psi
// High Alarm Delay:	120 (sec)
// Target:	0.025 psi
// Low Alarm Limit:	0 psi
// Low Alarm Delay:	120 (sec)
// BAS (SQL):	DPTE-18
// BAS (PI):	BMU.10.J.GMP.2N3071.2N3072.DP
// Sensor Type:	Room
// Sensor Location:	2N325MR
// Calibration Type:	3-Point
// Calibration Period:	Annual
// Next Calibration:	31-Aug-22

// RH Fields
// Room #:	2N3071
// Room Name:	Airlock #1
// Classification:	CNC
// GSF:	195
// Current Value:	34.64 %
// Room Status:	Within Spec
// Timestamp:	3/18/2023 7:54:52 PM
// High Alarm Limit:	60 %
// High Alarm Delay:	1800 (sec)
// RH Target Range:	30-55 %
// Low Alarm Limit:	20 %
// Low Alarm Delay:	1800 (sec)
// BAS (SQL):	n/a
// BAS (PI):	BMU.10.J.GMP.RM2N3071.RMHUM
// Sensor Type:	n/a
// Sensor Location:	n/a
// Calibration Type:	n/a
// Calibration Period:	n/a
// Next Calibration:	n/a

// ACH Fields
// Room #:	2N307C
// Room Name:	Tissue Culture
// Classification:	ISO-7
// GSF:	214
// Current Value:	43.17
// Room Status:	Within Spec
// Timestamp:	3/18/2023 7:55:44 PM
// High Alarm Limit:	100
// High Alarm Delay:	1800 (sec)
// Target:	40
// Low Alarm Limit:	30
// Low Alarm Delay:	1800 (sec)
// BAS (SQL):	n/a
// BAS (PI):	BMU.10.J.GMP.RM2N307C.AIRX
