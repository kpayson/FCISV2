import { Component, OnInit } from '@angular/core';
//import { DataService } from 'src/app/data.service';
import { ApfPortfolioAllDashboardService} from './apf-portfolio-all-dashboard.service';

@Component({
  selector: 'app-apf-portfolio-all-dashboard',
  templateUrl: './apf-portfolio-all-dashboard.component.html',
  styleUrls: ['./apf-portfolio-all-dashboard.component.scss'],
  providers: [ApfPortfolioAllDashboardService]
})
export class ApfPortfolioAllDashboardComponent {

  constructor(public service:ApfPortfolioAllDashboardService) { }

}
