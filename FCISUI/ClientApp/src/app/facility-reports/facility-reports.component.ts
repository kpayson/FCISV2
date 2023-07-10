import { Component, Input, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-facility-reports',
  templateUrl: './facility-reports.component.html',
  styleUrls: ['./facility-reports.component.css']
})
export class FacilityReportsComponent implements OnInit {

  @Input()
  facilityId:number = 0
  
  constructor() { }

  baseUrl = environment.facilityReportsBaseUrl;

  ngOnInit(): void {
  }

}
