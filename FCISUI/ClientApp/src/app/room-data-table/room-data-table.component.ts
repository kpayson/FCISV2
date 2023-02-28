import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RoomDisplayField } from '../apf-portfolio-ic-dashboard/apf-portfolio-ic-dashboard.service';

@Component({
  selector: 'app-room-data-table',
  template: `
    <table class="table table-sm table-striped" style="width:100%">
      <tbody>
          <tr *ngFor="let field of displayFields">
              <td><strong>{{field.name}}</strong></td>
              <td>
                <ng-container *ngIf="field.displayType == 'status'; then statusCircle else plainText ">{{field.value}}></ng-container>
                <ng-template #statusCircle>
                    {{field.value}}
                </ng-template>
                <ng-template #plainText>
                    {{field.value}}
                </ng-template>
              </td>
              

          <tr>
      </tbody>
  </table>
  `,
  styleUrls: ['./room-data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomDataTableComponent {
  @Input()
  displayFields: RoomDisplayField[] = []
  
  constructor() { }

  ngOnInit(): void {
  }

}
