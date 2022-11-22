import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';
import { ApfPortfolioIcDashboardService } from './apf-portfolio-ic-dashboard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-apf-portfolio-ic-dashboard',
  templateUrl: './apf-portfolio-ic-dashboard.component.html',
  styleUrls: ['./apf-portfolio-ic-dashboard.component.scss'],
  providers: [ApfPortfolioIcDashboardService]
})
export class ApfPortfolioIcDashboardComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    public service:ApfPortfolioIcDashboardService
  ) { 

    this.monitoredRoomsChartData$ = this.service.gsfGrowthByClassification$;

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);

    const getFacid = (ic:string)=>{
      if(ic==='cc'){ return 100;}
      if(ic==='nci') {return 110;}
      if(ic==='niad') {return 120;}
      return 0;
    }

    const routeParams = this.route.snapshot.paramMap;
    const ic = routeParams.get('ic')?.toLowerCase() || "";
    const facid = getFacid(ic);
    const atr = "";
    const interval = 15;
    this.timelineData$ = this.service.chlTimeline(startDate,endDate,facid,atr,interval);
  }

  monitoredRoomsChartData$:Observable<any[]>;
  timelineData$:Observable<any[]>;

  ngOnInit(): void {


  }

}
