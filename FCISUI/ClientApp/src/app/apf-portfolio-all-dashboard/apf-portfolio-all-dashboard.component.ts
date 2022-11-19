import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-apf-portfolio-all-dashboard',
  templateUrl: './apf-portfolio-all-dashboard.component.html',
  styleUrls: ['./apf-portfolio-all-dashboard.component.scss']
})
export class ApfPortfolioAllDashboardComponent implements OnInit {

  constructor(private dataService:DataService) { }

  gsfByIcData:any[] = []
  gsfByFacilityData:any[] = [];

  ngOnInit(): void {
    this.dataService.gsfByFacility().subscribe(data=>{
      this.gsfByFacilityData = data.map(x => [x.facility, x.gsf]);
    });

    this.dataService.gsfByIC().subscribe(data=>{
      this.gsfByIcData = data.map(x => [x.ic, x.gsf]);;
    });
  }

}
