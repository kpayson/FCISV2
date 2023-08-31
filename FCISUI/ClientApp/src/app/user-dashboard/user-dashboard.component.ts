import { Component } from '@angular/core';

import { Person } from '../api/models';
import { UserDashboardService } from './user-dashboard.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserUpsertComponent } from '../user-upsert/user-upsert.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  providers: [DialogService, UserDashboardService]
})
export class UserDashboardComponent {

  ref!: DynamicDialogRef;


  constructor(
    public dialogService: DialogService,
    public service:UserDashboardService) { }


  addPerson(): void {
    this.ref = this.dialogService.open(UserUpsertComponent, { header: 'New User', width: '70%', height: '70%' });
  }
  
  editPerson(person: Person): void {
    this.ref = this.dialogService.open(UserUpsertComponent, { header: 'New User', width: '70%', height: '70%', data: person });
  }
  
  deletePerson(id: number): void {
    // this.service.deletePerson(id);
  }

}


