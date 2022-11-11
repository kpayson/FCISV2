import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apf-portfolio-all-dashboard',
  templateUrl: './apf-portfolio-all-dashboard.component.html',
  styleUrls: ['./apf-portfolio-all-dashboard.component.scss']
})
export class ApfPortfolioAllDashboardComponent implements OnInit {

  constructor() { }

  gsfByIcData = [
    ['WorkX', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7]
  ]
  gsfByFacilityData = [];

  ngOnInit(): void {
  }

}
