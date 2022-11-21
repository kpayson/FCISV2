import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-apf-portfolio-ic-dashboard',
  templateUrl: './apf-portfolio-ic-dashboard.component.html',
  styleUrls: ['./apf-portfolio-ic-dashboard.component.scss']
})
export class ApfPortfolioIcDashboardComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private dataService:DataService
  ) { }

  monitoredRoomsChartData:any[] = [];
  timelineData:any[] = [];

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const ic = routeParams.get('ic')?.toLowerCase() || "";

    this.dataService.gsfGrowthByClassification().subscribe(data=>{
      this.monitoredRoomsChartData = data.map(x=>{
        const goLiveDate = new Date(x.goLiveDate);
        return [goLiveDate, x.cncRoomsArea + x.iso8RoomsArea + x.iso7RoomsArea, x.criticalEnvironmentParametersCount]
      });
    });

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);

    const getFacid = (ic:string)=>{
      if(ic==='cc'){ return 100;}
      if(ic==='nci') {return 110;}
      if(ic==='niad') {return 120;}
      return 0;
    }
    const facid = getFacid(ic);
    const atr = "";
    const interval = 15;

    this.dataService
      .chlTimelineData(startDate,endDate,facid,atr,interval)
      .subscribe(data=>{
        this.timelineData = data;
      });
  }

}
