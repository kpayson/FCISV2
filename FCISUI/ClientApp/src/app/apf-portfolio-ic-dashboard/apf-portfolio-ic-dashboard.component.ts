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

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const ic = routeParams.get('ic');

    this.dataService.gsfGrowthByClassification().subscribe(data=>{
      this.monitoredRoomsChartData = data;
    })
  }

}
