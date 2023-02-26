import {BehaviorSubject, Observable, Subject, map} from 'rxjs';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RoomDisplayField } from '../apf-portfolio-ic-dashboard/apf-portfolio-ic-dashboard.service';

@Component({
  selector: 'app-room-info-display',
  template: `
  <div>
    <app-room-data-table [displayFields]="(leftTableFields$ | async) || []"></app-room-data-table>
    <app-room-data-table [displayFields]="(rightTableFields$ | async) || []"></app-room-data-table>
  </div>
  `,
  styleUrls: ['./room-info-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomInfoDisplayComponent {
  
  private _displayFields$: Subject<RoomDisplayField[]>
  @Input()
  set displayFields(v: RoomDisplayField[]) {
    this._displayFields$.next(v);
  }

  leftTableFields$: Observable<RoomDisplayField[]>;
  rightTableFields$: Observable<RoomDisplayField[]>;

  constructor() { 
    this._displayFields$ = new BehaviorSubject<RoomDisplayField[]>([]);

    this.leftTableFields$ = this._displayFields$.pipe(map(fields=>{
      return fields.slice(0, fields.length / 2 + fields.length % 2)
    }));

    
    this.rightTableFields$ = this._displayFields$.pipe(map(fields=>{
      return fields.slice(fields.length / 2 + fields.length % 2)
    }));
  }


}
