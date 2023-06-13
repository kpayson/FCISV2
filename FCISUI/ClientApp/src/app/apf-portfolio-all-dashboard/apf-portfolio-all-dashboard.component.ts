import { ApfPortfolioAllDashboardService } from './apf-portfolio-all-dashboard.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-apf-portfolio-all-dashboard',
  templateUrl: './apf-portfolio-all-dashboard.component.html',
  styleUrls: ['./apf-portfolio-all-dashboard.component.scss'],
  providers: [ApfPortfolioAllDashboardService]
})
export class ApfPortfolioAllDashboardComponent {
  constructor(public service: ApfPortfolioAllDashboardService) { }

  chartByIcOptions = {
    pieHole: 0.5,
    pieSliceText: 'none',
    colors: [
      '#94762d', // CCE
      '#b5fd19', // CC Pharmacy
      '#fb09bf', // CC Other
      '#00ffff', // NCI
      '#c9363c' // NIAID 
    ],

  }

  chartByFacilityOptions = {
    pieHole: 0.5,
    pieSliceText: 'none',
    colors: [
      // CCE
      '#94762d',  // 2J
      'sandybrown', // E_TER
      
      //CC Pharmacy
      '#b5fd19', // IIVAU
      
      // CC Other
      '#fb09bf', // Pet_1
      'darkviolet', // Pet_B3
      'darkmagenta', // DLM_SL
      
      // NCI
      '#00ffff', // T30
      'deepskyblue', // Tr1
      'lightblue', // Tr2
      'blue', // VVF
      'darkblue', // Hpp
      
      //NIAID
      '#c9363c'

    ],

  }
}

