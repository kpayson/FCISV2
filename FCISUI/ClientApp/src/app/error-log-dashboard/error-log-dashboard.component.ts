import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/api/data.service';
import { ErrorLog } from '../api/models';

@Component({
  selector: 'app-error-log-dashboard',
  templateUrl: './error-log-dashboard.component.html',
  styleUrls: ['./error-log-dashboard.component.scss']
})
export class ErrorLogDashboardComponent implements OnInit {

  constructor(private dataService: DataService) { }

  errors:  any[] = [] //ErrorLog[] = []
  errorsJSON = ""
  appSettings = ""

  ngOnInit(): void {
    this.dataService.errors().subscribe(errors=>{
      this.errors = errors
      this.errorsJSON = JSON.stringify(errors);
    });

    this.dataService.appSettings().subscribe(settings=>{
    this.appSettings = JSON.stringify(settings);
    })
  }

}
