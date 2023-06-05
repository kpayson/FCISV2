import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RoomDisplayField } from '../facility-timeline-dashboard/facility-timeline-dashboard.service'

@Component({
  selector: 'app-room-data-table',
  template: `
    <table class="table table-sm table-striped" style="width:100%">
      <tbody>
        <tr *ngFor="let field of displayFields">
          <td>
            <strong>{{ field.name }}</strong>
          </td>
          <td>
            <ng-container
              *ngIf="
                field.displayType == 'status';
                then statusCircle;
                else plainText
              "
              >{{ field.value }}></ng-container
            >
            <ng-template #statusCircle>
              <div
                class="status-circle"
                [ngStyle]="{ background: statusColor(field.value) }"
              ></div>
            </ng-template>
            <ng-template #plainText>
              {{ field.value }}
            </ng-template>
          </td>
        </tr>

        <tr></tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./room-data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomDataTableComponent {
  @Input()
  displayFields: RoomDisplayField[] = [];

  constructor() {}

  ngOnInit(): void {}

  statusColor(statusVal: string | number) {
    switch (String(statusVal)) {
      case '0':
        return 'green';
      case '1':
        return 'gray';
      case '2':
        return 'yellow';
      case '3':
        return 'red';
      default:
        return 'lightgray';
    }
  }
}
